
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText, Send, X, Minimize2, Maximize2, Sparkles, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiChatService } from "@/services/aiChatService";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
};

export default function ChatbotSupport() {
  const location = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hey there! I'm **SportyBot**, your AI-powered KHELMANCH assistant! 🏏⚽🏀\n\nI can help you with bookings, tournaments, payments, finding players, and much more. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Book a venue', 'Find tournaments', 'Join community', 'Payment help']
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const showChatbot = location.pathname === '/home' || location.pathname === '/';
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      aiChatService.setApiKey(apiKey.trim());
      setShowApiKeyInput(false);
      toast({
        title: "API Key Set",
        description: "AI chatbot is now powered by GPT! Ask me anything.",
      });
    }
  };
  
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (textToSend === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      const contextMessages = messages.slice(-4).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));
      
      const response = await aiChatService.sendMessage(textToSend, contextMessages);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble right now. Please try again or contact our support team.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!showChatbot) {
    return null;
  }

  return (
    <>
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
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
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
                    <AvatarFallback className="bg-white text-blue-600 font-bold">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold">SportyBot AI</CardTitle>
                    <p className="text-xs opacity-90">Powered by GPT</p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)} 
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
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
                  {showApiKeyInput && (
                    <div className="p-4 bg-blue-50 border-b">
                      <p className="text-sm text-gray-600 mb-2">Enter OpenAI API Key for enhanced AI responses:</p>
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          placeholder="sk-..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleApiKeySubmit} size="sm">Set</Button>
                      </div>
                    </div>
                  )}
                  
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
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AI</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className="max-w-[80%]">
                            <div
                              className={`p-3 rounded-2xl ${
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
                            
                            {message.suggestions && message.sender === 'bot' && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-6 px-2 hover:bg-blue-50"
                                    onClick={() => handleSendMessage(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0 border border-blue-200">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-white border border-blue-100 shadow-sm p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
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
                        onClick={() => handleSendMessage()}
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
