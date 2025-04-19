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

// Mock conversation data
const mockConversations = [
  {
    id: "conv1",
    otherUser: {
      id: "user1",
      name: "Rahul Singh",
      avatar: null,
    },
    lastMessage: {
      text: "Are you joining the match tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: "conv2",
    otherUser: {
      id: "user2",
      name: "Victory Ground Manager",
      avatar: null,
    },
    lastMessage: {
      text: "Your booking for April 25th is confirmed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    otherUser: {
      id: "team1",
      name: "Thunder Strikers Group",
      avatar: null,
      isGroup: true,
    },
    lastMessage: {
      text: "Practice session at 6 PM today",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
    },
    unreadCount: 0,
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: "msg1",
    senderId: "user1",
    text: "Hi there! Are you joining the match tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "msg2",
    senderId: "currentUser",
    text: "Yes, I'm planning to come. What time is it again?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: "msg3",
    senderId: "user1",
    text: "Great! It's at 4 PM at Victory Cricket Ground.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: "msg4",
    senderId: "user1",
    text: "Don't forget to bring your equipment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 19),
  },
  {
    id: "msg5",
    senderId: "currentUser",
    text: "Perfect, I'll be there. Thanks for the reminder!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

const formatTime = (date: Date) => {
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
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const filteredConversations = conversations.filter(conv => 
    conv.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Add new message to the conversation
    const newMsg = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Update the conversation with the last message
    setConversations(
      conversations.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              lastMessage: { 
                text: newMessage, 
                timestamp: new Date(), 
                isRead: true 
              },
              unreadCount: 0
            } 
          : conv
      )
    );
    
    toast("Message sent");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleConversationClick = (convId: string) => {
    setSelectedConversation(convId);
    
    // Mark as read
    setConversations(
      conversations.map(conv => 
        conv.id === convId 
          ? { ...conv, unreadCount: 0 } 
          : conv
      )
    );
  };
  
  const getConversationTitle = () => {
    const conversation = conversations.find(c => c.id === selectedConversation);
    return conversation ? conversation.otherUser.name : "";
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inbox">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
                    className={`cursor-pointer hover:bg-accent/50 transition-colors ${conv.unreadCount > 0 ? 'border-l-4 border-l-primary' : ''}`}
                    onClick={() => handleConversationClick(conv.id)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {conv.otherUser.isGroup ? (
                              <User className="h-5 w-5" />
                            ) : (
                              conv.otherUser.name.substring(0, 2).toUpperCase()
                            )}
                          </AvatarFallback>
                          {conv.otherUser.avatar && (
                            <AvatarImage src={conv.otherUser.avatar} alt={conv.otherUser.name} />
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {conv.otherUser.name}
                            {conv.unreadCount > 0 && (
                              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {conv.lastMessage.text}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(conv.lastMessage.timestamp)}
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
                    <CardTitle className="text-base">{getConversationTitle()}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-2 mb-2">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.senderId === 'currentUser' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${
                        msg.senderId === 'currentUser' 
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
            <NotificationItem 
              title="Booking Confirmed" 
              description="Your booking at Victory Cricket Ground for April 25th is confirmed."
              time="2 hours ago"
              type="booking"
            />
            <NotificationItem 
              title="New Tournament" 
              description="Mumbai Cricket League registrations are now open!"
              time="Yesterday"
              type="tournament"
            />
            <NotificationItem 
              title="Payment Successful" 
              description="Payment of ₹2,400 for ground booking was successful."
              time="3 days ago"
              type="payment"
            />
            <NotificationItem 
              title="Team Invitation" 
              description="Rahul Singh has invited you to join Thunder Strikers team."
              time="1 week ago"
              type="team"
            />
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
      icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
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
