import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-base relative flex items-center justify-center p-4 overflow-hidden">
      {/* CSS Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--bg-border) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-primary transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="mb-8 group">
          <span className="text-3xl font-display font-extrabold gradient-text group-hover:opacity-80 transition-opacity">
            LearnVerse
          </span>
        </Link>

        {children}
      </div>
    </div>
  );
}
