import { useState, useEffect } from 'react';
import {
  ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight,
  IndianRupee, Plus, Eye, Clock, BarChart3
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
      up: true,
      icon: IndianRupee,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-200/60',
      lightBg: 'bg-emerald-50',
    },
    {
      label: 'Total Orders',
      value: orders.length > 0 ? orders.length.toString() : '128',
      change: '+8.2%',
      up: true,
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-200/60',
      lightBg: 'bg-blue-50',
    },
    {
      label: 'Products',
      value: state.products.length > 0 ? state.products.length.toString() : '34',
      change: '+3 new',
      up: true,
      icon: Package,
      gradient: 'from-purple-500 to-violet-600',
      shadow: 'shadow-purple-200/60',
      lightBg: 'bg-purple-50',
    },
    {
      label: 'Customers',
      value: uniqueCustomers > 0 ? uniqueCustomers.toString() : '256',
      change: '-2.4%',
      up: false,
      icon: Users,
      gradient: 'from-orange-400 to-rose-500',
      shadow: 'shadow-orange-200/60',
      lightBg: 'bg-orange-50',
    },
  ];

  const recentOrders = orders.slice(0, 6).map(order => ({
    id: order._id,
    number: order.orderNumber || `#${order._id.substring(0, 6).toUpperCase()}`,
    customer: order.shippingAddress?.name || order.user?.name || 'Guest',
    items: order.items?.length || 0,
    amount: `₹${order.totalAmount?.toLocaleString() || '0'}`,
    status: order.status || 'Processing',
    date: new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }));

  const statusStyle: Record<string, string> = {
    Paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Processing: 'bg-amber-100 text-amber-700 border-amber-200',
    Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {state.user?.name || 'Admin'} 👋</h1>
        </div>
        <button
          onClick={() => navigate('/admin/products/add')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-purple text-white text-sm font-medium rounded-xl hover:bg-primary-purple/90 shadow-lg shadow-purple-200/40 transition-all hover:shadow-xl hover:shadow-purple-200/50 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg ${s.shadow}`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
              }`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </span>
            </div>
            <p className="text-[26px] font-bold text-gray-900 leading-none tabular-nums">{s.value}</p>
            <p className="text-[13px] text-gray-400 mt-1.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-semibold text-primary-purple hover:text-primary-purple/80 flex items-center gap-1 transition-colors"
            >
              View All
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8f9fb]">
                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#f8f9fb]/60 transition-colors cursor-pointer">
                      <td className="px-5 py-3">
                        <span className="text-sm font-semibold text-gray-800">{o.number}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600">
                            {o.customer.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-700">{o.customer}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500 hidden md:table-cell">{o.date}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-gray-900 tabular-nums">{o.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${statusStyle[o.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">No orders yet</p>
              <p className="text-xs text-gray-400 mb-5">Orders will appear here once customers start purchasing.</p>
              <button
                onClick={() => navigate('/admin/orders')}
                className="text-xs font-semibold text-primary-purple hover:underline"
              >
                Go to Orders →
              </button>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Add Product', desc: 'Create new listing', icon: Plus, action: () => navigate('/admin/products/add'), color: 'purple' },
                { label: 'View Products', desc: 'Browse catalog', icon: Eye, action: () => navigate('/admin/products'), color: 'blue' },
                { label: 'Manage Banners', desc: 'Update storefront', icon: BarChart3, action: () => navigate('/admin/banners'), color: 'emerald' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[#f8f9fb] transition-all group active:scale-[0.99]"
                >
                  <div className={`w-9 h-9 rounded-lg bg-${item.color}-50 group-hover:bg-${item.color}-100 flex items-center justify-center text-${item.color}-600 transition-colors`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Store Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Store Overview</h2>

            {/* Storage */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">Media Storage</span>
                <span className="font-semibold text-gray-700">3.75 / 5 GB</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-primary-purple to-purple-400 rounded-full" />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
              {[
                { label: 'Active Products', value: state.products.length || 34, color: 'text-gray-900' },
                { label: 'Total Orders', value: orders.length || 128, color: 'text-gray-900' },
                { label: 'Conversion', value: '4.2%', color: 'text-emerald-600' },
                { label: 'Avg. Order', value: '₹1,920', color: 'text-gray-900' },
              ].map((m) => (
                <div key={m.label} className="bg-[#f8f9fb] rounded-xl p-3">
                  <p className="text-[11px] text-gray-400 font-medium mb-0.5">{m.label}</p>
                  <p className={`text-lg font-bold ${m.color} tabular-nums`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
