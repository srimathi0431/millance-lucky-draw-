import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Trophy, Search, Eye, Download, Gift } from 'lucide-react';

const AdminWinners = () => {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const winners = [
    { id: 'WIN-001', memberId: 'ML-001', name: 'Rajesh Kumar', franchise: 'ABC Salem', team: 'Team 1', month: 1, prize: '32" LED TV', position: '1st Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-05' },
    { id: 'WIN-002', memberId: 'ML-002', name: 'Priya Sharma', franchise: 'XYZ Chennai', team: 'Team 1', month: 1, prize: 'Premium Sofa Set', position: '2nd Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-06' },
    { id: 'WIN-003', memberId: 'ML-003', name: 'Anand Krishnan', franchise: 'PQR Coimbatore', team: 'Team 1', month: 1, prize: 'E-Bike', position: '3rd Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-07' },
    { id: 'WIN-004', memberId: 'ML-004', name: 'Deepa Nair', franchise: 'LMN Madurai', team: 'Team 1', month: 1, prize: 'Gold Coin (5g)', position: '4th Prize', drawDate: '2026-01-31', redeemed: 'No', redeemedDate: '-' },
    
    { id: 'WIN-005', memberId: 'ML-017', name: 'Ravi Chandran', franchise: 'ABC Salem', team: 'Team 2', month: 1, prize: '43" Smart TV', position: '1st Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-05' },
    { id: 'WIN-006', memberId: 'ML-018', name: 'Sowmya Devi', franchise: 'XYZ Chennai', team: 'Team 2', month: 1, prize: 'Luxury Sofa Set', position: '2nd Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-06' },
    { id: 'WIN-007', memberId: 'ML-019', name: 'Murali Mohan', franchise: 'PQR Coimbatore', team: 'Team 2', month: 1, prize: 'Motorcycle', position: '3rd Prize', drawDate: '2026-01-31', redeemed: 'Yes', redeemedDate: '2026-02-08' },
    { id: 'WIN-008', memberId: 'ML-020', name: 'Padma Shree', franchise: 'LMN Madurai', team: 'Team 2', month: 1, prize: 'Gold Coin (10g)', position: '4th Prize', drawDate: '2026-01-31', redeemed: 'No', redeemedDate: '-' },

    { id: 'WIN-009', memberId: 'ML-005', name: 'Vikram Singh', franchise: 'RST Trichy', team: 'Team 1', month: 2, prize: 'Washing Machine', position: '1st Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-05' },
    { id: 'WIN-010', memberId: 'ML-006', name: 'Lakshmi Menon', franchise: 'ABC Salem', team: 'Team 1', month: 2, prize: 'Dining Table Set', position: '2nd Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-06' },
    { id: 'WIN-011', memberId: 'ML-007', name: 'Arun Kumar', franchise: 'XYZ Chennai', team: 'Team 1', month: 2, prize: 'Laptop', position: '3rd Prize', drawDate: '2026-02-28', redeemed: 'No', redeemedDate: '-' },
    { id: 'WIN-012', memberId: 'ML-008', name: 'Kavitha Raj', franchise: 'PQR Coimbatore', team: 'Team 1', month: 2, prize: 'Silver Coin (50g)', position: '4th Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-07' },

    { id: 'WIN-013', memberId: 'ML-021', name: 'Saravanan M', franchise: 'ABC Salem', team: 'Team 2', month: 2, prize: 'Front Load Washer', position: '1st Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-05' },
    { id: 'WIN-014', memberId: 'ML-022', name: 'Nithya Lakshmi', franchise: 'XYZ Chennai', team: 'Team 2', month: 2, prize: '6-Seater Dining Set', position: '2nd Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-06' },
    { id: 'WIN-015', memberId: 'ML-023', name: 'Kumar Swamy', franchise: 'PQR Coimbatore', team: 'Team 2', month: 2, prize: 'Gaming Laptop', position: '3rd Prize', drawDate: '2026-02-28', redeemed: 'No', redeemedDate: '-' },
    { id: 'WIN-016', memberId: 'ML-024', name: 'Bhavani Devi', franchise: 'LMN Madurai', team: 'Team 2', month: 2, prize: 'Gold Coin (15g)', position: '4th Prize', drawDate: '2026-02-28', redeemed: 'Yes', redeemedDate: '2026-03-08' },
  ];

  const filteredWinners = winners.filter(winner => {
    const matchesSearch = winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         winner.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         winner.prize.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || 
                       (selectedTeam === 'team1' && winner.team === 'Team 1') ||
                       (selectedTeam === 'team2' && winner.team === 'Team 2');
    return matchesSearch && matchesTeam;
  });

  const getPositionColor = (position) => {
    if (position.includes('1st')) return 'text-amber-400';
    if (position.includes('2nd')) return 'text-gray-400';
    if (position.includes('3rd')) return 'text-orange-400';
    return 'text-cyan-400';
  };

  const getRedeemedColor = (redeemed) => {
    return redeemed === 'Yes' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">32</p>
                <p className="text-sm text-gray-400">Total Winners</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">26</p>
                <p className="text-sm text-gray-400">Prizes Redeemed</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-sm text-gray-400">Pending Redemption</p>
              </div>
            </div>
          </div>

          <div className="admin-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">81%</p>
                <p className="text-sm text-gray-400">Redemption Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card p-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Team Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTeam('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTeam === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white'
                }`}
              >
                All Teams
              </button>
              <button
                onClick={() => setSelectedTeam('team1')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTeam === 'team1'
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white'
                }`}
              >
                Team 1
              </button>
              <button
                onClick={() => setSelectedTeam('team2')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTeam === 'team2'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white'
                }`}
              >
                Team 2
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search winners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
              />
            </div>

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Winners Table */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Winner ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Member</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Franchise</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Team</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Prize</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Draw Date</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Redeemed</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Redeemed Date</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWinners.map((winner) => (
                  <tr key={winner.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-semibold text-blue-400">{winner.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{winner.name}</p>
                        <p className="text-xs text-gray-400">{winner.memberId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{winner.franchise}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        winner.team === 'Team 1' 
                          ? 'bg-pink-500/20 text-pink-400' 
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {winner.team}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-white font-semibold">{winner.month}</td>
                    <td className="px-4 py-3 text-sm text-white font-semibold">{winner.prize}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Trophy className={`w-4 h-4 ${getPositionColor(winner.position)}`} />
                        <span className={`text-sm font-semibold ${getPositionColor(winner.position)}`}>
                          {winner.position.split(' ')[0]}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{winner.drawDate}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRedeemedColor(winner.redeemed)}`}>
                        {winner.redeemed}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{winner.redeemedDate}</td>
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

export default AdminWinners;
