import AdminLayout from '../../layouts/AdminLayout';
import { Gift } from 'lucide-react';
import { TEAMS } from '../../data/prizeData';

const AdminPrizes = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="admin-card">
            <div className="admin-card-value">2</div>
            <div className="admin-card-label">Teams</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">11</div>
            <div className="admin-card-label">Months</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">50+</div>
            <div className="admin-card-label">Prize Types</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">200+</div>
            <div className="admin-card-label">Total Winners</div>
          </div>
        </div>

        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Prize Structure</h2>
          <div className="space-y-4">
            {TEAMS.map((team, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-xl">
                <h3 className="font-bold text-white mb-2">{team.name} - {team.totalMembers} Members</h3>
                <p className="text-sm text-gray-400">{team.months.length} months of draws</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPrizes;
