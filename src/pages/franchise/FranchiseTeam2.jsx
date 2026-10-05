import { useState } from 'react';
import { UsersRound, Search, Eye, Download, CheckCircle, Clock, AlertCircle, TrendingUp, Gift, Users } from 'lucide-react';
import GroupDropdown from '../../components/GroupDropdown';

const FranchiseTeam2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState('GROUP-A');
  const membersPerPage = 10;

  // Team 2 data structure with multiple groups (1000 capacity)
  const team2Groups = [
    {
      id: 'GROUP-A',
      name: 'Group A',
      registered: 300,
      available: 700,
      active: 280,
      paid: 270,
      pending: 20,
      incomplete: 10,
      collection: '₹27.00L',
      pendingCollection: '₹2.00L',
      currentMonth: 5,
      prize: { name: '43" Smart TV', quantity: 5, winners: 5, value: '₹1,50,000', drawDate: '2026-05-31' }
    },
    {
      id: 'GROUP-B',
      name: 'Group B',
      registered: 220,
      available: 780,
      active: 200,
      paid: 195,
      pending: 15,
      incomplete: 10,
      collection: '₹19.50L',
      pendingCollection: '₹1.50L',
      currentMonth: 5,
      prize: { name: 'Washing Machine', quantity: 4, winners: 4, value: '₹1,00,000', drawDate: '2026-05-31' }
    },
    {
      id: 'GROUP-C',
      name: 'Group C',
      registered: 100,
      available: 900,
      active: 90,
      paid: 85,
      pending: 10,
      incomplete: 5,
      collection: '₹8.50L',
      pendingCollection: '₹1.00L',
      currentMonth: 5,
      prize: { name: 'Refrigerator', quantity: 2, winners: 2, value: '₹60,000', drawDate: '2026-05-31' }
    }
  ];

  // Get selected group data
  const selectedGroupData = team2Groups.find(g => g.id === selectedGroup);

  // Team 2 capacity
  const teamCapacity = 1000;
  const totalRegistered = team2Groups.reduce((sum, g) => sum + g.registered, 0);
  const totalAvailable = teamCapacity - totalRegistered;

  // Dropdown options
  const groupOptions = team2Groups.map(group => ({
    value: group.id,
    label: group.name
  }));

  // Members data for selected group
  const getMembersForGroup = (groupId) => {
    const groupName = team2Groups.find(g => g.id === groupId)?.name;
    const membersMap = {
      'GROUP-A': [
        { id: 'ML-002', name: 'Priya Sharma', mobile: '+91 98765 43211', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-004', name: 'Deepa Nair', mobile: '+91 98765 43213', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
        { id: 'ML-006', name: 'Lakshmi Menon', mobile: '+91 98765 43215', paid: '₹7,500', pending: '₹2,500', status: 'Incomplete', month: 5 },
        { id: 'ML-008', name: 'Kavitha Raj', mobile: '+91 98765 43217', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-010', name: 'Meena Kumari', mobile: '+91 98765 43219', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-012', name: 'Divya Reddy', mobile: '+91 98765 43221', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-014', name: 'Sandhya Rao', mobile: '+91 98765 43223', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
        { id: 'ML-016', name: 'Radha Iyer', mobile: '+91 98765 43225', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-018', name: 'Sowmya Devi', mobile: '+91 98765 43227', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-020', name: 'Padma Shree', mobile: '+91 98765 43229', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
      ],
      'GROUP-B': [
        { id: 'ML-022', name: 'Nithya Lakshmi', mobile: '+91 98765 43231', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-024', name: 'Bhavani Devi', mobile: '+91 98765 43233', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-026', name: 'Gayathri Menon', mobile: '+91 98765 43235', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
        { id: 'ML-028', name: 'Preethi Sharma', mobile: '+91 98765 43237', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-030', name: 'Suganya Devi', mobile: '+91 98765 43239', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
      ],
      'GROUP-C': [
        { id: 'ML-032', name: 'Anitha Kumar', mobile: '+91 98765 43241', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-034', name: 'Malini Rao', mobile: '+91 98765 43243', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
        { id: 'ML-036', name: 'Shanthi Reddy', mobile: '+91 98765 43245', paid: '₹0', pending: '₹10,000', status: 'Pending', month: 5 },
        { id: 'ML-038', name: 'Vasantha Devi', mobile: '+91 98765 43247', paid: '₹10,000', pending: '₹0', status: 'Active', month: 5 },
      ]
    };
    return (membersMap[groupId] || []).map(m => ({ ...m, group: groupName }));
  };

  const allMembers = getMembersForGroup(selectedGroup);

  // Filter members
  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.mobile.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-orange-500/20 text-orange-400';
      case 'Incomplete': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Reset pagination when group changes
  const handleGroupChange = (groupId) => {
    setSelectedGroup(groupId);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="franchise-card p-6 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <UsersRound className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Team 2</h1>
              <p className="text-purple-400">1000 Member Capacity</p>
            </div>
          </div>
          
          {/* Request New Group Button */}
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium">
            Request New Group
          </button>
        </div>
      </div>

      {/* Team 2 Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="franchise-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <UsersRound className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Registered</p>
              <p className="text-2xl font-bold text-white">{totalRegistered}/{teamCapacity}</p>
            </div>
          </div>
        </div>

        <div className="franchise-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Available Slots</p>
              <p className="text-2xl font-bold text-white">{totalAvailable}</p>
            </div>
          </div>
        </div>

        <div className="franchise-card p-5 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Groups</p>
              <p className="text-2xl font-bold text-white">{team2Groups.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Group Selector */}
      <div className="franchise-card p-6" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Select Group</h3>
          <span className="text-sm text-gray-400">{team2Groups.length} groups available</span>
        </div>
        <GroupDropdown
          options={groupOptions}
          value={selectedGroup}
          onChange={handleGroupChange}
          placeholder="Select a group"
        />
      </div>

      {/* Selected Group Details */}
      {selectedGroupData && (
        <>
          {/* Group Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <UsersRound className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Registered</p>
                  <p className="text-2xl font-bold text-white">{selectedGroupData.registered}/{teamCapacity}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <UsersRound className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Available Slots</p>
                  <p className="text-2xl font-bold text-white">{selectedGroupData.available}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Paid Members</p>
                  <p className="text-2xl font-bold text-green-400">{selectedGroupData.paid}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-orange-400">{selectedGroupData.pending}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Incomplete</p>
                  <p className="text-2xl font-bold text-red-400">{selectedGroupData.incomplete}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Collection</p>
                  <p className="text-xl font-bold text-green-400">{selectedGroupData.collection}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pending Amount</p>
                  <p className="text-xl font-bold text-orange-400">{selectedGroupData.pendingCollection}</p>
                </div>
              </div>
            </div>

            <div className="franchise-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Current Month</p>
                  <p className="text-2xl font-bold text-white">Month {selectedGroupData.currentMonth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="franchise-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">{selectedGroupData.name} Capacity Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Registration Progress</span>
                <span className="text-purple-400 font-semibold">
                  {Math.round((selectedGroupData.registered / teamCapacity) * 100)}%
                </span>
              </div>
              <div className="franchise-progress h-4">
                <div
                  className="franchise-progress-bar"
                  style={{
                    width: `${(selectedGroupData.registered / teamCapacity) * 100}%`,
                    background: 'linear-gradient(90deg, #A855F7, #8B5CF6)'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Registered: {selectedGroupData.registered}</span>
                <span>Available: {selectedGroupData.available}</span>
              </div>
            </div>
          </div>

          {/* Current Month Prize */}
          <div className="franchise-card p-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4">
              {selectedGroupData.name} - Current Month Prize (Month {selectedGroupData.currentMonth})
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{selectedGroupData.prize.name}</p>
                <p className="text-sm text-gray-400">
                  Quantity: {selectedGroupData.prize.quantity} • Winners: {selectedGroupData.prize.winners} • Value: {selectedGroupData.prize.value}
                </p>
                <p className="text-sm text-purple-400 mt-1">Draw Date: {selectedGroupData.prize.drawDate}</p>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="franchise-card p-5">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${selectedGroupData.name} members...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                />
              </div>
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
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="franchise-card overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">{selectedGroupData.name} Members</h3>
              <p className="text-sm text-gray-400">Showing {filteredMembers.length} members</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mobile</th>
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
                      <td className="px-4 py-3 text-sm font-semibold text-purple-400">{member.id}</td>
                      <td className="px-4 py-3 text-sm text-white">{member.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{member.mobile}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-semibold">
                          {member.group}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{member.paid}</td>
                      <td className="px-4 py-3 text-sm text-right text-orange-400 font-semibold">{member.pending}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-2 hover:bg-purple-500/20 text-purple-400 rounded transition-colors">
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
        </>
      )}
    </div>
  );
};

export default FranchiseTeam2;
