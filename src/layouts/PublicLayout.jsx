import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Home, Info, HelpCircle, Users, Gift, Sparkles, Award, Phone, LogIn } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const PublicLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'How It Works', path: '/how-it-works', icon: HelpCircle },
    { name: 'Teams', path: '/teams', icon: Users },
    { name: 'Prizes', path: '/prizes', icon: Gift },
    { name: 'Lucky Draw', path: '/draw', icon: Sparkles },
    { name: 'Winners', path: '/winners', icon: Award },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="public-website-wrapper">
      {/* User Panel Style Background */}
      <div className="public-global-bg">
        <div className="public-bg-blob public-blob-1"></div>
        <div className="public-bg-blob public-blob-2"></div>
        <div className="public-bg-blob public-blob-3"></div>
        <div className="public-bg-blob public-blob-4"></div>
        <div className="public-bg-particles"></div>
      </div>

      {/* Navbar */}
      <nav className={`public-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-soft-pink to-soft-rose rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold gradient-text">Millance</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`public-nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Login Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="public-btn-primary flex items-center gap-2 text-sm md:text-base px-4 md:px-6"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-[42px] h-[42px] rounded-[10px] bg-white/[0.18] border border-white/25 flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Hamburger to X animation */}
                  <span className={`absolute w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                  <span className={`absolute w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Premium Mobile Drawer Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-slate-900/35 backdrop-blur-[5px] z-[9998] lg:hidden animate-fade-in"
                style={{ animationDuration: '250ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Drawer */}
              <div 
                className="fixed top-0 right-0 h-screen w-[min(320px,85vw)] bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 border-l border-white/40 shadow-[-10px_0_40px_rgba(0,0,0,0.18)] z-[9999] lg:hidden overflow-y-auto"
                style={{
                  animation: 'slideInRight 280ms ease-out'
                }}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/30">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-soft-pink to-soft-rose rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-800">Millance</span>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-[10px] bg-white/25 hover:bg-white/35 flex items-center justify-center transition-all active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-slate-800" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="p-4 space-y-1.5">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 h-[48px] px-4 rounded-[10px] transition-all ${
                          active 
                            ? 'bg-white/45 border border-white/50 font-bold shadow-sm' 
                            : 'hover:bg-white/25 border border-transparent font-medium'
                        }`}
                        style={{
                          animation: `slideInItem 300ms ease-out ${index * 40}ms both`
                        }}
                      >
                        {active && (
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                        )}
                        <Icon className="w-[18px] h-[18px] text-slate-700" />
                        <span className="text-[15px] text-slate-800">{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* Login Item */}
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 h-[48px] px-4 rounded-[10px] transition-all hover:bg-white/25 border border-transparent font-medium mt-2"
                    style={{
                      animation: `slideInItem 300ms ease-out ${navItems.length * 40}ms both`
                    }}
                  >
                    <LogIn className="w-[18px] h-[18px] text-slate-700" />
                    <span className="text-[15px] text-slate-800">Login</span>
                  </Link>
                </div>
              </div>

              {/* Animations */}
              <style>{`
                @keyframes slideInRight {
                  from {
                    transform: translateX(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                @keyframes slideInItem {
                  from {
                    transform: translateX(15px);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                @keyframes fade-in {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
                
                .animate-fade-in {
                  animation: fade-in 250ms ease-out;
                }
              `}</style>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Footer */}
      <footer className="public-footer mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-soft-pink to-soft-rose rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Millance</span>
              </div>
              <p className="text-gray-400 text-sm">
                ஆனந்தமான ஆனைமுகம் வழங்கும் அதிர்ஷ்ட பரிசுகள்
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-white text-sm transition">About Us</Link>
                <Link to="/how-it-works" className="block text-gray-400 hover:text-white text-sm transition">How It Works</Link>
                <Link to="/teams" className="block text-gray-400 hover:text-white text-sm transition">Teams</Link>
                <Link to="/prizes" className="block text-gray-400 hover:text-white text-sm transition">Prizes</Link>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block text-gray-400 hover:text-white text-sm transition">Contact Us</Link>
                <Link to="/winners" className="block text-gray-400 hover:text-white text-sm transition">Winners</Link>
                <a href="#terms" className="block text-gray-400 hover:text-white text-sm transition">Terms & Conditions</a>
                <a href="#privacy" className="block text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: info@millance.com</p>
                <p>Phone: +91 84383 86649</p>
                <p>Address: 6/1582B, Sabapathi nagar,</p>
                <p>Thalaivasal, SALEM,</p>
                <p>Tamil Nadu - 636112, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Millance Lucky Draw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
