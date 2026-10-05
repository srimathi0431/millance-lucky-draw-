import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Gift, Plus, Edit, Trash2, Lock, Unlock, Eye, Save, X, Upload } from 'lucide-react';

const AdminMonthlyPrizes = () => {
  const [selectedFranchise, setSelectedFranchise] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);

  // Sample franchises
  const franchises = [
    { id: 'FRAN-001', name: 'ABC Franchise Salem' },
    { id: 'FRAN-002', name: 'XYZ Franchise Chennai' },
    { id: 'FRAN-003', name: 'PQR Franchise Coimbatore' },
    { id: 'FRAN-004', name: 'LMN Franchise Madurai' },
    { id: 'FRAN-005', name: 'RST Franchise Trichy' },
  ];

  const teams = [
    { id: 'team1', name: 'Team 1', capacity: 500, group: 'Group A' },
    { id: 'team2', name: 'Team 2', capacity: 1000, group: 'Group A' }
  ];

  // Groups (cascading - depends on selected franchise and team)
  const availableGroups = [
    { id: 'group-a', name: 'Group A', status: 'Default' },
    { id: 'group-b', name: 'Group B', status: 'Admin Approved' },
  ];

  const months = [
    { id: 1, name: 'Month 1' },
    { id: 2, name: 'Month 2' },
    { id: 3, name: 'Month 3' },
    { id: 4, name: 'Month 4' },
    { id: 5, name: 'Month 5' },
    { id: 6, name: 'Month 6' },
    { id: 7, name: 'Month 7' },
    { id: 8, name: 'Month 8' },
    { id: 9, name: 'Month 9' },
    { id: 10, name: 'Month 10' },
    { id: 11, name: 'Month 11' },
  ];

  const prizeCategories = [
    'Electronics',
    'Furniture',
    'Gold',
    'Silver',
    'Vehicle',
    'Cash / Fund',
    'Other'
  ];

  // INITIAL DATA FROM PDF - Team 1 Month 11 Example
  const sampleAssignedPrizes = [
    { 
      id: 1, 
      name: 'Car Fund', 
      category: 'Cash / Fund', 
      quantity: 1, 
      winners: 1, 
      value: '₹1,00,000', 
      status: 'Assigned',
      image: '/prizes/car-fund.jpg'
    },
    { 
      id: 2, 
      name: 'Bike Fund', 
      category: 'Cash / Fund', 
      quantity: 1, 
      winners: 1, 
      value: '₹75,000', 
      status: 'Assigned',
      image: '/prizes/bike-fund.jpg'
    },
    { 
      id: 3, 
      name: '2g Gold', 
      category: 'Gold', 
      quantity: 2, 
      winners: 2, 
      value: '-', 
      status: 'Assigned',
      image: '/prizes/gold-coin.jpg'
    },
    { 
      id: 4, 
      name: '40" LED TV', 
      category: 'Electronics', 
      quantity: 4, 
      winners: 4, 
      value: '-', 
      status: 'Assigned',
      image: '/prizes/led-tv-40.jpg'
    },
    { 
      id: 5, 
      name: '50" LED TV', 
      category: 'Electronics', 
      quantity: 2, 
      winners: 2, 
      value: '-', 
      status: 'Assigned',
      image: '/prizes/led-tv-50.jpg'
    },
  ];

  const [assignedPrizes, setAssignedPrizes] = useState(sampleAssignedPrizes);

  const selectedTeamData = teams.find(t => t.id === selectedTeam);
  const selectedFranchiseData = franchises.find(f => f.id === selectedFranchise);
  const selectedGroupData = availableGroups.find(g => g.id === selectedGroup);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500/20 text-gray-400';
      case 'Assigned': return 'bg-green-500/20 text-green-400';
      case 'Locked': return 'bg-orange-500/20 text-orange-400';
      case 'Completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleAddPrize = () => {
    setEditingPrize(null);
    setShowPrizeModal(true);
  };

  const handleEditPrize = (prize) => {
    setEditingPrize(prize);
    setShowPrizeModal(true);
  };

  const handleDeletePrize = (prizeId) => {
    if (confirm('Are you sure you want to delete this prize assignment?')) {
      setAssignedPrizes(prev => prev.filter(p => p.id !== prizeId));
    }
  };

  const canShowAssignments = selectedFranchise && selectedTeam && selectedGroup && selectedMonth;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Monthly Prize Management</h1>
              <p className="text-sm text-gray-400">Assign and manage monthly prizes for each Franchise and Team</p>
            </div>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="admin-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Franchise Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                FRANCHISE
              </label>
              <select
                value={selectedFranchise}
                onChange={(e) => {
                  setSelectedFranchise(e.target.value);
                  setSelectedTeam('');
                  setSelectedGroup('');
                  setSelectedMonth('');
                }}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Franchise ▼</option>
                {franchises.map(franchise => (
                  <option key={franchise.id} value={franchise.id}>
                    {franchise.id} - {franchise.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                TEAM
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => {
                  setSelectedTeam(e.target.value);
                  setSelectedGroup('');
                  setSelectedMonth('');
                }}
                disabled={!selectedFranchise}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Team ▼</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} — {team.capacity} Members
                  </option>
                ))}
              </select>
            </div>

            {/* Group Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                GROUP
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setSelectedMonth('');
                }}
                disabled={!selectedTeam}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Group ▼</option>
                {availableGroups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Month Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                MONTH
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={!selectedGroup}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Month ▼</option>
                {months.map(month => (
                  <option key={month.id} value={month.id}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assignment Details - Only show when all selections are made */}
        {canShowAssignments && (
          <>
            {/* Current Assignment Info */}
            <div className="admin-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Franchise</p>
                  <p className="text-sm font-bold text-white">{selectedFranchiseData?.name}</p>
                  <p className="text-xs text-blue-400">{selectedFranchise}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Team</p>
                  <p className="text-sm font-bold text-white">{selectedTeamData?.name}</p>
                  <p className="text-xs text-cyan-400">Capacity: {selectedTeamData?.capacity}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Group</p>
                  <p className="text-sm font-bold text-white">{selectedGroupData?.name}</p>
                  <p className="text-xs text-green-400">{selectedGroupData?.status}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Month</p>
                  <p className="text-sm font-bold text-white">Month {selectedMonth}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Assigned Prizes</p>
                  <p className="text-2xl font-bold text-green-400">{assignedPrizes.length}</p>
                  <p className="text-xs text-gray-400">Total Winners: {assignedPrizes.reduce((sum, p) => sum + p.winners, 0)}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-center">
                  <button
                    onClick={handleAddPrize}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-purple-500/30 font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Prize
                  </button>
                </div>
              </div>
            </div>

            {/* Prize Assignment Table */}
            <div className="admin-card overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-xl font-bold text-white">Assigned Prizes</h3>
                <p className="text-sm text-gray-400">Manage prizes for the selected combination</p>
              </div>

              {assignedPrizes.length === 0 ? (
                <div className="p-12 text-center">
                  <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No prizes assigned yet</p>
                  <button
                    onClick={handleAddPrize}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Prize
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Prize</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Category</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Quantity</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Winners</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Value</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedPrizes.map((prize) => (
                        <tr key={prize.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center overflow-hidden">
                                <Gift className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{prize.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                              {prize.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg font-bold text-white">{prize.quantity}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg font-bold text-green-400">{prize.winners}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-semibold text-amber-400">{prize.value}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(prize.status)}`}>
                              {prize.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              {prize.status === 'Locked' ? (
                                <button
                                  className="p-2 text-orange-400 hover:bg-orange-500/20 rounded transition-colors"
                                  title="Prize Locked"
                                >
                                  <Lock className="w-4 h-4" />
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditPrize(prize)}
                                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePrize(prize.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-900">
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-sm font-bold text-white">TOTALS</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-bold text-white">
                            {assignedPrizes.reduce((sum, p) => sum + p.quantity, 0)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-bold text-green-400">
                            {assignedPrizes.reduce((sum, p) => sum + p.winners, 0)}
                          </span>
                        </td>
                        <td colSpan="3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Save Assignment Button */}
            {assignedPrizes.length > 0 && (
              <div className="admin-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Ready to Save Assignment?</h3>
                    <p className="text-sm text-gray-400">
                      {assignedPrizes.length} prizes with {assignedPrizes.reduce((sum, p) => sum + p.winners, 0)} total winners
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Confirm Monthly Prize Assignment?\n\nFranchise: ${selectedFranchiseData?.name}\nTeam: ${selectedTeamData?.name}\nGroup: ${selectedGroupData?.name}\nMonth: ${selectedMonth}\nPrizes: ${assignedPrizes.length}\nWinners: ${assignedPrizes.reduce((sum, p) => sum + p.winners, 0)}`)) {
                        alert('Monthly Prize Successfully Assigned!');
                      }
                    }}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all shadow-lg shadow-green-500/30 font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    Save Assignment
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Add/Edit Prize Modal */}
        {showPrizeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingPrize ? 'Edit Prize' : 'Add New Prize'}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {selectedFranchiseData?.name} • {selectedTeamData?.name} • {selectedGroupData?.name} • Month {selectedMonth}
                  </p>
                </div>
                <button
                  onClick={() => setShowPrizeModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Prize Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Prize Category *
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="">Select Category</option>
                    {prizeCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Prize Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Prize Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 40&quot; LED TV"
                    defaultValue={editingPrize?.name}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Prize Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Prize Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
                      <Gift className="w-10 h-10 text-gray-600" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                  </div>
                </div>

                {/* Quantity & Winners */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      defaultValue={editingPrize?.quantity || 1}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Winner Count *
                    </label>
                    <input
                      type="number"
                      min="1"
                      defaultValue={editingPrize?.winners || 1}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Prize Value */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Prize Value (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ₹25,000"
                    defaultValue={editingPrize?.value !== '-' ? editingPrize?.value : ''}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Additional details about the prize..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
                <button
                  onClick={() => setShowPrizeModal(false)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Prize saved successfully!');
                    setShowPrizeModal(false);
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                  <Save className="w-4 h-4" />
                  Save Prize
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMonthlyPrizes;
