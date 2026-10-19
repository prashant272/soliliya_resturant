import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layers, Utensils, Package, Plus, ArrowRight, Eye, ShieldCheck, Calendar } from 'lucide-react';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        categoriesCount: 0,
        todayCategoriesCount: 0,
        menuItemsCount: 0,
        ordersCount: 0,
        bookingsCount: 0,
        pendingBookingsCount: 0
    });
    const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch categories
                const categoriesRes = await axios.get(`${baseUrl}/categories`).catch(() => ({ data: [] }));
                const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
                const todayCategories = categories.filter(c => c.today === true);

                // Fetch menu
                const menuRes = await axios.get(`${baseUrl}/menu`).catch(() => ({ data: [] }));
                const menuItems = Array.isArray(menuRes.data) ? menuRes.data : [];

                // Fetch orders
                const ordersRes = await axios.get(`${baseUrl}/orders`, config).catch(() => ({ data: [] }));
                const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

                // Fetch reservations / bookings
                const bookingsRes = await axios.get(`${baseUrl}/reservation`, config).catch(() => ({ data: [] }));
                const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];
                const pendingBookings = bookings.filter(b => b.status === 'Pending');

                setStats({
                    categoriesCount: categories.length,
                    todayCategoriesCount: todayCategories.length,
                    menuItemsCount: menuItems.length,
                    ordersCount: orders.length,
                    bookingsCount: bookings.length,
                    pendingBookingsCount: pendingBookings.length
                });
            } catch (err) {
                console.error("Dashboard data load error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [baseUrl]);

    return (
        <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-[#142218] p-6 sm:p-8 rounded-3xl border border-[#253c2b] shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c4d25]/40 border border-[#2d5a27]/50 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-3">
                        <ShieldCheck size={14} />
                        <span>Admin Portal • Wilma Restaurant</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        Welcome to Admin Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-[#8ea693] mt-2 font-medium leading-relaxed">
                        Quickly manage daily showcase dishes ("TODAY'S OFFER"), the full restaurant menu, and customer orders.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
                    <Utensils size={240} className="text-[#d4af37]" />
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Stat 1: Daily Showcase */}
                <div className="bg-[#142218] p-5 sm:p-6 rounded-2xl border border-[#253c2b] shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8ea693] uppercase tracking-wider">Today's Showcase</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#d4af37] mt-1">
                            {loading ? '-' : stats.todayCategoriesCount}
                        </h3>
                        <p className="text-[11px] text-[#6c8572] mt-1 font-medium">Visible on Homepage</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1c4d25]/30 border border-[#2d5a27]/40 flex items-center justify-center text-[#d4af37]">
                        <Eye size={22} />
                    </div>
                </div>

                {/* Stat 2: Total Categories */}
                <div className="bg-[#142218] p-5 sm:p-6 rounded-2xl border border-[#253c2b] shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8ea693] uppercase tracking-wider">Total Categories</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            {loading ? '-' : stats.categoriesCount}
                        </h3>
                        <p className="text-[11px] text-[#6c8572] mt-1 font-medium">In Database</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1c4d25]/30 border border-[#2d5a27]/40 flex items-center justify-center text-[#d4af37]">
                        <Layers size={22} />
                    </div>
                </div>

                {/* Stat 3: Menu Items */}
                <div className="bg-[#142218] p-5 sm:p-6 rounded-2xl border border-[#253c2b] shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8ea693] uppercase tracking-wider">Menu Dishes</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            {loading ? '-' : stats.menuItemsCount}
                        </h3>
                        <p className="text-[11px] text-[#6c8572] mt-1 font-medium">Active in Full Menu</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1c4d25]/30 border border-[#2d5a27]/40 flex items-center justify-center text-[#d4af37]">
                        <Utensils size={22} />
                    </div>
                </div>

                {/* Stat 4: Orders */}
                <div className="bg-[#142218] p-5 sm:p-6 rounded-2xl border border-[#253c2b] shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8ea693] uppercase tracking-wider">Total Orders</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            {loading ? '-' : stats.ordersCount}
                        </h3>
                        <p className="text-[11px] text-[#6c8572] mt-1 font-medium">Customer Orders</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1c4d25]/30 border border-[#2d5a27]/40 flex items-center justify-center text-[#d4af37]">
                        <Package size={22} />
                    </div>
                </div>

                {/* Stat 5: Table Bookings */}
                <div className="bg-[#142218] p-5 sm:p-6 rounded-2xl border border-[#253c2b] shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8ea693] uppercase tracking-wider">Table Bookings</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            {loading ? '-' : stats.bookingsCount}
                        </h3>
                        <p className="text-[11px] text-amber-400 mt-1 font-medium">
                            {stats.pendingBookingsCount} Pending Review
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1c4d25]/30 border border-[#2d5a27]/40 flex items-center justify-center text-[#d4af37]">
                        <Calendar size={22} />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Link
                    to="/admin/categories"
                    className="p-6 bg-[#142218] hover:bg-[#1a2d1f] rounded-2xl border border-[#253c2b] transition-all group flex items-center justify-between shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1c4d25] text-white flex items-center justify-center font-bold">
                            <Layers size={22} />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-base text-white group-hover:text-[#d4af37] transition-colors">
                                Daily Categories
                            </h4>
                            <p className="text-xs text-[#8ea693] mt-0.5">
                                Add categories &amp; showcase.
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={18} className="text-[#8ea693] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                    to="/admin/menu"
                    className="p-6 bg-[#142218] hover:bg-[#1a2d1f] rounded-2xl border border-[#253c2b] transition-all group flex items-center justify-between shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1c4d25] text-white flex items-center justify-center font-bold">
                            <Utensils size={22} />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-base text-white group-hover:text-[#d4af37] transition-colors">
                                Menu Management
                            </h4>
                            <p className="text-xs text-[#8ea693] mt-0.5">
                                Add dishes, prices, and photos.
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={18} className="text-[#8ea693] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                    to="/admin/bookings"
                    className="p-6 bg-[#142218] hover:bg-[#1a2d1f] rounded-2xl border border-[#253c2b] transition-all group flex items-center justify-between shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1c4d25] text-white flex items-center justify-center font-bold">
                            <Calendar size={22} />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-base text-white group-hover:text-[#d4af37] transition-colors">
                                Table Bookings
                            </h4>
                            <p className="text-xs text-[#8ea693] mt-0.5">
                                Confirm &amp; assign table numbers.
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={18} className="text-[#8ea693] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
