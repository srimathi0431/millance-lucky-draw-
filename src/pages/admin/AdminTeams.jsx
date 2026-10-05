import AdminLayout from '../../layouts/AdminLayout';
import { Users2, TrendingUp, Users, DollarSign } from 'lucide-react';

const AdminTeams = () => {
  const team1Data = {
    name: 'Team 1',
    group: 'Group A',
    capacity: 500,
    registered: 325,
    paid: 280,
    pending: 45,
    collection: '₹32.50L',
    pendingAmount: '₹4.50L',
    avgPerMember: '₹10,000'
  };

  const team2Data = {
    name: 'Team 2',
    group: 'Group A',
    capacity: 1000,
    registered: 720,
    paid: 650,
    pending: 70,
    collection: '₹72.00L',
    pendingAmount: '₹7.00L',
    avgPerMember: '₹10,000'
  };

  const franchiseBreakdown = [
    { franchise: 'ABC Franchise Salem', team1: 75, team2: 70, total: 145 },
    { franchise: 'XYZ Franchise Chennai', team1: 98, team2: 100, total: 198 },
    { franchise: 'PQR Franchise Coimbatore', team1: 82, team2: 85, total: 167 },
    { franchise: 'LMN Franchise Madurai', team1: 65, team2: 67, total: 132 },
    { franchise: 'RST Franchise Trichy', team1: 45, team2: 44, total: 89 },
  ];

  const TeamCard = ({ team }) => (
    <div className="admin-card p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          team.name === 'Team 1' 
            ? 'bg-gradient-to-br from-pink-500 to-rose-600' 
            : 'bg-gradient-to-br from-cyan-500 to-blue-600'
        }`}>
          <Users2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{team.name}</h2>
          <p className="text-gray-400">{team.group} • {team.capacity} Person Capacity</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Registration Progress</span>
          <span className={`font-bold ${team.name === 'Team 1' ? 'text-pink-400' : 'text-cyan-400'}`}>
            {Math.round((team.registered / team.capacity) * 100)}%
          </span>
        </div>
        <div className="admin-progress h-3">
          <div
            className="admin-progress-bar"
            style={{
              width: `${(team.registered / team.capacity) * 100}%`,
              background: team.name === 'Team 1' 
                ? 'linear-gradient(90deg, #FF6B9D, #9D4EDD)' 
                : 'linear-gradient(90deg, #4EA8DE, #66C9D0)'
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Registered: {team.registered}</span>
          <span>Available: {team.capacity - team.registered}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-slate-900 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Registered</p>
          <p className="text-xl font-bold text-white">{team.registered}</p>
        </div>
        <div className="text-center p-3 bg-slate-900 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Paid</p>
          <p className="text-xl font-bold text-green-400">{team.paid}</p>
        </div>
        <div className="text-center p-3 bg-slate-900 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Pending</p>
          <p className="text-xl font-bold text-orange-400">{team.pending}</p>
        </div>
        <div className="text-center p-3 bg-slate-900 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Collection</p>
          <p className="text-xl font-bold text-emerald-400">{team.collection}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700">
        <div>
          <p className="text-xs text-gray-400 mb-1">Pending Amount</p>
          <p className="text-lg font-bold text-orange-400">{team.pendingAmount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Avg/Member</p>
          <p className="text-lg font-bold text-blue-400">{team.avgPerMember}</p>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,500</p>
                <p className="text-sm text-gray-400">Total Capacity</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
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
                <p className="text-2xl font-bold text-white">₹104.50L</p>
                <p className="text-sm text-gray-400">Total Collection</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">70%</p>
                <p className="text-sm text-gray-400">Overall Fill Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamCard team={team1Data} />
          <TeamCard team={team2Data} />
        </div>

        {/* Franchise-wise Breakdown */}
        <div className="admin-card">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white">Franchise-wise Team Distribution</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Team 1</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Team 2</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                {franchiseBreakdown.map((item, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-900/50">
                    <td className="px-6 py-4 text-gray-300">{item.franchise}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-semibold">
                        {item.team1}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
                        {item.team2}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-bold">{item.total}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-900">
                <tr>
                  <td className="px-6 py-4 text-gray-300 font-bold">TOTAL</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-pink-400 font-bold text-lg">365</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-cyan-400 font-bold text-lg">366</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-white font-bold text-lg">731</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTeams;
