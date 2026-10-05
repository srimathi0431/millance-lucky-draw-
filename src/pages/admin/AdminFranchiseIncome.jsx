import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { TrendingUp, Building2, Search, Eye, Download } from 'lucide-react';

const AdminFranchiseIncome = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const franchiseIncomes = [
    { id: 'FRAN-001', name: 'ABC Franchise Salem', head: 'Rajesh Kumar', month1: '₹7.25L', month2: '₹7.25L', month3: '₹7.25L', month4: '₹7.25L', month5: '₹7.25L', total: '₹36.25L', pending: '₹0', status: 'Active' },
    { id: 'FRAN-002', name: 'XYZ Franchise Chennai', head: 'Priya Sharma', month1: '₹9.90L', month2: '₹9.90L', month3: '₹9.90L', month4: '₹9.90L', month5: '₹9.90L', total: '₹49.50L', pending: '₹0', status: 'Active' },
    { id: 'FRAN-003', name: 'PQR Franchise Coimbatore', head: 'Anand Krishnan', month1: '₹8.35L', month2: '₹8.35L', month3: '₹8.35L', month4: '₹8.35L', month5: '₹8.35L', total: '₹41.75L', pending: '₹2.35L', status: 'Partial' },
    { id: 'FRAN-004', name: 'LMN Franchise Madurai', head: 'Deepa Nair', month1: '₹6.60L', month2: '₹6.60L', month3: '₹6.60L', month4: '₹6.60L', month5: '₹6.60L', total: '₹33.00L', pending: '₹6.60L', status: 'Partial' },
    { id: 'FRAN-005', name: 'RST Franchise Trichy', head: 'Vikram Singh', month1: '₹4.45L', month2: '₹4.45L', month3: '₹4.45L', month4: '₹4.45L', month5: '₹4.45L', total: '₹22.25L', pending: '₹0', status: 'Active' },
  ];

  const filteredFranchises = franchiseIncomes.filter(f =>
    f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Partial': return 'bg-orange-500/20 text-orange-400';
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹182.75L</p>
                <p className="text-sm text-gray-400">Total Income</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹36.55L</p>
                <p className="text-sm text-gray-400">Current Month</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹8.95L</p>
                <p className="text-sm text-gray-400">Pending Payout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Export */}
        <div className="admin-card p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search franchises..."
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

        {/* Income Table */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Head</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Month 1</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Month 2</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Month 3</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Month 4</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Month 5</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Total</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Pending</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFranchises.map((franchise) => (
                  <tr key={franchise.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{franchise.name}</p>
                        <p className="text-xs text-gray-400">{franchise.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{franchise.head}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{franchise.month1}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{franchise.month2}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{franchise.month3}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{franchise.month4}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{franchise.month5}</td>
                    <td className="px-4 py-3 text-sm text-right text-blue-400 font-bold">{franchise.total}</td>
                    <td className="px-4 py-3 text-sm text-right text-orange-400 font-semibold">{franchise.pending}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(franchise.status)}`}>
                        {franchise.status}
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFranchiseIncome;
