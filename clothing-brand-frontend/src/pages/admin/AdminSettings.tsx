import { 
  Settings, Shield, Bell, Globe, Database
} from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Store Settings</h1>
            <p className="text-xs text-gray-500 font-medium">Configure your platform preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Shield className="w-5 h-5 text-primary-purple" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Security & Access</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">Two-Factor Authentication</p>
                <p className="text-[10px] text-gray-400">Secure your admin account</p>
              </div>
              <button className="w-10 h-5 bg-gray-200 rounded-full relative transition-all"><span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">API Access Tokens</p>
                <p className="text-[10px] text-gray-400">Manage third-party integrations</p>
              </div>
              <button className="text-[10px] font-black text-primary-purple uppercase tracking-widest hover:underline">Manage</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Bell className="w-5 h-5 text-yellow-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">Order Alerts</p>
                <p className="text-[10px] text-gray-400">Email & Push notifications</p>
              </div>
              <button className="w-10 h-5 bg-primary-purple rounded-full relative transition-all"><span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">Customer Support Tickets</p>
                <p className="text-[10px] text-gray-400">Receive alerts for new messages</p>
              </div>
              <button className="w-10 h-5 bg-primary-purple rounded-full relative transition-all"><span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Regional & Currency</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Default Currency</label>
              <select className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-sm outline-none">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Store Language</label>
              <select className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-sm outline-none">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Database className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">System Status</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-xs font-bold text-emerald-700">API Gateway Online</p>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">99.9% Uptime</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <p className="text-xs font-bold text-indigo-700">Database Synchronized</p>
              </div>
              <span className="text-[10px] text-indigo-600 font-bold">12ms Latency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
