import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import {
  Package, Users, ShoppingBag, LayoutDashboard, Tag, Settings,
  LogOut, Bell, Search, Menu, Home, ExternalLink,
  Ticket, Image as ImageIcon, X, ChevronLeft
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { state } = useAppContext();

  useEffect(() => {
    if (!state.user || !state.user.isAdmin) {
      navigate('/login');
    }
  }, [state.user, navigate]);

  const navItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard, end: true },
    { path: '/admin/products', name: 'Products', icon: ShoppingBag },
    { path: '/admin/inventory', name: 'Inventory', icon: Package },
    { path: '/admin/orders', name: 'Orders', icon: Ticket },
    { path: '/admin/customers', name: 'Customers', icon: Users },
  ];

  const storeItems = [
    { path: '/admin/banners', name: 'Banners', icon: ImageIcon },
    { path: '/admin/promotions', name: 'Promotions', icon: Tag },
    { path: '/admin/settings', name: 'Settings', icon: Settings },
  ];

  const renderNavLink = (item: { path: string; name: string; icon: any; end?: boolean }) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
          isActive
            ? 'bg-primary-purple text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        } ${!sidebarOpen ? 'justify-center px-2' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : ''}`} />
          {sidebarOpen && <span>{item.name}</span>}
        </>
      )}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? 'w-64 translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-[68px]'
        }`}
      >
        {/* Logo */}
        <div className={`h-16 border-b border-gray-100 flex items-center shrink-0 ${sidebarOpen ? 'px-5 justify-between' : 'px-3 justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">Gul Fashion</p>
                <p className="text-[10px] text-gray-400 font-medium">Admin Panel</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4 lg:hidden" />
              <ChevronLeft className="w-4 h-4 hidden lg:block" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div className="space-y-1">
            {sidebarOpen && (
              <p className="px-3 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Main</p>
            )}
            {navItems.map(renderNavLink)}
          </div>

          <div className="space-y-1">
            {sidebarOpen && (
              <p className="px-3 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Store</p>
            )}
            {storeItems.map(renderNavLink)}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3 space-y-1 shrink-0">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors ${!sidebarOpen ? 'justify-center px-2' : ''}`}
          >
            <Home className="w-[18px] h-[18px] shrink-0" />
            {sidebarOpen && <span>View Store</span>}
          </button>
          <button
            onClick={() => { /* logout */ }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors ${!sidebarOpen ? 'justify-center px-2' : ''}`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {sidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-[68px]'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:bg-white focus:border-primary-purple/30 focus:ring-1 focus:ring-primary-purple/10 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Store
            </a>

            <button className="p-2 relative rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple text-xs font-bold">
                {state.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900 leading-none">{state.user?.name || 'Admin'}</p>
                <p className="text-[11px] text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
