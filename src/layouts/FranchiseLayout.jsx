import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UsersRound, 
  Sparkles, 
  Trophy, 
  CreditCard, 
  Wallet, 
  BarChart3, 
  UserCircle, 
  LogOut,
  Menu,
  X,
  Calendar
} from 'lucide-react';

const FranchiseLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock franchise data - will come from auth/context
  const franchiseData = {
    id: 'FRAN-001',
    name: 'ABC Franchise Salem',
    location: 'Salem, Tamil Nadu'
  };

  const navigation = [
    { name: 'Dashboard', path: '/franchise/dashboard', icon: LayoutDashboard },
    { name: 'Members', path: '/franchise/members', icon: Users },
    { name: 'Team 1', path: '/franchise/team-1', icon: UsersRound },
    { name: 'Team 2', path: '/franchise/team-2', icon: UsersRound },
    { name: 'Draws', path: '/franchise/draws', icon: Sparkles },
    { name: 'Draw Schedule', path: '/franchise/draw-schedule', icon: Calendar },
    { name: 'Winners', path: '/franchise/winners', icon: Trophy },
    { name: 'Payments', path: '/franchise/payments', icon: CreditCard },
    { name: 'Income', path: '/franchise/income', icon: Wallet },
    { name: 'Reports', path: '/franchise/reports', icon: BarChart3 },
    { name: 'Profile', path: '/franchise/profile', icon: UserCircle },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/franchise/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col" style={{ height: '100dvh', overflow: 'hidden' }}>
        <div className="flex flex-col flex-grow bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700" style={{ height: '100%', overflow: 'hidden' }}>
          {/* Logo & Franchise Info */}
          <div className="flex flex-col px-4 py-6 border-b border-slate-700" style={{ flexShrink: 0 }}>
            <Link to="/franchise/dashboard" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">MILLANCE</h1>
                <p className="text-xs text-gray-400">Lucky Draw</p>
              </div>
            </Link>
            
            <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-gray-400 mb-1">Franchise</p>
              <p className="text-sm font-bold text-white truncate">{franchiseData.name}</p>
              <p className="text-xs text-purple-400">{franchiseData.id}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="franchise-sidebar-nav flex-1 px-3 py-4 space-y-1" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                    active
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-slate-700" style={{ flexShrink: 0 }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
          <Link to="/franchise/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">MILLANCE</h1>
              <p className="text-xs text-purple-400">{franchiseData.id}</p>
            </div>
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[57px] z-30 bg-slate-900/95 backdrop-blur-sm">
            <nav className="flex flex-col p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FranchiseLayout;
