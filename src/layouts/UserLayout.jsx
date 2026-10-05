import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Vault, Sparkles, Gift, User, CreditCard, 
  FileText, Bell, LogOut, Menu, X, Trophy 
} from 'lucide-react';

const UserLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'Vault', path: '/user/vault', icon: Vault },
    { name: 'Draws', path: '/user/draws', icon: Sparkles },
    { name: 'Redeem', path: '/user/redeem', icon: Gift },
    { name: 'My Plan', path: '/user/my-plan', icon: FileText },
    { name: 'Payments', path: '/user/payments', icon: CreditCard },
    { name: 'Profile', path: '/user/profile', icon: User },
    { name: 'Notifications', path: '/user/notifications', icon: Bell },
  ];

  const isActive = (path) => {
    // Check if current path starts with the menu item path
    // This handles /user/profile, /user/profile/edit, /user/profile/change-password
    if (path === '/user/profile') {
      return location.pathname.startsWith('/user/profile');
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="user-layout">
      {/* Sidebar */}
      <aside className={`user-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="user-sidebar-logo">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6" style={{ color: 'white' }} />
            <span>MILLANCE</span>
          </div>
        </div>

        <div className="user-sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`user-menu-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="user-menu-item user-menu-logout w-full text-left mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="user-main">
        {/* Header */}
        <header className="user-header">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
            </h1>

            <div className="flex items-center gap-3">
              <Link
                to="/user/notifications"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>

              <Link to="/user/profile" className="hidden md:block">
                <div className="w-10 h-10 bg-gradient-to-br from-soft-pink to-soft-rose rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="user-layout-content user-content">
          {children}
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="user-bottom-nav">
        {menuItems.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`user-bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLayout;
