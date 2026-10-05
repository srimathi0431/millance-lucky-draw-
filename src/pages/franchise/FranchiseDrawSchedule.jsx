import { useState, useEffect } from 'react';
import { Calendar, Clock, Save, Lock, AlertCircle, CheckCircle, Trophy, Users } from 'lucide-react';
import { useDrawSchedule } from '../../contexts/DrawScheduleContext';
import GroupDropdown from '../../components/GroupDropdown';
import CountdownTimer from '../../components/CountdownTimer';

const FranchiseDrawSchedule = () => {
  // Mock current franchise data - in real app, get from auth context
  const currentFranchise = {
    id: 'FRAN-001',
    name: 'ABC Franchise Salem'
  };

  const { getSchedule, saveSchedule, getFranchiseSchedules } = useDrawSchedule();

  // Form state
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Current schedule data
  const [currentSchedule, setCurrentSchedule] = useState(null);

  // Available options
  const teams = [
    { value: 'TEAM-1', label: 'Team 1', capacity: 500 },
    { value: 'TEAM-2', label: 'Team 2', capacity: 1000 }
  ];

  const getGroupsForTeam = (teamId) => {
    const groupsMap = {
      'TEAM-1': [
        { value: 'GROUP-A', label: 'Group A' },
        { value: 'GROUP-B', label: 'Group B' },
        { value: 'GROUP-C', label: 'Group C' }
      ],
      'TEAM-2': [
        { value: 'GROUP-A', label: 'Group A' },
        { value: 'GROUP-B', label: 'Group B' },
        { value: 'GROUP-C', label: 'Group C' }
      ]
    };
    return groupsMap[teamId] || [];
  };

  const months = [
    { value: 'MONTH-4', label: 'Month 4 (Previous)' },
    { value: 'MONTH-5', label: 'Month 5 (Current)' },
    { value: 'MONTH-6', label: 'Month 6 (Next)' }
  ];

  // Load schedule when team/group/month changes
  useEffect(() => {
    if (selectedTeam && selectedGroup && selectedMonth) {
      const schedule = getSchedule(
        currentFranchise.id,
        selectedTeam,
        selectedGroup,
        selectedMonth
      );

      if (schedule) {
        setCurrentSchedule(schedule);
        setDrawDate(schedule.drawDate);
        setDrawTime(schedule.drawTime);
      } else {
        setCurrentSchedule(null);
        setDrawDate('');
        setDrawTime('');
      }
    }
  }, [selectedTeam, selectedGroup, selectedMonth, currentFranchise.id, getSchedule]);

  // Reset group when team changes
  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId);
    setSelectedGroup('');
  };

  // Handle save
  const handleSave = () => {
    setShowSuccess(false);
    setErrorMessage('');

    // Validation
    if (!selectedTeam || !selectedGroup || !selectedMonth) {
      setErrorMessage('Please select Team, Group, and Month');
      return;
    }

    if (!drawDate || !drawTime) {
      setErrorMessage('Please select Draw Date and Draw Time');
      return;
    }

    // Get team and group names
    const team = teams.find(t => t.value === selectedTeam);
    const groups = getGroupsForTeam(selectedTeam);
    const group = groups.find(g => g.value === selectedGroup);
    const month = months.find(m => m.value === selectedMonth);

    const scheduleData = {
      franchiseId: currentFranchise.id,
      franchiseName: currentFranchise.name,
      teamId: selectedTeam,
      teamName: team?.label || selectedTeam,
      groupId: selectedGroup,
      groupName: group?.label || selectedGroup,
      monthId: selectedMonth,
      monthName: month?.label || selectedMonth,
      drawDate,
      drawTime,
      participants: currentSchedule?.participants || 0,
      prize: currentSchedule?.prize || 'Prize TBD',
      prizeValue: currentSchedule?.prizeValue || '₹0'
    };

    const result = saveSchedule(scheduleData);

    if (result.success) {
      setShowSuccess(true);
      setCurrentSchedule(result.schedule);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setErrorMessage(result.message);
    }
  };

  // Get all schedules for this franchise
  const allSchedules = getFranchiseSchedules(currentFranchise.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="franchise-card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Draw Schedule</h1>
            <p className="text-blue-400">Manage draw dates and times for your groups</p>
          </div>
        </div>
      </div>

      {/* Schedule Form */}
      <div className="franchise-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Set Draw Schedule</h3>

        {/* Selection Controls - Desktop Horizontal, Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Team Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Team</label>
            <GroupDropdown
              options={teams}
              value={selectedTeam}
              onChange={handleTeamChange}
              placeholder="Select Team"
            />
          </div>

          {/* Group Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Group</label>
            <GroupDropdown
              options={getGroupsForTeam(selectedTeam)}
              value={selectedGroup}
              onChange={setSelectedGroup}
              placeholder={selectedTeam ? 'Select Group' : 'Select Team first'}
            />
          </div>

          {/* Month Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Month</label>
            <GroupDropdown
              options={months}
              value={selectedMonth}
              onChange={setSelectedMonth}
              placeholder="Select Month"
            />
          </div>
        </div>

        {/* Date and Time Pickers */}
        {selectedTeam && selectedGroup && selectedMonth && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Draw Date
                </label>
                <input
                  type="date"
                  value={drawDate}
                  onChange={(e) => setDrawDate(e.target.value)}
                  disabled={currentSchedule?.isLocked}
                  className="w-full h-[44px] px-4 bg-slate-800 border border-slate-700 rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Draw Time (IST)
                </label>
                <input
                  type="time"
                  value={drawTime}
                  onChange={(e) => setDrawTime(e.target.value)}
                  disabled={currentSchedule?.isLocked}
                  className="w-full h-[44px] px-4 bg-slate-800 border border-slate-700 rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Timezone Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Clock className="w-4 h-4" />
              <span>Timezone: IST (Asia/Kolkata)</span>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400 text-sm">Schedule saved successfully!</p>
              </div>
            )}

            {/* Lock Warning */}
            {currentSchedule?.isLocked && (
              <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-6">
                <Lock className="w-5 h-5 text-orange-400" />
                <p className="text-orange-400 text-sm font-semibold">
                  🔒 Draw Locked - Schedule cannot be changed
                </p>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={currentSchedule?.isLocked || !drawDate || !drawTime}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {currentSchedule ? 'Update Schedule' : 'Save Schedule'}
            </button>
          </>
        )}
      </div>

      {/* Current Schedule Display */}
      {currentSchedule && (
        <div className="franchise-card p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Scheduled Draw</h3>
            {currentSchedule.isLocked && (
              <span className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold">
                <Lock className="w-4 h-4" />
                Locked
              </span>
            )}
          </div>

          {/* Countdown Timer */}
          <div className="mb-6">
            <CountdownTimer 
              drawDate={currentSchedule.drawDate} 
              drawTime={currentSchedule.drawTime} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Draw Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Draw Date</p>
                  <p className="text-white font-semibold">
                    {new Date(currentSchedule.drawDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">Draw Time</p>
                  <p className="text-white font-semibold">
                    {new Date(`2000-01-01T${currentSchedule.drawTime}`).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })} IST
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">Participants</p>
                  <p className="text-white font-semibold">{currentSchedule.participants} members</p>
                </div>
              </div>
            </div>

            {/* Prize Details */}
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Prize</p>
                <p className="text-lg font-bold text-white">{currentSchedule.prize}</p>
                <p className="text-sm text-amber-400">{currentSchedule.prizeValue}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-xs text-gray-400">
              Schedule ID: {currentSchedule.id} • 
              Last Updated: {new Date(currentSchedule.updatedAt).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* All Schedules Table */}
      <div className="franchise-card overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">All Draw Schedules</h3>
          <p className="text-sm text-gray-400">Manage schedules for all your teams and groups</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Team</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Group</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Draw Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Draw Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Prize</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {allSchedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-sm text-white font-semibold">{schedule.teamName}</td>
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
                  <td className="px-4 py-3 text-sm text-amber-400">{schedule.prize}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                      ${schedule.isLocked ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {schedule.isLocked && <Lock className="w-3 h-3" />}
                      {schedule.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {allSchedules.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No schedules created yet</p>
            <p className="text-sm text-gray-500 mt-1">Select team, group, and month above to create a schedule</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FranchiseDrawSchedule;
