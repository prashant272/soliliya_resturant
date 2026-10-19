import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LayoutDashboard } from 'lucide-react';


const Navbar = ({ onOpenAuth }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart, isCartOpen, setIsCartOpen } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b border-slovenia-gold/20 ${isScrolled ? 'bg-white/95 shadow-md py-1' : 'bg-white/85 py-2'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, 'home')}
                        className="flex items-center gap-1 group py-1"
                    >
                        <img
                            src="/images/wilma-logo-clean.png"
                            alt="Restavracija Wilma Logo"
                            className="h-12 sm:h-14 md:h-[58px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-bold tracking-wide">
                        <a
                            href="#home"
                            onClick={(e) => handleNavClick(e, 'home')}
                            className="text-gray-900 hover:text-[#D4AF37] transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            onClick={(e) => handleNavClick(e, 'about')}
                            className="text-gray-900 hover:text-[#D4AF37] transition-colors"
                        >
                            About Us
                        </a>
                        <Link
                            to="/menu"
                            className={`transition-colors font-bold ${
                                location.pathname === '/menu'
                                    ? 'text-[#c9a227] font-extrabold'
                                    : 'text-gray-900 hover:text-[#D4AF37]'
                            }`}
                        >
                            Menu
                        </Link>
                        <a
                            href="#booking"
                            onClick={(e) => handleNavClick(e, 'booking')}
                            className="text-gray-900 hover:text-[#D4AF37] transition-colors"
                        >
                            Reservation
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'contact')}
                            className="text-gray-900 hover:text-[#D4AF37] transition-colors"
                        >
                            Contact &amp; Support
                        </a>
                    </nav>

                    {/* Header Actions */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                        <a
                            href="tel:040791618"
                            className="flex items-center gap-2 text-xs text-[#d4af37] bg-[#283227] px-3.5 py-2.5 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-all font-semibold"
                        >
                            <i className="fa-solid fa-phone"></i>
                            <span>040 791 618</span>
                        </a>

                        {/* Cart Button if active */}
                        {cart.length > 0 && (
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative flex items-center gap-2 text-xs text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-300 hover:border-[#d4af37] transition-all shadow-sm cursor-pointer"
                                title="View Cart"
                            >
                                <i className="fa-solid fa-bag-shopping text-sm text-[#2d5a27]"></i>
                                <span className="bg-[#c9a227] text-black text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            </button>
                        )}

                        {/* Login / Sign Up Button */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-all shadow-xs cursor-pointer ${
                                        location.pathname === '/dashboard'
                                            ? 'bg-[#142218] text-[#d4af37] border-[#d4af37]/50 ring-1 ring-[#d4af37]/40 shadow-sm'
                                            : 'bg-white text-gray-900 border-gray-300 hover:border-[#d4af37] hover:text-[#2d5a27]'
                                    }`}
                                >
                                    <LayoutDashboard size={15} className={location.pathname === '/dashboard' ? 'text-[#d4af37]' : 'text-[#2d5a27]'} />
                                    <span>Dashboard</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-xs text-red-600 hover:text-red-700 hover:underline px-2 py-1 cursor-pointer font-semibold"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onOpenAuth}
                                className="flex items-center gap-2 text-xs text-gray-900 bg-white px-4 py-2.5 rounded-xl border border-gray-300 hover:border-[#d4af37] hover:bg-gray-50 transition-all shadow-xs font-semibold cursor-pointer"
                            >
                                <i className="fa-solid fa-user text-[#2d5a27]"></i>
                                <span>Login / Sign Up</span>
                            </button>
                        )}

                        <a
                            href="#booking"
                            onClick={(e) => handleNavClick(e, 'booking')}
                            className="bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-[#d4af37]/20 flex items-center gap-2"
                        >
                            <i className="fa-solid fa-utensils mr-1"></i>
                            <span>Book a Table</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            className="relative text-gray-800 p-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-bag-shopping text-xl text-[#2d5a27]"></i>
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-[#c9a227] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-800 hover:text-black focus:outline-none p-2 cursor-pointer"
                            aria-label="Toggle Navigation"
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#283227] border-b border-[#d4af37]/20 px-6 pt-3 pb-6 space-y-3 text-sm text-white">
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, 'home')}
                        className="block py-2 text-gray-200 hover:text-[#d4af37] border-b border-white/5"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        onClick={(e) => handleNavClick(e, 'about')}
                        className="block py-2 text-gray-200 hover:text-[#d4af37] border-b border-white/5"
                    >
                        About Us
                    </a>
                    <Link
                        to="/menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 border-b border-white/5 font-semibold ${
                            location.pathname === '/menu'
                                ? 'text-[#d4af37]'
                                : 'text-gray-200 hover:text-[#d4af37]'
                        }`}
                    >
                        Menu
                    </Link>
                    <a
                        href="#booking"
                        onClick={(e) => handleNavClick(e, 'booking')}
                        className="block py-2 text-gray-200 hover:text-[#d4af37] border-b border-white/5"
                    >
                        Reservation
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, 'contact')}
                        className="block py-2 text-gray-200 hover:text-[#d4af37] border-b border-white/5"
                    >
                        Contact &amp; Support
                    </a>

                    <div className="pt-3 flex flex-col gap-2.5">
                        {user ? (
                            <div className="flex justify-between items-center py-2 text-gray-200 border-b border-white/10">
                                <span>Welcome, {user.name || 'Guest'}</span>
                                <div className="flex gap-3">
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-[#d4af37] font-semibold flex items-center gap-1">
                                        <LayoutDashboard size={14} /> Dashboard
                                    </Link>
                                    <button onClick={logout} className="text-red-400 font-bold">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
                                className="w-full text-center py-2.5 bg-white text-gray-900 rounded-lg border border-gray-300 font-medium flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <i className="fa-solid fa-user"></i>
                                <span>Login / Sign Up</span>
                            </button>
                        )}

                        <a
                            href="tel:040791618"
                            className="text-center py-2.5 bg-[#1c241b] text-[#d4af37] rounded-lg border border-[#d4af37]/30 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-phone"></i>
                            <span>Call 040 791 618</span>
                        </a>

                        <a
                            href="#booking"
                            onClick={(e) => handleNavClick(e, 'booking')}
                            className="text-center py-2.5 bg-[#c9a227] text-[#1c241b] font-bold rounded-lg shadow"
                        >
                            Book a Table
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
