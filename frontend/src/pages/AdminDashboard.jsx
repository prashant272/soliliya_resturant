import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Utensils, LogOut, Package, Layers, Calendar, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/categories', icon: Layers, label: 'Daily Categories' },
        { path: '/admin/menu', icon: Utensils, label: 'Menu Management' },
        { path: '/admin/orders', icon: Package, label: 'Orders' },
        { path: '/admin/bookings', icon: Calendar, label: 'Table Bookings' },
    ];


    return (
        <div className="flex h-screen bg-[#0d1610] text-[#e2ece4] overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-[#142218] border-r border-[#253c2b] ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col shrink-0`}>
                <div className="p-5 flex items-center justify-between border-b border-[#253c2b] h-20">
                    <div className={`flex items-center gap-2.5 overflow-hidden ${!isSidebarOpen && 'hidden'}`}>
                        <div className="w-9 h-9 rounded-xl bg-[#1c4d25] border border-[#d4af37]/40 flex items-center justify-center font-serif font-black text-white text-base shrink-0 shadow-sm">
                            W
                        </div>
                        <div className="leading-tight truncate">
                            <span className="font-serif font-bold text-base text-white block truncate">Wilma Restaurant</span>
                            <span className="text-[10px] text-[#8ea693] font-semibold tracking-wider uppercase block">Admin Panel</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-xl text-[#d4af37] cursor-pointer"
                        title="Toggle menu"
                    >
                        <LayoutDashboard size={18} />
                    </button>
                </div>

                <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                    isActive
                                        ? 'bg-[#1c4d25] text-white shadow-md border-l-4 border-[#d4af37]'
                                        : 'text-[#9cb3a1] hover:bg-[#1a2c1f] hover:text-white'
                                }`}
                                title={item.label}
                            >
                                <item.icon size={19} className={isActive ? 'text-[#d4af37]' : 'text-[#7e9984]'} />
                                {isSidebarOpen && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Links */}
                <div className="p-3.5 border-t border-[#253c2b] space-y-1.5">
                    <Link
                        to="/"
                        target="_blank"
                        className="flex items-center space-x-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#8ea693] hover:text-white hover:bg-white/5 transition"
                    >
                        <ExternalLink size={17} />
                        {isSidebarOpen && <span>View Website</span>}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3.5 px-3.5 py-2.5 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                        <LogOut size={17} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#0d1610] p-6 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
