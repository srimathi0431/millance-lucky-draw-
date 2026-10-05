import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Search, Users, ChevronLeft, ChevronRight, Eye, Filter } from 'lucide-react';
import { useAdminFilter } from '../../contexts/AdminFilterContext';
import AdminFilterRequired from '../../components/AdminFilterRequired';

const AdminUsers = () => {
  return (
    <AdminLayout>
      <AdminUsersContent />
    </AdminLayout>
  );
};

const AdminUsersContent = () => {
  const { getCurrentSelection, isFullySelected } = useAdminFilter();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;
  
  // Show filter required message if no selection
  if (!isFullySelected()) {
    return <AdminFilterRequired />;
  }

  const currentSelection = getCurrentSelection();

  // Data scoped by currentSelection.scopeKey - Users for selected Franchise+Team+Group
  const allUsers = [
    { id: 'ML-001', name: 'Rajesh Kumar', mobile: '+91 98765 43210', paid: '₹5,000', pending: '₹5,000', status: 'Partial', month: 5 },
    { id: 'ML-002', name: 'Priya Sharma', mobile: '+91 98765 43211', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
    { id: 'ML-003', name: 'Anand Krishnan', mobile: '+91 98765 43212', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
    { id: 'ML-004', name: 'Deepa Nair', mobile: '+91 98765 43213', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
    { id: 'ML-005', name: 'Vikram Singh', mobile: '+91 98765 43214', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
    { id: 'ML-006', name: 'Lakshmi Menon', mobile: '+91 98765 43215', paid: '₹7,500', pending: '₹2,500', status: 'Partial', month: 5 },
    { id: 'ML-007', name: 'Arun Kumar', mobile: '+91 98765 43216', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
    { id: 'ML-008', name: 'Kavitha Raj', mobile: '+91 98765 43217', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
    { id: 'ML-009', name: 'Suresh Babu', mobile: '+91 98765 43218', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
    { id: 'ML-010', name: 'Meena Kumari', mobile: '+91 98765 43219', paid: '₹10,000', pending: '₹0', status: 'Paid', month: 5 },
  ];

  // Filter users
  const filteredUsers = allUsers.filter(user =>
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-500/20 text-green-400';
      case 'Partial': return 'bg-orange-500/20 text-orange-400';
      case 'Pending': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Context Info */}
      <div className="admin-card p-4 bg-purple-500/10 border-purple-500/30">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm font-semibold text-white">
              {currentSelection.franchise.name} → {currentSelection.team.name} → {currentSelection.group.name}
            </p>
            <p className="text-xs text-gray-400">Scope: {currentSelection.scopeKey}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{allUsers.length}</p>
              <p className="text-sm text-gray-400">Total Users</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{allUsers.filter(u => u.status === 'Paid').length}</p>
              <p className="text-sm text-gray-400">Paid Users</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{allUsers.filter(u => u.status === 'Partial').length}</p>
              <p className="text-sm text-gray-400">Partial Payment</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{allUsers.filter(u => u.status === 'Pending').length}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="admin-card p-5">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mobile</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Paid</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Pending</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-sm font-semibold text-blue-400">{user.id}</td>
                  <td className="px-4 py-3 text-sm text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{user.mobile}</td>
                  <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{user.paid}</td>
                  <td className="px-4 py-3 text-sm text-right text-orange-400 font-semibold">{user.pending}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-t border-slate-800">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-700 text-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
