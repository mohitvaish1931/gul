import { ShieldCheck, Lock, UserCheck } from 'lucide-react';

const AdminRoles = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Roles & Permissions</h1>
        <p className="text-sm text-gray-500">Manage access control and define specific permission sets for your team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">System Controller</h3>
          <p className="text-sm text-gray-500 mb-4">Full access to all system features, settings, and team management.</p>
          <span className="text-xs font-semibold text-purple-600">1 User assigned</span>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Store Manager</h3>
          <p className="text-sm text-gray-500 mb-4">Access to orders, products, customers, and basic reporting. Cannot manage settings.</p>
          <span className="text-xs font-semibold text-blue-600">3 Users assigned</span>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Support Staff</h3>
          <p className="text-sm text-gray-500 mb-4">Read-only access to orders and customers for support purposes.</p>
          <span className="text-xs font-semibold text-orange-600">5 Users assigned</span>
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;
