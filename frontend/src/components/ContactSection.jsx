import React, { useState } from 'react';

const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setSubmitted(false);
            alert("Thank you! Your message has been sent successfully. The Wilma Restaurant team will contact you shortly.");
        }, 300);
    };

    return (
        <section id="contact" className="pt-6 sm:pt-8 pb-10 sm:pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
                    <span className="text-[#2d5a27] font-semibold text-xs tracking-widest uppercase">
                        Contact and Support
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1c241b]">
                        Visit Us or Contact Us
                    </h2>
                    <p className="text-sm text-gray-600">
                        We are in the heart of Ljubljana on Dunajska cesta. We look forward to your visit.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Info Box */}
                    <div className="bg-[#fcfbf7] p-8 rounded-3xl border border-[#d4af37]/20 space-y-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 className="font-heading text-xl font-bold text-[#1c241b] mb-6">
                                Restaurant Wilma
                            </h3>

                            <div className="space-y-5 text-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#2d5a27] text-white flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1c241b]">Address</h4>
                                        <p className="text-gray-600">Dunajska cesta 106, 1000 Ljubljana, Slovenia</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#2d5a27] text-white flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1c241b]">Phone</h4>
                                        <p className="text-gray-600 font-semibold">
                                            <a href="tel:040791618" className="hover:text-[#2d5a27] transition-colors">
                                                040 791 618
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#2d5a27] text-white flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-clock"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1c241b]">Opening Hours</h4>
                                        <p className="text-gray-600 text-xs">Monday - Friday: 07:30 - 22:00</p>
                                        <p className="text-gray-600 text-xs">Saturday: 08:30 - 23:00</p>
                                        <p className="text-gray-600 text-xs">Sunday &amp; Holidays: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs">
                            <span className="font-bold text-[#1c241b] block mb-1">Parking:</span>
                            <p className="text-gray-500">Free parking spaces for restaurant guests in front of the building.</p>
                        </div>
                    </div>

                    {/* Contact / Support Form */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-heading text-xl font-bold text-[#1c241b] mb-1">
                            Send Message / Support
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">
                            Do you have a question about business events or special diets?
                        </p>

                        <form onSubmit={handleSupportSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Janez Novak"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="janez@example.com"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows="3"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#1c241b] hover:bg-black text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>

                    {/* Embedded Map */}
                    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm min-h-[320px] bg-gray-100 relative group">
                        <iframe
                            title="Restavracija Wilma Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.42314561284!2d14.5098!3d46.0754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476532882ad3108d%3A0x8bb8925f69c9b!2sDunajska%20cesta%20106%2C%201000%20Ljubljana%2C%20Slovenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                            className="w-full h-full min-h-[320px] border-0"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;
