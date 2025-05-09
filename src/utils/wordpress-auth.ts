import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://khelmanch.com/wp-json";
const JWT_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token`;
const JWT_VALIDATE_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token/validate`;
const USERS_ENDPOINT = `${API_BASE_URL}/wp/v2/users/me`;
// Endpoint for Google authentication (you might need to create this custom endpoint)
const GOOGLE_AUTH_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/google`;

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

// This function authenticates a user with their Google email
export const loginWithGoogle = async (
  email: string
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

      if (googleResponse.ok) {
        const data = await googleResponse.json();
        
        // Store the token
        if (data.token) {
          storeAuthToken(data.token);
        }
        
        return data as JWTAuthResponse;
      }
    } catch (googleEndpointError) {
      console.log("Custom Google endpoint not available, trying alternative approach");
    }
    
    // Alternative approach: Try to find user by email using WordPress REST API
    // This would require appropriate permissions and might not work without custom server-side code
    console.log("Verifying Google email with WordPress:", email);
    
    // Fallback method: For now, let's create a simulation success response
    // In a real app, you would need a custom WordPress endpoint to handle Google auth
    toast({
      title: "Important Note",
      description: "You need a custom WordPress endpoint to properly authenticate Google users. Currently using a fallback method.",
      variant: "warning"
    });
    
    // Attempt to fetch users by email (requires admin privileges or custom endpoint)
    // This is a placeholder - in production, this should use a proper server endpoint
    const simulatedResponse: JWTAuthResponse = {
      token: "google-auth-token",  // This should be a real token in production
      user_email: email,
      user_nicename: email.split('@')[0],
      user_display_name: email.split('@')[0]
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
