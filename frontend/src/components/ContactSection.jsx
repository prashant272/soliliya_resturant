import React, { useState } from 'react';
import axios from 'axios';
import { 
    MapPin, 
    Phone, 
    Clock, 
    Mail, 
    Send, 
    CheckCircle2, 
    AlertCircle, 
    Car, 
    ExternalLink, 
    Sparkles,
    CalendarCheck,
    MessageSquare
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submittedRef, setSubmittedRef] = useState('');

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    const subjects = [
        'General Inquiry',
        'Business Lunch / Group Reservation',
        'Private Event & Celebration',
        'Catering & Corporate Orders',
        'Dietary / Allergen Inquiries',
        'Feedback / Other'
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${baseUrl}/enquiries`, formData);
            if (response.data?.success) {
                setSuccess(true);
                setSubmittedRef(response.data?.enquiry?.refNum || '');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'General Inquiry',
                    message: ''
                });
            } else {
                setErrorMessage(response.data?.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            const msg = error.response?.data?.message || 'Failed to submit enquiry. Please check your internet connection or call us directly.';
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-[#fdfbf7] via-white to-[#fbf9f4] relative overflow-hidden">
            {/* Ambient decorative background accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2d5a27]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c4d25]/10 text-[#1c4d25] border border-[#1c4d25]/20 text-xs font-bold tracking-widest uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Concierge &amp; Inquiries</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1c241b] tracking-tight">
                        We’d Love to Hear From You
                    </h2>

                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Whether you are planning a corporate lunch, organizing a private celebration, or have questions about our seasonal menus, our team is always ready to assist you.
                    </p>
                </div>

                {/* Main 3-Column Luxury Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Column 1: Restaurant Info & Hours (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col justify-between bg-[#142218] text-white p-7 sm:p-9 rounded-3xl border border-[#253c2b] shadow-xl relative overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-2xl"></div>

                        <div className="space-y-7 relative z-10">
                            <div>
                                <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest block mb-1">
                                    Fine Dining &amp; Daily Lunch
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                                    Wilma Restaurant
                                </h3>
                                <p className="text-xs text-[#9eb5a3] mt-2 leading-relaxed">
                                    Authentic culinary craft situated on Dunajska cesta in Ljubljana. Renowned for weekday business lunches and bespoke private events.
                                </p>
                            </div>

                            <div className="space-y-5 text-xs sm:text-sm">
                                {/* Address */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-[#1c4d25] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Restaurant Address</h4>
                                        <p className="text-[#a4bca9] mt-0.5 leading-relaxed">
                                            Dunajska cesta 106, 1000 Ljubljana, Slovenia
                                        </p>
                                        <a 
                                            href="https://maps.google.com/?q=Dunajska+cesta+106,+1000+Ljubljana" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:underline mt-1.5"
                                        >
                                            <span>Get Directions</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                {/* Phone & Direct Contact */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-[#1c4d25] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <h4 className="font-bold text-white text-sm">Telephone &amp; WhatsApp</h4>
                                        <p className="text-[#a4bca9] text-xs">Direct reservation &amp; inquiries line</p>
                                        <div className="flex flex-wrap items-center gap-2 pt-1">
                                            <a 
                                                href="tel:+38640791618" 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition"
                                            >
                                                <Phone className="w-3 h-3 text-[#d4af37]" />
                                                <span>40 791 618</span>
                                            </a>
                                            <a 
                                                href="https://wa.me/38640791618" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#47e583] border border-[#25D366]/40 text-xs font-semibold transition"
                                            >
                                                <FaWhatsapp className="w-3.5 h-3.5" />
                                                <span>WhatsApp</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Opening Hours */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-[#1c4d25] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-white text-sm">Opening Hours</h4>
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                                Lunch Service
                                            </span>
                                        </div>
                                        <p className="text-white font-medium text-xs mt-1">
                                            Monday – Friday: <span className="text-[#d4af37] font-bold">10:00 – 14:00</span>
                                        </p>
                                        <p className="text-[#8ea693] text-[11px] mt-0.5">
                                            Weekends &amp; Evenings: Available for Private Events &amp; Group Bookings
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parking Card bottom */}
                        <div className="mt-8 pt-5 border-t border-[#253c2b] flex items-start gap-3 relative z-10 bg-[#0d1610]/60 p-4 rounded-2xl border border-white/5">
                            <Car className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold text-white text-xs block">Free Guest Parking</span>
                                <p className="text-[11px] text-[#8ea693] leading-relaxed mt-0.5">
                                    Complimentary parking bays are conveniently situated right in front of the restaurant premises.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Interactive Contact Form (5 cols) */}
                    <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-3xl border border-gray-200 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#1c4d25] uppercase tracking-wider flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                                    <span>Direct Message</span>
                                </span>
                                <span className="text-[11px] text-gray-400">Response within 24h</span>
                            </div>

                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c241b]">
                                Send an Enquiry
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-6">
                                Leave your contact info and inquiry details below. Our management team will promptly review your request.
                            </p>

                            {/* Success State Notification */}
                            {success ? (
                                <div className="p-6 rounded-2xl bg-[#f0f8f1] border border-emerald-300 text-center space-y-4 animate-fade-in my-4">
                                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl font-bold text-[#1c241b]">
                                            Message Sent Successfully!
                                        </h4>
                                        {submittedRef && (
                                            <p className="font-mono text-xs text-emerald-800 font-bold mt-1">
                                                Reference ID: {submittedRef}
                                            </p>
                                        )}
                                        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                                            Thank you for reaching out to Wilma Restaurant. Your message has been forwarded to our admin team and we will get back to you shortly.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSuccess(false)}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c4d25] hover:bg-[#256631] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                                    >
                                        <span>Send Another Message</span>
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Error Banner */}
                                    {errorMessage && (
                                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                                            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    {/* Name & Email in 2 columns */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="e.g. Alexander Novak"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1c4d25] focus:ring-2 focus:ring-[#1c4d25]/15 focus:outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="alexander@company.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1c4d25] focus:ring-2 focus:ring-[#1c4d25]/15 focus:outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone & Subject in 2 columns */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+386 40 123 456"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1c4d25] focus:ring-2 focus:ring-[#1c4d25]/15 focus:outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                                                Inquiry Topic
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1c4d25] focus:ring-2 focus:ring-[#1c4d25]/15 focus:outline-none text-xs sm:text-sm text-gray-800 bg-white transition cursor-pointer"
                                            >
                                                {subjects.map((subj) => (
                                                    <option key={subj} value={subj}>
                                                        {subj}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                                            Your Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tell us about your event, preferred dates, number of guests, or any special requests..."
                                            className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#1c4d25] focus:ring-2 focus:ring-[#1c4d25]/15 focus:outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 transition resize-none leading-relaxed"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 px-6 bg-[#1c4d25] hover:bg-[#143a1c] text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Sending Your Inquiry...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 text-[#d4af37]" />
                                                <span>Submit Inquiry</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-[11px] text-gray-400 text-center mt-2">
                                        Your contact details are kept strictly confidential and only used to respond to your request.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Column 3: Location Map & Atmosphere (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        {/* Interactive Google Map */}
                        <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100 flex-1 min-h-[300px] relative group">
                            <iframe
                                title="Wilma Restaurant Ljubljana Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.42314561284!2d14.5098!3d46.0754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476532882ad3108d%3A0x8bb8925f69c9b!2sDunajska%20cesta%20106%2C%201000%20Ljubljana%2C%20Slovenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                                className="w-full h-full min-h-[300px] border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>

                            {/* Floating Card On Map */}
                            <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-black/5 shadow-md flex items-center justify-between">
                                <div className="truncate">
                                    <span className="font-serif font-bold text-xs text-[#1c241b] block truncate">
                                        Dunajska cesta 106
                                    </span>
                                    <span className="text-[10px] text-gray-500 block truncate">
                                        Bežigrad, Ljubljana
                                    </span>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Dunajska+cesta+106,+1000+Ljubljana"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-[#1c4d25] hover:bg-[#256631] text-white shrink-0 transition shadow-xs"
                                    title="Open Directions in Google Maps"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Reservation Callout */}
                        <div className="p-5 rounded-3xl bg-[#fdfbf7] border border-[#d4af37]/30 shadow-sm flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-[#1c4d25]/10 text-[#1c4d25] flex items-center justify-center shrink-0">
                                <CalendarCheck className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div className="flex-1">
                                <span className="font-serif font-bold text-xs text-[#1c241b] block">
                                    Need an Immediate Table?
                                </span>
                                <p className="text-[11px] text-gray-600 leading-snug mt-0.5">
                                    Call our host at <a href="tel:+38640791618" className="text-[#1c4d25] font-bold hover:underline">40 791 618</a> for instant table seating.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;
