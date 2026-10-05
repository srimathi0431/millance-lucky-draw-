import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CreateFranchiseModal from '../../components/CreateFranchiseModal';
import { Search, Building2, Users, TrendingUp, MapPin, Phone, Eye, Plus, Filter } from 'lucide-react';

const AdminFranchises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [franchises, setFranchises] = useState([
    {
      id: 'FRAN-001',
      name: 'ABC Franchise Salem',
      head: 'Rajesh Kumar',
      location: 'Salem',
      pincode: '636001',
      mobile: '+91 98765 43210',
      totalUsers: 145,
      team1: { current: 75, capacity: 500 },
      team2: { current: 70, capacity: 1000 },
      collection: '₹72.50L',
      income: '₹7.25L',
      status: 'Active'
    },
    {
      id: 'FRAN-002',
      name: 'XYZ Franchise Chennai',
      head: 'Priya Sharma',
      location: 'Chennai',
      pincode: '600001',
      mobile: '+91 98765 43211',
      totalUsers: 198,
      team1: { current: 98, capacity: 500 },
      team2: { current: 100, capacity: 1000 },
      collection: '₹99.00L',
      income: '₹9.90L',
      status: 'Active'
    },
    {
      id: 'FRAN-003',
      name: 'PQR Franchise Coimbatore',
      head: 'Anand Krishnan',
      location: 'Coimbatore',
      pincode: '641001',
      mobile: '+91 98765 43212',
      totalUsers: 167,
      team1: { current: 82, capacity: 500 },
      team2: { current: 85, capacity: 1000 },
      collection: '₹83.50L',
      income: '₹8.35L',
      status: 'Active'
    },
    {
      id: 'FRAN-004',
      name: 'LMN Franchise Madurai',
      head: 'Deepa Nair',
      location: 'Madurai',
      pincode: '625001',
      mobile: '+91 98765 43213',
      totalUsers: 132,
      team1: { current: 65, capacity: 500 },
      team2: { current: 67, capacity: 1000 },
      collection: '₹66.00L',
      income: '₹6.60L',
      status: 'Active'
    },
    {
      id: 'FRAN-005',
      name: 'RST Franchise Trichy',
      head: 'Vikram Singh',
      location: 'Tiruchirappalli',
      pincode: '620001',
      mobile: '+91 98765 43214',
      totalUsers: 89,
      team1: { current: 45, capacity: 500 },
      team2: { current: 44, capacity: 1000 },
      collection: '₹44.50L',
      income: '₹4.45L',
      status: 'Active'
    }
  ]);

  const filteredFranchises = franchises.filter(franchise => {
    const matchesSearch = franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.mobile.includes(searchTerm) ||
      franchise.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || franchise.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateSuccess = (newFranchise) => {
    setFranchises(prev => [newFranchise, ...prev]);
    setNotificationMessage(`Franchise ${newFranchise.id} created successfully!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <AdminLayout>
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slideInRight">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Franchise Modal */}
      <CreateFranchiseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
        existingFranchises={franchises}
      />

      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Franchises</h1>
            <p className="text-gray-400">Manage and create franchise accounts</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Franchise</span>
          </button>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">25</p>
                <p className="text-sm text-gray-400">Total Franchises</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,485</p>
                <p className="text-sm text-gray-400">Total Users</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹74.25L</p>
                <p className="text-sm text-gray-400">Total Collection</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹7.42L</p>
                <p className="text-sm text-gray-400">Total Income</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="admin-card p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, head, mobile, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Franchises Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredFranchises.map((franchise) => (
            <div key={franchise.id} className="admin-card p-6 hover:border-blue-500/50 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{franchise.name}</h3>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                          {franchise.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        <span className="text-blue-400 font-semibold">{franchise.id}</span> • Head: {franchise.head}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {franchise.location}, {franchise.pincode}
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {franchise.mobile}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Total Users</p>
                    <p className="text-xl font-bold text-white">{franchise.totalUsers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Team 1</p>
                    <p className="text-lg font-bold text-pink-400">
                      {franchise.team1.current}/{franchise.team1.capacity}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Team 2</p>
                    <p className="text-lg font-bold text-cyan-400">
                      {franchise.team2.current}/{franchise.team2.capacity}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Collection</p>
                    <p className="text-lg font-bold text-green-400">{franchise.collection}</p>
                  </div>
                </div>

                {/* Action */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-semibold">View Details</span>
                </button>
              </div>

              {/* Team Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Team 1 Progress</span>
                    <span className="text-pink-400 font-semibold">
                      {Math.round((franchise.team1.current / franchise.team1.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="admin-progress">
                    <div
                      className="admin-progress-bar"
                      style={{
                        width: `${(franchise.team1.current / franchise.team1.capacity) * 100}%`,
                        background: 'linear-gradient(90deg, #FF6B9D, #9D4EDD)'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Team 2 Progress</span>
                    <span className="text-cyan-400 font-semibold">
                      {Math.round((franchise.team2.current / franchise.team2.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="admin-progress">
                    <div
                      className="admin-progress-bar"
                      style={{
                        width: `${(franchise.team2.current / franchise.team2.capacity) * 100}%`,
                        background: 'linear-gradient(90deg, #4EA8DE, #66C9D0)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFranchises;
