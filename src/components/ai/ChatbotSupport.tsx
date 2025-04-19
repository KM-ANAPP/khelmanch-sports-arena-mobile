
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquareText, Send, X, Minimize2, Maximize2 } from "lucide-react";

// Quick suggestions for the chatbot
const quickSuggestions = [
  "How do I book a ground?",
  "How to register for a tournament?",
  "I need help with payment",
  "Cancel my booking",
  "What are the cricket ground rules?",
  "Find players near me"
];

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Simple response generator function
const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Basic responses based on keywords
  if (lowerMessage.includes("book") && lowerMessage.includes("ground")) {
    return "To book a ground, go to the 'Ground Booking' section from the main menu. You can filter grounds by location, sport type, and availability. Once you find a suitable ground, select your preferred time slot and proceed to payment.";
  }
  
  if ((lowerMessage.includes("register") || lowerMessage.includes("join")) && lowerMessage.includes("tournament")) {
    return "To register for a tournament, navigate to the 'Tournaments' section, find a tournament you're interested in, and click on 'Register'. You can either join as an individual player or create/join a team. Make sure to check the tournament eligibility requirements before registering.";
  }
  
  if (lowerMessage.includes("payment")) {
    return "We support multiple payment methods including credit/debit cards, UPI, and wallets. If you're having issues with payment, please check if your payment method is working properly or try an alternative method. For refunds, you can cancel your booking at least 24 hours in advance.";
  }
  
  if (lowerMessage.includes("cancel") && (lowerMessage.includes("booking") || lowerMessage.includes("reservation"))) {
    return "You can cancel your booking from the 'My Bookings' section. Select the booking you wish to cancel and click on 'Cancel Booking'. Please note that cancellations made less than 24 hours before the scheduled time may incur a cancellation fee as per our policy.";
  }
  
  if (lowerMessage.includes("cricket") && (lowerMessage.includes("rule") || lowerMessage.includes("regulation"))) {
    return "Cricket grounds typically follow standard cricket rules. Some venue-specific rules may include restrictions on certain shots for safety, ball retrieval policies, and equipment handling guidelines. You can view the complete rules for a specific ground on its details page.";
  }
  
  if ((lowerMessage.includes("find") || lowerMessage.includes("search")) && lowerMessage.includes("player")) {
    return "To find players near you, go to the 'Community' section and use the 'Find Players' feature. You can filter players by sport, skill level, and location. You can also create a 'Looking for Players' post for your upcoming matches or practice sessions.";
  }
  
  // Default response
  return "I'm here to help you with ground bookings, tournament registrations, payment issues, and finding players. Please let me know what specific information you're looking for, or you can select one of the suggested queries.";
};

export default function ChatbotSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm your Khelmanch Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
    
    // Simulate bot thinking with a small delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        text: suggestion,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
    
    // Simulate bot thinking with a small delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(suggestion),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  // Format time for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button
          className="fixed bottom-16 right-4 rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquareText className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <Card className={`fixed right-4 ${isMinimized ? 'bottom-16 h-auto' : 'bottom-16 h-[450px]'} w-[350px] shadow-xl flex flex-col transition-all duration-300 z-50`}>
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <CardTitle className="text-base">Khelmanch Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0 self-end">
                        <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                        <AvatarFallback>KM</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === 'user'
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              
              {messages.length === 1 && (
                <div className="px-4 py-2">
                  <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.slice(0, 3).map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        className="text-xs py-1 h-auto"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quickSuggestions.slice(3).map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        className="text-xs py-1 h-auto"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <CardFooter className="p-3 pt-0 border-t">
                <div className="flex w-full space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ""}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
}
