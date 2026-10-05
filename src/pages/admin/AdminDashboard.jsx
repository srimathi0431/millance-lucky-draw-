import AdminLayout from '../../layouts/AdminLayout';
import { Building2, Users, Users2, DollarSign, TrendingUp, Calendar, Activity } from 'lucide-react';
import { useAdminFilter } from '../../contexts/AdminFilterContext';
import AdminFilterRequired from '../../components/AdminFilterRequired';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  );
};

const AdminDashboardContent = () => {
  const { getCurrentSelection, isFullySelected } = useAdminFilter();
  
  // Show filter required message if no selection
  if (!isFullySelected()) {
    return <AdminFilterRequired />;
  }

  const currentSelection = getCurrentSelection();
  
  // Data scoped by currentSelection.scopeKey (e.g., "FRAN-001+TEAM-1+GROUP-A")
  const kpiCards = [
    { label: 'Franchise', value: currentSelection.franchise.name, icon: Building2, color: 'violet' },
    { label: 'Total Members', value: '120', icon: Users, color: 'blue' },
    { label: 'Team', value: currentSelection.team.name, icon: Users2, color: 'pink' },
    { label: 'Group', value: currentSelection.group.name, icon: Users2, color: 'rose' },
    { label: 'Active Members', value: '110', icon: Activity, color: 'green' },
    { label: 'Total Collections', value: '₹10.50L', icon: TrendingUp, color: 'gold' },
    { label: 'Paid Members', value: '105', icon: DollarSign, color: 'cyan' },
    { label: 'Pending Collection', value: '₹1.00L', icon: DollarSign, color: 'orange' },
    { label: 'Current Month', value: 'Month 5', icon: Calendar, color: 'blue' },
    { label: 'Winners', value: '3', icon: TrendingUp, color: 'violet' },
  ];

  return (
    <div className="admin-dashboard">
      {/* KPI Cards Grid */}
      <div className="admin-kpi-grid">
        {kpiCards.map((card, index) => (
          <div key={index} className={`admin-kpi-card admin-kpi-${card.color}`}>
            <div className="admin-kpi-icon">
              <card.icon className="w-6 h-6" />
            </div>
            <div className="admin-kpi-content">
              <div className="admin-kpi-value">{card.value}</div>
              <div className="admin-kpi-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Overview */}
      <div className="admin-section-grid">
        {/* Group Overview */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">{currentSelection.group.name} Overview</h3>
            <span className="text-xs text-gray-400">Scope: {currentSelection.scopeKey}</span>
          </div>
          <div className="admin-card-body">
            <div className="space-y-4">
              {/* Group Registration */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{currentSelection.group.name} ({currentSelection.team.capacity} Capacity)</span>
                  <span className="text-white font-semibold">24%</span>
                </div>
                <div className="admin-progress">
                  <div className="admin-progress-bar" style={{ width: '24%', background: 'linear-gradient(90deg, #FF6B9D, #9D4EDD)' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Registered: 120</span>
                  <span>Available: 380</span>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Payment Progress</span>
                  <span className="text-white font-semibold">87.5%</span>
                </div>
                <div className="admin-progress">
                  <div className="admin-progress-bar" style={{ width: '87.5%', background: 'linear-gradient(90deg, #4EA8DE, #66C9D0)' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Paid: 105</span>
                  <span>Pending: 15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Summary */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Collection Summary</h3>
          </div>
          <div className="admin-card-body">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Team 1 Collection</span>
                <span className="text-white font-semibold">₹32.50L</span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Team 2 Collection</span>
                <span className="text-white font-semibold">₹41.75L</span>
              </div>
              <div className="h-px bg-slate-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300 font-semibold">Total</span>
                <span className="text-gold font-bold text-lg">₹74.25L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Activity</h3>
        </div>
        <div className="admin-card-body">
          <div className="space-y-3">
            {[
              { text: 'New user registered in Team 1', time: '5 min ago', type: 'user' },
              { text: 'Payment received from FRAN-001', time: '12 min ago', type: 'payment' },
              { text: 'Month 4 draw completed', time: '2 hours ago', type: 'draw' },
              { text: 'New franchise added', time: '5 hours ago', type: 'franchise' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className={`admin-activity-dot admin-activity-${activity.type}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
