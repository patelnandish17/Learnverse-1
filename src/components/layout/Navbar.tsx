import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Compass, Map, LayoutDashboard, LogIn, GraduationCap, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../store/uiStore';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useUIStore();
  const { user, profile, signOut } = useAuth();
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
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent-primary',
                  location.pathname === link.href ? 'text-accent-primary' : 'text-text-secondary'
                )}
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right: Search & Auth */}
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative hidden md:block"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 bg-bg-elevated border border-bg-border rounded-full py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-all duration-300"
            />
          </motion.div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-bg-elevated border border-bg-border hover:border-accent-primary transition-all group"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-xs">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name || ''} className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-bg-surface border border-bg-border shadow-elevated p-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-bg-border mb-2">
                        <p className="text-sm font-bold text-text-primary truncate">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          to="/dashboard" 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-all"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-all"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link 
                          to="/settings" 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-all"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button 
                          onClick={() => {
                            signOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-accent-danger hover:bg-accent-danger/10 rounded-xl transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full bg-accent-primary hover:bg-accent-primary/90 text-white text-sm font-bold shadow-glow transition-all duration-300"
                >
                  Get Started
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
