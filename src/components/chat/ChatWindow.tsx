import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage as ChatMessageType } from '../../hooks/useChat';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
}

export function ChatWindow({ messages, isStreaming }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-bg-elevated scrollbar-track-bg-border"
    >
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-16 h-16 rounded-full bg-accent-primary/10 flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">Hi! I'm LearnBot</h3>
          <p className="text-sm text-text-secondary">
            Ask me anything about courses, roadmaps, or learning paths. What are you working on?
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <ChatMessage 
          key={i} 
          message={msg} 
          isLast={i === messages.length - 1} 
        />
      ))}

      {isStreaming && messages[messages.length - 1]?.role === 'user' && (
        <TypingIndicator />
      )}
    </div>
  );
}
