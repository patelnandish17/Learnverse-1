import { Link, useLocation } from 'react-router-dom';
import { Compass, Map, LayoutDashboard, Bookmark, Settings, HelpCircle, LogOut, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useUIStore();
  const location = useLocation();

  const menuItems = [
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Learning', href: '/my-learning', icon: Bookmark },
  ];

  const secondaryItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help Center', href: '/help', icon: HelpCircle },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full py-8 px-5">
      <div className="flex items-center gap-3 px-2 mb-12 group cursor-pointer">
        <div className="w-11 h-11 rounded-2xl bg-gradient-accent flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,215,0,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
          <GraduationCap className="w-7 h-7 relative z-10" />
        </div>
        <span className="text-2xl font-display font-black text-text-primary tracking-tighter group-hover:text-accent-primary transition-colors">
          LearnVerse
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-500',
              location.pathname === item.href
                ? 'bg-accent-primary text-black shadow-[0_10px_30px_rgba(255,215,0,0.3)]'
                : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
            )}
          >
            <item.icon className={cn("w-5 h-5", location.pathname === item.href ? "text-black" : "text-text-muted")} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-8 border-t border-white/5 space-y-2">
        {secondaryItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all duration-500"
          >
            <item.icon className="w-5 h-5 text-text-muted" />
            {item.name}
          </Link>
        ))}
        <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-accent-danger hover:bg-accent-danger/10 transition-all duration-500">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-6 top-6 bottom-6 w-64 glass-dark rounded-[2rem] z-40 shadow-2xl overflow-hidden">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-4 top-4 bottom-4 w-72 glass-dark rounded-[2rem] z-50 overflow-y-auto shadow-2xl"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
