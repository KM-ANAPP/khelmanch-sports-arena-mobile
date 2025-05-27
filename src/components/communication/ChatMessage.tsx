
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Flag, Copy, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/services/firestoreService';
import MessageReporting from './MessageReporting';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
  onReport?: (data: any) => Promise<void>;
  onDelete?: (messageId: string) => void;
}

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

export function ChatMessage({ message, isOwn, onReport, onDelete }: ChatMessageProps) {
  const [showReporting, setShowReporting] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-end space-x-2 max-w-[80%] ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && (
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {message.senderId.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className="group relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-2 rounded-2xl relative ${
              isOwn 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/80 backdrop-blur-sm text-foreground'
            }`}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
            
            <div className={`flex items-center justify-between mt-1 gap-2 ${
              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              <span className="text-xs">{formatTime(message.timestamp)}</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isOwn ? 'hover:bg-primary-foreground/20' : 'hover:bg-muted'
                    }`}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="h-3 w-3 mr-2" />
                    Copy
                  </DropdownMenuItem>
                  {!isOwn && onReport && (
                    <DropdownMenuItem onClick={() => setShowReporting(true)}>
                      <Flag className="h-3 w-3 mr-2" />
                      Report
                    </DropdownMenuItem>
                  )}
                  {isOwn && onDelete && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(message.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        </div>
      </div>
      
      {showReporting && onReport && (
        <MessageReporting
          messageId={message.id}
          senderId={message.senderId}
          onReport={onReport}
        />
      )}
    </motion.div>
  );
}
