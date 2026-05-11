import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import {
  Package, Users, ShoppingBag, LayoutDashboard, Tag, Settings,
  LogOut, Bell, Search, Menu, Home, ExternalLink,
  Ticket, Image as ImageIcon, PanelLeftClose, PanelLeft
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
      label: 'Main Intelligence',
      items: [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/admin/products', label: 'Product Assets', icon: ShoppingBag },
        { to: '/admin/orders', label: 'Order Pipeline', icon: Ticket },
        { to: '/admin/customers', label: 'Elite Clients', icon: Users },
        { to: '/admin/inventory', label: 'Global Stock', icon: Package },
      ],
    },
    {
      label: 'Brand Control',
      items: [
        { to: '/admin/banners', label: 'Visual Banners', icon: ImageIcon },
        { to: '/admin/promotions', label: 'Market Deals', icon: Tag },
        { to: '/admin/settings', label: 'Core Settings', icon: Settings },
      ],
    },
  ];

  const sidebarWidth = collapsed ? 'w-[88px]' : 'w-[280px]';

  return (
    <div className="h-screen flex bg-[#FDFBF9] overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - Dark Luxury Aesthetic */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${sidebarWidth} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#0A0A0B] flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0
          shadow-[20px_0_50px_rgba(0,0,0,0.1)]
        `}
      >
        {/* Brand Section */}
        <div className={`h-[100px] flex items-center shrink-0 ${collapsed ? 'justify-center' : 'px-8 justify-between'}`}>
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-purple to-pink-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-purple to-purple-800 flex items-center justify-center shrink-0 shadow-2xl relative">
                <span className="text-white font-black text-xl italic luxury-serif">G</span>
              </div>
            </div>
            {!collapsed && (
              <div className="min-w-0 animate-in fade-in slide-in-from-left-2 duration-500">
                <p className="text-[17px] font-black text-white leading-tight luxury-serif tracking-tight">Gul Fashion</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Management Unit</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Premium List */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-10 custom-scrollbar">
          {navSections.map((section) => (
            <div key={section.label} className="space-y-3">
              {!collapsed && (
                <p className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{section.label}</p>
              )}
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 rounded-2xl transition-all duration-300 group
                      ${collapsed ? 'justify-center p-4' : 'px-5 py-3.5'}
                      ${isActive
                        ? 'bg-gradient-to-r from-primary-purple/20 to-transparent text-white border-l-4 border-primary-purple'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`w-[20px] h-[20px] shrink-0 transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-primary-purple' : 'text-gray-500'}`} />
                        {!collapsed && (
                          <span className={`text-[13px] font-bold tracking-wide ${isActive ? 'text-white' : ''}`}>
                            {item.label}
                          </span>
                        )}
                        {isActive && !collapsed && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-purple shadow-[0_0_10px_#4B0082]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer - Premium Controls */}
        <div className="p-6 space-y-3 border-t border-white/[0.05]">
          {!collapsed && (
            <div className="bg-white/[0.03] rounded-2xl p-4 mb-4 border border-white/[0.05]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-purple/10 flex items-center justify-center">
                  <PanelLeftClose className="w-4 h-4 text-primary-purple" />
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Interface Mode</p>
              </div>
              <button 
                onClick={() => setCollapsed(true)}
                className="w-full py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all"
              >
                Compact View
              </button>
            </div>
          )}
          
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all ${collapsed ? 'justify-center p-4' : 'px-5 py-3.5'}`}
          >
            <Home className="w-[20px] h-[20px]" />
            {!collapsed && <span className="text-[13px] font-bold tracking-wide">Live Portal</span>}
          </button>
          
          <button
            className={`w-full flex items-center gap-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all ${collapsed ? 'justify-center p-4' : 'px-5 py-3.5'}`}
          >
            <LogOut className="w-[20px] h-[20px]" />
            {!collapsed && <span className="text-[13px] font-bold tracking-wide">Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Framework */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Universal Header - Glassmorphic */}
        <header className="h-[100px] bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setMobileOpen(true);
              }}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-500 lg:hidden transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="hidden lg:flex p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-500 transition-all hover:scale-105 active:scale-95"
              >
                <PanelLeft className="w-5 h-5 text-primary-purple" />
              </button>
            )}

            <div className="relative group hidden md:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-purple transition-colors" />
              <input
                type="text"
                placeholder="Universal Search..."
                className="w-80 lg:w-[450px] bg-gray-50/50 border border-transparent rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:bg-white focus:border-primary-purple/10 focus:ring-4 focus:ring-primary-purple/5 outline-none transition-all duration-500 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary-purple hover:shadow-lg hover:shadow-primary-purple/5 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-primary-purple rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center">9+</span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="hidden xl:flex items-center gap-3 px-6 py-3.5 bg-[#0F1115] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                <ExternalLink className="w-4 h-4" />
                Live Store
              </button>
            </div>

            <div className="w-px h-10 bg-gray-100 mx-2 hidden sm:block"></div>

            <div className="flex items-center gap-5 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">{state.user?.name || 'Administrator'}</p>
                <p className="text-[9px] text-primary-purple font-black uppercase tracking-widest opacity-60">System Controller</p>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-[2px] shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-primary-purple font-black text-lg overflow-hidden">
                    {state.user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg shadow-emerald-500/20"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Content Surface */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(75,0,130,0.03),transparent)] pointer-events-none" />
          <div className="relative max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
