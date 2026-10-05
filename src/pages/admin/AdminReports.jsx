import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const AdminReports = () => {
  const [selectedMonth, setSelectedMonth] = useState('5');

  const reportTypes = [
    {
      id: 1,
      name: 'User Registration Report',
      description: 'Complete list of all registered users with details',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      metrics: ['Total: 1,485 users', 'Team 1: 731', 'Team 2: 754']
    },
    {
      id: 2,
      name: 'Payment Collection Report',
      description: 'User payments, franchise payments, and pending amounts',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      metrics: ['Collection: ₹104.5L', 'Paid: ₹93.8L', 'Pending: ₹10.7L']
    },
    {
      id: 3,
      name: 'Franchise Performance Report',
      description: 'Franchise-wise user count, collections, and income',
      icon: TrendingUp,
      color: 'from-violet-500 to-purple-600',
      metrics: ['Total: 25 franchises', 'Active: 25', 'Income: ₹36.55L']
    },
    {
      id: 4,
      name: 'Team-wise Collection Report',
      description: 'Team 1 and Team 2 collections by franchise',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      metrics: ['Team 1: ₹48.5L', 'Team 2: ₹56L', 'Total: ₹104.5L']
    },
    {
      id: 5,
      name: 'Draw Results Report',
      description: 'Monthly draw results with winner details',
      icon: FileText,
      color: 'from-amber-500 to-orange-600',
      metrics: ['Completed: 8 draws', 'Winners: 32', 'Upcoming: 2']
    },
    {
      id: 6,
      name: 'Winner & Redemption Report',
      description: 'List of winners and prize redemption status',
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
      metrics: ['Winners: 32', 'Redeemed: 26', 'Pending: 6']
    },
    {
      id: 7,
      name: 'Monthly Prize Report',
      description: 'Prize allocation for Team 1 and Team 2',
      icon: FileText,
      color: 'from-indigo-500 to-purple-600',
      metrics: ['Total Prizes: 88', 'Value: ₹35L+', 'Months: 11']
    },
    {
      id: 8,
      name: 'Financial Summary Report',
      description: 'Overall financial summary with all transactions',
      icon: DollarSign,
      color: 'from-green-500 to-teal-600',
      metrics: ['Revenue: ₹104.5L', 'Commission: ₹36.55L', 'Net: ₹67.95L']
    }
  ];

  const quickStats = [
    { label: 'Total Users', value: '1,485', change: '+12%', color: 'text-blue-400' },
    { label: 'Total Collection', value: '₹104.5L', change: '+8%', color: 'text-green-400' },
    { label: 'Total Winners', value: '32', change: '+4', color: 'text-amber-400' },
    { label: 'Active Franchises', value: '25', change: '+2', color: 'text-violet-400' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="admin-card p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Month Selector */}
        <div className="admin-card p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Report Period</h3>
                <p className="text-sm text-gray-400">Select month for monthly reports</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="1">Month 1 - January 2026</option>
                <option value="2">Month 2 - February 2026</option>
                <option value="3">Month 3 - March 2026</option>
                <option value="4">Month 4 - April 2026</option>
                <option value="5">Month 5 - May 2026 (Current)</option>
                <option value="all">All Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="admin-card p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${report.color} flex-shrink-0`}>
                  <report.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{report.description}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.metrics.map((metric, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-900 text-xs text-gray-300 rounded">
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold">
                      <FileText className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export All Section */}
        <div className="admin-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Export All Reports</h3>
              <p className="text-sm text-gray-400">Download complete report package for selected period</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-purple-500/30 font-semibold">
                <Download className="w-5 h-5" />
                Export as PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all shadow-lg shadow-green-500/30 font-semibold">
                <Download className="w-5 h-5" />
                Export as Excel
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports History */}
        <div className="admin-card">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white">Recent Report Downloads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Report Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Generated Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Format</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800 hover:bg-slate-900/50">
                  <td className="px-6 py-4 text-sm text-white">Payment Collection Report</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Month 5 - May 2026</td>
                  <td className="px-6 py-4 text-sm text-gray-300">2026-06-01 10:30 AM</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Excel</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-blue-600/20 text-blue-400 rounded transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-slate-800 hover:bg-slate-900/50">
                  <td className="px-6 py-4 text-sm text-white">User Registration Report</td>
                  <td className="px-6 py-4 text-sm text-gray-300">All Months</td>
                  <td className="px-6 py-4 text-sm text-gray-300">2026-05-30 02:15 PM</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">PDF</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-blue-600/20 text-blue-400 rounded transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-slate-800 hover:bg-slate-900/50">
                  <td className="px-6 py-4 text-sm text-white">Draw Results Report</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Month 4 - April 2026</td>
                  <td className="px-6 py-4 text-sm text-gray-300">2026-05-28 09:45 AM</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Excel</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-blue-600/20 text-blue-400 rounded transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
