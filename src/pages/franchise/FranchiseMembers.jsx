import { useState, useEffect } from 'react';
import { Users, Search, Filter, Eye, Download, CheckCircle, Clock, AlertCircle, UserPlus } from 'lucide-react';
import CreateUserModal from '../../components/CreateUserModal';

const FranchiseMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [members, setMembers] = useState([]);
  const membersPerPage = 10;

  // Get logged-in franchise ID (from localStorage or context)
  const franchiseId = localStorage.getItem('loggedInFranchiseId') || 'FRAN-0001';

  // Load members from localStorage on mount
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter only this franchise's members
    const franchiseMembers = allUsers.filter(user => user.franchiseId === franchiseId);
    
    // Convert to display format
    const formattedMembers = franchiseMembers.map(user => ({
      id: user.memberId,
      name: user.fullName,
      mobile: user.phone,
      team: user.team,
      group: user.group,
      paid: user.paid || '₹0',
      pending: user.pending || '₹10,000',
      status: user.status || 'Active',
      month: user.month || 5,
      joinDate: user.registrationDate ? new Date(user.registrationDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }));
    
    setMembers(formattedMembers);
  };

  const handleUserCreated = (newUser) => {
    setNotificationMessage(`User ${newUser.memberId} created successfully!`);
    setShowNotification(true);
    loadMembers(); // Refresh member list
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Dummy members data - 30 members
  const dummyMembers = [
    { id: 'ML-001', name: 'Rajesh Kumar', mobile: '+91 98765 43210', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-15' },
    { id: 'ML-002', name: 'Priya Sharma', mobile: '+91 98765 43211', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-15' },
    { id: 'ML-003', name: 'Anand Krishnan', mobile: '+91 98765 43212', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-16' },
    { id: 'ML-004', name: 'Deepa Nair', mobile: '+91 98765 43213', team: 'Team 2', group: 'Group A', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5, joinDate: '2026-01-16' },
    { id: 'ML-005', name: 'Vikram Singh', mobile: '+91 98765 43214', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-17' },
    { id: 'ML-006', name: 'Lakshmi Menon', mobile: '+91 98765 43215', team: 'Team 2', group: 'Group A', paid: '₹7,500', pending: '₹2,500', status: 'Incomplete', month: 5, joinDate: '2026-01-17' },
    { id: 'ML-007', name: 'Arun Kumar', mobile: '+91 98765 43216', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-18' },
    { id: 'ML-008', name: 'Kavitha Raj', mobile: '+91 98765 43217', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-18' },
    { id: 'ML-009', name: 'Suresh Babu', mobile: '+91 98765 43218', team: 'Team 1', group: 'Group A', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5, joinDate: '2026-01-19' },
    { id: 'ML-010', name: 'Meena Kumari', mobile: '+91 98765 43219', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-19' },
    { id: 'ML-011', name: 'Karthik Ramesh', mobile: '+91 98765 43220', team: 'Team 1', group: 'Group A', paid: '₹8,000', pending: '₹2,000', status: 'Incomplete', month: 5, joinDate: '2026-01-20' },
    { id: 'ML-012', name: 'Divya Reddy', mobile: '+91 98765 43221', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-20' },
    { id: 'ML-013', name: 'Manoj Kumar', mobile: '+91 98765 43222', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-21' },
    { id: 'ML-014', name: 'Sandhya Rao', mobile: '+91 98765 43223', team: 'Team 2', group: 'Group A', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5, joinDate: '2026-01-21' },
    { id: 'ML-015', name: 'Gopal Krishna', mobile: '+91 98765 43224', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-22' },
    { id: 'ML-016', name: 'Radha Iyer', mobile: '+91 98765 43225', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-22' },
    { id: 'ML-017', name: 'Ravi Chandran', mobile: '+91 98765 43226', team: 'Team 1', group: 'Group A', paid: '₹5,000', pending: '₹5,000', status: 'Incomplete', month: 5, joinDate: '2026-01-23' },
    { id: 'ML-018', name: 'Sowmya Devi', mobile: '+91 98765 43227', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-23' },
    { id: 'ML-019', name: 'Murali Mohan', mobile: '+91 98765 43228', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-24' },
    { id: 'ML-020', name: 'Padma Shree', mobile: '+91 98765 43229', team: 'Team 2', group: 'Group A', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5, joinDate: '2026-01-24' },
    { id: 'ML-021', name: 'Saravanan M', mobile: '+91 98765 43230', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-25' },
    { id: 'ML-022', name: 'Nithya Lakshmi', mobile: '+91 98765 43231', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-25' },
    { id: 'ML-023', name: 'Kumar Swamy', mobile: '+91 98765 43232', team: 'Team 1', group: 'Group A', paid: '₹6,000', pending: '₹4,000', status: 'Incomplete', month: 5, joinDate: '2026-01-26' },
    { id: 'ML-024', name: 'Bhavani Devi', mobile: '+91 98765 43233', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-26' },
    { id: 'ML-025', name: 'Senthil Kumar', mobile: '+91 98765 43234', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-27' },
    { id: 'ML-026', name: 'Gayathri Menon', mobile: '+91 98765 43235', team: 'Team 2', group: 'Group A', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5, joinDate: '2026-01-27' },
    { id: 'ML-027', name: 'Balaji Rao', mobile: '+91 98765 43236', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-28' },
    { id: 'ML-028', name: 'Preethi Sharma', mobile: '+91 98765 43237', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-28' },
    { id: 'ML-029', name: 'Ramesh Babu', mobile: '+91 98765 43238', team: 'Team 1', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-29' },
    { id: 'ML-030', name: 'Suganya Devi', mobile: '+91 98765 43239', team: 'Team 2', group: 'Group A', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5, joinDate: '2026-01-29' },
  ];

  // Combine real members with dummy data for display
  const allMembers = [...members, ...dummyMembers];

  // Filter members
  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.mobile.includes(searchTerm);
    const matchesTeam = filterTeam === 'all' || member.team === filterTeam;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  // Calculate stats
  const stats = {
    total: allMembers.length,
    team1: allMembers.filter(m => m.team === 'Team 1').length,
    team2: allMembers.filter(m => m.team === 'Team 2').length,
    active: allMembers.filter(m => m.status === 'Active').length,
    pending: allMembers.filter(m => m.status === 'Pending').length,
    incomplete: allMembers.filter(m => m.status === 'Incomplete').length,
  };

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
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Members</h1>
            <p className="text-gray-400">Manage and view all franchise members</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            Create User
          </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <p className="text-xs text-gray-400">Total</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-pink-400" />
              <p className="text-xs text-gray-400">Team 1</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.team1}</p>
          </div>
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <p className="text-xs text-gray-400">Team 2</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.team2}</p>
          </div>
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-xs text-gray-400">Active</p>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          </div>
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <p className="text-xs text-gray-400">Pending</p>
            </div>
            <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
          </div>
          <div className="franchise-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-xs text-gray-400">Incomplete</p>
            </div>
            <p className="text-2xl font-bold text-red-400">{stats.incomplete}</p>
          </div>
        </div>

      {/* Search & Filters */}
      <div className="franchise-card p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
              />
            </div>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Teams</option>
              <option value="Team 1">Team 1</option>
              <option value="Team 2">Team 2</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

      {/* Members Table */}
      <div className="franchise-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mobile</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Team</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Group</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Paid</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Pending</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.map((member) => (
                  <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-sm font-semibold text-blue-400">{member.id}</td>
                    <td className="px-4 py-3 text-sm text-white">{member.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{member.mobile}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        member.team === 'Team 1' 
                          ? 'bg-pink-500/20 text-pink-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {member.team}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-300">{member.group}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{member.paid}</td>
                    <td className="px-4 py-3 text-sm text-right text-orange-400 font-semibold">{member.pending}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-t border-slate-800">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstMember + 1} to {Math.min(indexOfLastMember, filteredMembers.length)} of {filteredMembers.length} members
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm"
              >
                Previous
              </button>
              <span className="text-white text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUserCreated}
        franchiseId={franchiseId}
      />
    </div>
  );
};

export default FranchiseMembers;
