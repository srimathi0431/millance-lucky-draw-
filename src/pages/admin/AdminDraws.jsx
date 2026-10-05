import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Sparkles, Calendar, Users, Trophy, Play, Eye } from 'lucide-react';

const AdminDraws = () => {
  const [selectedTeam, setSelectedTeam] = useState('team1');

  const team1Draws = [
    { month: 1, date: '2026-01-31', participants: 500, status: 'Completed', winners: 4, prize1: 'Rajesh Kumar (ML-001)', prize2: 'Priya Sharma (ML-002)', prize3: 'Anand K (ML-003)', prize4: 'Deepa Nair (ML-004)' },
    { month: 2, date: '2026-02-28', participants: 500, status: 'Completed', winners: 4, prize1: 'Vikram Singh (ML-005)', prize2: 'Lakshmi M (ML-006)', prize3: 'Arun Kumar (ML-007)', prize4: 'Kavitha Raj (ML-008)' },
    { month: 3, date: '2026-03-31', participants: 500, status: 'Completed', winners: 4, prize1: 'Suresh Babu (ML-009)', prize2: 'Meena K (ML-010)', prize3: 'Karthik R (ML-011)', prize4: 'Divya Reddy (ML-012)' },
    { month: 4, date: '2026-04-30', participants: 500, status: 'Completed', winners: 4, prize1: 'Manoj Kumar (ML-013)', prize2: 'Sandhya Rao (ML-014)', prize3: 'Gopal K (ML-015)', prize4: 'Radha Iyer (ML-016)' },
    { month: 5, date: '2026-05-31', participants: 325, status: 'Ready', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 6, date: '2026-06-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 7, date: '2026-07-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 8, date: '2026-08-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 9, date: '2026-09-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 10, date: '2026-10-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 11, date: '2026-11-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
  ];

  const team2Draws = [
    { month: 1, date: '2026-01-31', participants: 1000, status: 'Completed', winners: 4, prize1: 'Ravi C (ML-017)', prize2: 'Sowmya Devi (ML-018)', prize3: 'Murali M (ML-019)', prize4: 'Padma Shree (ML-020)' },
    { month: 2, date: '2026-02-28', participants: 1000, status: 'Completed', winners: 4, prize1: 'Saravanan M (ML-021)', prize2: 'Nithya L (ML-022)', prize3: 'Kumar S (ML-023)', prize4: 'Bhavani D (ML-024)' },
    { month: 3, date: '2026-03-31', participants: 1000, status: 'Completed', winners: 4, prize1: 'Senthil K (ML-025)', prize2: 'Gayathri M (ML-026)', prize3: 'Balaji Rao (ML-027)', prize4: 'Preethi S (ML-028)' },
    { month: 4, date: '2026-04-30', participants: 1000, status: 'Completed', winners: 4, prize1: 'Ramesh B (ML-029)', prize2: 'Suganya D (ML-030)', prize3: 'Kumar R (ML-031)', prize4: 'Divya K (ML-032)' },
    { month: 5, date: '2026-05-31', participants: 720, status: 'Ready', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 6, date: '2026-06-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 7, date: '2026-07-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 8, date: '2026-08-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 9, date: '2026-09-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 10, date: '2026-10-31', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
    { month: 11, date: '2026-11-30', participants: 0, status: 'Pending', winners: 0, prize1: '-', prize2: '-', prize3: '-', prize4: '-' },
  ];

  const draws = selectedTeam === 'team1' ? team1Draws : team2Draws;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Ready': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-gray-500/20 text-gray-400';
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
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">22</p>
                <p className="text-sm text-gray-400">Total Draws</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-sm text-gray-400">Ready to Draw</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">32</p>
                <p className="text-sm text-gray-400">Total Winners</p>
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
              Team 1 Draws
            </button>
            <button
              onClick={() => setSelectedTeam('team2')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                selectedTeam === 'team2'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Team 2 Draws
            </button>
          </div>

          <div className="p-6 space-y-4">
            {draws.map((draw) => (
              <div key={draw.month} className="bg-slate-900 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Draw Info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedTeam === 'team1' 
                        ? 'bg-gradient-to-br from-pink-500 to-rose-600' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                    }`}>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{draw.month}</p>
                        <p className="text-xs text-white/80">Month</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Month {draw.month} Lucky Draw</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {draw.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {draw.participants} Participants
                        </div>
                        {draw.winners > 0 && (
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400">{draw.winners} Winners</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-2 rounded-full text-xs font-semibold ${getStatusColor(draw.status)}`}>
                      {draw.status}
                    </span>
                    {draw.status === 'Ready' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-purple-500/30">
                        <Play className="w-4 h-4" />
                        <span className="font-semibold">Conduct Draw</span>
                      </button>
                    )}
                    {draw.status === 'Completed' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="font-semibold">View Results</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Winners (if completed) */}
                {draw.status === 'Completed' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-700">
                    <div className="bg-slate-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <p className="text-xs text-gray-400 font-semibold">1st Prize Winner</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{draw.prize1}</p>
                    </div>
                    <div className="bg-slate-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-gray-400" />
                        <p className="text-xs text-gray-400 font-semibold">2nd Prize Winner</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{draw.prize2}</p>
                    </div>
                    <div className="bg-slate-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-orange-400" />
                        <p className="text-xs text-gray-400 font-semibold">3rd Prize Winner</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{draw.prize3}</p>
                    </div>
                    <div className="bg-slate-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-cyan-400" />
                        <p className="text-xs text-gray-400 font-semibold">4th Prize Winner</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{draw.prize4}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDraws;
