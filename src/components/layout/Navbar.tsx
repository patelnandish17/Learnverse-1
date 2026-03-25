import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Compass, Map, LayoutDashboard, LogIn, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../store/uiStore';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav
      className={cn(
        'fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl border border-white/10 overflow-hidden',
        'lg:left-72 lg:right-8', // Push to right on desktop to avoid sidebar
        isScrolled ? 'bg-black/60 backdrop-blur-3xl py-3 shadow-2xl' : 'bg-white/5 backdrop-blur-xl py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Left: Logo (Mobile only) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-text-primary hover:bg-white/5 rounded-xl transition-colors"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="flex lg:hidden items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,215,0,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <GraduationCap className="w-6 h-6 relative z-10" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter text-text-primary group-hover:text-accent-primary transition-all duration-300">
              LearnVerse
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent-primary',
                location.pathname === link.href ? 'text-accent-primary' : 'text-text-secondary'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Search & Auth */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 bg-bg-elevated border border-bg-border rounded-full py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-accent-primary hover:bg-accent-primary/90 text-white text-sm font-bold shadow-glow transition-all duration-300 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
