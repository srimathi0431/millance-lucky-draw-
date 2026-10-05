import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { DollarSign, TrendingUp, Users, Download } from 'lucide-react';

const AdminCollections = () => {
  const [selectedTeam, setSelectedTeam] = useState('team1');

  const team1Collections = [
    { franchise: 'ABC Franchise Salem', registered: 75, paid: 68, pending: 7, collection: '₹6.80L', pendingAmount: '₹0.70L', percentage: 91 },
    { franchise: 'XYZ Franchise Chennai', registered: 98, paid: 90, pending: 8, collection: '₹9.00L', pendingAmount: '₹0.80L', percentage: 92 },
    { franchise: 'PQR Franchise Coimbatore', registered: 82, paid: 75, pending: 7, collection: '₹7.50L', pendingAmount: '₹0.70L', percentage: 91 },
    { franchise: 'LMN Franchise Madurai', registered: 65, paid: 58, pending: 7, collection: '₹5.80L', pendingAmount: '₹0.70L', percentage: 89 },
    { franchise: 'RST Franchise Trichy', registered: 45, paid: 40, pending: 5, collection: '₹4.00L', pendingAmount: '₹0.50L', percentage: 89 },
  ];

  const team2Collections = [
    { franchise: 'ABC Franchise Salem', registered: 70, paid: 65, pending: 5, collection: '₹6.50L', pendingAmount: '₹0.50L', percentage: 93 },
    { franchise: 'XYZ Franchise Chennai', registered: 100, paid: 92, pending: 8, collection: '₹9.20L', pendingAmount: '₹0.80L', percentage: 92 },
    { franchise: 'PQR Franchise Coimbatore', registered: 85, paid: 78, pending: 7, collection: '₹7.80L', pendingAmount: '₹0.70L', percentage: 92 },
    { franchise: 'LMN Franchise Madurai', registered: 67, paid: 60, pending: 7, collection: '₹6.00L', pendingAmount: '₹0.70L', percentage: 90 },
    { franchise: 'RST Franchise Trichy', registered: 44, paid: 40, pending: 4, collection: '₹4.00L', pendingAmount: '₹0.40L', percentage: 91 },
  ];

  const collections = selectedTeam === 'team1' ? team1Collections : team2Collections;

  const totalRegistered = collections.reduce((sum, item) => sum + item.registered, 0);
  const totalPaid = collections.reduce((sum, item) => sum + item.paid, 0);
  const totalPending = collections.reduce((sum, item) => sum + item.pending, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,045</p>
                <p className="text-sm text-gray-400">Total Registered</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹104.5L</p>
                <p className="text-sm text-gray-400">Total Collection</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">930</p>
                <p className="text-sm text-gray-400">Paid Users</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">89%</p>
                <p className="text-sm text-gray-400">Collection Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Tabs */}
        <div className="admin-card">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setSelectedTeam('team1')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                selectedTeam === 'team1'
                  ? 'text-pink-400 border-b-2 border-pink-400 bg-pink-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Team 1 Collections (500 Capacity)
            </button>
            <button
              onClick={() => setSelectedTeam('team2')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                selectedTeam === 'team2'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Team 2 Collections (1000 Capacity)
            </button>
          </div>

          <div className="p-6">
            {/* Team Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Registered</p>
                <p className="text-2xl font-bold text-white">{totalRegistered}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Paid</p>
                <p className="text-2xl font-bold text-green-400">{totalPaid}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Pending</p>
                <p className="text-2xl font-bold text-orange-400">{totalPending}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-400">{Math.round((totalPaid / totalRegistered) * 100)}%</p>
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            {/* Collection Cards */}
            <div className="grid grid-cols-1 gap-4">
              {collections.map((item, index) => (
                <div key={index} className="bg-slate-900 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Franchise Name */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{item.franchise}</h3>
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Registered</p>
                          <p className="text-lg font-semibold text-white">{item.registered}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Paid</p>
                          <p className="text-lg font-semibold text-green-400">{item.paid}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Pending</p>
                          <p className="text-lg font-semibold text-orange-400">{item.pending}</p>
                        </div>
                      </div>
                    </div>

                    {/* Collection Amount */}
                    <div className="text-center lg:text-right">
                      <p className="text-xs text-gray-400 mb-1">Total Collection</p>
                      <p className="text-2xl font-bold text-green-400">{item.collection}</p>
                      <p className="text-sm text-orange-400 mt-1">Pending: {item.pendingAmount}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Collection Progress</span>
                      <span className={`font-semibold ${selectedTeam === 'team1' ? 'text-pink-400' : 'text-cyan-400'}`}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="admin-progress">
                      <div
                        className="admin-progress-bar"
                        style={{
                          width: `${item.percentage}%`,
                          background: selectedTeam === 'team1' 
                            ? 'linear-gradient(90deg, #FF6B9D, #9D4EDD)' 
                            : 'linear-gradient(90deg, #4EA8DE, #66C9D0)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCollections;
