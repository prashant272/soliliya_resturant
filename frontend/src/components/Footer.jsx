import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Calendar, ChevronRight, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (e, targetId) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${targetId}`);
        }
    };

    return (
        <footer className="mt-auto bg-white border-t-4 border-[#c9a227]">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

                    {/* Column 1: Brand Info & Logo */}
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <img
                                src="/images/wilma-logo-clean.png"
                                alt="Restavracija Wilma Logo"
                                className="h-14 sm:h-16 w-auto max-w-[210px] object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/footer-logo.jpeg';
                                }}
                                loading="lazy"
                            />
                        </div>
                        <p className="text-gray-900 text-xs sm:text-sm leading-relaxed max-w-xs font-semibold">
                            A modern restaurant for business meetings, breakfasts, and exceptional home-cooked culinary delights in Ljubljana.
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-black text-[#0d1810] pt-2">
                            <MapPin size={15} className="text-[#c9a227] fill-[#c9a227]/20" />
                            <span>Ljubljana, Slovenia</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-black text-[#0d1810] uppercase tracking-wider text-xs sm:text-sm">
                            Quick Links
                        </h4>
                        <div className="w-12 h-1 bg-[#c9a227] rounded-full mt-2 mb-4"></div>
                        <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
                            <li>
                                <a 
                                    href="#home" 
                                    onClick={(e) => handleNavClick(e, 'home')}
                                    className="text-gray-900 hover:text-[#2d5a27] transition-colors flex items-center gap-1.5 group cursor-pointer"
                                >
                                    <ChevronRight size={15} strokeWidth={2.5} className="text-[#c9a227] group-hover:translate-x-0.5 transition-transform" />
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#about" 
                                    onClick={(e) => handleNavClick(e, 'about')}
                                    className="text-gray-900 hover:text-[#2d5a27] transition-colors flex items-center gap-1.5 group cursor-pointer"
                                >
                                    <ChevronRight size={15} strokeWidth={2.5} className="text-[#c9a227] group-hover:translate-x-0.5 transition-transform" />
                                    <span>About Us</span>
                                </a>
                            </li>
                            <li>
                                <Link 
                                    to="/menu"
                                    className="text-gray-900 hover:text-[#2d5a27] transition-colors flex items-center gap-1.5 group"
                                >
                                    <ChevronRight size={15} strokeWidth={2.5} className="text-[#c9a227] group-hover:translate-x-0.5 transition-transform" />
                                    <span>Our Menu</span>
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href="#booking" 
                                    onClick={(e) => handleNavClick(e, 'booking')}
                                    className="text-gray-900 hover:text-[#2d5a27] transition-colors flex items-center gap-1.5 group cursor-pointer"
                                >
                                    <ChevronRight size={15} strokeWidth={2.5} className="text-[#c9a227] group-hover:translate-x-0.5 transition-transform" />
                                    <span>Table Reservation</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#contact" 
                                    onClick={(e) => handleNavClick(e, 'contact')}
                                    className="text-gray-900 hover:text-[#2d5a27] transition-colors flex items-center gap-1.5 group cursor-pointer"
                                >
                                    <ChevronRight size={15} strokeWidth={2.5} className="text-[#c9a227] group-hover:translate-x-0.5 transition-transform" />
                                    <span>Contact Us</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div>
                        <h4 className="font-black text-[#0d1810] uppercase tracking-wider text-xs sm:text-sm">
                            Contact Us
                        </h4>
                        <div className="w-12 h-1 bg-[#c9a227] rounded-full mt-2 mb-4"></div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#faf6ed] border border-[#ede6d4] flex items-center justify-center text-[#c9a227] shrink-0 mt-0.5 shadow-2xs">
                                    <MapPin size={17} className="fill-[#c9a227]/20" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-[#0d1810] uppercase tracking-wide">Our Location</p>
                                    <p className="text-xs text-gray-900 font-semibold mt-0.5 leading-snug">
                                        Dunajska cesta 106<br />1000 Ljubljana, Slovenia
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#faf6ed] border border-[#ede6d4] flex items-center justify-center text-[#c9a227] shrink-0 mt-0.5 shadow-2xs">
                                    <Phone size={17} className="fill-[#c9a227]/20" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-[#0d1810] uppercase tracking-wide">Call Us</p>
                                    <a 
                                        href="tel:+38640791618" 
                                        className="text-xs text-gray-950 hover:text-[#2d5a27] font-extrabold mt-0.5 block transition-colors tracking-wide"
                                    >
                                        +386 40 791 618
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Visit Wilma */}
                    <div>
                        <h4 className="font-black text-[#0d1810] uppercase tracking-wider text-xs sm:text-sm">
                            Visit Wilma
                        </h4>
                        <div className="w-12 h-1 bg-[#c9a227] rounded-full mt-2 mb-4"></div>
                        <p className="text-xs sm:text-sm text-gray-900 font-semibold leading-relaxed mb-4">
                            Make your next breakfast, lunch or business meeting special with us.
                        </p>
                        <button 
                            onClick={(e) => handleNavClick(e, 'booking')}
                            className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-yellow-500 text-[#0d1810] font-black px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition text-xs cursor-pointer"
                        >
                            <Calendar size={14} />
                            <span>Reserve a Table</span>
                        </button>
                        <p className="text-xs text-gray-800 font-bold italic mt-3">
                            We look forward to your visit!
                        </p>
                    </div>

                </div>
            </div>

            {/* Bottom Sub-Footer Bar */}
            <div className="bg-[#e9edf2] border-t border-gray-300/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    
                    {/* Left Side: Social Media with Authentic Brand Colors */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-900 font-extrabold tracking-wide">Follow us</span>
                        <div className="flex items-center gap-2.5">
                            {/* Facebook - Official Blue #1877F2 */}
                            <a 
                                href="https://www.facebook.com/Restavracija.Wilma" 
                                target="https://www.facebook.com/Restavracija.Wilma" 
                                rel="noopener noreferrer" 
                                className="w-9 h-9 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-200" 
                                aria-label="Facebook"
                                title="Facebook"
                            >
                                <Facebook size={16} fill="currentColor" />
                            </a>

                            {/* Instagram - Official Gradient/Pink #E4405F */}
                            <a 
                                href="https://www.instagram.com/restarvacija.wilma" 
                                target="https://www.instagram.com/restarvacija.wilma" 
                                rel="noopener noreferrer" 
                                className="w-9 h-9 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:scale-110 transition-all duration-200" 
                                aria-label="Instagram"
                                title="Instagram"
                            >
                                <Instagram size={16} />
                            </a>

                            {/* LinkedIn - Official Blue #0A66C2 */}
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-9 h-9 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-200" 
                                aria-label="LinkedIn"
                                title="LinkedIn"
                            >
                                <Linkedin size={16} fill="currentColor" />
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Copyright */}
                    <p className="text-xs text-gray-900 font-bold">
                        © 2026 Restavracija Wilma Ljubljana. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
