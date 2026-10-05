import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { DollarSign, Users, Building2, Search, Eye, Download } from 'lucide-react';

const AdminPayments = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');

  const userPayments = [
    { id: 'PAY-U-001', userId: 'ML-001', userName: 'Rajesh Kumar', franchise: 'ABC Salem', team: 'Team 1', month: 5, amount: '₹5,000', date: '2026-05-15', method: 'UPI', status: 'Completed' },
    { id: 'PAY-U-002', userId: 'ML-002', userName: 'Priya Sharma', franchise: 'XYZ Chennai', team: 'Team 2', month: 5, amount: '₹10,000', date: '2026-05-14', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-U-003', userId: 'ML-003', userName: 'Anand Krishnan', franchise: 'PQR Coimbatore', team: 'Team 1', month: 5, amount: '₹10,000', date: '2026-05-13', method: 'Card', status: 'Completed' },
    { id: 'PAY-U-004', userId: 'ML-004', userName: 'Deepa Nair', franchise: 'LMN Madurai', team: 'Team 2', month: 5, amount: '₹0', date: '-', method: '-', status: 'Pending' },
    { id: 'PAY-U-005', userId: 'ML-005', userName: 'Vikram Singh', franchise: 'RST Trichy', team: 'Team 1', month: 5, amount: '₹10,000', date: '2026-05-12', method: 'UPI', status: 'Completed' },
    { id: 'PAY-U-006', userId: 'ML-006', userName: 'Lakshmi Menon', franchise: 'ABC Salem', team: 'Team 2', month: 5, amount: '₹7,500', date: '2026-05-11', method: 'UPI', status: 'Partial' },
    { id: 'PAY-U-007', userId: 'ML-007', userName: 'Arun Kumar', franchise: 'XYZ Chennai', team: 'Team 1', month: 5, amount: '₹10,000', date: '2026-05-10', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-U-008', userId: 'ML-008', userName: 'Kavitha Raj', franchise: 'PQR Coimbatore', team: 'Team 2', month: 5, amount: '₹10,000', date: '2026-05-09', method: 'UPI', status: 'Completed' },
    { id: 'PAY-U-009', userId: 'ML-009', userName: 'Suresh Babu', franchise: 'LMN Madurai', team: 'Team 1', month: 5, amount: '₹0', date: '-', method: '-', status: 'Pending' },
    { id: 'PAY-U-010', userId: 'ML-010', userName: 'Meena Kumari', franchise: 'RST Trichy', team: 'Team 2', month: 5, amount: '₹10,000', date: '2026-05-08', method: 'Card', status: 'Completed' },
  ];

  const franchisePayments = [
    { id: 'PAY-F-001', franchiseId: 'FRAN-001', franchiseName: 'ABC Franchise Salem', head: 'Rajesh Kumar', month: 5, totalCollection: '₹72.50L', commission: '₹7.25L', paid: '₹7.25L', pending: '₹0', date: '2026-06-05', status: 'Completed' },
    { id: 'PAY-F-002', franchiseId: 'FRAN-002', franchiseName: 'XYZ Franchise Chennai', head: 'Priya Sharma', month: 5, totalCollection: '₹99.00L', commission: '₹9.90L', paid: '₹9.90L', pending: '₹0', date: '2026-06-05', status: 'Completed' },
    { id: 'PAY-F-003', franchiseId: 'FRAN-003', franchiseName: 'PQR Franchise Coimbatore', head: 'Anand Krishnan', month: 5, totalCollection: '₹83.50L', commission: '₹8.35L', paid: '₹6.00L', pending: '₹2.35L', date: '2026-06-06', status: 'Partial' },
    { id: 'PAY-F-004', franchiseId: 'FRAN-004', franchiseName: 'LMN Franchise Madurai', head: 'Deepa Nair', month: 5, totalCollection: '₹66.00L', commission: '₹6.60L', paid: '₹0', pending: '₹6.60L', date: '-', status: 'Pending' },
    { id: 'PAY-F-005', franchiseId: 'FRAN-005', franchiseName: 'RST Franchise Trichy', head: 'Vikram Singh', month: 5, totalCollection: '₹44.50L', commission: '₹4.45L', paid: '₹4.45L', pending: '₹0', date: '2026-06-04', status: 'Completed' },
  ];

  const filteredPayments = activeTab === 'user'
    ? userPayments.filter(p => 
        p.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : franchisePayments.filter(p =>
        p.franchiseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.franchiseName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Partial': return 'bg-orange-500/20 text-orange-400';
      case 'Pending': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-2xl font-bold text-white">₹93.8L</p>
                <p className="text-sm text-gray-400">User Payments</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹36.55L</p>
                <p className="text-sm text-gray-400">Franchise Commissions</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹10.7L</p>
                <p className="text-sm text-gray-400">Pending Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-card">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'user'
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                USER PAYMENTS
              </div>
            </button>
            <button
              onClick={() => setActiveTab('franchise')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'franchise'
                  ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" />
                FRANCHISE PAYMENTS
              </div>
            </button>
          </div>

          {/* Search & Actions */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'user' ? 'users' : 'franchises'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* User Payments Table */}
          {activeTab === 'user' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Payment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Team</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Month</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Method</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="px-4 py-3 text-sm font-semibold text-blue-400">{payment.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{payment.userName}</p>
                          <p className="text-xs text-gray-400">{payment.userId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{payment.franchise}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          payment.team === 'Team 1' 
                            ? 'bg-pink-500/20 text-pink-400' 
                            : 'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {payment.team}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-white">{payment.month}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-green-400">{payment.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{payment.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{payment.method}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-2 hover:bg-blue-600/20 text-blue-400 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Franchise Payments Table */}
          {activeTab === 'franchise' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Payment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise Head</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Month</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Collection</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Commission</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Paid</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Pending</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="px-4 py-3 text-sm font-semibold text-violet-400">{payment.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{payment.franchiseName}</p>
                          <p className="text-xs text-gray-400">{payment.franchiseId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{payment.head}</td>
                      <td className="px-4 py-3 text-center text-sm text-white">{payment.month}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-blue-400">{payment.totalCollection}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-violet-400">{payment.commission}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-green-400">{payment.paid}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-orange-400">{payment.pending}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{payment.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-2 hover:bg-violet-600/20 text-violet-400 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
