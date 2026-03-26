import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { cn } from '../../lib/utils';
import { ChatMessage as ChatMessageType } from '../../hooks/useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  isLast?: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={cn(
      "flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
      !isBot && "flex-row-reverse"
    )}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0">
          <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center">
            <span className="text-[10px] text-white">✨</span>
          </div>
        </div>
      )}

      <div className={cn(
        "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
        isBot 
          ? "bg-bg-elevated border border-bg-border text-text-primary rounded-tl-none" 
          : "bg-accent-primary text-white rounded-tr-none"
      )}>
        <div className="markdown-body prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {message.content}
          </ReactMarkdown>
          {message.isStreaming && <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1 align-middle" />}
        </div>
      </div>
    </div>
  );
}
