import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://khelmanch.com/wp-json";
const JWT_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token`;
const JWT_VALIDATE_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/token/validate`;
const USERS_ENDPOINT = `${API_BASE_URL}/wp/v2/users/me`;
// Endpoint for Google authentication (custom endpoint from the plugin)
const GOOGLE_AUTH_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/google`;
// Endpoint for Google registration (custom endpoint from the plugin)
const GOOGLE_REGISTER_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/google/register`;
// Endpoint for phone authentication (custom endpoint for the plugin)
const PHONE_AUTH_ENDPOINT = `${API_BASE_URL}/jwt-auth/v1/phone`;

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

// Function to handle Google login and registration
export const loginWithGoogle = async (
  email: string,
  displayName?: string
): Promise<JWTAuthResponse> => {
  try {
    console.log("Starting Google authentication with WordPress:", email);
    
    // Generate a username from email (remove special characters and domain)
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    
    // Prepare the request payload
    const payload = {
      email,
      name: displayName || username,
      username
    };

    console.log("Sending request to WordPress Google auth endpoint:", payload);
    
    // Send request to the custom Google endpoint from your plugin
    const response = await fetch(GOOGLE_AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("WordPress Google auth error:", errorData);
      throw new Error(errorData.message || "Authentication failed");
    }
    
    // Parse the response
    const data = await response.json();
    console.log("WordPress Google auth success:", data);
    
    // Store the token
    if (data.token) {
      storeAuthToken(data.token);
    }
    
    return data as JWTAuthResponse;
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

// This function is now redundant as the plugin handles registration automatically
// But we'll keep it for backward compatibility
export const registerWithGoogle = async (
  email: string,
  displayName?: string
): Promise<JWTAuthResponse> => {
  try {
    // Generate a username from email (remove special characters and domain)
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    
    // Call the Google register endpoint directly
    const response = await fetch(GOOGLE_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        email,
        name: displayName || username,
        username
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    
    const data = await response.json();
    
    // Store the token
    if (data.token) {
      storeAuthToken(data.token);
    }
    
    toast({
      title: "Registration Successful",
      description: "Your Google account has been registered with WordPress",
    });
    
    return data as JWTAuthResponse;
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

// New function to handle phone authentication with WordPress
export const loginWithPhone = async (phoneNumber: string): Promise<JWTAuthResponse> => {
  try {
    console.log(`Starting phone authentication with WordPress: ${phoneNumber}`);
    
    // Use the dynamic phone number in the payload
    const payload = {
      phone: phoneNumber
    };

    console.log("Sending request to WordPress phone auth endpoint:", payload);
    
    // Send request to the custom phone endpoint
    const response = await fetch(PHONE_AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("WordPress phone auth error:", errorData);
      throw new Error(errorData.message || "Authentication failed");
    }
    
    // Parse the response
    const data = await response.json();
    console.log("WordPress phone auth success:", data);
    
    // Store the token
    if (data.token) {
      storeAuthToken(data.token);
    }
    
    return data as JWTAuthResponse;
  } catch (error: any) {
    console.error("Phone login with WordPress error:", error);
    toast({
      title: "Login Failed",
      description: error.message || "Failed to authenticate with WordPress using phone",
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
