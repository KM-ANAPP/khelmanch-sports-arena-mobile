
interface WordPressRegistrationData {
  name: string;
  phone?: string;
  email?: string;
  sports: string[];
  skillLevels: Record<string, string>;
}

class WordPressService {
  private static instance: WordPressService;
  private apiBaseUrl = "https://your-wordpress-site.com/wp-json/wp/v2"; // Replace with your WordPress site URL
  
  private constructor() {}

  public static getInstance(): WordPressService {
    if (!WordPressService.instance) {
      WordPressService.instance = new WordPressService();
    }
    return WordPressService.instance;
  }

  public async registerUser(userData: WordPressRegistrationData): Promise<any> {
    try {
      // For WordPress registration, you'll need a custom endpoint or plugin
      // This is a placeholder implementation
      const response = await fetch(`${this.apiBaseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You might need authentication headers here
        },
        body: JSON.stringify({
          username: userData.name.toLowerCase().replace(/\s+/g, ''),
          name: userData.name,
          email: userData.email,
          password: 'temporary_password', // You should generate a secure password
          meta: {
            phone: userData.phone,
            sports: userData.sports,
            skill_levels: userData.skillLevels
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  public async loginUser(username: string, password: string): Promise<any> {
    try {
      // WordPress authentication endpoint (requires JWT or similar plugin)
      const response = await fetch(`${this.apiBaseUrl}/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("User logged in successfully:", data);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}

export default WordPressService.getInstance();
