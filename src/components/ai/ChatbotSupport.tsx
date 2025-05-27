import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText, Send, X, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Quick suggestions for the chatbot
const quickSuggestions = [
  "How do I book a ground?",
  "How to register for a tournament?",
  "I need help with payment",
  "Cancel my booking",
  "What are the cricket ground rules?",
  "Find players near me",
  "KhelManch Pass benefits",
  "Upcoming tournaments"
];

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
};

// Enhanced response generator with learning capability
const generateResponse = (message: string, previousMessages: Message[]): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm SportyBot, your personal Khelmanch assistant! 🏏 I'm here to help you with anything related to sports, bookings, tournaments, and more. What can I help you with today?";
  }
  
  // Enhanced responses based on keywords
  if (lowerMessage.includes("book") && lowerMessage.includes("ground")) {
    return "🏟️ **Booking a Ground is Easy!**\n\n1. Go to **'Book a Venue'** section on the home page\n2. Filter by sport, location, and time\n3. Select your preferred ground\n4. Choose date & time slot\n5. Complete payment\n\n💡 **Pro Tip:** Book during off-peak hours for better rates! Need help finding the perfect ground?";
  }
  
  if ((lowerMessage.includes("register") || lowerMessage.includes("join")) && lowerMessage.includes("tournament")) {
    return "🏆 **Join Tournaments Like a Pro!**\n\n1. Browse **'Upcoming Tournaments'** section\n2. Filter by sport and skill level\n3. Check tournament details & prize pool\n4. Click **'Register Now'**\n5. Complete team formation if needed\n\n🎯 Current hot tournaments: Mumbai Cricket Premier League, City Football Championship! Which sport interests you?";
  }
  
  if (lowerMessage.includes("payment")) {
    return "💳 **Payment Made Simple!**\n\nWe accept:\n• Credit/Debit Cards\n• UPI (GPay, PhonePe, Paytm)\n• Net Banking\n• Wallets\n\n🔒 **100% Secure** with Razorpay\n🔄 **Easy Refunds** for cancellations 24hrs+ in advance\n\nHaving payment issues? I can guide you through step-by-step!";
  }
  
  if (lowerMessage.includes("cancel") && (lowerMessage.includes("booking") || lowerMessage.includes("reservation"))) {
    return "❌ **Cancel Booking Process:**\n\n1. Go to **'My Bookings'** in profile\n2. Select booking to cancel\n3. Click **'Cancel Booking'**\n4. Confirm cancellation\n\n⏰ **Cancellation Policy:**\n• 24+ hours: Full refund\n• 12-24 hours: 50% refund\n• <12 hours: No refund\n\nNeed immediate assistance? Contact support!";
  }
  
  if (lowerMessage.includes("khelmanch pass") || lowerMessage.includes("pass")) {
    return "🎫 **KhelManch Pass - Your Sports Superpower!**\n\n✨ **Benefits:**\n• 15% off all tournament entries\n• Priority booking\n• Exclusive tournaments\n• No booking fees\n• Free ground trials\n\n💰 **Only ₹199/month**\n\nIt pays for itself in just 2 bookings! Want to upgrade?";
  }
  
  if (lowerMessage.includes("cricket") && (lowerMessage.includes("rule") || lowerMessage.includes("regulation"))) {
    return "🏏 **Cricket Ground Rules:**\n\n⚖️ **Standard Rules Apply:**\n• Stumps provided by venue\n• Bring your own bat/pads\n• 6-ball overs\n• LBW decisions by mutual agreement\n\n🏟️ **Venue-Specific:**\n• Some grounds restrict helicopter shots\n• Ball retrieval policies vary\n• Check ground-specific rules in booking details\n\nWhich ground are you booking? I can share specific rules!";
  }
  
  if ((lowerMessage.includes("find") || lowerMessage.includes("search")) && lowerMessage.includes("player")) {
    return "👥 **Find Your Sports Squad!**\n\n1. Go to **'Community'** section\n2. Use **'Find Players'** feature\n3. Filter by:\n   • Sport type\n   • Skill level\n   • Location\n   • Availability\n\n📝 **Pro Tips:**\n• Create 'Looking for Players' posts\n• Join sport-specific groups\n• Check player ratings & reviews\n\nWhat sport are you looking to play?";
  }
  
  if (lowerMessage.includes("upcoming") && lowerMessage.includes("tournament")) {
    return "🗓️ **Hot Tournaments This Month!**\n\n🔥 **Trending Now:**\n• Mumbai Cricket Premier League (₹50k prize)\n• City Football Championship (₹75k prize)\n• Bangalore Tennis Open (₹25k prize)\n\n⚡ **Quick Registration** available\n🏆 **All skill levels** welcome\n\nWhich sport interests you? I can help you register instantly!";
  }
  
  // Learning from context
  if (previousMessages.length > 3) {
    const userMessages = previousMessages.filter(m => m.sender === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];
    if (lastUserMessage && lastUserMessage.text.includes("thanks")) {
      return "You're absolutely welcome! 🙌 I'm always here to help make your sports journey amazing. Is there anything else about Khelmanch you'd like to know? Happy playing! 🏆";
    }
  }
  
  // Default enhanced response
  return "🤖 **SportyBot at your service!** ⚡\n\nI'm your personal Khelmanch assistant and I can help you with:\n\n🏟️ Ground bookings\n🏆 Tournament registrations\n💳 Payment assistance\n👥 Finding players\n🎫 KhelManch Pass info\n📱 App navigation\n\nJust ask me anything about sports or use the quick suggestions below! What would you like to explore? 🚀";
};

