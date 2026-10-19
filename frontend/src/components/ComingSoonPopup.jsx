import React, { useState, useEffect } from 'react';

const ComingSoonPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show once shortly after mount if not dismissed in this session
        const dismissed = sessionStorage.getItem('wilma_coming_soon_dismissed');
        if (!dismissed) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('wilma_coming_soon_dismissed', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#1c241b] p-8 text-center text-white shadow-2xl sm:p-10 animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    type="button"
                    aria-label="Close popup"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
                >
                    <i className="fa-solid fa-xmark text-lg"></i>
                </button>

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10">
                    <i className="fa-solid fa-utensils text-3xl text-[#d4af37]"></i>
                </div>

                {/* Brand */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                    Restaurant Wilma
                </p>

                {/* Heading */}
                <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
                    Coming <span className="text-[#d4af37]">soon</span>
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-300">
                    Something special is coming! We are preparing a wonderful culinary experience for you in Ljubljana. Follow us and stay up to date with information about the grand opening.
                </p>

                {/* Decorative Line */}
                <div className="mx-auto my-6 h-px w-20 bg-[#d4af37]"></div>

                {/* Location */}
                <p className="mb-6 text-xs text-gray-400">
                    <i className="fa-solid fa-location-dot mr-2 text-[#d4af37]"></i>
                    Dunajska cesta 106, Ljubljana
                </p>

                {/* Action Button */}
                <button
                    onClick={handleClose}
                    type="button"
                    className="w-full rounded-xl bg-[#c9a227] px-6 py-3.5 font-bold text-[#1c241b] transition hover:bg-yellow-500 cursor-pointer shadow-lg"
                >
                    Follow us
                </button>

            </div>
        </div>
    );
};

export default ComingSoonPopup;
