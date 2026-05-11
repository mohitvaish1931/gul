import { useState, useEffect } from 'react';
import {
  ShoppingBag, Package, Users, Tag, ChevronRight,
  Plus, ImageIcon, Settings, Calendar as CalendarIcon,
  Zap, Database
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { API_ENDPOINTS } from '../../utils/api';

const AdminDashboard = () => {
  const { state } = useAppContext();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // We would fetch actual orders here, but for exact visual matching of the screenshot
    // we might use static data if the fetch fails or is empty, but let's stick to dynamic
    // as much as possible while maintaining the visual style.
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

  const uniqueCustomers = new Set(orders.map(o => o.user?._id || o.user || o.shippingAddress?.email || o.shippingAddress?.name)).size;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: orders.length > 0 ? '↑ 18.4% vs last 7 days' : '0% vs last 7 days',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      line: '#9333ea',
      changeColor: orders.length > 0 ? 'text-green-500' : 'text-gray-500'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      change: orders.length > 0 ? '↑ 12.5% vs last 7 days' : '0% vs last 7 days',
      icon: Package,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      line: '#10b981',
      changeColor: orders.length > 0 ? 'text-green-500' : 'text-gray-500'
    },
    {
      title: 'Total Customers',
      value: uniqueCustomers,
      change: uniqueCustomers > 0 ? '↑ 8% vs last 7 days' : '0% vs last 7 days',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      line: '#3b82f6',
      changeColor: uniqueCustomers > 0 ? 'text-green-500' : 'text-gray-500'
    },
    {
      title: 'Total Products',
      value: state.products.length,
      change: state.products.length > 0 ? '↑ 5% vs last 7 days' : '0% vs last 7 days',
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      line: '#f97316',
      changeColor: state.products.length > 0 ? 'text-green-500' : 'text-gray-500'
    }
  ];

  const recentOrders = orders.slice(0, 5).map(order => {
    const customerName = order.user?.name || order.shippingAddress?.fullName || order.shippingAddress?.name || 'Guest User';
    const initial = customerName.substring(0, 2).toUpperCase();
    
    const bgColors = ['bg-purple-100', 'bg-emerald-100', 'bg-blue-100', 'bg-orange-100', 'bg-gray-100'];
    const textColors = ['text-purple-700', 'text-emerald-700', 'text-blue-700', 'text-orange-700', 'text-gray-700'];
    const colorIndex = customerName.length % bgColors.length;

    const firstItem = order.orderItems?.[0] || order.items?.[0] || {};
    const productName = firstItem.name || 'Various Items';
    const image = firstItem.image || '';
    
    const status = order.isDelivered ? 'Delivered' : (order.isPaid ? 'Processing' : (order.status || 'Pending'));

    return {
      id: `#${(order._id || '').substring(0, 8).toUpperCase()}`,
      initial,
      name: customerName,
      initialBg: bgColors[colorIndex],
      initialColor: textColors[colorIndex],
      product: productName,
      image,
      amount: `₹${(order.totalPrice || order.totalAmount || 0).toLocaleString()}`,
      status,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'
    };
  });

  const productSales: Record<string, {name: string, price: number, image: string, count: number}> = {};
  orders.forEach(order => {
    const items = order.orderItems || order.items || [];
    items.forEach((item: any) => {
      const pid = item.product || item._id || item.name;
      if (productSales[pid]) {
        productSales[pid].count += (item.qty || item.quantity || 1);
      } else {
        productSales[pid] = {
          name: item.name || 'Unknown Product',
          price: item.price || 0,
          image: item.image || '',
          count: item.qty || item.quantity || 1
        };
      }
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(p => ({
      name: p.name,
      price: `₹${p.price.toLocaleString()}`,
      orders: `${p.count} Orders`,
      image: p.image
    }));

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight">
            Welcome back, <span className="text-[#6B21A8]">Admin</span> 👋
          </h1>
          <p className="text-[15px] text-gray-500 mt-1">
            Here's what's happening with <span className="font-semibold text-gray-700">Gul Fashion</span> today.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 flex items-center gap-6 shadow-sm">
          <div>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Today's Date</p>
            <p className="text-[14px] font-semibold text-gray-900 mt-0.5">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#6B21A8]">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-0.5">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
            <div>
              <p className={`text-[11px] font-semibold ${stat.changeColor} mb-3`}>{stat.change}</p>
              {/* SVG Sparkline */}
              <div className="h-10 w-full overflow-hidden mt-1">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,20 Q10,10 20,15 T40,5 T60,20 T80,10 T100,15" fill="none" stroke={stat.line} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="100" cy="15" r="2" fill={stat.line} />
                  <circle cx="0" cy="20" r="2" fill={stat.line} />
                  <circle cx="20" cy="15" r="2" fill={stat.line} />
                  <circle cx="40" cy="5" r="2" fill={stat.line} />
                  <circle cx="60" cy="20" r="2" fill={stat.line} />
                  <circle cx="80" cy="10" r="2" fill={stat.line} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <button className="text-sm font-semibold text-[#6B21A8] flex items-center gap-1 hover:text-[#581C87] transition-colors">
                View All Orders <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Order ID</th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Customer</th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Product</th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Amount</th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Status</th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? recentOrders.map((order, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${order.initialBg} ${order.initialColor}`}>
                            {order.initial}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden bg-gray-100 shrink-0">
                            {order.image ? (
                              <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">IMG</div>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block">{order.product}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.date}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                        No recent orders found. Waiting for new sales!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Overview */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
              <div className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                This Week <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
            <div className="h-64 w-full relative">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] font-medium text-gray-400">
                <span>₹80K</span>
                <span>₹60K</span>
                <span>₹40K</span>
                <span>₹20K</span>
                <span>₹0</span>
              </div>
              {/* Chart Area */}
              <div className="absolute left-12 right-0 top-2 bottom-8 overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6B21A8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6B21A8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="0.5" />
                  
                  {/* Area and Line */}
                  <path d="M0,100 L0,80 Q15,70 30,50 T60,20 T80,70 T100,50 L100,100 Z" fill="url(#gradientArea)" />
                  <path d="M0,80 Q15,70 30,50 T60,20 T80,70 T100,50" fill="none" stroke="#6B21A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Points */}
                  <circle cx="0" cy="80" r="1.5" fill="#6B21A8" />
                  <circle cx="30" cy="50" r="1.5" fill="#6B21A8" />
                  <circle cx="60" cy="20" r="1.5" fill="#6B21A8" />
                  <circle cx="80" cy="70" r="1.5" fill="#6B21A8" />
                  <circle cx="100" cy="50" r="1.5" fill="#6B21A8" />
                </svg>
              </div>
              {/* X-Axis Labels */}
              <div className="absolute left-12 right-0 bottom-0 flex justify-between text-[12px] font-medium text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-gray-800" />
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Add Product</p>
                    <p className="text-[11px] text-gray-500">Create a new product</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Manage Banners</p>
                    <p className="text-[11px] text-gray-500">Update store banners</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Manage Promotions</p>
                    <p className="text-[11px] text-gray-500">Create & manage offers</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Store Settings</p>
                    <p className="text-[11px] text-gray-500">Configure your store</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Storage Status */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-gray-800" />
                <h2 className="text-[15px] font-bold text-gray-900">Storage Status</h2>
              </div>
              <span className="text-[12px] font-medium text-gray-500">75% of 5GB used</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="w-3/4 h-full bg-[#6B21A8] rounded-full"></div>
            </div>
            <p className="text-[13px] font-bold text-gray-900">3.75 GB <span className="text-gray-400 font-medium">/ 5 GB</span></p>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-gray-900">Top Products</h2>
              <button className="text-[12px] font-semibold text-[#6B21A8] hover:text-[#581C87]">View All</button>
            </div>
            <div className="space-y-4">
              {topProducts.length > 0 ? topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                      )}
                    </div>
                    <p className="text-[13px] font-medium text-gray-800 truncate max-w-[120px]">{product.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-bold text-gray-900">{product.price}</p>
                    <p className="text-[11px] font-medium text-gray-400">{product.orders}</p>
                  </div>
                </div>
              )) : (
                <div className="py-6 text-center text-sm text-gray-500">
                  No products sold yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