export default function ChatbotSupport() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hey there, sports superstar! I'm **SportyBot**, your personal Khelmanch assistant! 🏏⚽🏀\n\nI'm here to help you dominate the sports arena! From booking grounds to joining tournaments, I've got you covered. What can I help you achieve today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Only show chatbot on home page
  const showChatbot = location.pathname === '/home' || location.pathname === '/';
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate bot thinking with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage, messages),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(suggestion, messages),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  // Format time for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Don't render if not on home page
  if (!showChatbot) {
    return null;
  }

  return (
    <>
      {/* Enhanced Chat button with pulsing effect */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <Button
            className="relative rounded-full h-16 w-16 shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-4 border-white"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquareText className="h-7 w-7 text-white" />
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Sparkles */}
            <motion.div
              className="absolute -top-1 -right-1 text-yellow-400"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}
      
      {/* Enhanced Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed right-4 ${isMinimized ? 'bottom-20 h-auto' : 'bottom-20 h-[500px]'} w-[380px] shadow-2xl z-50`}
          >
            <Card className="h-full flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 border-2 border-blue-200">
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                    <AvatarFallback className="bg-white text-blue-600 font-bold">SB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold">SportyBot</CardTitle>
                    <p className="text-xs opacity-90">Your Sports Assistant</p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimize} className="text-white hover:bg-white/20">
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8 mr-2 flex-shrink-0 self-end border border-blue-200">
                              <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">SB</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                : 'bg-white border border-blue-100 shadow-sm'
                            }`}
                          >
                            <div className="text-sm whitespace-pre-wrap">
                              {message.text}
                            </div>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === 'user'
                                  ? 'text-white/70'
                                  : 'text-gray-500'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0 border border-blue-200">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">SB</AvatarFallback>
                        </Avatar>
                        <div className="bg-white border border-blue-100 shadow-sm p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  {/* Quick suggestions - only show for first message */}
                  {messages.length === 1 && (
                    <div className="px-4 py-2 border-t bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2 font-medium">⚡ Quick Actions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickSuggestions.slice(0, 4).map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 h-auto text-left hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <CardFooter className="p-3 pt-0 border-t bg-white">
                    <div className="flex w-full space-x-2">
                      <Input
                        placeholder="Ask SportyBot anything..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border-blue-200 focus:border-blue-400"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ""}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
