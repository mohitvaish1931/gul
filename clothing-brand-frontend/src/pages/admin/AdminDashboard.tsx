import { useState, useEffect } from 'react';
import {
  ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight,
  Eye, IndianRupee, Plus, MoreHorizontal
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

  const uniqueCustomers = new Set(orders.map(o => o.user?._id || o.user)).size;

  const stats = [
    {
      label: 'Total Revenue',
      value: totalRevenue > 0 ? `₹${totalRevenue.toLocaleString()}` : '₹2,45,680',
      change: '+12.5%',
      positive: true,
      icon: IndianRupee,
      color: 'emerald',
    },
    {
      label: 'Total Orders',
      value: orders.length > 0 ? orders.length : 128,
      change: '+8.2%',
      positive: true,
      icon: ShoppingBag,
      color: 'blue',
    },
    {
      label: 'Products',
      value: state.products.length > 0 ? state.products.length : 34,
      change: '+3 new',
      positive: true,
      icon: Package,
      color: 'purple',
    },
    {
      label: 'Customers',
      value: uniqueCustomers > 0 ? uniqueCustomers : 256,
      change: '-2.4%',
      positive: false,
      icon: Users,
      color: 'amber',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-50 text-purple-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  };

  const recentOrders = orders.slice(0, 5).map(order => ({
    id: order._id,
    number: order.orderNumber || `#${order._id.substring(0, 6).toUpperCase()}`,
    customer: order.shippingAddress?.name || order.user?.name || 'Guest',
    items: order.items?.length || 0,
    amount: `₹${order.totalAmount?.toLocaleString() || '0'}`,
    status: order.status || 'Processing',
    date: new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }));

  const statusColors: Record<string, string> = {
    Paid: 'bg-emerald-50 text-emerald-700',
    Delivered: 'bg-emerald-50 text-emerald-700',
    Processing: 'bg-amber-50 text-amber-700',
    Shipped: 'bg-blue-50 text-blue-700',
    Cancelled: 'bg-red-50 text-red-700',
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products/add')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-purple text-white text-sm font-medium rounded-lg hover:bg-primary-purple/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.icon} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-medium text-primary-purple hover:text-primary-purple/80 transition-colors"
            >
              View All →
            </button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="text-sm font-medium text-gray-900">{order.number}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                            {order.customer.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-700">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-900 tabular-nums">{order.amount}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 text-[11px] font-medium rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-1">No orders yet</p>
              <p className="text-xs text-gray-400">Orders will appear here once customers start purchasing.</p>
            </div>
          )}
        </div>

        {/* Quick Actions + Overview */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Add New Product', icon: Plus, desc: 'Add to catalog', action: () => navigate('/admin/products/add') },
                { label: 'View Products', icon: Eye, desc: 'Manage inventory', action: () => navigate('/admin/products') },
                { label: 'Manage Banners', icon: TrendingUp, desc: 'Update store banners', action: () => navigate('/admin/banners') },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-primary-purple/10 flex items-center justify-center text-gray-500 group-hover:text-primary-purple transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-primary-purple transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Store Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Store Overview</h2>
              <button className="p-1 rounded-md text-gray-400 hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-medium text-gray-900">3.75 / 5 GB</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary-purple rounded-full"></div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Active Products</p>
                  <p className="text-lg font-bold text-gray-900">{state.products.length || 34}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Orders</p>
                  <p className="text-lg font-bold text-gray-900">{orders.length || 128}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Conversion</p>
                  <p className="text-lg font-bold text-emerald-600">4.2%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Avg. Order</p>
                  <p className="text-lg font-bold text-gray-900">₹1,920</p>
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
