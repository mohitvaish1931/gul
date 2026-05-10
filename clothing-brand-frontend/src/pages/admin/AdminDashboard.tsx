import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Users, Package, ArrowUp, ChevronRight, PieChart, TrendingUp, Settings
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
      name: 'TOTAL ORDERS', 
      value: orders.length > 0 ? orders.length : 120, 
      icon: ShoppingBag, 
      color: 'bg-emerald-50', 
      iconColor: 'text-emerald-500',
      change: '12%',
      isPositive: true,
      barColor: 'bg-emerald-400'
    },
    { 
      name: 'TOTAL CUSTOMERS', 
      value: new Set(orders.map(o => o.user?._id || o.user)).size > 0 ? new Set(orders.map(o => o.user?._id || o.user)).size : 256, 
      icon: Users, 
      color: 'bg-indigo-50', 
      iconColor: 'text-indigo-500',
      change: '8%',
      isPositive: true,
      barColor: 'bg-indigo-400'
    },
    { 
      name: 'TOTAL PRODUCTS', 
      value: state.products.length > 0 ? state.products.length : 34, 
      icon: Package, 
      color: 'bg-purple-50', 
      iconColor: 'text-purple-500',
      change: '5%',
      isPositive: true,
      barColor: 'bg-purple-400'
    },
    { 
      name: 'REVENUE', 
      value: totalRevenue > 0 ? `₹${totalRevenue.toLocaleString()}` : '₹2,45,680', 
      icon: TrendingUp, 
      color: 'bg-pink-50', 
      iconColor: 'text-pink-500',
      change: '15%',
      isPositive: true,
      barColor: 'bg-pink-400'
    },
  ];

  const recentOrders = orders.slice(0, 5).map(order => ({
    id: order._id,
    orderNumber: order.orderNumber || `MOR-OLD-${order._id.substring(0, 4)}`,
    customer: order.shippingAddress?.name || order.user?.name || 'Guest',
    product: order.items?.[0]?.name + (order.items?.length > 1 ? ` +${order.items.length - 1}` : ''),
    amount: `₹${order.totalAmount?.toLocaleString()}`,
    status: order.status || 'Processing'
  }));

  return (
    <>
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-gold-primary/10 shadow-sm relative overflow-hidden mb-10">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-text-primary luxury-serif mb-2">
            Welcome back, <span className="text-primary-purple">Admin</span> 👋
          </h1>
          <p className="text-text-muted text-sm font-medium">
            Here's what's happening with <span className="text-gold-primary font-bold">Gul Fashion</span> today.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-gray-50/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Current Date</p>
              <p className="text-sm font-bold text-gray-800">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-purple shadow-sm border border-gray-100">
              <PieChart className="w-5 h-5" />
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} ${stat.iconColor} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                <ArrowUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</p>
            </div>

            <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden mt-6">
              <div className={`h-full ${stat.barColor} w-2/3 opacity-40 group-hover:w-full transition-all duration-1000`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-gray-50 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-primary-purple">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">RECENT ACTIVITY</h3>
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-bold text-yellow-600 hover:text-primary-purple transition-all tracking-widest uppercase flex items-center gap-1"
            >
              ALL ORDERS <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">ORDER ID</th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">CUSTOMER</th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRODUCT</th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">AMOUNT</th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-semibold text-gray-600">
                      {order.orderNumber}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                          {order.customer.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-700 font-semibold">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs text-gray-500">
                      {order.product}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs text-gray-800 font-bold tabular-nums">
                      {order.amount}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
                        order.status === 'Paid' || order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'Processing' ? 'bg-yellow-50 text-yellow-600' :
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-50 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-32 h-32 mb-6 opacity-20 relative">
                          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 30 L50 15 L80 30 L80 70 L50 85 L20 70 Z" />
                            <path d="M20 30 L50 45 L80 30" />
                            <path d="M50 45 L50 85" />
                            <circle cx="50" cy="50" r="10" className="animate-pulse" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Once you receive orders, they will appear here.</p>
                        <button onClick={() => navigate('/admin/orders')} className="mt-4 px-6 py-2.5 bg-primary-purple/5 text-primary-purple rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary-purple hover:text-white transition-all">
                          View All Orders
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Storage */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-50 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-5 h-5 text-gray-800" />
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">QUICK ACTIONS</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-purple-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100/50 flex items-center justify-center text-purple-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Add Product</p>
                    <p className="text-[10px] text-gray-400">Create a new luxury item</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-purple group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/admin/banners')}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-yellow-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100/50 flex items-center justify-center text-yellow-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Manage Banners</p>
                    <p className="text-[10px] text-gray-400">Update store promotions</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/admin/settings')}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Store Settings</p>
                    <p className="text-[10px] text-gray-400">Configure your platform</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Storage Status */}
          <div className="bg-white border border-gray-50 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-gray-800" />
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">STORAGE STATUS</h3>
            </div>
            
            <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden mb-3">
              <div className="w-3/4 h-full bg-yellow-500 rounded-full shadow-sm"></div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-800">75% of 5GB used</p>
              <p className="text-[10px] font-bold text-gray-400">3.75 GB / 5 GB</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
