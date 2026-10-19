import React from 'react';
import ContactSection from '../components/ContactSection';

const Contact = () => {
    return (
        <div className="bg-[#fdfbf7] min-h-screen">
            {/* Header Banner */}
            <div className="relative py-20 bg-[#1c241b] text-white text-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('/images/hero.jpeg')" }}
                ></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <span className="inline-block px-3.5 py-1 bg-[#d4af37]/20 text-[#f5d76e] text-xs font-bold tracking-widest uppercase rounded-full mb-3 border border-[#d4af37]/40">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4">
                        Contact &amp; <span className="text-[#d4af37]">Support</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                        Dunajska cesta 106, 1000 Ljubljana • Direct Phone: 040 791 618
                    </p>
                </div>
            </div>

            <ContactSection />
        </div>
    );
};

export default Contact;
