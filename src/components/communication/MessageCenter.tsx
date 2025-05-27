
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare, Send, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { firestoreService, Chat, ChatMessage, ConnectionRequest } from "@/services/firestoreService";

const formatTime = (timestamp: any) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // If less than 24 hours, show time
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If less than 7 days, show day
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }
  
  // Otherwise show date
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default function MessageCenter() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inbox");
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
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
      toast("Failed to load conversations");
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
    // Filter based on search term - you might want to enhance this
    // to search through participant names when you have user data
    return conv.lastMessage?.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
           searchTerm === '';
  });
  
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedConversation || !user?.id) return;
    
    try {
      await firestoreService.sendMessage(selectedConversation, user.id, newMessage);
      setNewMessage("");
      toast("Message sent");
    } catch (error) {
      console.error('Error sending message:', error);
      toast("Failed to send message");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleConversationClick = (convId: string) => {
    setSelectedConversation(convId);
  };
  
  const handleAcceptConnectionRequest = async (requestId: string) => {
    try {
      await firestoreService.respondToConnectionRequest(requestId, 'accepted');
      toast("Connection request accepted");
      loadConnectionRequests(); // Reload requests
      loadUserChats(); // Reload chats as new chat might be created
    } catch (error) {
      console.error('Error accepting connection request:', error);
      toast("Failed to accept connection request");
    }
  };
  
  const handleRejectConnectionRequest = async (requestId: string) => {
    try {
      await firestoreService.respondToConnectionRequest(requestId, 'rejected');
      toast("Connection request rejected");
      loadConnectionRequests(); // Reload requests
    } catch (error) {
      console.error('Error rejecting connection request:', error);
      toast("Failed to reject connection request");
    }
  };
  
  const getConversationTitle = (conversation: Chat) => {
    // Get the other participant's ID (not the current user)
    const otherParticipant = conversation.participants.find(p => p !== user?.id);
    return otherParticipant || "Unknown User";
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inbox">
            Messages
            {conversations.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {conversations.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Requests
            {connectionRequests.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {connectionRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="flex flex-col h-full">
          {!selectedConversation ? (
            <div className="space-y-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {filteredConversations.map((conv) => (
                  <Card 
                    key={conv.id} 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleConversationClick(conv.id)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {getConversationTitle(conv).substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
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
                ))}
                
                {filteredConversations.length === 0 && (
                  <div className="text-center p-4">
                    <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground mt-2">No conversations found</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <Card className="mb-2">
                <CardHeader className="p-3 flex-row items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                      <span className="sr-only">Back</span>
                    </Button>
                    <CardTitle className="text-base">
                      {conversations.find(c => c.id === selectedConversation) && 
                       getConversationTitle(conversations.find(c => c.id === selectedConversation)!)}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-2 mb-2">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.senderId === user?.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${
                        msg.senderId === user?.id 
                          ? 'text-primary-foreground/70' 
                          : 'text-accent-foreground/70'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2 p-2">
                <Input 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ""}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="notifications" className="h-full">
          <div className="space-y-2">
            <h3 className="font-semibold mb-3">Connection Requests</h3>
            
            {connectionRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
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
                      <Button
                        size="sm"
                        onClick={() => handleAcceptConnectionRequest(request.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectConnectionRequest(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {connectionRequests.length === 0 && (
              <div className="text-center p-8">
                <User className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground mt-2">No connection requests</p>
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
      <CardContent className="p-3 flex items-start space-x-3">
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
