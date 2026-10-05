import { Wallet, TrendingUp, Calendar, Download } from 'lucide-react';

const FranchiseIncome = () => {
  // Mock data
  const incomeData = {
    totalIncome: '₹43.25L',
    currentMonth: '₹8.65L',
    previousMonth: '₹8.65L',
    pendingIncome: '₹0',
    paidIncome: '₹43.25L',
    growth: '+12%'
  };

  const monthlyIncome = [
    { month: 'Month 1', team1Collection: '₹24.50L', team1Income: '₹2.45L', team2Collection: '₹62.00L', team2Income: '₹6.20L', total: '₹8.65L', status: 'Paid' },
    { month: 'Month 2', team1Collection: '₹24.50L', team1Income: '₹2.45L', team2Collection: '₹62.00L', team2Income: '₹6.20L', total: '₹8.65L', status: 'Paid' },
    { month: 'Month 3', team1Collection: '₹24.50L', team1Income: '₹2.45L', team2Collection: '₹62.00L', team2Income: '₹6.20L', total: '₹8.65L', status: 'Paid' },
    { month: 'Month 4', team1Collection: '₹24.50L', team1Income: '₹2.45L', team2Collection: '₹62.00L', team2Income: '₹6.20L', total: '₹8.65L', status: 'Paid' },
    { month: 'Month 5', team1Collection: '₹24.50L', team1Income: '₹2.45L', team2Collection: '₹62.00L', team2Income: '₹6.20L', total: '₹8.65L', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Franchise Income</h1>
          <p className="text-gray-400">View your commission and earnings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="franchise-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Income</p>
                <p className="text-2xl font-bold text-white">{incomeData.totalIncome}</p>
              </div>
            </div>
          </div>

          <div className="franchise-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Month</p>
                <p className="text-2xl font-bold text-white">{incomeData.currentMonth}</p>
              </div>
            </div>
          </div>

          <div className="franchise-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Previous Month</p>
                <p className="text-2xl font-bold text-white">{incomeData.previousMonth}</p>
              </div>
            </div>
          </div>

          <div className="franchise-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Growth</p>
                <p className="text-2xl font-bold text-green-400">{incomeData.growth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Income Table */}
        <div className="franchise-card">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Monthly Income Breakdown</h3>
              <p className="text-sm text-gray-400">10% commission on collections</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Month</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Team 1 Collection</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Team 1 Income</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Team 2 Collection</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Team 2 Income</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Total Income</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyIncome.map((item, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-sm font-semibold text-white">{item.month}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-400">{item.team1Collection}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-400 font-semibold">{item.team1Income}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-400">{item.team2Collection}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-400 font-semibold">{item.team2Income}</td>
                    <td className="px-6 py-4 text-sm text-right text-emerald-400 font-bold">{item.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Paid' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default FranchiseIncome;
