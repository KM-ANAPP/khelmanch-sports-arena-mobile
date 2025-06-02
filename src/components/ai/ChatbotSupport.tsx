
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText, Send, X, Minimize2, Maximize2, Bot, Settings, User } from "lucide-react";
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
      text: "Hello! I'm **SportyBot**, your intelligent KHELMANCH assistant! 🚀\n\nI'm here to help you with:\n• Venue bookings & availability\n• Tournament information\n• Payment assistance\n• Finding teammates\n• App navigation\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Book a venue', 'Find tournaments', 'Payment help', 'Join community']
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
        title: "✅ API Key Connected",
        description: "AI chatbot is now powered by GPT! Enhanced responses enabled.",
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
        text: "I'm experiencing some technical difficulties. Please try again in a moment or contact our support team for immediate assistance.",
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
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <Button
            className="relative rounded-full h-16 w-16 shadow-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 border-4 border-white dark:border-gray-800 transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquareText className="h-7 w-7 text-white drop-shadow-lg" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-75"
              animate={{ scale: [1, 1.2, 1], opacity: [0.75, 0.5, 0.75] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </Button>
        </motion.div>
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className={`fixed right-4 ${isMinimized ? 'bottom-20 h-auto' : 'bottom-20 h-[520px]'} w-[400px] shadow-2xl z-50`}
          >
            <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden backdrop-blur-xl">
              <CardHeader className="px-5 py-4 flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-11 w-11 border-3 border-white shadow-lg">
                      <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-bold">
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">SportyBot</CardTitle>
                    <p className="text-sm opacity-90 font-medium">AI Assistant • Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)} 
                    className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleMinimize} 
                    className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)} 
                    className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {!isMinimized && (
                <>
                  {showApiKeyInput && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Enhanced AI Mode</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Connect your OpenAI API key for advanced responses:</p>
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          placeholder="sk-..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="flex-1 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                        />
                        <Button 
                          onClick={handleApiKeySubmit} 
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4"
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8 mr-3 flex-shrink-0 self-end border-2 border-white shadow-md">
                              <AvatarImage src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" />
                              <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white text-xs">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className="max-w-[80%]">
                            <div
                              className={`p-4 rounded-2xl shadow-sm ${
                                message.sender === 'user'
                                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ml-2'
                                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                {message.text}
                              </div>
                              <div
                                className={`text-xs mt-2 flex items-center space-x-1 ${
                                  message.sender === 'user'
                                    ? 'text-white/80'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                              >
                                {message.sender === 'user' ? (
                                  <User className="h-3 w-3" />
                                ) : (
                                  <Bot className="h-3 w-3" />
                                )}
                                <span>{formatTime(message.timestamp)}</span>
                              </div>
                            </div>
                            
                            {message.suggestions && message.sender === 'bot' && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-8 px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
                                    onClick={() => handleSendMessage(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {message.sender === 'user' && (
                            <Avatar className="h-8 w-8 ml-3 flex-shrink-0 self-end border-2 border-white shadow-md">
                              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <Avatar className="h-8 w-8 mr-3 flex-shrink-0 border-2 border-white shadow-md">
                          <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white text-xs">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm p-4 rounded-2xl">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-indigo-500 rounded-full"
                                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex w-full space-x-3">
                      <Input
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800"
                      />
                      <Button
                        size="icon"
                        onClick={() => handleSendMessage()}
                        disabled={inputMessage.trim() === ""}
                        className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl w-12 h-12 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <Send className="h-5 w-5" />
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
