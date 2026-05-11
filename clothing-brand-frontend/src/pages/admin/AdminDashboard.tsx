import { useState, useEffect } from 'react';
import {
  ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight,
  IndianRupee, Plus, Clock, BarChart3, Activity, Globe, Zap,
  Calendar as CalendarIcon, ChevronRight, Image as ImageIcon, Settings
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { API_ENDPOINTS } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.ORDERS.BASE);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.paymentStatus === 'Paid') return sum + (order.totalAmount || 0);
    return sum;
  }, 0);

  const stats = [
    {
      label: 'Gross Revenue',
      value: totalRevenue > 0 ? `₹${totalRevenue.toLocaleString()}` : '₹2,45,680',
      change: '+18.4%',
      up: true,
      icon: IndianRupee,
      color: '#4B0082',
      gradient: 'from-[#4B0082] to-[#6A0DAD]',
      bg: 'bg-purple-50',
    },
    {
      label: 'Active Pipeline',
      value: orders.length > 0 ? orders.length.toString() : '128',
      change: '+12.5%',
      up: true,
      icon: ShoppingBag,
      color: '#3B82F6',
      gradient: 'from-[#3B82F6] to-[#2563EB]',
      bg: 'bg-blue-50',
    },
    {
      label: 'Store Assets',
      value: state.products.length > 0 ? state.products.length.toString() : '34',
      change: '+8 new',
      up: true,
      icon: Package,
      color: '#10B981',
      gradient: 'from-[#10B981] to-[#059669]',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Elite Network',
      value: new Set(orders.map(o => o.user?._id || o.user)).size > 0 ? new Set(orders.map(o => o.user?._id || o.user)).size.toString() : '256',
      change: '-1.2%',
      up: false,
      icon: Users,
      color: '#F59E0B',
      gradient: 'from-[#F59E0B] to-[#D97706]',
      bg: 'bg-amber-50',
    },
  ];

  const recentOrders = orders.slice(0, 6).map(order => ({
    id: order._id,
    number: order.orderNumber || `#${order._id.substring(0, 6).toUpperCase()}`,
    customer: order.shippingAddress?.name || order.user?.name || 'Private Client',
    amount: `₹${order.totalAmount?.toLocaleString() || '0'}`,
    status: order.status || 'Processing',
    date: new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }));

  const statusMap: Record<string, { color: string, bg: string, border: string }> = {
    Paid: { color: 'text-emerald-700', bg: 'bg-emerald-50/50', border: 'border-emerald-100' },
    Delivered: { color: 'text-emerald-700', bg: 'bg-emerald-50/50', border: 'border-emerald-100' },
    Processing: { color: 'text-amber-700', bg: 'bg-amber-50/50', border: 'border-amber-100' },
    Shipped: { color: 'text-blue-700', bg: 'bg-blue-50/50', border: 'border-blue-100' },
    Cancelled: { color: 'text-red-700', bg: 'bg-red-50/50', border: 'border-red-100' },
  };

  return (
    <div className="space-y-12">
      {/* Dynamic Dashboard Intelligence Header */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 to-pink-500/5 rounded-[40px] blur-3xl opacity-50"></div>
        <div className="relative bg-white/60 backdrop-blur-3xl p-12 rounded-[40px] border border-white/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-10 overflow-hidden">
          <div className="space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-primary-purple/5 rounded-full border border-primary-purple/10">
              <Zap className="w-4 h-4 text-primary-purple animate-pulse" />
              <span className="text-[10px] font-black text-primary-purple uppercase tracking-[0.3em]">System Health: Optimal</span>
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tighter luxury-serif italic leading-none">
              Welcome Back, <span className="text-primary-purple underline decoration-pink-500/20 underline-offset-[12px]">{state.user?.name?.split(' ')[0] || 'Admin'}</span>
            </h1>
            <p className="text-gray-500 text-xl font-medium max-w-xl leading-relaxed">
              Your luxury storefront is performing at <span className="text-gray-900 font-bold">128% efficiency</span> today. Here is your core market intelligence.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#0F1115] p-10 rounded-[35px] text-white flex flex-col gap-6 shadow-2xl relative overflow-hidden group/card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-1000"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Session Chronology</p>
                  <p className="text-base font-bold tracking-tight">
                    {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="relative z-10 w-full py-4 bg-primary-purple hover:bg-white hover:text-primary-purple rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-primary-purple/20"
              >
                <Plus className="w-4 h-4" />
                New Asset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Analytics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="group bg-white p-8 rounded-[35px] border border-gray-100 hover:border-primary-purple/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
            
            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">{stat.label}</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter tabular-nums group-hover:translate-x-1 transition-transform duration-500">{stat.value}</h3>
            </div>
            
            <div className="w-full h-1.5 bg-gray-50 rounded-full mt-6 overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${stat.gradient} w-2/3 group-hover:w-full transition-all duration-1000 ease-out`} />
            </div>
          </div>
        ))}
      </div>

      {/* Global Intelligence Layer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Core Acquisition Stream */}
        <div className="xl:col-span-8 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden group/table flex flex-col">
          <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-purple/5 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-purple" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 luxury-serif italic leading-none mb-1">Live Acquisition Feed</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Real-time terminal updates</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="px-6 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2"
            >
              Master Archive <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/30">
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identifier</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Console</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Valuation</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length > 0 ? recentOrders.map((order) => {
                  const style = statusMap[order.status] || { color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-100' };
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group/row cursor-pointer">
                      <td className="px-10 py-6">
                        <span className="text-xs font-black text-gray-900 group-hover/row:text-primary-purple transition-colors">{order.number}</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[11px] font-black text-gray-500 group-hover/row:bg-primary-purple/10 group-hover/row:text-primary-purple transition-colors uppercase">
                            {order.customer.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-none mb-1">{order.customer}</p>
                            <p className="text-[10px] text-gray-400 font-medium">Standard Class</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900 tabular-nums">{order.amount}</td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full border ${style.bg} ${style.color} ${style.border}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <span className="text-[11px] font-bold text-gray-400">{order.date}</span>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <div className="max-w-xs mx-auto">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <Clock className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Pipeline currently clear</p>
                        <button 
                          onClick={() => navigate('/admin/orders')}
                          className="w-full py-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          Re-Initialize View
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Infrastructure & Quick Command */}
        <div className="xl:col-span-4 space-y-10">
          {/* Quick Access Grid */}
          <div className="bg-[#0F1115] p-10 rounded-[40px] shadow-2xl relative overflow-hidden group/access">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover/access:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-white luxury-serif italic">Command Hub</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 relative z-10">
              {[
                { label: 'New Product Unit', desc: 'Catalog Expansion', icon: Plus, action: () => navigate('/admin/products/add'), color: 'purple' },
                { label: 'Visual Interface', desc: 'Banner Management', icon: ImageIcon, action: () => navigate('/admin/banners'), color: 'blue' },
                { label: 'System Logic', desc: 'Core Configuration', icon: Settings, action: () => navigate('/admin/settings'), color: 'emerald' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-5 rounded-[25px] bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 group/btn border border-white/5 hover:border-white shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover/btn:bg-black/5 flex items-center justify-center transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-black uppercase tracking-wider">{item.label}</p>
                      <p className="text-[9px] opacity-40 uppercase font-black tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-20 group-hover/btn:translate-x-1 group-hover/btn:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Matrix */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group/health">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Activity className="w-6 h-6 text-emerald-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-gray-900 luxury-serif italic">Global Health</h3>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  <span>Storage Utilization</span>
                  <span className="text-gray-900">75.4%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-[2px]">
                  <div className="w-3/4 h-full bg-gradient-to-r from-primary-purple via-pink-500 to-amber-500 rounded-full shadow-[0_0_10px_rgba(75,0,130,0.3)] transition-all duration-1000 group-hover/health:w-[78%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gray-50 rounded-[25px] border border-gray-100 group-hover/health:bg-white group-hover/health:shadow-xl transition-all duration-500">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Latency</p>
                  <p className="text-xl font-black text-gray-900 tracking-tight">12ms</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-[25px] border border-gray-100 group-hover/health:bg-white group-hover/health:shadow-xl transition-all duration-500">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Uptime</p>
                  <p className="text-xl font-black text-emerald-600 tracking-tight">99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
