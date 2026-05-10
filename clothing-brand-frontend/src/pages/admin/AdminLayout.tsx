import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { 
  Package, Users, ShoppingBag, LayoutDashboard, Tag, Settings, 
  LogOut, Bell, Search, Menu, ChevronRight, Home, ExternalLink,
  Ticket, Image as ImageIcon
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
      title: 'STORE',
      links: [
        { path: '/admin/banners', name: 'Banners', icon: ImageIcon },
        { path: '/admin/promotions', name: 'Promotions', icon: Tag },
        { path: '/admin/settings', name: 'Store Settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white transition-all duration-500 flex flex-col z-30 ${
          isSidebarOpen ? 'w-72' : 'w-24'
        } fixed inset-y-0 left-0 border-r border-gray-100 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.02)]`}
      >
        <div className={`flex items-center gap-3 transition-all duration-500 ${isSidebarOpen ? 'p-8' : 'p-6 justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 100 100" className="text-primary-purple">
                <path fill="currentColor" d="M50 10 C 60 30, 90 30, 90 50 C 90 70, 60 70, 50 90 C 40 70, 10 70, 10 50 C 10 30, 40 30, 50 10" opacity="0.2" />
                <path fill="currentColor" d="M50 20 C 55 35, 80 35, 80 50 C 80 65, 55 65, 50 80 C 45 65, 20 65, 20 50 C 20 35, 45 35, 50 20" />
                <circle cx="50" cy="50" r="5" fill="white" />
              </svg>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-black text-primary-purple tracking-tight leading-none">Gul</span>
                <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">Fashion</span>
              </div>
            )}
          </div>
        </div>

        <nav className={`flex-1 px-6 py-6 space-y-8 overflow-y-auto custom-scrollbar ${!isSidebarOpen && 'flex flex-col items-center'}`}>
          <div>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `flex items-center transition-all duration-300 group relative ${
                isSidebarOpen ? 'w-full gap-4 px-4 py-3 rounded-2xl' : 'w-12 h-12 justify-center rounded-2xl'
              } ${
                isActive
                  ? 'bg-primary-purple/5 text-primary-purple'
                  : 'text-gray-500 hover:text-primary-purple hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 shrink-0`} />
              {isSidebarOpen && (
                <span className="text-sm font-semibold">Dashboard</span>
              )}
            </NavLink>
          </div>

          {sidebarGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              {isSidebarOpen && (
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{group.title}</p>
              )}
              <div className="space-y-1">
                {group.links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `flex items-center transition-all duration-300 group relative ${
                      isSidebarOpen ? 'w-full gap-4 px-4 py-3 rounded-2xl' : 'w-12 h-12 justify-center rounded-2xl'
                    } ${
                      isActive
                        ? 'bg-primary-purple/5 text-primary-purple shadow-sm'
                        : 'text-gray-500 hover:text-primary-purple hover:bg-gray-50'
                    }`}
                  >
                    <link.icon className={`w-5 h-5 shrink-0`} />
                    {isSidebarOpen && (
                      <span className="text-sm font-semibold">{link.name}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center transition-all duration-300 group ${
              isSidebarOpen ? 'w-full gap-4 px-6 py-4 text-gray-500 rounded-2xl' : 'w-12 h-12 justify-center mx-auto text-gray-500 rounded-2xl'
            } hover:bg-red-50 hover:text-red-600`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-semibold">Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-72' : 'ml-24'}`}>
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 flex items-center justify-between px-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-500"
            >
              <Menu className={`w-5 h-5 transition-transform duration-500 ${!isSidebarOpen && 'rotate-90'}`} />
            </button>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-gray-50 border border-transparent rounded-xl py-2.5 pl-12 pr-6 text-sm focus:bg-white focus:border-primary-purple/20 w-80 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-600 border border-transparent hover:border-gray-200 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">View Store</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </button>

            <div className="w-px h-6 bg-gray-100 mx-2"></div>

            <button className="p-2.5 relative bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-primary-purple rounded-full border-2 border-white text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary-purple font-bold text-sm border-2 border-white shadow-sm">
                A
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-gray-800 uppercase leading-none mb-1">Admin</p>
                <p className="text-[9px] text-yellow-600 font-bold uppercase opacity-80">Master Store</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
