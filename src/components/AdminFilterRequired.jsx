import { AlertCircle, Filter } from 'lucide-react';

const AdminFilterRequired = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-4">
          <Filter className="w-10 h-10 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Filter Required</h3>
        <p className="text-gray-400 mb-4">
          Please select a Franchise, Team, and Group from the filters above to view data.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <AlertCircle className="w-4 h-4" />
          <span>All data is scoped by Franchise → Team → Group</span>
        </div>
      </div>
    </div>
  );
};

export default AdminFilterRequired;
