import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { 
  Package, Users, ShoppingBag, LayoutDashboard, Tag, Settings, 
  LogOut, Bell, Search, Menu, ChevronRight, Home, ExternalLink,
  Ticket, Image as ImageIcon, X
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { state } = useAppContext();

  useEffect(() => {
    if (!state.user || !state.user.isAdmin) {
      navigate('/login');
    }
  }, [state.user, navigate]);

  const sidebarGroups = [
    {
      title: 'MANAGEMENT',
      links: [
        { path: '/admin/products', name: 'Products', icon: ShoppingBag },
        { path: '/admin/inventory', name: 'Inventory', icon: Package },
        { path: '/admin/orders', name: 'Orders', icon: Ticket },
        { path: '/admin/customers', name: 'Customers', icon: Users },
      ]
    },
    {
      title: 'STOREFRONT',
      links: [
        { path: '/admin/banners', name: 'Banners', icon: ImageIcon },
        { path: '/admin/promotions', name: 'Promotions', icon: Tag },
        { path: '/admin/settings', name: 'Store Settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Premium Sliding Sidebar */}
      <aside 
        className={`bg-[#0F1115] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col z-50 fixed inset-y-0 left-0 shadow-[25px_0_80px_-15px_rgba(0,0,0,0.35)] ${
          isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between transition-all duration-500 ${isSidebarOpen ? 'p-10' : 'p-6 justify-center'}`}>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-pink-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <svg width="42" height="42" viewBox="0 0 100 100" className="relative text-white">
                <path fill="currentColor" d="M50 10 C 60 30, 90 30, 90 50 C 90 70, 60 70, 50 90 C 40 70, 10 70, 10 50 C 10 30, 40 30, 50 10" opacity="0.1" />
                <path fill="currentColor" d="M50 20 C 55 35, 80 35, 80 50 C 80 65, 55 65, 50 80 C 45 65, 20 65, 20 50 C 20 35, 45 35, 50 20" />
                <circle cx="50" cy="50" r="4" fill="#0F1115" />
              </svg>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-black text-white tracking-tighter leading-none italic">Gul</span>
                <span className="text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase">AESTHETIC</span>
              </div>
            )}
          </div>
          
          {isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-6 py-4 space-y-10 overflow-y-auto custom-scrollbar scrollbar-hide ${!isSidebarOpen && 'flex flex-col items-center pt-8'}`}>
          {isSidebarOpen && (
            <div>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => `flex items-center transition-all duration-500 group relative gap-4 px-5 py-4 rounded-[1.25rem] ${
                  isActive
                    ? 'bg-white/10 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] border border-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <LayoutDashboard className={`w-5 h-5 shrink-0 transition-transform duration-500 group-hover:scale-110`} />
                    <span className="text-[13px] font-bold tracking-wide">Command Center</span>
                    {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary-purple shadow-[0_0_10px_#A855F7]" />}
                  </>
                )}
              </NavLink>
            </div>
          )}

          {sidebarGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              {isSidebarOpen && (
                <p className="px-5 text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">{group.title}</p>
              )}
              <div className="space-y-2">
                {group.links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `flex items-center transition-all duration-500 group relative ${
                      isSidebarOpen ? 'w-full gap-4 px-5 py-4 rounded-[1.25rem]' : 'w-12 h-12 justify-center rounded-xl'
                    } ${
                      isActive
                        ? 'bg-white/10 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] border border-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon className={`w-5 h-5 shrink-0 transition-transform duration-500 group-hover:scale-110`} />
                        {isSidebarOpen && (
                          <span className="text-[13px] font-bold tracking-wide">{link.name}</span>
                        )}
                        {isActive && isSidebarOpen && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary-purple shadow-[0_0_10px_#A855F7]" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-8 border-t border-white/5">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center transition-all duration-500 group ${
              isSidebarOpen ? 'w-full gap-4 px-6 py-4 text-gray-500 rounded-2xl hover:bg-red-500/10 hover:text-red-400' : 'w-12 h-12 justify-center mx-auto text-gray-500 rounded-xl hover:bg-red-500/10 hover:text-red-400'
            }`}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {isSidebarOpen && <span className="text-[13px] font-bold tracking-wide">Terminate Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-20'}`}>
        {/* Top Header - Glassmorphism */}
        <header className="h-28 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-40 flex items-center justify-between px-12 transition-all duration-500">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="group p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-500 text-gray-600 hover:text-primary-purple shadow-sm border border-transparent hover:border-gray-200"
            >
              {isSidebarOpen ? (
                <Menu className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
              ) : (
                <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              )}
            </button>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-purple transition-colors" />
              <input 
                type="text" 
                placeholder="Find anything..." 
                className="bg-gray-50/50 border border-transparent rounded-[1.25rem] py-3.5 pl-14 pr-8 text-sm font-medium focus:bg-white focus:border-primary-purple/20 w-[400px] transition-all duration-500 outline-none shadow-sm group-hover:shadow-md"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="hidden xl:flex items-center gap-3 px-6 py-3 bg-[#0F1115] text-white rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-black/10 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Live Portal</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </button>

            <div className="w-px h-8 bg-gray-100 mx-2"></div>

            <div className="flex items-center gap-5">
              <button className="p-3.5 relative bg-white hover:bg-gray-50 rounded-2xl transition-all duration-500 text-gray-600 border border-gray-100 shadow-sm hover:shadow-md group">
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-primary-purple rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center">3</span>
              </button>
              
              <div className="flex items-center gap-4 pl-6 border-l border-gray-100 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">Administrative Unit</p>
                  <p className="text-[9px] text-primary-purple font-black uppercase opacity-80 tracking-widest">Master Node</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-primary-purple font-black text-sm border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                    <span className="relative z-10">A</span>
                    <div className="absolute inset-0 bg-primary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrolling Content */}
        <main className="p-12 flex-1 overflow-y-auto custom-scrollbar">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

