import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Calendar, Clock, Filter, Lock, AlertTriangle, CheckCircle, Eye, Edit2, Users, Trophy } from 'lucide-react';
import { useDrawSchedule } from '../../contexts/DrawScheduleContext';
import GroupDropdown from '../../components/GroupDropdown';

const AdminDrawSchedules = () => {
  return (
    <AdminLayout>
      <AdminDrawSchedulesContent />
    </AdminLayout>
  );
};

const AdminDrawSchedulesContent = () => {
  const { getAllSchedules, adminOverrideSchedule } = useDrawSchedule();

  // Filter state
  const [selectedFranchise, setSelectedFranchise] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Override modal state
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideSchedule, setOverrideSchedule] = useState(null);
  const [overrideDate, setOverrideDate] = useState('');
  const [overrideTime, setOverrideTime] = useState('');
  const [showOverrideSuccess, setShowOverrideSuccess] = useState(false);

  // View modal state
  const [viewSchedule, setViewSchedule] = useState(null);

  // Filter options
  const franchises = [
    { value: '', label: 'All Franchises' },
    { value: 'FRAN-001', label: 'ABC Franchise Salem' },
    { value: 'FRAN-002', label: 'XYZ Franchise Chennai' },
    { value: 'FRAN-003', label: 'PQR Franchise Coimbatore' }
  ];

  const teams = [
    { value: '', label: 'All Teams' },
    { value: 'TEAM-1', label: 'Team 1' },
    { value: 'TEAM-2', label: 'Team 2' }
  ];

  const groups = [
    { value: '', label: 'All Groups' },
    { value: 'GROUP-A', label: 'Group A' },
    { value: 'GROUP-B', label: 'Group B' },
    { value: 'GROUP-C', label: 'Group C' }
  ];

  const months = [
    { value: '', label: 'All Months' },
    { value: 'MONTH-4', label: 'Month 4' },
    { value: 'MONTH-5', label: 'Month 5' },
    { value: 'MONTH-6', label: 'Month 6' }
  ];

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Live', label: 'Live' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Locked', label: 'Locked' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  // Get filtered schedules
  const filters = {
    franchiseId: selectedFranchise,
    teamId: selectedTeam,
    groupId: selectedGroup,
    monthId: selectedMonth,
    status: selectedStatus
  };

  const schedules = getAllSchedules(filters);

  // Handle override
  const handleOpenOverride = (schedule) => {
    setOverrideSchedule(schedule);
    setOverrideDate(schedule.drawDate);
    setOverrideTime(schedule.drawTime);
    setShowOverrideModal(true);
  };

  const handleConfirmOverride = () => {
    if (!overrideDate || !overrideTime) {
      return;
    }

    const result = adminOverrideSchedule({
      franchiseId: overrideSchedule.franchiseId,
      teamId: overrideSchedule.teamId,
      groupId: overrideSchedule.groupId,
      monthId: overrideSchedule.monthId,
      drawDate: overrideDate,
      drawTime: overrideTime
    });

    if (result.success) {
      setShowOverrideSuccess(true);
      setShowOverrideModal(false);
      setTimeout(() => setShowOverrideSuccess(false), 3000);
    }
  };

  const getStatusColor = (status, isLocked) => {
    if (isLocked) return 'bg-orange-500/20 text-orange-400';
    switch (status) {
      case 'Scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'Upcoming': return 'bg-purple-500/20 text-purple-400';
      case 'Live': return 'bg-green-500/20 text-green-400';
      case 'Completed': return 'bg-gray-500/20 text-gray-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Draw Schedules Management</h2>
            <p className="text-sm text-gray-400">Monitor and manage all franchise draw schedules</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showOverrideSuccess && (
        <div className="admin-card p-4 bg-green-500/10 border-green-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-semibold">Schedule overridden successfully by admin</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="admin-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Franchise</label>
            <GroupDropdown
              options={franchises}
              value={selectedFranchise}
              onChange={setSelectedFranchise}
              placeholder="All Franchises"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Team</label>
            <GroupDropdown
              options={teams}
              value={selectedTeam}
              onChange={setSelectedTeam}
              placeholder="All Teams"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Group</label>
            <GroupDropdown
              options={groups}
              value={selectedGroup}
              onChange={setSelectedGroup}
              placeholder="All Groups"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Month</label>
            <GroupDropdown
              options={months}
              value={selectedMonth}
              onChange={setSelectedMonth}
              placeholder="All Months"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <GroupDropdown
              options={statuses}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="All Status"
            />
          </div>
        </div>

        {(selectedFranchise || selectedTeam || selectedGroup || selectedMonth || selectedStatus) && (
          <button
            onClick={() => {
              setSelectedFranchise('');
              setSelectedTeam('');
              setSelectedGroup('');
              setSelectedMonth('');
              setSelectedStatus('');
            }}
            className="mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{schedules.length}</p>
              <p className="text-sm text-gray-400">Total Schedules</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {schedules.filter(s => s.status === 'Scheduled' || s.status === 'Upcoming').length}
              </p>
              <p className="text-sm text-gray-400">Upcoming</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{schedules.filter(s => s.isLocked).length}</p>
              <p className="text-sm text-gray-400">Locked</p>
            </div>
          </div>
        </div>

        <div className="admin-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{schedules.filter(s => s.status === 'Completed').length}</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedules Table */}
      <div className="admin-card overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">All Draw Schedules</h3>
          <p className="text-sm text-gray-400">Showing {schedules.length} schedule(s)</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Team</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Group</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Draw Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Draw Time</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Participants</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Prize</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-sm text-white font-semibold">{schedule.franchiseName}</td>
                  <td className="px-4 py-3 text-sm text-white">{schedule.teamName}</td>
                  <td className="px-4 py-3 text-sm text-white">{schedule.groupName}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{schedule.monthName}</td>
                  <td className="px-4 py-3 text-sm text-white">
                    {new Date(schedule.drawDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {new Date(`2000-01-01T${schedule.drawTime}`).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-white">{schedule.participants}</td>
                  <td className="px-4 py-3 text-sm text-amber-400">{schedule.prize}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold 
                      ${getStatusColor(schedule.status, schedule.isLocked)}`}>
                      {schedule.isLocked && <Lock className="w-3 h-3" />}
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setViewSchedule(schedule)}
                        className="p-2 hover:bg-blue-600/20 text-blue-400 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenOverride(schedule)}
                        className="p-2 hover:bg-orange-600/20 text-orange-400 rounded transition-colors"
                        title="Admin Override"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {schedules.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No schedules found</p>
            <p className="text-sm text-gray-500 mt-1">Adjust filters or wait for franchises to create schedules</p>
          </div>
        )}
      </div>

      {/* Override Modal */}
      {showOverrideModal && overrideSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Admin Override</h3>
                <p className="text-sm text-gray-400">This action requires confirmation</p>
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-4">
              <p className="text-sm text-orange-400">
                Are you sure you want to override this franchise draw schedule?
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-sm">
                <span className="text-gray-400">Franchise:</span>
                <span className="text-white font-semibold ml-2">{overrideSchedule.franchiseName}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Team:</span>
                <span className="text-white font-semibold ml-2">{overrideSchedule.teamName}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Group:</span>
                <span className="text-white font-semibold ml-2">{overrideSchedule.groupName}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Month:</span>
                <span className="text-white font-semibold ml-2">{overrideSchedule.monthName}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Draw Date</label>
                <input
                  type="date"
                  value={overrideDate}
                  onChange={(e) => setOverrideDate(e.target.value)}
                  className="w-full h-[44px] px-4 bg-slate-900 border border-slate-700 rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Draw Time</label>
                <input
                  type="time"
                  value={overrideTime}
                  onChange={(e) => setOverrideTime(e.target.value)}
                  className="w-full h-[44px] px-4 bg-slate-900 border border-slate-700 rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOverride}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-lg w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Schedule Details</h3>
              <button
                onClick={() => setViewSchedule(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Franchise</p>
                  <p className="text-white font-semibold">{viewSchedule.franchiseName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Team</p>
                  <p className="text-white font-semibold">{viewSchedule.teamName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Group</p>
                  <p className="text-white font-semibold">{viewSchedule.groupName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Month</p>
                  <p className="text-white font-semibold">{viewSchedule.monthName}</p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Draw Date</p>
                      <p className="text-white font-semibold">
                        {new Date(viewSchedule.drawDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Draw Time</p>
                      <p className="text-white font-semibold">
                        {new Date(`2000-01-01T${viewSchedule.drawTime}`).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })} IST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-xs text-gray-400">Participants</p>
                      <p className="text-white font-semibold">{viewSchedule.participants} members</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-xs text-gray-400">Prize</p>
                      <p className="text-white font-semibold">{viewSchedule.prize}</p>
                      <p className="text-xs text-amber-400">{viewSchedule.prizeValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold 
                    ${getStatusColor(viewSchedule.status, viewSchedule.isLocked)}`}>
                    {viewSchedule.isLocked && <Lock className="w-3 h-3" />}
                    {viewSchedule.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <p className="text-xs text-gray-400">
                  Schedule ID: {viewSchedule.id}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Last Updated: {new Date(viewSchedule.updatedAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setViewSchedule(null)}
              className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDrawSchedules;
