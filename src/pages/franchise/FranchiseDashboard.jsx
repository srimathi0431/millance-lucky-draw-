import { 
  Users, 
  UsersRound, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Wallet,
  Gift,
  Trophy,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FranchiseReferral from '../../components/FranchiseReferral';

const FranchiseDashboard = () => {
  // Get logged-in franchise ID
  const franchiseId = localStorage.getItem('loggedInFranchiseId') || 'FRAN-0001';
  
  // Mock data - will come from API
  const franchiseData = {
    id: franchiseId,
    name: 'ABC Franchise Salem',
    location: 'Chennai Central',
    totalMembers: 865,
    team1: {
      capacity: 500,
      registered: 245,
      active: 220,
      paid: 210,
      pending: 25,
      incomplete: 10,
      collection: '₹24.50L',
      pendingCollection: '₹2.50L'
    },
    team2: {
      capacity: 1000,
      registered: 620,
      active: 590,
      paid: 570,
      pending: 35,
      incomplete: 15,
      collection: '₹62.00L',
      pendingCollection: '₹3.50L'
    },
    totalCollection: '₹86.50L',
    totalIncome: '₹8.65L',
    currentMonth: 5,
    upcomingDraw: '2026-05-31'
  };

  const kpiCards = [
    {
      title: 'Total Members',
      value: franchiseData.totalMembers,
      subtitle: 'Across both teams',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      link: '/franchise/members'
    },
    {
      title: 'Team 1 Members',
      value: `${franchiseData.team1.registered}/${franchiseData.team1.capacity}`,
      subtitle: `${Math.round((franchiseData.team1.registered / franchiseData.team1.capacity) * 100)}% filled`,
      icon: UsersRound,
      color: 'from-pink-500 to-rose-600',
      link: '/franchise/team-1'
    },
    {
      title: 'Team 2 Members',
      value: `${franchiseData.team2.registered}/${franchiseData.team2.capacity}`,
      subtitle: `${Math.round((franchiseData.team2.registered / franchiseData.team2.capacity) * 100)}% filled`,
      icon: UsersRound,
      color: 'from-purple-500 to-violet-600',
      link: '/franchise/team-2'
    },
    {
      title: 'Active Members',
      value: franchiseData.team1.active + franchiseData.team2.active,
      subtitle: 'Payment completed',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      link: '/franchise/members'
    },
    {
      title: 'Pending Members',
      value: franchiseData.team1.pending + franchiseData.team2.pending,
      subtitle: 'Payment pending',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      link: '/franchise/payments'
    },
    {
      title: 'Incomplete Members',
      value: franchiseData.team1.incomplete + franchiseData.team2.incomplete,
      subtitle: 'Partial payment',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-600',
      link: '/franchise/payments'
    },
    {
      title: 'Total Collection',
      value: franchiseData.totalCollection,
      subtitle: 'Both teams combined',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      link: '/franchise/payments'
    },
    {
      title: 'Franchise Income',
      value: franchiseData.totalIncome,
      subtitle: '10% commission',
      icon: Wallet,
      color: 'from-violet-500 to-purple-600',
      link: '/franchise/income'
    },
  ];

  const recentMembers = [
    { id: 'ML-245', name: 'Rajesh Kumar', team: 'Team 1', status: 'Active', date: '2026-05-20' },
    { id: 'ML-620', name: 'Priya Sharma', team: 'Team 2', status: 'Active', date: '2026-05-20' },
    { id: 'ML-244', name: 'Anand K', team: 'Team 1', status: 'Pending', date: '2026-05-19' },
    { id: 'ML-619', name: 'Deepa Nair', team: 'Team 2', status: 'Active', date: '2026-05-19' },
    { id: 'ML-243', name: 'Vikram Singh', team: 'Team 1', status: 'Incomplete', date: '2026-05-18' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-orange-500/20 text-orange-400';
      case 'Incomplete': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Welcome, {franchiseData.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <strong>Franchise ID:</strong> {franchiseData.id}
                </span>
                <span className="flex items-center gap-1">
                  <strong>Location:</strong> {franchiseData.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="franchise-card p-5 hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">{card.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-white truncate">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Team Overview Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team 1 Card */}
          <div className="franchise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <UsersRound className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Team 1</h3>
                  <p className="text-sm text-gray-400">500 Member Capacity</p>
                </div>
              </div>
              <Link
                to="/franchise/team-1"
                className="p-2 hover:bg-pink-500/20 rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-pink-400" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Registered</span>
                <span className="text-lg font-bold text-white">
                  {franchiseData.team1.registered}/{franchiseData.team1.capacity}
                </span>
              </div>
              <div className="franchise-progress">
                <div
                  className="franchise-progress-bar"
                  style={{
                    width: `${(franchiseData.team1.registered / franchiseData.team1.capacity) * 100}%`,
                    background: 'linear-gradient(90deg, #FF6B9D, #9D4EDD)'
                  }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Paid</p>
                  <p className="text-sm font-bold text-green-400">{franchiseData.team1.paid}</p>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Pending</p>
                  <p className="text-sm font-bold text-orange-400">{franchiseData.team1.pending}</p>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Incomplete</p>
                  <p className="text-sm font-bold text-red-400">{franchiseData.team1.incomplete}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Collection</span>
                  <span className="text-lg font-bold text-green-400">{franchiseData.team1.collection}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team 2 Card */}
          <div className="franchise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <UsersRound className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Team 2</h3>
                  <p className="text-sm text-gray-400">1000 Member Capacity</p>
                </div>
              </div>
              <Link
                to="/franchise/team-2"
                className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Registered</span>
                <span className="text-lg font-bold text-white">
                  {franchiseData.team2.registered}/{franchiseData.team2.capacity}
                </span>
              </div>
              <div className="franchise-progress">
                <div
                  className="franchise-progress-bar"
                  style={{
                    width: `${(franchiseData.team2.registered / franchiseData.team2.capacity) * 100}%`,
                    background: 'linear-gradient(90deg, #A855F7, #8B5CF6)'
                  }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Paid</p>
                  <p className="text-sm font-bold text-green-400">{franchiseData.team2.paid}</p>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Pending</p>
                  <p className="text-sm font-bold text-orange-400">{franchiseData.team2.pending}</p>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <p className="text-xs text-gray-400">Incomplete</p>
                  <p className="text-sm font-bold text-red-400">{franchiseData.team2.incomplete}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Collection</span>
                  <span className="text-lg font-bold text-green-400">{franchiseData.team2.collection}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Prizes */}
        <div className="franchise-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Current Month Prizes</h3>
            <Link to="/franchise/draws" className="text-sm text-purple-400 hover:text-purple-300 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-8 h-8 text-pink-400" />
                <div>
                  <p className="text-sm text-gray-400">Team 1 - Month {franchiseData.currentMonth}</p>
                  <p className="text-lg font-bold text-white">32" LED TV</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Draw Date:</span>
                <span className="text-pink-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {franchiseData.upcomingDraw}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Team 2 - Month {franchiseData.currentMonth}</p>
                  <p className="text-lg font-bold text-white">43" Smart TV</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Draw Date:</span>
                <span className="text-purple-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {franchiseData.upcomingDraw}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral / Invite Users Section */}
        <FranchiseReferral franchiseId={franchiseId} />

        {/* Recent Members */}
        <div className="franchise-card">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Recent Members</h3>
              <Link to="/franchise/members" className="text-sm text-purple-400 hover:text-purple-300 font-semibold">
                View All →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentMembers.map((member, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-sm font-semibold text-blue-400">{member.id}</td>
                    <td className="px-6 py-4 text-sm text-white">{member.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        member.team === 'Team 1' 
                          ? 'bg-pink-500/20 text-pink-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {member.team}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{member.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default FranchiseDashboard;
