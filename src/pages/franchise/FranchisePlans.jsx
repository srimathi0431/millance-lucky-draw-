import FranchiseLayout from '../../layouts/FranchiseLayout';
import { FileText } from 'lucide-react';

const FranchisePlans = () => {
  return (
    <FranchiseLayout>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Plans Management</h2>
          <p className="text-gray-600">View and manage member plans</p>
        </div>
      </div>
    </FranchiseLayout>
  );
};

export default FranchisePlans;
