export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0">
        <div className="w-4 h-4 rounded-full bg-accent-primary flex items-center justify-center">
          <span className="text-[10px] text-white">✨</span>
        </div>
      </div>
      <div className="px-4 py-3 rounded-2xl bg-bg-elevated border border-bg-border flex gap-1 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" />
      </div>
    </div>
  );
}
