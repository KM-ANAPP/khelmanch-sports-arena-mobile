
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  message: string;
  suggestions?: string[];
}

class AIChatService {
  private baseURL = 'https://api.openai.com/v1/chat/completions';
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async sendMessage(message: string, context: ChatMessage[] = []): Promise<AIResponse> {
    if (!this.apiKey) {
      return this.getFallbackResponse(message);
    }

    try {
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `You are SportyBot, a helpful AI assistant for KHELMANCH - a sports venue booking and community app. 
          
          You help users with:
          - Venue booking and availability
          - Tournament registration and information
          - Sports community features
          - Payment and booking issues
          - App navigation and features
          - KhelManch Pass benefits
          - Finding players and organizing games
          
          Be friendly, concise, and sports-focused. Always provide actionable advice.
          Keep responses under 200 words unless complex explanations are needed.`
        },
        ...context.slice(-5), // Keep last 5 messages for context
        { role: 'user', content: message }
      ];

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 300,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || 'Sorry, I encountered an error. Please try again.';
      
      return {
        message: aiMessage,
        suggestions: this.generateSuggestions(message, aiMessage)
      };
    } catch (error) {
      console.error('AI Chat Service Error:', error);
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): AIResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('book') && lowerMessage.includes('venue')) {
      return {
        message: "🏟️ To book a venue, go to the 'Book Venue' section, select your sport, choose location and time, then complete the booking. Need help with a specific venue?",
        suggestions: ['Show available cricket grounds', 'Find football venues near me', 'Check venue pricing']
      };
    }
    
    if (lowerMessage.includes('tournament')) {
      return {
        message: "🏆 Check out our tournaments section! You can register for upcoming tournaments, view brackets, and track your progress. Which sport tournament interests you?",
        suggestions: ['Upcoming cricket tournaments', 'Register for football league', 'Tournament prize details']
      };
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('price')) {
      return {
        message: "💳 We accept all major payment methods including UPI, cards, and wallets. All payments are secure via Razorpay. Having a specific payment issue?",
        suggestions: ['Refund policy', 'Payment failed help', 'KhelManch Pass pricing']
      };
    }
    
    if (lowerMessage.includes('pass') || lowerMessage.includes('subscription')) {
      return {
        message: "🎫 KhelManch Pass gives you 15% off tournaments, priority booking, exclusive events, and no booking fees! Only ₹199/month. Want to upgrade?",
        suggestions: ['Pass benefits details', 'Upgrade to Pass', 'Cancel subscription']
      };
    }
    
    return {
      message: "👋 Hi! I'm SportyBot, your KHELMANCH assistant. I can help you with venue bookings, tournaments, payments, finding players, and app features. What can I help you with?",
      suggestions: ['Book a venue', 'Find tournaments', 'Join community', 'KhelManch Pass info']
    };
  }

  private generateSuggestions(userMessage: string, aiResponse: string): string[] {
    const suggestions = [
      'How to book a ground?',
      'Find players near me',
      'Upcoming tournaments',
      'Payment help',
      'KhelManch Pass benefits',
      'Cancel booking'
    ];
    
    return suggestions.slice(0, 3);
  }
}

export const aiChatService = new AIChatService();
