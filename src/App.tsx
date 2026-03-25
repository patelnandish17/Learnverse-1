import { Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { useUIStore } from './store/uiStore';
import { cn } from './lib/utils';

export default function App() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-bg-base flex flex-col relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="liquid-blob blob-1" />
      <div className="liquid-blob blob-2" />
      <div className="liquid-blob blob-3" />

      <Navbar />
      <Sidebar />
      
      <main className={cn(
        "flex-1 transition-all duration-500 pt-32 pb-12",
        "lg:pl-80 pr-6 lg:pr-12" 
      )}>
        <Outlet />
      </main>

      <div className="lg:pl-80 pr-6 lg:pr-12">
        <Footer />
      </div>
    </div>
  );
}
