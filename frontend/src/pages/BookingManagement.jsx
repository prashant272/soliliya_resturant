import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Calendar, 
    Clock, 
    Users, 
    CheckCircle, 
    XCircle, 
    AlertCircle, 
    Search, 
    Filter, 
    Edit, 
    Trash2, 
    X, 
    Utensils, 
    Phone, 
    Mail, 
    Check, 
    Ban, 
    RefreshCw 
} from 'lucide-react';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    // Edit / Confirm Table Modal State
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState('');
    const [bookingStatus, setBookingStatus] = useState('Confirmed');
    const [adminNote, setAdminNote] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${baseUrl}/reservation`, config);
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching admin bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenEdit = (booking, defaultStatus = null) => {
        setSelectedBooking(booking);
        setTableNumber(booking.tableNumber || '');
        setBookingStatus(defaultStatus || booking.status || 'Confirmed');
        setAdminNote(booking.adminNote || '');
        setIsModalOpen(true);
    };

    const handleSaveStatus = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return;
        setSubmitting(true);
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${baseUrl}/reservation/${selectedBooking._id}`, {
                status: bookingStatus,
                tableNumber,
                adminNote
            }, config);
            setIsModalOpen(false);
            fetchBookings();
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Failed to update booking: " + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleQuickStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${baseUrl}/reservation/${id}`, {
                status: newStatus
            }, config);
            fetchBookings();
        } catch (error) {
            console.error("Error updating quick status:", error);
            alert("Error updating status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this reservation?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${baseUrl}/reservation/${id}`, config);
            fetchBookings();
        } catch (error) {
            console.error("Error deleting reservation:", error);
            alert("Error deleting reservation");
        }
    };

    // Filtered bookings
    const filteredBookings = bookings.filter((b) => {
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
            !searchQuery ||
            b.name?.toLowerCase().includes(q) ||
            b.email?.toLowerCase().includes(q) ||
            b.phone?.toLowerCase().includes(q) ||
            b.refNum?.toLowerCase().includes(q) ||
            b.tableNumber?.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
    });

    // Counts
    const pendingCount = bookings.filter(b => b.status === 'Pending').length;
    const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
    const rejectedCount = bookings.filter(b => b.status === 'Rejected' || b.status === 'Cancelled').length;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            case 'Confirmed':
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
            case 'Rejected':
                return 'bg-red-500/20 text-red-300 border-red-500/40';
            case 'Cancelled':
                return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
            default:
                return 'bg-white/10 text-gray-300 border-white/20';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-[#142218] p-6 rounded-2xl border border-[#253c2b] shadow-sm">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
                        Table Bookings
                    </h1>
                    <p className="text-xs sm:text-sm text-[#8ea693] mt-1 font-medium">
                        Review customer reservations, assign tables, and manage confirmations
                    </p>
                </div>
                <button
                    onClick={fetchBookings}
                    className="bg-[#192b1e] hover:bg-[#203626] text-[#b5cbba] border border-[#253c2b] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#142218] p-4 rounded-xl border border-[#253c2b]">
                    <span className="text-[11px] uppercase font-bold text-[#8ea693] tracking-wider block">Total Bookings</span>
                    <span className="text-2xl font-serif font-bold text-white mt-1 block">{bookings.length}</span>
                </div>
                <div className="bg-[#142218] p-4 rounded-xl border border-amber-500/30">
                    <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider block">Pending Approval</span>
                    <span className="text-2xl font-serif font-bold text-amber-300 mt-1 block">{pendingCount}</span>
                </div>
                <div className="bg-[#142218] p-4 rounded-xl border border-emerald-500/30">
                    <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider block">Confirmed</span>
                    <span className="text-2xl font-serif font-bold text-emerald-300 mt-1 block">{confirmedCount}</span>
                </div>
                <div className="bg-[#142218] p-4 rounded-xl border border-[#253c2b]">
                    <span className="text-[11px] uppercase font-bold text-red-400 tracking-wider block">Rejected / Cancelled</span>
                    <span className="text-2xl font-serif font-bold text-red-300 mt-1 block">{rejectedCount}</span>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-[#142218] p-4 rounded-xl border border-[#253c2b]">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ea693]" />
                    <input
                        type="text"
                        placeholder="Search by name, phone, ref, table..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0d1610] border border-[#253c2b] rounded-lg pl-10 pr-4 py-2 text-white text-xs outline-none focus:border-[#d4af37]"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label className="text-xs text-[#8ea693] font-semibold flex items-center gap-1.5 whitespace-nowrap">
                        <Filter size={14} /> Status:
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#0d1610] border border-[#253c2b] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#d4af37] cursor-pointer w-full sm:w-auto"
                    >
                        <option value="All">All Statuses ({bookings.length})</option>
                        <option value="Pending">Pending ({pendingCount})</option>
                        <option value="Confirmed">Confirmed ({confirmedCount})</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            {loading ? (
                <div className="text-center py-16 text-[#8ea693]">
                    <RefreshCw className="animate-spin inline-block mr-2" size={16} /> Loading table reservations...
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="bg-[#142218] rounded-2xl border border-[#253c2b] p-12 text-center">
                    <p className="text-[#8ea693] text-base font-semibold">No reservations found.</p>
                    <p className="text-[#5f7465] text-xs mt-1">Bookings submitted by customers will appear here.</p>
                </div>
            ) : (
                <div className="bg-[#142218] rounded-2xl border border-[#253c2b] overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-300">
                            <thead className="bg-[#0d1610] text-[#d4af37] uppercase text-xs font-bold border-b border-[#253c2b]">
                                <tr>
                                    <th className="p-4">Ref Code</th>
                                    <th className="p-4">Guest Details</th>
                                    <th className="p-4">Date &amp; Time</th>
                                    <th className="p-4">Guests</th>
                                    <th className="p-4">Assigned Table</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1e3323] text-sm">
                                {filteredBookings.map((b) => (
                                    <tr key={b._id} className="hover:bg-[#192b1e] transition-colors">
                                        <td className="p-4 font-mono font-bold text-[#d4af37]">
                                            {b.refNum || `#WLM-${b._id.slice(-4).toUpperCase()}`}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-white">{b.name}</div>
                                            <div className="text-xs text-[#8ea693] flex items-center gap-2 mt-0.5">
                                                <span>{b.phone}</span>
                                                <span>·</span>
                                                <span>{b.email}</span>
                                            </div>
                                            {b.notes && (
                                                <div className="text-[11px] text-[#a9c4b0] italic mt-1 max-w-xs truncate">
                                                    Note: "{b.notes}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold text-white">{b.date}</div>
                                            <div className="text-xs text-[#8ea693]">{b.time}</div>
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            <span className="flex items-center gap-1.5">
                                                <Users size={14} className="text-[#d4af37]" />
                                                <span>{b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}</span>
                                            </span>
                                            <span className="text-[11px] text-[#8ea693] block font-normal">{b.purpose || 'Dining'}</span>
                                        </td>
                                        <td className="p-4">
                                            {b.tableNumber ? (
                                                <span className="px-2.5 py-1 rounded-lg bg-[#1c4d25] text-emerald-200 border border-emerald-500/40 text-xs font-bold">
                                                    {b.tableNumber}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-500 italic">
                                                    Not Assigned
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(b.status || 'Pending')}`}>
                                                {b.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Confirm & Assign Table button */}
                                                <button
                                                    onClick={() => handleOpenEdit(b, 'Confirmed')}
                                                    className="p-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 rounded-lg transition cursor-pointer"
                                                    title="Confirm & Assign Table"
                                                >
                                                    <Check size={15} />
                                                </button>

                                                {/* Reject button */}
                                                <button
                                                    onClick={() => handleOpenEdit(b, 'Rejected')}
                                                    className="p-2 bg-red-500/15 hover:bg-red-500/25 text-red-400 rounded-lg transition cursor-pointer"
                                                    title="Reject Booking"
                                                >
                                                    <Ban size={15} />
                                                </button>

                                                {/* Edit full details */}
                                                <button
                                                    onClick={() => handleOpenEdit(b)}
                                                    className="p-2 bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 rounded-lg transition cursor-pointer"
                                                    title="Edit Table / Status"
                                                >
                                                    <Edit size={15} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(b._id)}
                                                    className="p-2 bg-gray-500/15 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL: ASSIGN TABLE & CONFIRM / REJECT */}
            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-[#142218] p-6 sm:p-8 rounded-2xl w-full max-w-lg border border-[#253c2b] relative shadow-2xl">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-serif font-bold text-white mb-1 tracking-wide">
                            Manage Reservation
                        </h2>
                        <p className="text-xs text-[#8ea693] mb-6">
                            Ref: <strong className="text-[#d4af37]">{selectedBooking.refNum || `#WLM-${selectedBooking._id.slice(-4).toUpperCase()}`}</strong> · Guest: {selectedBooking.name}
                        </p>

                        <form onSubmit={handleSaveStatus} className="space-y-4">
                            {/* Summary info box */}
                            <div className="bg-[#0d1610] p-4 rounded-xl border border-[#253c2b] text-xs space-y-1.5 text-gray-300">
                                <div className="flex justify-between">
                                    <span className="text-[#8ea693]">Date &amp; Time:</span>
                                    <strong className="text-white">{selectedBooking.date} at {selectedBooking.time}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8ea693]">Party Size:</span>
                                    <strong className="text-white">{selectedBooking.guests} Guests ({selectedBooking.purpose})</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8ea693]">Phone / Email:</span>
                                    <span className="text-white">{selectedBooking.phone} · {selectedBooking.email}</span>
                                </div>
                                {selectedBooking.notes && (
                                    <div className="pt-1 border-t border-[#253c2b] text-[#a9c4b0]">
                                        Guest Request: "{selectedBooking.notes}"
                                    </div>
                                )}
                            </div>

                            {/* Status Selector */}
                            <div>
                                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">
                                    Booking Status *
                                </label>
                                <select
                                    value={bookingStatus}
                                    onChange={(e) => setBookingStatus(e.target.value)}
                                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none cursor-pointer"
                                    required
                                >
                                    <option value="Confirmed">Confirmed (Generate User E-Pass)</option>
                                    <option value="Pending">Pending (Awaiting Review)</option>
                                    <option value="Rejected">Rejected (Declined)</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Table Number Assignment */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-xs font-bold text-[#b5cbba] uppercase tracking-wider">
                                        Assigned Table Number
                                    </label>
                                    <span className="text-[11px] text-[#d4af37]">Printed on customer E-Pass</span>
                                </div>
                                <input
                                    type="text"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="e.g. Table 04, VIP Booth 1, Terrace T2"
                                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none"
                                />
                                <div className="flex gap-2 mt-2">
                                    {['Table 01', 'Table 02', 'Table 04', 'VIP Booth', 'Terrace T1'].map((preset) => (
                                        <button
                                            type="button"
                                            key={preset}
                                            onClick={() => setTableNumber(preset)}
                                            className="text-[10px] bg-[#192b1e] hover:bg-[#253c2b] text-[#8ea693] hover:text-white px-2 py-1 rounded-md border border-[#253c2b] transition"
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Note */}
                            <div>
                                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">
                                    Internal / Customer Note (Optional)
                                </label>
                                <textarea
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    rows="2"
                                    placeholder="e.g. Reserved by window on 1st floor; birthday cake requested"
                                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#1c4d25] hover:bg-[#256331] text-white font-bold py-3 mt-4 transition shadow-md uppercase tracking-wider text-xs rounded-xl cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? 'Updating...' : `Save & Set as ${bookingStatus}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
