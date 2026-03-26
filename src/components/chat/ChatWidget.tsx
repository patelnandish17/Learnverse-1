import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, History, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'history'>('chat');
  const { user, profile } = useAuth();
  const { messages, isStreaming, sendMessage, clearChat, error } = useChat();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setHasUnread(true);
    }
  }, [messages, isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[360px] h-[520px] mb-4 flex flex-col overflow-hidden rounded-2xl bg-bg-surface border border-bg-border shadow-elevated"
          >
            {/* Header */}
            <header className="h-14 flex items-center justify-between px-4 bg-bg-elevated border-b border-bg-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white text-xs shadow-glow">
                  ✨
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary leading-none">LearnBot</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">AI Learning Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setView(view === 'chat' ? 'history' : 'chat')}
                  className="p-2 rounded-lg hover:bg-bg-border text-text-muted transition-colors"
                >
                  <History className="w-4 h-4" />
                </button>
                <button 
                  onClick={toggleOpen}
                  className="p-2 rounded-lg hover:bg-bg-border text-text-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Content */}
            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Sign in to chat</h3>
                <p className="text-sm text-text-secondary mb-6">
                  Get personalized learning help and save your conversation history.
                </p>
                <Link 
                  to="/login" 
                  className="w-full py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-white font-bold shadow-glow transition-all"
                >
                  Sign In
                </Link>
              </div>
            ) : view === 'chat' ? (
              <>
                <ChatWindow messages={messages} isStreaming={isStreaming} />
                {error && (
                  <div className="px-4 py-2 bg-accent-danger/10 text-[10px] text-accent-danger text-center">
                    {error}
                  </div>
                )}
                <ChatInput onSend={sendMessage} disabled={isStreaming} />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <History className="w-12 h-12 text-text-muted mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-text-primary mb-2">Chat History</h3>
                <p className="text-sm text-text-secondary">
                  No previous conversations found.
                </p>
                <button 
                  onClick={() => setView('chat')}
                  className="mt-6 text-sm font-bold text-accent-primary hover:underline"
                >
                  Back to chat
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleOpen}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-300 relative",
          isOpen ? "bg-bg-surface border border-bg-border text-text-primary" : "bg-accent-primary text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && hasUnread && (
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent-danger border-2 border-bg-base" />
        )}
      </motion.button>
    </div>
  );
}
