
export class InputValidator {
  private static readonly MAX_MESSAGE_LENGTH = 1000;
  private static readonly MAX_NAME_LENGTH = 100;
  private static readonly MAX_EMAIL_LENGTH = 254;
  
  // HTML/Script injection prevention
  static sanitizeText(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
      .substring(0, this.MAX_MESSAGE_LENGTH);
  }
  
  static validateEmail(email: string): boolean {
    if (!email || email.length > this.MAX_EMAIL_LENGTH) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePhoneNumber(phone: string): boolean {
    if (!phone) return false;
    
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indian phone number (10 digits)
    return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
  }
  
  static validateMessageText(text: string): { isValid: boolean; error?: string } {
    if (!text || typeof text !== 'string') {
      return { isValid: false, error: 'Message cannot be empty' };
    }
    
    const sanitized = this.sanitizeText(text);
    
    if (sanitized.length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }
    
    if (sanitized.length > this.MAX_MESSAGE_LENGTH) {
      return { isValid: false, error: `Message too long (max ${this.MAX_MESSAGE_LENGTH} characters)` };
    }
    
    // Check for spam patterns
    if (this.containsSpam(sanitized)) {
      return { isValid: false, error: 'Message contains inappropriate content' };
    }
    
    return { isValid: true };
  }
  
  static validateName(name: string): boolean {
    if (!name || typeof name !== 'string') return false;
    
    const sanitized = this.sanitizeText(name);
    return sanitized.length > 0 && sanitized.length <= this.MAX_NAME_LENGTH;
  }
  
  private static containsSpam(text: string): boolean {
    const spamPatterns = [
      /(.)\1{4,}/i, // Repeated characters (5+ times)
      /\b(free|win|prize|lottery|urgent|click here|buy now)\b/gi,
      /(https?:\/\/[^\s]+)/gi, // URLs (could be suspicious)
    ];
    
    return spamPatterns.some(pattern => pattern.test(text));
  }
  
  static rateLimit = {
    messagesSent: new Map<string, number[]>(),
    
    canSendMessage(userId: string): boolean {
      const now = Date.now();
      const userMessages = this.messagesSent.get(userId) || [];
      
      // Remove messages older than 1 minute
      const recentMessages = userMessages.filter(time => now - time < 60000);
      
      // Limit: 10 messages per minute
      if (recentMessages.length >= 10) {
        return false;
      }
      
      recentMessages.push(now);
      this.messagesSent.set(userId, recentMessages);
      return true;
    }
  };
}
