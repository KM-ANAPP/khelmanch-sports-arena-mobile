
import { loginWithCredentials, loginWithGoogle, loginWithPhone, registerUser } from '@/utils/wordpress-auth';

interface RegisterUserData {
  name: string;
  phone?: string;
  email?: string;
  sports: string[];
  skillLevels: Record<string, string>;
}

class WordPressService {
  async registerUser(userData: RegisterUserData) {
    try {
      // For now, we'll use a simple registration flow
      // In a real implementation, this would integrate with WordPress user creation
      console.log('Registering user with WordPress:', userData);
      
      // Generate a username from name or email
      const username = userData.email 
        ? userData.email.split('@')[0] 
        : userData.name.toLowerCase().replace(/\s+/g, '');
      
      // For demo purposes, we'll simulate a successful registration
      // In production, this should create a user in WordPress
      return {
        success: true,
        user: {
          id: Date.now().toString(),
          username,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          sports: userData.sports,
          skillLevels: userData.skillLevels
        }
      };
    } catch (error) {
      console.error('WordPress registration error:', error);
      throw new Error('Failed to register user with WordPress');
    }
  }

  async loginWithCredentials(username: string, password: string) {
    return loginWithCredentials(username, password);
  }

  async loginWithGoogle(email: string, displayName?: string) {
    return loginWithGoogle(email, displayName);
  }

  async loginWithPhone(phoneNumber: string) {
    return loginWithPhone(phoneNumber);
  }
}

const wordpressService = new WordPressService();
export default wordpressService;
