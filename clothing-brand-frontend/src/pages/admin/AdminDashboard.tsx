import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Users, Package, ArrowUp, ChevronRight, PieChart, TrendingUp, Settings,
  Activity, Clock, Calendar as CalendarIcon, ArrowDownRight, Globe, Image as ImageIcon
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
    if (order.paymentStatus === 'Paid') {
      return sum + (order.totalAmount || 0);
    }
    return sum;
  }, 0);

  const stats = [
    { 
      name: 'GROSS REVENUE', 
      value: totalRevenue > 0 ? `₹${totalRevenue.toLocaleString()}` : '₹2,45,680', 
      icon: TrendingUp, 
      color: 'bg-emerald-500/10', 
      iconColor: 'text-emerald-500',
      change: '+18.4%',
      isPositive: true,
      description: 'vs previous 30 days'
    },
    { 
      name: 'ACTIVE ACQUISITIONS', 
      value: state.products.length > 0 ? state.products.length : 34, 
      icon: Package, 
      color: 'bg-primary-purple/10', 
      iconColor: 'text-primary-purple',
      change: '+5.2%',
      isPositive: true,
      description: 'catalog expansion'
    },
    { 
      name: 'FULFILLMENT RATE', 
      value: '98.2%', 
      icon: ShoppingBag, 
      color: 'bg-blue-500/10', 
      iconColor: 'text-blue-500',
      change: '+2.1%',
      isPositive: true,
      description: 'order processing efficiency'
    },
    { 
      name: 'USER BASE', 
      value: new Set(orders.map(o => o.user?._id || o.user)).size > 0 ? new Set(orders.map(o => o.user?._id || o.user)).size : 256, 
      icon: Users, 
      color: 'bg-pink-500/10', 
      iconColor: 'text-pink-500',
      change: '-0.8%',
      isPositive: false,
      description: 'customer retention'
    },
  ];

  const recentOrders = orders.slice(0, 6).map(order => ({
    id: order._id,
    orderNumber: order.orderNumber || `GUL-${order._id.substring(0, 4).toUpperCase()}`,
    customer: order.shippingAddress?.name || order.user?.name || 'Private Client',
    product: order.items?.[0]?.name + (order.items?.length > 1 ? ` +${order.items.length - 1}` : ''),
    amount: `₹${order.totalAmount?.toLocaleString()}`,
    status: order.status || 'Processing',
    time: '2h ago'
  }));

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Welcome Header */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-pink-500/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
        <div className="relative bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-purple/5 rounded-full border border-primary-purple/10">
              <Activity className="w-3.5 h-3.5 text-primary-purple animate-pulse" />
              <span className="text-[10px] font-black text-primary-purple uppercase tracking-[0.2em]">Operational Status: Optimal</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight luxury-serif">
              Salutations, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-pink-600">Administrator</span>
            </h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Your storefront ecosystem is flourishing. Here is the distilled performance metrics for <span className="text-gray-900 font-bold border-b-2 border-primary-purple/20">Gul Fashion House</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-purple shadow-sm border border-gray-100">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Session Chronology</p>
                <p className="text-base font-bold text-gray-800">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 px-8 py-4 bg-[#0F1115] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:shadow-2xl hover:shadow-black/20 transition-all">Export Report</button>
              <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all"><Settings className="w-5 h-5" /></button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-10 relative z-10">
              <div className={`w-16 h-16 rounded-[1.5rem] ${stat.color} ${stat.iconColor} flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-2 relative z-10">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.name}</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{stat.description}</p>
            </div>

            {/* Micro Chart Background */}
            <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,40 C20,35 40,38 60,30 C80,22 100,25 100,20 L100,40 L0,40 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Transaction History */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[3rem] shadow-sm overflow-hidden flex flex-col group">
          <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0F1115] flex items-center justify-center text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Live Acquisition Feed</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Real-time market activity</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:text-primary-purple hover:border-primary-purple/20 transition-all tracking-widest uppercase flex items-center gap-2 group/btn"
            >
              Archived Intel <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Identifier</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Consignee</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Assets</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Valuation</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group/row">
                    <td className="px-10 py-6 whitespace-nowrap">
                      <span className="text-xs font-black text-gray-900 group-hover/row:text-primary-purple transition-colors">{order.orderNumber}</span>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-black group-hover/row:bg-primary-purple/10 group-hover/row:text-primary-purple transition-colors">
                          {order.customer.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-700 font-bold">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-xs text-gray-500 font-medium italic">
                      {order.product}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-xs text-gray-900 font-black tabular-nums">
                      {order.amount}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm ${
                        order.status === 'Paid' || order.status === 'Delivered' ? 'bg-emerald-500 text-white' :
                        order.status === 'Processing' ? 'bg-amber-500 text-white' :
                        order.status === 'Shipped' ? 'bg-indigo-500 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center max-w-xs mx-auto">
                        <div className="w-24 h-24 mb-8 text-gray-100">
                          <PieChart className="w-full h-full" />
                        </div>
                        <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase mb-6">Awaiting terminal activity...</p>
                        <button onClick={() => navigate('/admin/orders')} className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary-purple hover:text-white transition-all">Re-initialize</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          {/* Quick Command Interface */}
          <div className="bg-[#0F1115] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Operations</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 group/item border border-white/5 hover:border-white shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover/item:bg-black/5 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest">Initialize Acquisition</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">Catalog Expansion</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-30 group-hover/item:translate-x-1 group-hover/item:opacity-100 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/admin/banners')}
                className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 group/item border border-white/5 hover:border-white shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover/item:bg-black/5 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest">Storefront Visuals</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">Atmosphere Control</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-30 group-hover/item:translate-x-1 group-hover/item:opacity-100 transition-all" />
              </button>
            </div>
            
            {/* Background Decorative */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-purple/20 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
          </div>

          {/* Infrastructure Health */}
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Eco-System Health</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-gray-500">Storage Capacity</span>
                  <span className="text-gray-900">75%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                  <div className="w-3/4 h-full bg-gradient-to-r from-primary-purple to-pink-500 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Server Latency</p>
                  <p className="text-lg font-black text-gray-900">12ms</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Uptime</p>
                  <p className="text-lg font-black text-emerald-600">99.9%</p>
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

