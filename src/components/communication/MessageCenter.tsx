import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare, Search, MoreVertical, UserX, ArrowLeft } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { firestoreService, Chat, ChatMessage, ConnectionRequest } from "@/services/firestoreService";
import { securityService } from "@/services/securityService";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { EmptyBookingState } from "@/components/booking/EmptyBookingState";
import { LoadingShimmer } from "@/components/ui/loading-shimmer";
import { motion, AnimatePresence } from "framer-motion";

const formatTime = (timestamp: any) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default function MessageCenter() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inbox");
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadUserChats();
    loadConnectionRequests();
  }, [isAuthenticated, navigate, user]);
  
  // Subscribe to messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation || !user) return;
    
    const unsubscribe = firestoreService.subscribeToMessages(
      selectedConversation,
      (newMessages) => {
        setMessages(newMessages);
      }
    );
    
    return () => unsubscribe();
  }, [selectedConversation, user]);
  
  const loadUserChats = async () => {
    if (!user?.id) return;
    
    try {
      const userChats = await firestoreService.getUserChats(user.id);
      setConversations(userChats);
    } catch (error) {
      console.error('Error loading chats:', error);
      toast({ title: "Failed to load conversations", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const loadConnectionRequests = async () => {
    if (!user?.id) return;
    
    try {
      const requests = await firestoreService.getUserConnectionRequests(user.id);
      setConnectionRequests(requests);
    } catch (error) {
      console.error('Error loading connection requests:', error);
    }
  };
  
  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(p => p !== user?.id);
    
    if (otherParticipant && securityService.isUserBlocked(otherParticipant)) {
      return false;
    }
    
    return conv.lastMessage?.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
           searchTerm === '';
  });
  
  const handleSendMessage = async (text: string) => {
    if (!selectedConversation || !user?.id) return;
    
    const validation = securityService.validateMessage(text, user.id);
    if (!validation.isValid) {
      toast({ title: validation.error || "Invalid message", variant: "destructive" });
      return;
    }
    
    const sanitizedMessage = securityService.sanitizeInput(text);
    
    setSendingMessage(true);
    try {
      await firestoreService.sendMessage(selectedConversation, user.id, sanitizedMessage);
      toast({ title: "Message sent" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: "Failed to send message", variant: "destructive" });
    } finally {
      setSendingMessage(false);
    }
  };
  
  const handleReportMessage = async (reportData: any) => {
    try {
      await securityService.reportMessage(reportData);
      toast({ title: "Message reported successfully" });
    } catch (error) {
      console.error('Error reporting message:', error);
      toast({ title: "Failed to report message", variant: "destructive" });
    }
  };
  
  const handleBlockUser = (userId: string) => {
    securityService.blockUser(userId, 'User blocked via chat');
    toast({ title: "User has been blocked" });
    loadUserChats();
  };
  
  const handleConversationClick = (convId: string) => {
    setSelectedConversation(convId);
  };
  
  const handleAcceptConnectionRequest = async (requestId: string) => {
    try {
      await firestoreService.respondToConnectionRequest(requestId, 'accepted');
      toast({ title: "Connection request accepted" });
      loadConnectionRequests();
      loadUserChats();
    } catch (error) {
      console.error('Error accepting connection request:', error);
      toast({ title: "Failed to accept connection request", variant: "destructive" });
    }
  };
  
  const handleRejectConnectionRequest = async (requestId: string) => {
    try {
      await firestoreService.respondToConnectionRequest(requestId, 'rejected');
      toast({ title: "Connection request rejected" });
      loadConnectionRequests();
    } catch (error) {
      console.error('Error rejecting connection request:', error);
      toast({ title: "Failed to reject connection request", variant: "destructive" });
    }
  };
  
  const getConversationTitle = (conversation: Chat) => {
    const otherParticipant = conversation.participants.find(p => p !== user?.id);
    return otherParticipant || "Unknown User";
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="inbox" className="relative">
            Messages
            {conversations.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5"
              >
                {conversations.length}
              </motion.span>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Requests
            {connectionRequests.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5"
              >
                {connectionRequests.length}
              </motion.span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="flex flex-col h-full flex-1">
          <AnimatePresence mode="wait">
            {!selectedConversation ? (
              <motion.div
                key="conversation-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 flex-1"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-10 rounded-xl bg-muted/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  {filteredConversations.map((conv, index) => (
                    <motion.div
                      key={conv.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
                        onClick={() => handleConversationClick(conv.id)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {getConversationTitle(conv).substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-foreground">
                                {getConversationTitle(conv)}
                              </div>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {conv.lastMessage?.text || "No messages yet"}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {conv.lastMessage?.timestamp && formatTime(conv.lastMessage.timestamp)}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {filteredConversations.length === 0 && (
                    <div className="text-center p-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No conversations found</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chat-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full"
              >
                <Card className="mb-4">
                  <CardHeader className="p-4 flex-row items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedConversation(null)}
                        className="rounded-full"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <CardTitle className="text-lg">
                        {conversations.find(c => c.id === selectedConversation) && 
                         getConversationTitle(conversations.find(c => c.id === selectedConversation)!)}
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => {
                            const conv = conversations.find(c => c.id === selectedConversation);
                            const otherUser = conv?.participants.find(p => p !== user?.id);
                            if (otherUser) handleBlockUser(otherUser);
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                </Card>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {messages
                    .filter(msg => securityService.shouldDisplayMessage(msg.senderId, msg.id))
                    .map((msg) => (
                    <ChatMessageComponent
                      key={msg.id}
                      message={msg}
                      isOwn={msg.senderId === user?.id}
                      onReport={handleReportMessage}
                    />
                  ))}
                </div>
                
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={sendingMessage}
                  placeholder="Type your message..."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="notifications" className="h-full">
          <div className="space-y-4 p-4">
            <h3 className="font-semibold text-lg">Connection Requests</h3>
            
            {connectionRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {request.senderId.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Connection Request</p>
                          <p className="text-sm text-muted-foreground">
                            From: {request.senderId}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(request.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptConnectionRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectConnectionRequest(request.id)}
                          >
                            Reject
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {connectionRequests.length === 0 && (
              <div className="text-center p-8">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No connection requests</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  type: 'booking' | 'tournament' | 'payment' | 'team';
}

const NotificationItem = ({ title, description, time, type }: NotificationItemProps) => {
  let icon;
  
  switch (type) {
    case 'booking':
      icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-check h-4 w-4"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>;
      break;
    case 'tournament':
      icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy h-4 w-4"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
      break;
    case 'payment':
      icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card h-4 w-4"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
      break;
    case 'team':
      icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 1 0 7.75"/><path d="M14 3.13a4 4 0 0 1 0 7.75"/></svg>;
      break;
  }
  
  return (
    <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
      <CardContent className="p-4 flex items-start space-x-3">
        <div className="bg-muted p-2 rounded-full">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
};
