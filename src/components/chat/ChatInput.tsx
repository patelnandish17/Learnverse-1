import { useRef, useState, useEffect } from 'react';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-bg-elevated border-t border-bg-border">
      <div className="relative flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={disabled}
          className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-bg-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all text-sm resize-none max-h-[120px] pr-12 disabled:opacity-50"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="absolute right-2 bottom-2 p-2 rounded-lg bg-accent-primary hover:bg-accent-primary/90 text-white transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>
      </div>
      {text.length > 1800 && (
        <p className={cn(
          "mt-2 text-[10px] font-bold text-right",
          text.length > 1950 ? "text-accent-danger" : "text-accent-warning"
        )}>
          {2000 - text.length} remaining
        </p>
      )}
    </div>
  );
}
