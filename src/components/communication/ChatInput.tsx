
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled = false, placeholder = "Type your message..." }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <motion.div 
      className={`p-4 border-t bg-background/80 backdrop-blur-sm transition-all duration-200 ${
        isFocused ? 'border-primary/50' : 'border-border'
      }`}
      animate={{ y: 0 }}
      initial={{ y: 10 }}
    >
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[44px] max-h-[120px] resize-none rounded-2xl border-muted bg-muted/50 px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
            style={{ height: 'auto' }}
            maxLength={1000}
          />
          
          <div className="absolute right-3 bottom-3 flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              disabled={disabled}
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="icon"
            className="h-11 w-11 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-2 px-1">
        {message.length}/1000 characters
      </div>
    </motion.div>
  );
}
