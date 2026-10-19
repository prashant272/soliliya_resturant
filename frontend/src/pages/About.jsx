import React from 'react';
import AboutSection from '../components/AboutSection';

const About = () => {
    return (
        <div className="bg-[#fdfbf7] min-h-screen text-[#1e2a1e]">
            {/* Page Header */}
            <div className="relative py-20 bg-[#1c241b] text-white text-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('/images/hero.jpeg')" }}
                ></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <span className="inline-block px-3.5 py-1 bg-[#d4af37]/20 text-[#f5d76e] text-xs font-bold tracking-widest uppercase rounded-full mb-3 border border-[#d4af37]/40">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4">
                        Restavracija <span className="text-[#d4af37]">Wilma</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                        A modern restaurant for business meetings, breakfasts, and top-notch Slovenian culinary delights in Ljubljana.
                    </p>
                </div>
            </div>

            <AboutSection />

            {/* Extra Wilma Highlights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-white rounded-3xl border border-[#ede8dd] shadow-sm">
                        <div className="w-16 h-16 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fa-solid fa-wheat-awn"></i>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-2 text-[#1c241b]">Authentic Recipes</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Crafted following time-honored Slovenian traditions using fresh produce and herbs from local farmers.
                        </p>
                    </div>

                    <div className="p-8 bg-white rounded-3xl border border-[#ede8dd] shadow-sm">
                        <div className="w-16 h-16 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-2 text-[#1c241b]">Business Hospitality</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Private tables for 2 to 8 guests with high-speed Wi-Fi, quiet ambiance, and discreet professional service.
                        </p>
                    </div>

                    <div className="p-8 bg-white rounded-3xl border border-[#ede8dd] shadow-sm">
                        <div className="w-16 h-16 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fa-solid fa-wine-glass"></i>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-2 text-[#1c241b]">Selected Wines</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Curated Slovenian wine cellars including Rebula, Teran, and premium boutique labels.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
