import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users2, 
  Users, 
  Gift, 
  Sparkles,
  CreditCard,
  Wallet,
  TrendingUp,
  Trophy,
  FileText,
  Settings,
  Menu,
  X,
  Shield,
  Calendar
} from 'lucide-react';
import { AdminFilterProvider } from '../contexts/AdminFilterContext';
import AdminFilterBar from '../components/AdminFilterBar';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/franchises', icon: Building2, label: 'Franchises' },
    { path: '/admin/teams', icon: Users2, label: 'Teams' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/monthly-prizes', icon: Gift, label: 'Monthly Prizes' },
    { path: '/admin/draws', icon: Sparkles, label: 'Draws' },
    { path: '/admin/draw-schedules', icon: Calendar, label: 'Draw Schedules' },
    { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { path: '/admin/franchise-income', icon: Wallet, label: 'Franchise Income' },
    { path: '/admin/collections', icon: TrendingUp, label: 'Collections' },
    { path: '/admin/winners', icon: Trophy, label: 'Winners' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <AdminFilterProvider>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <div className="admin-logo-container">
              <Shield className="admin-logo-icon" />
              <div>
                <h1 className="admin-logo">MILLANCE</h1>
                <span className="admin-badge">ADMIN</span>
              </div>
            </div>
            <button 
              className="admin-sidebar-close"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="admin-nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="admin-nav-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="admin-main">
          {/* Header */}
          <header className="admin-header">
            <button 
              className="admin-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="admin-header-content">
              <h2 className="admin-page-title">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
              </h2>
            </div>
          </header>

          {/* Filter Bar */}
          <AdminFilterBar />

          {/* Page Content */}
          <main className="admin-content">
            {children}
          </main>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="admin-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </AdminFilterProvider>
  );
};

export default AdminLayout;
