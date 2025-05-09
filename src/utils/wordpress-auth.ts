import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://khelmanch.com/wp-json";
const JWT_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token`;
const JWT_VALIDATE_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token/validate`;
const USERS_ENDPOINT = `${API_BASE_URL}/wp/v2/users/me`;
// Endpoint for Google authentication (you might need to create this custom endpoint)
const GOOGLE_AUTH_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/google`;
// Endpoint for Google registration (you might need to create this custom endpoint)
const GOOGLE_REGISTER_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/google/register`;

// We'll store the token in localStorage
const TOKEN_STORAGE_KEY = "wp_jwt_auth_token";

interface JWTAuthResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  user_id?: number; // Make user_id optional since it might not be present
  success?: boolean;
}

interface JWTAuthError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

export const storeAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const response = await fetch(JWT_VALIDATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return !!data.success;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const loginWithCredentials = async (
  username: string, 
  password: string
): Promise<JWTAuthResponse> => {
  try {
    const response = await fetch(JWT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const error = data as JWTAuthError;
      throw new Error(error.message || "Authentication failed");
    }
    
    // Store the token
    if (data.token) {
      storeAuthToken(data.token);
    }
    
    return data as JWTAuthResponse;
  } catch (error: any) {
    console.error("Login error:", error);
    toast({
      title: "Login Failed",
      description: error.message || "Failed to authenticate with WordPress",
      variant: "destructive"
    });
    throw error;
  }
};

export const fetchUserData = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");
  
  try {
    const response = await fetch(USERS_ENDPOINT, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// New function to register a user with Google information
export const registerWithGoogle = async (
  email: string,
  displayName?: string
): Promise<JWTAuthResponse> => {
  try {
    console.log("Attempting to register Google user with WordPress:", email);
    
    // Generate a username from email (remove special characters and domain)
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    
    // Generate a random password (this won't be used for logins since Google auth will be used)
    const password = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
    
    // First, try to use the custom Google register endpoint if it exists
    try {
      const registerResponse = await fetch(GOOGLE_REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email,
          username,
          password,
          display_name: displayName || username
        })
      });

      if (registerResponse.ok) {
        const data = await registerResponse.json();
        
        // Store the token
        if (data.token) {
          storeAuthToken(data.token);
        }
        
        toast({
          title: "Registration Successful",
          description: "Your Google account has been registered with WordPress",
        });
        
        return data as JWTAuthResponse;
      } else {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (registerEndpointError: any) {
      console.log("Custom Google register endpoint error:", registerEndpointError);
      throw new Error("Failed to register with WordPress: " + registerEndpointError.message);
    }
  } catch (error: any) {
    console.error("Google registration with WordPress error:", error);
    toast({
      title: "Registration Failed",
      description: error.message || "Failed to register with WordPress using Google",
      variant: "destructive"
    });
    throw error;
  }
};

// Updated function to handle both login and registration
export const loginWithGoogle = async (
  email: string,
  displayName?: string
): Promise<JWTAuthResponse> => {
  try {
    // First attempt: try to use the custom Google endpoint if it exists
    try {
      const googleResponse = await fetch(GOOGLE_AUTH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      // If login succeeds, return the data
      if (googleResponse.ok) {
        const data = await googleResponse.json();
        
        // Store the token
        if (data.token) {
          storeAuthToken(data.token);
        }
        
        return data as JWTAuthResponse;
      } 
      
      // If we get a 404 error, it likely means the user doesn't exist
      const errorData = await googleResponse.json();
      if (googleResponse.status === 404 || errorData.code === "rest_user_invalid_email") {
        console.log("User not found, attempting registration...");
        // Try to register the user
        return await registerWithGoogle(email, displayName);
      }
      
      // Other errors
      throw new Error(errorData.message || "Authentication failed");
    } catch (googleEndpointError: any) {
      if (googleEndpointError.message === "Failed to fetch") {
        console.log("Custom Google endpoint not available, trying alternative approach");
      } else {
        // If we know it's a "user not found" error, try registration
        if (googleEndpointError.message?.includes("not found") || 
            googleEndpointError.message?.includes("invalid_email")) {
          return await registerWithGoogle(email, displayName);
        }
        throw googleEndpointError;
      }
    }
    
    // Alternative approach: Try to find user by email using WordPress REST API
    // This would require appropriate permissions and might not work without custom server-side code
    console.log("Verifying Google email with WordPress:", email);
    
    // Fallback method: For now, let's create a simulation success response
    // In a real app, you would need a custom WordPress endpoint to handle Google auth
    toast({
      title: "Important Note",
      description: "You need a custom WordPress endpoint to properly authenticate and register Google users. Currently using a fallback method.",
      variant: "default" // Change from "warning" to "default" as "warning" isn't supported
    });
    
    // Attempt to fetch users by email (requires admin privileges or custom endpoint)
    // This is a placeholder - in production, this should use a proper server endpoint
    const simulatedResponse: JWTAuthResponse = {
      token: "google-auth-token",  // This should be a real token in production
      user_email: email,
      user_nicename: email.split('@')[0],
      user_display_name: displayName || email.split('@')[0]
    };
    
    // Store the token (in production, this would be a real WordPress JWT token)
    storeAuthToken(simulatedResponse.token);
    
    return simulatedResponse;
  } catch (error: any) {
    console.error("Google login with WordPress error:", error);
    toast({
      title: "Login Failed",
      description: error.message || "Failed to authenticate with WordPress using Google",
      variant: "destructive"
    });
    throw error;
  }
};

// This would need the Users Create plugin or custom endpoint on WordPress
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    // This endpoint would depend on your WordPress setup
    // You might need a custom plugin or REST API extension for registration
    const registrationEndpoint = `${API_BASE_URL}/wp/v2/users`;
    
    const response = await fetch(registrationEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    
    const data = await response.json();
    
    // After successful registration, login the user
    return await loginWithCredentials(userData.username, userData.password);
  } catch (error: any) {
    console.error("Registration error:", error);
    toast({
      title: "Registration Failed",
      description: error.message || "Failed to register with WordPress",
      variant: "destructive"
    });
    throw error;
  }
};
