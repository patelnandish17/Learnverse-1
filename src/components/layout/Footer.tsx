import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { name: 'Explore Courses', href: '/explore' },
      { name: 'Learning Roadmaps', href: '/roadmaps' },
      { name: 'Pricing Plans', href: '/pricing' },
      { name: 'Become an Affiliate', href: '/affiliate' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Affiliate Disclosure', href: '/disclosure' },
    ],
  };

  return (
    <footer className="bg-bg-surface border-t border-bg-border pt-16 pb-8">
      <div className="max-width-container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="text-2xl font-display font-extrabold text-text-primary">
                LearnVerse
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-8">
              The ultimate course aggregator and roadmap platform. We curate the best learning resources from across the web to help you master any skill.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-bg-elevated hover:bg-accent-primary text-text-secondary hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-bg-elevated hover:bg-accent-primary text-text-secondary hover:text-white transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-bg-elevated hover:bg-accent-primary text-text-secondary hover:text-white transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-bg-elevated hover:bg-accent-primary text-text-secondary hover:text-white transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4">
              {links.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-text-secondary hover:text-accent-primary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-text-secondary hover:text-accent-primary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-text-secondary hover:text-accent-primary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-bg-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {currentYear} LearnVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <Mail className="w-3 h-3" />
            support@learnverse.io
          </div>
        </div>
      </div>
    </footer>
  );
}
