
import { firestoreService } from "./firestoreService";
import { InputValidator } from "@/utils/inputValidation";

interface ReportData {
  messageId: string;
  senderId: string;
  reason: string;
  description: string;
}

interface BlockedUser {
  id: string;
  blockedAt: Date;
  reason?: string;
}

class SecurityService {
  private blockedUsers = new Set<string>();
  private reportedMessages = new Set<string>();

  // Block/unblock users
  blockUser(userId: string, reason?: string) {
    this.blockedUsers.add(userId);
    
    // Store in localStorage for persistence
    const blocked = this.getBlockedUsers();
    blocked.push({ id: userId, blockedAt: new Date(), reason });
    localStorage.setItem('blocked_users', JSON.stringify(blocked));
    
    console.log(`User ${userId} has been blocked`);
  }

  unblockUser(userId: string) {
    this.blockedUsers.delete(userId);
    
    // Update localStorage
    const blocked = this.getBlockedUsers().filter(user => user.id !== userId);
    localStorage.setItem('blocked_users', JSON.stringify(blocked));
    
    console.log(`User ${userId} has been unblocked`);
  }

  isUserBlocked(userId: string): boolean {
    return this.blockedUsers.has(userId);
  }

  getBlockedUsers(): BlockedUser[] {
    try {
      const stored = localStorage.getItem('blocked_users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Initialize blocked users from storage
  initializeBlockedUsers() {
    const blocked = this.getBlockedUsers();
    blocked.forEach(user => this.blockedUsers.add(user.id));
  }

  // Report message
  async reportMessage(reportData: ReportData): Promise<void> {
    try {
      // Validate report data
      if (!reportData.messageId || !reportData.senderId || !reportData.reason) {
        throw new Error('Invalid report data');
      }

      // Mark message as reported locally
      this.reportedMessages.add(reportData.messageId);

      // In a real app, this would be sent to a moderation system
      // For now, we'll log it and store locally
      const reports = this.getReports();
      reports.push({
        ...reportData,
        reportedAt: new Date(),
        id: `report_${Date.now()}`
      });
      
      localStorage.setItem('message_reports', JSON.stringify(reports));
      
      console.log('Message reported:', reportData);
      
      // Auto-block if multiple reports (in real app, this would be server-side)
      const userReports = reports.filter(r => r.senderId === reportData.senderId);
      if (userReports.length >= 3) {
        this.blockUser(reportData.senderId, 'Multiple reports');
      }
    } catch (error) {
      console.error('Error reporting message:', error);
      throw error;
    }
  }

  private getReports() {
    try {
      const stored = localStorage.getItem('message_reports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Validate message before sending
  validateMessage(text: string, userId: string): { isValid: boolean; error?: string } {
    // Check rate limiting
    if (!InputValidator.rateLimit.canSendMessage(userId)) {
      return { isValid: false, error: 'Too many messages. Please wait.' };
    }

    // Validate message content
    return InputValidator.validateMessageText(text);
  }

  // Check if user is blocked before allowing message display
  shouldDisplayMessage(senderId: string, messageId: string): boolean {
    return !this.isUserBlocked(senderId) && !this.reportedMessages.has(messageId);
  }

  // Sanitize user input
  sanitizeInput(input: string): string {
    return InputValidator.sanitizeText(input);
  }
}

export const securityService = new SecurityService();

// Initialize on app start
securityService.initializeBlockedUsers();
