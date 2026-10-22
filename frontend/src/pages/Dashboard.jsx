import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    ShoppingBag, 
    Calendar, 
    User, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Truck, 
    Package, 
    Utensils, 
    UtensilsCrossed, 
    ChevronRight, 
    ArrowLeft, 
    Plus, 
    MapPin, 
    Phone, 
    Mail, 
    Shield, 
    AlertCircle, 
    RefreshCw, 
    Eye, 
    X,
    QrCode,
    Printer,
    Users,
    Share2,
    Copy,
    Check
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';



const Dashboard = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Default to 'orders' or query param / state tab
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || location.state?.tab || 'orders';
    });

    // Orders state
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // Bookings state
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [submittingBooking, setSubmittingBooking] = useState(false);
    const [selectedBookingForPass, setSelectedBookingForPass] = useState(null);
    const [shareCopied, setShareCopied] = useState(false);

    const handleSharePass = async (booking) => {
        const refCode = booking.refNum || `#WLM-${booking._id?.slice(-4).toUpperCase()}`;
        const table = booking.tableNumber || 'Miza 01';
        const shareText = `🍽️ Restavracija Wilma • POTRJENA REZERVACIJA MIZE\n\n` +
            `📍 Dodeljena miza: ${table}\n` +
            `👥 Dovoljeno oseb: ${booking.guests} oseb\n` +
            `📅 Datum in ura: ${booking.date} ob ${booking.time}\n` +
            `👤 Gost: ${booking.name}\n` +
            `🔖 Referenčna koda: ${refCode}\n\n` +
            `📍 Naslov: Dunajska cesta 106, 1000 Ljubljana\n` +
            `📞 Telefon: 40 791 618\n` +
            `🌐 Spletna stran: ${window.location.origin}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Restavracija Wilma - Potrjena VIP Propusnica',
                    text: shareText,
                });
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
            }
        }

        try {
            await navigator.clipboard.writeText(shareText);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 3000);
        } catch (copyErr) {
            alert(shareText);
        }
    };


    // New Booking Form Data
    const [bookingForm, setBookingForm] = useState({
        date: new Date().toISOString().split('T')[0],
        time: '12:30',
        guests: 2,
        purpose: 'Casual Dining',
        notes: '',
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || ''
    });

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        password: ''
    });
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
    const [profileErrorMsg, setProfileErrorMsg] = useState('');

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    const qrRef = useRef(null);

    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
                password: ''
            });
            setBookingForm(prev => ({
                ...prev,
                name: prev.name || user.name || '',
                phone: prev.phone || user.phone || '',
                email: prev.email || user.email || ''
            }));
            fetchOrders();
            fetchBookings();
        }
    }, [user]);

    // Generate dynamic QR code when viewing E-Pass
    useEffect(() => {
        if (selectedBookingForPass && qrRef.current) {
            qrRef.current.innerHTML = '';
            if (window.QRCode) {
                const qrText = `WILMA-EPASS|REF:${selectedBookingForPass.refNum || selectedBookingForPass._id}|TABLE:${selectedBookingForPass.tableNumber || 'Assigned on arrival'}|GUESTS:${selectedBookingForPass.guests}|DATE:${selectedBookingForPass.date}|TIME:${selectedBookingForPass.time}|GUEST:${selectedBookingForPass.name}`;
                new window.QRCode(qrRef.current, {
                    text: qrText,
                    width: 130,
                    height: 130,
                    colorDark: "#14331e",
                    colorLight: "#ffffff",
                    correctLevel: window.QRCode.CorrectLevel.H
                });
            }
        }
    }, [selectedBookingForPass]);


    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setLoadingOrders(false);
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${baseUrl}/orders/my-orders-auth`, config);
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setLoadingBookings(false);
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${baseUrl}/reservation/my-reservations`, config);
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        setSubmittingBooking(true);
        try {
            const token = localStorage.getItem('userToken');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const payload = {
                ...bookingForm,
                user: user?._id || user?.id || null
            };
            const { data } = await axios.post(`${baseUrl}/reservation`, payload, config);
            alert("Table reservation submitted successfully! We look forward to hosting you.");
            setIsBookingModalOpen(false);
            fetchBookings();
            // Show QR pass
            setSelectedBookingForPass(data);
        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to submit reservation: " + (error.response?.data?.message || error.message));
        } finally {
            setSubmittingBooking(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
        try {
            const token = localStorage.getItem('userToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${baseUrl}/reservation/${bookingId}/cancel`, {}, config);
            fetchBookings();
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Error cancelling reservation: " + (error.response?.data?.message || error.message));
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileSuccessMsg('');
        setProfileErrorMsg('');

        const payload = {
            name: profileForm.name,
            phone: profileForm.phone,
            address: profileForm.address
        };
        if (profileForm.password && profileForm.password.trim().length >= 6) {
            payload.password = profileForm.password.trim();
        }

        const res = await updateProfile(payload);
        setSavingProfile(false);
        if (res.success) {
            setProfileSuccessMsg('Profile details updated successfully!');
            setProfileForm(prev => ({ ...prev, password: '' }));
            setTimeout(() => setProfileSuccessMsg(''), 4000);
        } else {
            setProfileErrorMsg(res.message || 'Failed to update profile.');
        }
    };

    const formatPrice = (amount) => {
        const num = Number(amount);
        if (num > 50) return `₹${num}`;
        return `€${num.toFixed(2)}`;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-amber-50 text-amber-800 border-amber-200';
            case 'Confirmed':
                return 'bg-blue-50 text-blue-800 border-blue-200';
            case 'Preparing':
                return 'bg-orange-50 text-orange-800 border-orange-200';
            case 'Out for Delivery':
                return 'bg-indigo-50 text-indigo-800 border-indigo-200';
            case 'Delivered':
            case 'Completed':
                return 'bg-emerald-50 text-[#2d5a27] border-emerald-200';
            case 'Cancelled':
                return 'bg-red-50 text-red-800 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    if (!user) {
        return (
            <div className="min-h-[70vh] bg-[#fcfbf7] flex items-center justify-center px-4 py-20">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-[#eaf1e9] text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#1c241b]">Account Sign In Required</h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Please log in or create an account to view your dashboard, track orders, and manage table reservations.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                        <Link
                            to="/login"
                            className="w-full bg-[#2d5a27] hover:bg-[#23481f] text-white py-3 rounded-xl font-bold transition shadow-md"
                        >
                            Log In to Account
                        </Link>
                        <Link
                            to="/register"
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf7] text-[#1c241b] pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Page Title & Subtitle */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#14331e] tracking-tight">
                        My Account
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Manage your orders, reservations and personal details.
                    </p>
                </div>

                {/* 3 Nav Cards matching screenshot */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
                    
                    {/* Orders Card */}
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                            activeTab === 'orders'
                                ? 'bg-[#f4f8f4] border-[#2d5a27] shadow-sm ring-1 ring-[#2d5a27]/30'
                                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
                        }`}
                    >
                        <div className="text-[#2d5a27] mb-2.5">
                            <ShoppingBag size={22} />
                        </div>
                        <h2 className="text-base font-bold text-[#1c241b] leading-tight">Orders</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Track orders</p>
                    </button>

                    {/* Bookings Card */}
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                            activeTab === 'bookings'
                                ? 'bg-[#f4f8f4] border-[#2d5a27] shadow-sm ring-1 ring-[#2d5a27]/30'
                                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
                        }`}
                    >
                        <div className="text-[#2d5a27] mb-2.5">
                            <Calendar size={22} />
                        </div>
                        <h2 className="text-base font-bold text-[#1c241b] leading-tight">Bookings</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Manage tables</p>
                    </button>

                    {/* Profile Card */}
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                            activeTab === 'profile'
                                ? 'bg-[#f4f8f4] border-[#2d5a27] shadow-sm ring-1 ring-[#2d5a27]/30'
                                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
                        }`}
                    >
                        <div className="text-[#2d5a27] mb-2.5">
                            <User size={22} />
                        </div>
                        <h2 className="text-base font-bold text-[#1c241b] leading-tight">Profile</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Edit details</p>
                    </button>

                </div>

                {/* TAB 1: ORDERS */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-[#14331e]">Recent Orders</h2>
                                <p className="text-xs text-gray-500">Live order status and past meal history</p>
                            </div>
                            <Link
                                to="/menu"
                                className="text-xs font-semibold text-[#2d5a27] hover:text-[#d4af37] flex items-center gap-1 transition"
                            >
                                Order Food →
                            </Link>
                        </div>

                        {loadingOrders ? (
                            <div className="py-12 text-center text-gray-400 text-sm">
                                <RefreshCw className="animate-spin inline-block mr-2" size={16} /> Loading your orders...
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="w-14 h-14 bg-[#f5ede0] rounded-full flex items-center justify-center mx-auto mb-3 text-[#2d5a27]">
                                    <ShoppingBag size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-base">No orders placed yet</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                    Taste our freshly prepared lunches, Slovenian specialties, and chef's daily selection.
                                </p>
                                <Link
                                    to="/menu"
                                    className="inline-block mt-4 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                                >
                                    Explore Menu
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => {
                                    const itemCount = order.items?.reduce((acc, it) => acc + (it.quantity || 1), 0) || order.items?.length || 1;
                                    const firstItemName = order.items?.[0]?.name || 'Delicious Meal';
                                    const isExpanded = expandedOrderId === order._id;

                                    return (
                                        <div key={order._id} className="py-4 first:pt-0 last:pb-0">
                                            <div 
                                                onClick={() => setExpandedOrderId(isExpanded ? null : order._id)}
                                                className="flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/80 p-2 rounded-xl transition"
                                            >
                                                <div className="flex items-center gap-3.5">
                                                    {/* Soft cream square food badge matching screenshot */}
                                                    <div className="w-12 h-12 rounded-xl bg-[#f5ede0] text-[#2d5a27] flex items-center justify-center flex-shrink-0">
                                                        <UtensilsCrossed size={20} />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-bold text-sm sm:text-base text-[#1c241b] line-clamp-1">
                                                            {firstItemName}
                                                            {order.items?.length > 1 && (
                                                                <span className="text-xs font-normal text-gray-500 ml-1.5">
                                                                    +{order.items.length - 1} more
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            Order #{order._id?.slice(-8).toUpperCase()} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                                        </p>
                                                        <div className="mt-1">
                                                            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getStatusBadge(order.status || 'Pending')}`}>
                                                                {order.status || 'Pending'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right flex-shrink-0">
                                                    <span className="text-base sm:text-lg font-bold text-[#1c241b]">
                                                        {formatPrice(order.finalAmount || order.totalAmount || 0)}
                                                    </span>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Expanded Order Breakdown */}
                                            {isExpanded && (
                                                <div className="mt-3 pl-4 sm:pl-16 pr-2 pt-3 border-t border-gray-100 bg-gray-50/60 rounded-xl p-4 text-xs">
                                                    <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-2">Order Items:</h4>
                                                    <div className="space-y-1.5 mb-3">
                                                        {order.items?.map((it, idx) => (
                                                            <div key={idx} className="flex justify-between text-gray-700">
                                                                <span>{it.quantity}x {it.name} {it.variant ? `(${it.variant})` : ''}</span>
                                                                <span className="font-semibold">{formatPrice(it.price * (it.quantity || 1))}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {order.customer?.address && (
                                                        <div className="pt-2 border-t border-gray-200/60 text-gray-600 flex items-start gap-1.5">
                                                            <MapPin size={13} className="text-[#2d5a27] mt-0.5 flex-shrink-0" />
                                                            <span>Delivery Address: {order.customer.address}</span>
                                                        </div>
                                                    )}

                                                    <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-200/60">
                                                        <span className="text-gray-500">Payment: <strong className="text-gray-800">{order.paymentMethod || 'Cash on Delivery'}</strong></span>
                                                        <Link
                                                            to="/menu"
                                                            className="text-[#2d5a27] font-bold hover:underline"
                                                        >
                                                            Order Again
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: BOOKINGS (TABLE RESERVATION) */}
                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-100 gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-[#14331e]">Table Reservations</h2>
                                <p className="text-xs text-gray-500">Book, manage, and track your VIP table reservations</p>
                            </div>
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="bg-[#2d5a27] hover:bg-[#23481f] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                            >
                                <Plus size={16} /> Book a Table
                            </button>
                        </div>

                        {loadingBookings ? (
                            <div className="py-12 text-center text-gray-400 text-sm">
                                <RefreshCw className="animate-spin inline-block mr-2" size={16} /> Loading reservations...
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="w-14 h-14 bg-[#f5ede0] rounded-full flex items-center justify-center mx-auto mb-3 text-[#2d5a27]">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-base">No table reservations yet</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                    Reserve a table online in seconds for lunch, business meetings, or special occasions.
                                </p>
                                <button
                                    onClick={() => setIsBookingModalOpen(true)}
                                    className="inline-block mt-4 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
                                >
                                    Book a Table Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div
                                        key={booking._id}
                                        className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white hover:border-[#2d5a27]/40 transition shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#eaf1e9] text-[#2d5a27] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Utensils size={20} />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="font-mono font-bold text-sm sm:text-base text-[#1c241b]">
                                                        {booking.refNum || `#WLM-${booking._id.slice(-4).toUpperCase()}`}
                                                    </span>
                                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(booking.status || 'Pending')}`}>
                                                        {booking.status || 'Pending'}
                                                    </span>
                                                    {booking.tableNumber && (
                                                        <span className="px-2.5 py-0.5 rounded-md bg-[#2d5a27] text-white font-bold text-xs shadow-2xs">
                                                            {booking.tableNumber}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-700 font-semibold mt-1 flex items-center gap-1.5">
                                                    <Clock size={13} className="text-[#2d5a27]" />
                                                    <span>{booking.date} at {booking.time}</span>
                                                    <span className="text-gray-400">·</span>
                                                    <span className="text-[#2d5a27] font-bold">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'} Allowed</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Purpose: <span className="font-medium text-gray-700">{booking.purpose || 'Casual Dining'}</span>
                                                </p>
                                                {booking.adminNote && (
                                                    <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg mt-1 font-medium">
                                                        Note from restaurant: "{booking.adminNote}"
                                                    </div>
                                                )}
                                                {booking.notes && !booking.adminNote && (
                                                    <p className="text-[11px] text-gray-500 italic mt-1">
                                                        "{booking.notes}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                                            {booking.status === 'Confirmed' ? (
                                                <button
                                                    onClick={() => setSelectedBookingForPass(booking)}
                                                    className="text-xs bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                                                >
                                                    <QrCode size={15} /> 🎫 View E-Pass
                                                </button>
                                            ) : booking.status === 'Pending' ? (
                                                <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
                                                    <Clock size={12} /> Awaiting Confirmation
                                                </span>
                                            ) : (
                                                <span className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
                                                    <XCircle size={12} /> {booking.status || 'Declined'}
                                                </span>
                                            )}

                                            {booking.status !== 'Cancelled' && booking.status !== 'Rejected' && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-2 rounded-lg transition cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: PROFILE */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                        <div className="pb-4 mb-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-[#14331e]">Personal Details</h2>
                            <p className="text-xs text-gray-500">Update your account name, contact details, and address</p>
                        </div>

                        {profileSuccessMsg && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                                <CheckCircle size={16} /> {profileSuccessMsg}
                            </div>
                        )}

                        {profileErrorMsg && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                                <AlertCircle size={16} /> {profileErrorMsg}
                            </div>
                        )}

                        <form onSubmit={handleProfileSubmit} className="space-y-5 max-w-xl">
                            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                <div className="w-14 h-14 rounded-2xl bg-[#2d5a27] text-white flex items-center justify-center font-bold text-xl">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-[#1c241b]">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-[#2d5a27] bg-[#eaf1e9] px-2 py-0.5 rounded-full">
                                        Verified Customer
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:border-[#2d5a27] focus:ring-1 focus:ring-[#2d5a27] outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">Email address is connected to your login credentials.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={profileForm.phone}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                    placeholder="e.g. 40 791 618"
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:border-[#2d5a27] focus:ring-1 focus:ring-[#2d5a27] outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                    Delivery Address
                                </label>
                                <textarea
                                    value={profileForm.address}
                                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                                    rows="3"
                                    placeholder="Street, Building, Apartment, City, Postal Code"
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:border-[#2d5a27] focus:ring-1 focus:ring-[#2d5a27] outline-none"
                                ></textarea>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                    Change Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    value={profileForm.password}
                                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:border-[#2d5a27] focus:ring-1 focus:ring-[#2d5a27] outline-none"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={savingProfile}
                                    className="bg-[#2d5a27] hover:bg-[#23481f] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {savingProfile ? 'Saving Changes...' : 'Save Profile Details'}
                                </button>
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                                >
                                    Log Out
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>

            {/* MODAL: BOOK A TABLE */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 relative shadow-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <span className="text-[#2d5a27] font-bold text-[11px] uppercase tracking-widest">
                                Online Reservation
                            </span>
                            <h2 className="text-2xl font-serif font-bold text-[#14331e] mt-1">
                                Book a Table at Wilma
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Instant table confirmation with QR code pass.
                            </p>
                        </div>

                        <form onSubmit={handleCreateBooking} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Date *</label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={bookingForm.date}
                                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Time *</label>
                                    <select
                                        value={bookingForm.time}
                                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none cursor-pointer"
                                        required
                                    >
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Number of Guests *</label>
                                    <select
                                        value={bookingForm.guests}
                                        onChange={(e) => setBookingForm({ ...bookingForm, guests: Number(e.target.value) })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none cursor-pointer"
                                        required
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Dining Purpose</label>
                                    <select
                                        value={bookingForm.purpose}
                                        onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none cursor-pointer"
                                    >
                                        <option value="Casual Dining">Casual Dining</option>
                                        <option value="Business Lunch">Business Lunch</option>
                                        <option value="Birthday / Celebration">Birthday / Celebration</option>
                                        <option value="Romantic Dinner">Romantic Dinner</option>
                                        <option value="Family Gathering">Family Gathering</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Contact Name *</label>
                                <input
                                    type="text"
                                    value={bookingForm.name}
                                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        value={bookingForm.phone}
                                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={bookingForm.email}
                                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                        className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Special Requests (Optional)</label>
                                <textarea
                                    value={bookingForm.notes}
                                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                                    rows="2"
                                    placeholder="Window table, baby chair, dietary requirements..."
                                    className="w-full bg-[#fcfbf7] border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:border-[#2d5a27] outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submittingBooking}
                                className="w-full bg-[#2d5a27] hover:bg-[#23481f] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer disabled:opacity-50 mt-2"
                            >
                                {submittingBooking ? 'Reserving...' : 'Confirm Table Reservation'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: VIP DINING E-PASS (STRICT 80% SCREEN HEIGHT & SLOVENIAN) */}
            {selectedBookingForPass && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div 
                        id="printable-vip-pass"
                        className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col border border-[#d4af37]/30 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    >
                        
                        {/* Ticket Top Banner (Fixed at Top) */}
                        <div className="print-banner bg-[#142218] p-4 sm:p-5 text-center text-white relative border-b border-[#d4af37]/30 flex-shrink-0">
                            <button
                                onClick={() => setSelectedBookingForPass(null)}
                                className="absolute top-3.5 right-3.5 text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer no-print"
                                aria-label="Zapri"
                            >
                                <X size={20} />
                            </button>

                            {/* White pill background for clean logo display */}
                            <div className="inline-flex items-center justify-center bg-white px-5 py-2 rounded-2xl shadow-md border border-[#d4af37]/40 mb-2">
                                <img
                                    src="/images/wilma-logo-clean.png"
                                    alt="Restavracija Wilma"
                                    className="h-10 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
                                Restavracija Wilma
                            </h3>
                            <p className="text-[11px] sm:text-xs text-[#8ea693] mt-0.5">
                                Dunajska cesta 106, 1000 Ljubljana • Tel: 40 791 618
                            </p>

                            <div className="status-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c4d25] border border-[#d4af37]/50 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mt-2.5 shadow-xs">
                                <CheckCircle size={12} />
                                <span>POTRJENA VIP PROPUSNICA ZA MIZO</span>
                            </div>
                        </div>

                        {/* Ticket Content (Scrollable within 80vh) */}
                        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">

                            {/* Assigned Table Highlight */}
                            <div className="table-box bg-[#142218] text-white p-4 rounded-2xl border border-[#d4af37]/40 text-center shadow-inner">
                                <span className="table-title text-[10px] uppercase font-bold text-[#d4af37] tracking-widest block">
                                    Dodeljena številka mize
                                </span>
                                <span className="table-number text-2xl sm:text-3xl font-serif font-black text-white tracking-wider block mt-1">
                                    {selectedBookingForPass.tableNumber || 'Miza 01'}
                                </span>
                                <span className="table-note text-[11px] text-[#8ea693] block mt-0.5">
                                    Rezervirano izključno za vaš prihod
                                </span>
                            </div>

                            {/* Allowed Members / Guests Count */}
                            <div className="members-box flex items-center justify-between p-3.5 bg-[#eaf1e9] rounded-2xl border border-[#2d5a27]/30">
                                <div className="members-label flex items-center gap-2 text-emerald-950 font-bold text-xs sm:text-sm">
                                    <Users size={18} className="text-[#2d5a27]" />
                                    <span>Dovoljeno število oseb:</span>
                                </div>
                                <span className="members-badge bg-[#2d5a27] text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-xs">
                                    {selectedBookingForPass.guests} {selectedBookingForPass.guests === 1 ? 'oseba dovoljena' : selectedBookingForPass.guests === 2 ? 'osebi dovoljeni' : 'oseb dovoljeno'}
                                </span>
                            </div>

                            {/* Pass Details Box */}
                            <div className="details-box p-4 bg-[#fcfbf7] border border-dashed border-gray-300 rounded-2xl text-xs space-y-2">
                                <div className="details-row flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="details-label text-gray-700 font-bold">Referenčna koda:</span>
                                    <strong className="details-code text-[#2d5a27] font-mono text-sm font-black">
                                        {selectedBookingForPass.refNum || `#WLM-${selectedBookingForPass._id?.slice(-4).toUpperCase()}`}
                                    </strong>
                                </div>
                                <div className="details-row flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="details-label text-gray-700 font-bold">Ime in priimek gosta:</span>
                                    <strong className="details-value text-gray-950 font-black">{selectedBookingForPass.name}</strong>
                                </div>
                                <div className="details-row flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="details-label text-gray-700 font-bold">Datum in ura obiska:</span>
                                    <strong className="details-value text-gray-950 font-black">{selectedBookingForPass.date} ob {selectedBookingForPass.time}</strong>
                                </div>
                                <div className="details-row flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="details-label text-gray-700 font-bold">Namen obiska:</span>
                                    <span className="details-value text-gray-900 font-bold">{selectedBookingForPass.purpose || 'Kosilo / Večerja'}</span>
                                </div>
                                {selectedBookingForPass.adminNote && (
                                    <div className="pt-1.5 text-emerald-900 font-bold text-[11px]">
                                        Opomba restavracije: "{selectedBookingForPass.adminNote}"
                                    </div>
                                )}
                            </div>

                            {/* Dynamic QR Code Card */}
                            <div className="qr-box p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center">
                                <div ref={qrRef} className="p-2.5 bg-white rounded-xl shadow-xs flex items-center justify-center border border-gray-100"></div>
                                <p className="qr-caption text-[11px] text-gray-800 font-bold mt-2">
                                    Pokažite to QR kodo ob prihodu na recepciji restavracije za takojšnjo prijavo.
                                </p>
                            </div>

                            {/* Action Buttons: Share, Print, Close */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-1 no-print">
                                <button
                                    onClick={() => handleSharePass(selectedBookingForPass)}
                                    className="flex-1 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                                >
                                    {shareCopied ? <Check size={14} /> : <Share2 size={14} />}
                                    <span>{shareCopied ? 'Kopirano v odložišče!' : 'Deli propusnico'}</span>
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Printer size={14} />
                                    <span>Natisni</span>
                                </button>
                                <button
                                    onClick={() => setSelectedBookingForPass(null)}
                                    className="sm:w-24 bg-[#2d5a27] hover:bg-[#23481f] text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer text-center"
                                >
                                    Zapri
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
