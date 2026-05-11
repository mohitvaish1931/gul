import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import {
  Package, Users, ShoppingBag, LayoutDashboard, Tag, Settings,
  LogOut, Bell, Search, Menu, Home, ExternalLink,
  Ticket, Image as ImageIcon, ChevronLeft, PanelLeftClose, PanelLeft
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useAppContext();

  useEffect(() => {
    if (!state.user || !state.user.isAdmin) {
      navigate('/login');
    }
  }, [state.user, navigate]);

  const navSections = [
    {
      label: 'Menu',
      items: [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/admin/products', label: 'Products', icon: ShoppingBag },
        { to: '/admin/orders', label: 'Orders', icon: Ticket },
        { to: '/admin/customers', label: 'Customers', icon: Users },
        { to: '/admin/inventory', label: 'Inventory', icon: Package },
      ],
    },
    {
      label: 'Store',
      items: [
        { to: '/admin/banners', label: 'Banners', icon: ImageIcon },
        { to: '/admin/promotions', label: 'Promotions', icon: Tag },
        { to: '/admin/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const sidebarWidth = collapsed ? 'w-[72px]' : 'w-[260px]';

  return (
    <div className="h-screen flex bg-[#f8f9fb] overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${sidebarWidth} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white border-r border-gray-200 flex flex-col
          transition-all duration-300 ease-in-out shrink-0
        `}
      >
        {/* Brand */}
        <div className={`h-[64px] flex items-center border-b border-gray-100 shrink-0 ${collapsed ? 'justify-center px-2' : 'px-5 justify-between'}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-purple to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-200">
              <span className="text-white font-bold text-base">G</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-gray-900 leading-tight truncate">Gul Fashion</p>
                <p className="text-[11px] text-gray-400">Admin Panel</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => { setCollapsed(true); setMobileOpen(false); }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors hidden lg:flex"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
          {!collapsed && (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5 scrollbar-hide">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{section.label}</p>
              )}
              {collapsed && <div className="mb-1" />}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl transition-all duration-200 group
                      ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'}
                      ${isActive
                        ? 'bg-primary-purple text-white shadow-md shadow-purple-200/50'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3 space-y-0.5 shrink-0">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full p-3 flex justify-center rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              <PanelLeft className="w-[18px] h-[18px]" />
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'}`}
          >
            <Home className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="text-[13px] font-medium">Visit Store</span>}
          </button>
          <button
            onClick={() => { /* TODO: logout */ }}
            className={`w-full flex items-center gap-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'}`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="text-[13px] font-medium">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors hidden lg:flex"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-56 lg:w-72 bg-[#f8f9fb] border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm placeholder-gray-400 focus:bg-white focus:border-primary-purple/30 focus:ring-2 focus:ring-primary-purple/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-primary-purple rounded-lg hover:bg-purple-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Store
            </a>
            <button className="p-2 relative rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-purple to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {state.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-none">{state.user?.name || 'Admin'}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
