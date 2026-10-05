import AdminLayout from '../../layouts/AdminLayout';
import { PackageCheck } from 'lucide-react';

const AdminRedeems = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="admin-card">
            <div className="admin-card-value">200</div>
            <div className="admin-card-label">Total Redeems</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">185</div>
            <div className="admin-card-label">Completed</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">15</div>
            <div className="admin-card-label">Pending</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-value">₹50L</div>
            <div className="admin-card-label">Value</div>
          </div>
        </div>
        <div className="admin-card p-12 text-center">
          <PackageCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-bold text-white mb-2">Redeem Management</h2>
          <p className="text-gray-400">Manage prize redemptions</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRedeems;
