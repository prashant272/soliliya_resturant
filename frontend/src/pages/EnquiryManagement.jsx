import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    MessageSquare, 
    Mail, 
    Phone, 
    Calendar, 
    Search, 
    Trash2, 
    Eye, 
    X, 
    CheckCircle, 
    RefreshCw, 
    Clock
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const EnquiryManagement = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    // View & Reply Modal
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    const [modalStatus, setModalStatus] = useState('New');
    const [updating, setUpdating] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${baseUrl}/enquiries`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEnquiries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetail = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setModalStatus(enquiry.status || 'New');
        setAdminNote(enquiry.adminNote || '');
        setIsModalOpen(true);
    };

    const handleUpdateStatus = async (id, newStatus, note = null) => {
        setUpdating(true);
        try {
            const token = localStorage.getItem('adminToken');
            const payload = { status: newStatus };
            if (note !== null) payload.adminNote = note;

            await axios.put(`${baseUrl}/enquiries/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update in local state
            setEnquiries(prev => prev.map(item => item._id === id ? { ...item, ...payload } : item));
            if (selectedEnquiry && selectedEnquiry._id === id) {
                setSelectedEnquiry(prev => ({ ...prev, ...payload }));
            }
        } catch (error) {
            console.error("Error updating enquiry:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${baseUrl}/enquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEnquiries(prev => prev.filter(item => item._id !== id));
            if (selectedEnquiry && selectedEnquiry._id === id) {
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            alert("Failed to delete message. Please try again.");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'New':
                return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
            case 'In Progress':
                return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
            case 'Replied':
                return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
            case 'Closed':
                return 'bg-gray-500/15 text-gray-400 border border-gray-500/30';
            default:
                return 'bg-gray-500/15 text-gray-400 border border-gray-500/30';
        }
    };

    const filteredEnquiries = enquiries.filter(item => {
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || (
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.email && item.email.toLowerCase().includes(q)) ||
            (item.phone && item.phone.toLowerCase().includes(q)) ||
            (item.subject && item.subject.toLowerCase().includes(q)) ||
            (item.message && item.message.toLowerCase().includes(q)) ||
            (item.refNum && item.refNum.toLowerCase().includes(q))
        );
        return matchesStatus && matchesSearch;
    });

    // Counts
    const totalCount = enquiries.length;
    const newCount = enquiries.filter(i => i.status === 'New').length;
    const inProgressCount = enquiries.filter(i => i.status === 'In Progress').length;
    const repliedCount = enquiries.filter(i => i.status === 'Replied').length;

    return (
        <div className="space-y-6">
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-3">
                        <MessageSquare className="w-7 h-7 text-[#d4af37]" />
                        <span>Enquiries &amp; Messages</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-[#8ea693] mt-1">
                        View and manage all contact requests, event inquiries, and customer messages.
                    </p>
                </div>

                <button 
                    onClick={fetchEnquiries}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#142218] hover:bg-[#1a2c1f] text-white border border-[#253c2b] text-xs font-semibold transition cursor-pointer self-start sm:self-auto shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 text-[#d4af37] ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh List</span>
                </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div 
                    onClick={() => setStatusFilter('All')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        statusFilter === 'All' ? 'bg-[#1c4d25] border-[#d4af37]' : 'bg-[#142218] border-[#253c2b] hover:border-[#385b41]'
                    }`}
                >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8ea693] block">Total Inquiries</span>
                    <span className="text-2xl font-serif font-bold text-white mt-1 block">{totalCount}</span>
                </div>

                <div 
                    onClick={() => setStatusFilter('New')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        statusFilter === 'New' ? 'bg-[#1c4d25] border-amber-500' : 'bg-[#142218] border-[#253c2b] hover:border-amber-500/50'
                    }`}
                >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        New Messages
                    </span>
                    <span className="text-2xl font-serif font-bold text-amber-400 mt-1 block">{newCount}</span>
                </div>

                <div 
                    onClick={() => setStatusFilter('In Progress')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        statusFilter === 'In Progress' ? 'bg-[#1c4d25] border-blue-500' : 'bg-[#142218] border-[#253c2b] hover:border-blue-500/50'
                    }`}
                >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">In Progress</span>
                    <span className="text-2xl font-serif font-bold text-blue-400 mt-1 block">{inProgressCount}</span>
                </div>

                <div 
                    onClick={() => setStatusFilter('Replied')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        statusFilter === 'Replied' ? 'bg-[#1c4d25] border-emerald-500' : 'bg-[#142218] border-[#253c2b] hover:border-emerald-500/50'
                    }`}
                >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">Replied</span>
                    <span className="text-2xl font-serif font-bold text-emerald-400 mt-1 block">{repliedCount}</span>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#142218] border border-[#253c2b] flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative w-full md:w-96">
                    <Search className="w-4 h-4 text-[#8ea693] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, subject, message..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d1610] border border-[#253c2b] text-white text-xs sm:text-sm placeholder-[#6b8270] focus:outline-none focus:border-[#d4af37] transition"
                    />
                </div>

                {/* Status Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                    {['All', 'New', 'In Progress', 'Replied', 'Closed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                statusFilter === status
                                    ? 'bg-[#1c4d25] text-[#d4af37] border border-[#d4af37]/40 shadow-xs'
                                    : 'bg-[#0d1610] text-[#8ea693] hover:text-white border border-[#253c2b]'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Table / Cards */}
            <div className="rounded-2xl bg-[#142218] border border-[#253c2b] overflow-hidden shadow-lg">
                {loading ? (
                    <div className="p-12 text-center text-[#8ea693]">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#d4af37]" />
                        <span className="text-xs">Loading inquiries...</span>
                    </div>
                ) : filteredEnquiries.length === 0 ? (
                    <div className="p-12 text-center text-[#8ea693]">
                        <MessageSquare className="w-10 h-10 mx-auto mb-3 text-[#253c2b]" />
                        <p className="text-sm font-semibold text-white">No inquiries found</p>
                        <p className="text-xs mt-1">When customers submit the contact form, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#253c2b] bg-[#0d1610]/50 text-[11px] font-bold text-[#8ea693] uppercase tracking-wider">
                                    <th className="py-3.5 px-4">Reference / Date</th>
                                    <th className="py-3.5 px-4">Sender Info</th>
                                    <th className="py-3.5 px-4">Subject &amp; Message</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#253c2b] text-xs sm:text-sm">
                                {filteredEnquiries.map((enquiry) => (
                                    <tr 
                                        key={enquiry._id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        {/* Ref & Date */}
                                        <td className="py-4 px-4 align-top whitespace-nowrap">
                                            <span className="font-mono text-xs font-bold text-[#d4af37] block">
                                                {enquiry.refNum || '#ENQ'}
                                            </span>
                                            <span className="text-[11px] text-[#8ea693] flex items-center gap-1 mt-1">
                                                <Calendar className="w-3 h-3 text-[#6b8270]" />
                                                {new Date(enquiry.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="text-[10px] text-[#6b8270] flex items-center gap-1 mt-0.5">
                                                <Clock className="w-2.5 h-2.5" />
                                                {new Date(enquiry.createdAt).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </td>

                                        {/* Sender info */}
                                        <td className="py-4 px-4 align-top whitespace-nowrap">
                                            <span className="font-bold text-white block">
                                                {enquiry.name}
                                            </span>
                                            <a 
                                                href={`mailto:${enquiry.email}`}
                                                className="text-xs text-[#8ea693] hover:text-[#d4af37] flex items-center gap-1 mt-0.5"
                                            >
                                                <Mail className="w-3 h-3 text-[#6b8270]" />
                                                <span>{enquiry.email}</span>
                                            </a>
                                            {enquiry.phone && (
                                                <a 
                                                    href={`tel:${enquiry.phone}`}
                                                    className="text-xs text-[#8ea693] hover:text-[#d4af37] flex items-center gap-1 mt-0.5"
                                                >
                                                    <Phone className="w-3 h-3 text-[#6b8270]" />
                                                    <span>{enquiry.phone}</span>
                                                </a>
                                            )}
                                        </td>

                                        {/* Subject & Message snippet */}
                                        <td className="py-4 px-4 align-top max-w-xs sm:max-w-md">
                                            <span className="font-semibold text-white block truncate">
                                                {enquiry.subject || 'General Inquiry'}
                                            </span>
                                            <p className="text-xs text-[#8ea693] mt-1 line-clamp-2 leading-relaxed">
                                                {enquiry.message}
                                            </p>
                                            {enquiry.adminNote && (
                                                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-[#253c2b] text-[10px] text-[#d4af37] italic">
                                                    Note: {enquiry.adminNote}
                                                </span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4 align-top whitespace-nowrap">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(enquiry.status)}`}>
                                                {enquiry.status || 'New'}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenDetail(enquiry)}
                                                    className="p-2 rounded-xl bg-[#1c4d25] hover:bg-[#286334] text-white transition cursor-pointer shadow-xs"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-[#d4af37]" />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(enquiry._id)}
                                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal: View Full Enquiry & Reply */}
            {isModalOpen && selectedEnquiry && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#142218] border border-[#253c2b] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
                        
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-[#253c2b] pb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-xs font-bold text-[#d4af37]">
                                        {selectedEnquiry.refNum || '#ENQ'}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(modalStatus)}`}>
                                        {modalStatus}
                                    </span>
                                </div>
                                <h2 className="text-xl font-serif font-bold text-white">
                                    {selectedEnquiry.subject || 'Customer Inquiry'}
                                </h2>
                                <span className="text-xs text-[#8ea693] mt-0.5 block">
                                    Received: {new Date(selectedEnquiry.createdAt).toLocaleString('en-GB', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })}
                                </span>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-xl text-[#8ea693] hover:text-white hover:bg-white/5 transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sender Info Card */}
                        <div className="p-4 rounded-2xl bg-[#0d1610] border border-[#253c2b] space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <span className="text-[11px] text-[#6b8270] uppercase font-bold tracking-wider block">Sender</span>
                                    <span className="text-base font-bold text-white">{selectedEnquiry.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={`mailto:${selectedEnquiry.email}?subject=Reply: ${encodeURIComponent(selectedEnquiry.subject || 'Your Inquiry at Wilma Restaurant')}`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c4d25] hover:bg-[#286334] text-white text-xs font-semibold transition"
                                    >
                                        <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                                        <span>Reply via Email</span>
                                    </a>

                                    {selectedEnquiry.phone && (
                                        <a
                                            href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition"
                                        >
                                            <FaWhatsapp className="w-3.5 h-3.5" />
                                            <span>WhatsApp</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#253c2b]/60 text-xs">
                                <div>
                                    <span className="text-[#8ea693]">Email: </span>
                                    <span className="text-white font-medium">{selectedEnquiry.email}</span>
                                </div>
                                {selectedEnquiry.phone && (
                                    <div>
                                        <span className="text-[#8ea693]">Phone: </span>
                                        <span className="text-white font-medium">{selectedEnquiry.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Full Message Body */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-[#8ea693] uppercase tracking-wider block">
                                Customer Message:
                            </span>
                            <div className="p-4 rounded-2xl bg-[#0d1610] border border-[#253c2b] text-sm text-[#e2ece4] whitespace-pre-wrap leading-relaxed">
                                {selectedEnquiry.message}
                            </div>
                        </div>

                        {/* Status Updater & Admin Note */}
                        <div className="space-y-4 pt-2 border-t border-[#253c2b]">
                            <div>
                                <label className="block text-xs font-bold text-[#8ea693] uppercase tracking-wider mb-2">
                                    Update Inquiry Status
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {['New', 'In Progress', 'Replied', 'Closed'].map((st) => (
                                        <button
                                            key={st}
                                            type="button"
                                            onClick={() => setModalStatus(st)}
                                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                                modalStatus === st
                                                    ? 'bg-[#1c4d25] text-white border-[#d4af37] shadow-sm'
                                                    : 'bg-[#0d1610] text-[#8ea693] border-[#253c2b] hover:border-[#385b41]'
                                            }`}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#8ea693] uppercase tracking-wider mb-2">
                                    Internal Admin Note (Private, visible only to team)
                                </label>
                                <textarea
                                    rows="2"
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    placeholder="E.g. Called customer on phone, confirmed booking for 12 guests on Friday..."
                                    className="w-full p-3 rounded-xl bg-[#0d1610] border border-[#253c2b] text-white text-xs sm:text-sm placeholder-[#6b8270] focus:outline-none focus:border-[#d4af37] transition"
                                />
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#253c2b]">
                            <button
                                type="button"
                                onClick={() => handleDelete(selectedEnquiry._id)}
                                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition cursor-pointer"
                            >
                                Delete Message
                            </button>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-[#0d1610] hover:bg-[#1a2c1f] text-white border border-[#253c2b] text-xs font-bold transition cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={updating}
                                    onClick={() => handleUpdateStatus(selectedEnquiry._id, modalStatus, adminNote)}
                                    className="px-5 py-2.5 rounded-xl bg-[#1c4d25] hover:bg-[#235e2e] text-white border border-[#d4af37]/40 text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-2"
                                >
                                    {updating ? <RefreshCw className="w-4 h-4 animate-spin text-[#d4af37]" /> : <CheckCircle className="w-4 h-4 text-[#d4af37]" />}
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default EnquiryManagement;
