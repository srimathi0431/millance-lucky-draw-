import AdminLayout from '../../layouts/AdminLayout';
import { FileText } from 'lucide-react';

const AdminPlans = () => {
  return (
    <AdminLayout>
      <div className="admin-card p-12 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-bold text-white mb-2">Plans Management</h2>
        <p className="text-gray-400">Manage membership plans</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPlans;
