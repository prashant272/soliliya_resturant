import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    Clock, 
    CheckCircle, 
    Calendar, 
    Users, 
    Utensils, 
    ShieldCheck, 
    ArrowRight, 
    X, 
    Phone, 
    Mail, 
    Briefcase, 
    Coffee, 
    PartyPopper,
    Sparkles
} from 'lucide-react';

const BookingSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [guests, setGuests] = useState('2');
    const [purpose, setPurpose] = useState('Business Meeting');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('12:00');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [createdBooking, setCreatedBooking] = useState(null);

    // Auto-fill from logged-in user if available
    useEffect(() => {
        if (user) {
            if (!name && user.name) setName(user.name);
            if (!phone && user.phone) setPhone(user.phone);
            if (!email && user.email) setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const token = localStorage.getItem('userToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const payload = {
            name: name.trim(),
            phone: phone.trim(),
            email: (email || user?.email || 'guest@wilma.si').trim(),
            date,
            time,
            guests: Number(guests) || 2,
            purpose,
            notes: notes.trim(),
            user: user?._id || user?.id || null
        };

        try {
            const { data } = await axios.post(`${baseUrl}/reservation`, payload, config);
            setCreatedBooking(data);
            setModalOpen(true);
        } catch (err) {
            console.error("Reservation submit error:", err);
            alert("Could not submit reservation: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleResetForm = () => {
        setModalOpen(false);
        setCreatedBooking(null);
        setNotes('');
    };

    return (
        <section id="booking" className="pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 bg-[#fcfbf7] relative">
            <div className="max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="text-center space-y-2 mb-5 sm:mb-6">
                    <span className="inline-flex items-center gap-1.5 text-[#2d5a27] bg-[#eaf1e9] font-bold text-xs tracking-widest uppercase px-3.5 py-1 rounded-full shadow-2xs">
                        <Sparkles size={13} />
                        <span>Online Table Reservation</span>
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14331e] tracking-tight">
                        Reserve Your Table at Wilma
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
                        Book a table online in seconds. Our restaurant manager will confirm your reservation and assign your table number.
                    </p>
                </div>

                {/* Booking Form Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-[#d4af37]/20">
                    <form onSubmit={handleSubmit}>

                        {/* Step 1: Party Size Selection */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#14331e] mb-3">
                                1. Select Table Size *
                            </label>
                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                {[
                                    { value: '2', icon: Users, title: '2 People', desc: 'Private / Meeting' },
                                    { value: '4', icon: Users, title: '4 People', desc: 'Lunch / Family' },
                                    { value: '8', icon: Users, title: '8+ People', desc: 'Corporate / Group' }
                               ].map((item) => {
                                    const IconComponent = item.icon;
                                    const isSelected = guests === item.value;
                                    return (
                                        <div
                                            key={item.value}
                                            onClick={() => setGuests(item.value)}
                                            className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all text-center select-none ${
                                                isSelected
                                                    ? 'border-[#2d5a27] bg-[#2d5a27]/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-[#d4af37]'
                                            }`}
                                        >
                                            <IconComponent className={`mb-2 transition-colors ${isSelected ? 'text-[#2d5a27]' : 'text-gray-400'}`} size={24} />
                                            <span className="font-bold text-sm text-[#1c241b]">{item.title}</span>
                                            <span className="text-[11px] text-gray-500">{item.desc}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Event Purpose */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#14331e] mb-3">
                                2. Purpose of Visit *
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { value: 'Business Meeting', icon: Briefcase, label: 'Business Meeting' },
                                    { value: 'Lunch / Dinner', icon: Utensils, label: 'Lunch / Dinner' },
                                    { value: 'Breakfast & Coffee', icon: Coffee, label: 'Breakfast & Coffee' },
                                    { value: 'Celebration / Party', icon: PartyPopper, label: 'Celebration / Party' }
                                ].map((item) => {
                                    const Icon = item.icon;
                                    const isSelected = purpose === item.value;
                                    return (
                                        <div
                                            key={item.value}
                                            onClick={() => setPurpose(item.value)}
                                            className={`cursor-pointer border rounded-xl p-3 text-center text-xs font-medium transition-all flex flex-col items-center justify-center gap-1.5 ${
                                                isSelected
                                                    ? 'border-[#2d5a27] bg-[#2d5a27]/10 text-[#2d5a27] font-bold shadow-xs'
                                                    : 'border-gray-200 hover:border-[#d4af37] text-gray-700'
                                            }`}
                                        >
                                            <Icon size={18} className={isSelected ? 'text-[#2d5a27]' : 'text-gray-400'} />
                                            <span>{item.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3: Date, Time & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Reservation Date *
                                </label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Time Slot *
                                </label>
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white cursor-pointer"
                                >
                                    <option value="11:30">11:30 (Lunch Opening)</option>
                                    <option value="12:00">12:00 (Lunch Rush)</option>
                                    <option value="12:30">12:30 (Business Lunch)</option>
                                    <option value="13:00">13:00 (Afternoon Lunch)</option>
                                    <option value="13:30">13:30 (Casual Lunch)</option>
                                    <option value="14:00">14:00 (Late Lunch)</option>
                                    <option value="18:00">18:00 (Early Dinner)</option>
                                    <option value="18:30">18:30 (Dinner)</option>
                                    <option value="19:00">19:00 (Dinner Peak)</option>
                                    <option value="19:30">19:30 (Evening Special)</option>
                                    <option value="20:00">20:00 (Late Dining)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Prashant Kumar Jha"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. 040 123 456"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. guest@wilma.si"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                                    Special Requests or Notes (Optional)
                                </label>
                                <textarea
                                    rows="2"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g. quiet corner table, baby high chair, anniversary celebration..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm bg-white"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-[#2d5a27] hover:bg-[#23481f] text-white font-bold rounded-2xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <Calendar size={18} />
                            <span>{submitting ? 'Creating Booking Request...' : 'Request Table Reservation'}</span>
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                            <ShieldCheck size={15} className="text-[#2d5a27]" />
                            <span>Free online booking. The manager will review table availability and assign your table number.</span>
                        </p>

                    </form>
                </div>

            </div>

            {/* PREMIUIM BOOKING REQUEST RECEIVED MODAL */}
            {modalOpen && createdBooking && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden border border-[#d4af37]/30 animate-in fade-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="bg-[#142218] text-white p-4 sm:p-5 text-center relative border-b border-[#d4af37]/30 flex-shrink-0">
                            <button
                                onClick={handleResetForm}
                                className="absolute top-3.5 right-3.5 text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* White pill container for clean logo display */}
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

                            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                                Restavracija Wilma
                            </h3>
                            <p className="text-[11px] sm:text-xs text-[#8ea693] mt-0.5">
                                Dunajska cesta 106, 1000 Ljubljana • Tel: 040 791 618
                            </p>
                        </div>

                        {/* Modal Content - Scrollable if taller than 80vh */}
                        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
                            
                            {/* Status Banner */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                                    <Clock size={13} className="text-amber-600 animate-pulse" />
                                    <span>Status: Čaka na potrditev vodje (Pending)</span>
                                </div>
                                <h4 className="text-lg font-serif font-bold text-[#14331e]">
                                    Zahteva za rezervacijo sprejeta!
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                    Hvala, <strong className="text-gray-800">{createdBooking.name}</strong>! Vaša rezervacija je bila uspešno shranjena v sistemu.
                                </p>
                            </div>

                            {/* Booking Details Card */}
                            <div className="bg-[#fcfbf7] p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Koda rezervacije:</span>
                                    <strong className="font-mono text-[#2d5a27] text-sm">
                                        {createdBooking.refNum || `#WLM-${createdBooking._id?.slice(-4).toUpperCase()}`}
                                    </strong>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Datum in ura:</span>
                                    <strong className="text-gray-800">{createdBooking.date} ob {createdBooking.time}</strong>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Število oseb:</span>
                                    <strong className="text-gray-800">{createdBooking.guests} oseb ({createdBooking.purpose})</strong>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Kontaktni telefon:</span>
                                    <span className="text-gray-800 font-semibold">{createdBooking.phone}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-500 font-medium">Dodeljena miza:</span>
                                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold text-[11px] border border-amber-200">
                                        Določi vodja ob potrditvi
                                    </span>
                                </div>
                            </div>

                            {/* What Happens Next Box */}
                            <div className="p-3.5 bg-[#eaf1e9] rounded-2xl border border-[#2d5a27]/30 text-xs text-emerald-950 space-y-1">
                                <p className="font-bold text-[#2d5a27] flex items-center gap-1.5">
                                    <ShieldCheck size={16} /> Kaj sledi?
                                </p>
                                <p className="text-gray-600 text-[11px] leading-relaxed">
                                    Vodja restavracije bo pregledal zasedenost miz. Po odobritvi bosta vaša dodeljena <strong>številka mize</strong> in uradna <strong>VIP QR propusnica</strong> na voljo na vaši nadzorni plošči.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                <button
                                    onClick={() => {
                                        setModalOpen(false);
                                        navigate('/dashboard?tab=bookings');
                                    }}
                                    className="flex-1 py-3 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                    <span>Nadzorna plošča</span>
                                    <ArrowRight size={14} />
                                </button>
                                <button
                                    onClick={handleResetForm}
                                    className="sm:w-28 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-xs transition cursor-pointer text-center"
                                >
                                    V redu
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </section>
    );
};

export default BookingSection;
