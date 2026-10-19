import React from 'react';

const Hero = () => {
    const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('wilma_lang') || 'sl') : 'sl';
    const isSlovenian = savedLang === 'sl';

    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative w-full h-[280px] sm:h-[340px] md:h-[480px] lg:h-[580px] bg-[#fbf9f4] border-b border-[#ece6d8] overflow-hidden group"
        >
            {/* Background Banner Image */}
            <img
                src="/images/hero-banner.png"
                alt="Wilma kosila"
                className="absolute inset-x-0 bottom-0 top-0 w-full h-full object-cover object-[88%_center] sm:object-[80%_center] md:object-right select-none pointer-events-none z-0"
                fetchPriority="high"
                decoding="sync"
            />

            {/* Gradient Overlay for crisp text contrast */}
            <div className="absolute inset-y-0 left-0 w-[64%] sm:w-[58%] md:w-[50%] lg:w-[48%] bg-gradient-to-r from-[#fbf9f4] via-[#fbf9f4]/90 to-transparent z-10 pointer-events-none"></div>

            {/* Content Container */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center justify-start">
                {/* Content Box */}
                <div className="relative w-[56%] sm:w-[52%] md:w-[55%] lg:w-[48%] flex flex-col justify-center">

                    {/* Tagline Pill */}
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                        <div className="w-0.5 h-2.5 md:h-4 bg-[#184627]"></div>
                        <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase bg-[#184627] px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                            {isSlovenian ? 'RESTAVRACIJA & KOSILA' : 'RESTAURANT & LUNCH'}
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-[#14331e] font-serif font-black leading-[1.08] mb-1 md:mb-2.5">
                        <span className="block text-[18px] sm:text-[24px] md:text-4xl lg:text-5xl tracking-tight">
                            {isSlovenian ? 'Dobro kosilo.' : 'Good lunch.'}
                        </span>
                        <span className="block text-[19px] sm:text-[26px] md:text-4xl lg:text-5xl tracking-tight text-[#184627]">
                            {isSlovenian ? 'Še boljša večerja.' : 'Even better dinner.'}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase mb-1.5 md:mb-3 text-[#b8860b] line-clamp-2 md:line-clamp-none">
                        {isSlovenian ? 'KOSILA NA DUNAJSKI CESTI 106, LJUBLJANA' : 'LUNCHES AT DUNAJSKA CESTA 106, LJUBLJANA'}
                    </div>

                    {/* Promo Coupon Pill */}
                    <div className="inline-flex items-center gap-1.5 bg-[#fef7e0]/95 border border-[#f5ebcb] px-2 py-1 rounded-md text-[8px] sm:text-[11px] font-bold text-[#14331e] w-fit mb-2 md:mb-4 shadow-2xs">
                        <span>{isSlovenian ? 'Prvi obisk? Obrok za samo 8 €:' : 'First visit? Meal for just €8:'}</span>
                        <span
                            className="bg-[#184627] hover:bg-[#12361e] text-white px-1.5 py-0.5 rounded font-extrabold text-[8px] sm:text-[10px] tracking-wider cursor-pointer select-all transition-colors"
                            title="Discount code"
                        >
                            WILMA@8
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2.5">
                        <a
                            href="#menu"
                            onClick={(e) => scrollToSection(e, 'menu')}
                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-[#184627] hover:bg-[#12361e] text-white text-[9px] sm:text-xs md:text-sm font-bold uppercase rounded-md shadow-sm transition-colors cursor-pointer w-fit"
                        >
                            <span>{isSlovenian ? 'DANAŠNJI MENI' : "TODAY'S MENU"}</span>
                            <span className="text-xs">↓</span>
                        </a>
                        <a
                            href="#booking"
                            onClick={(e) => scrollToSection(e, 'booking')}
                            className="inline-flex items-center justify-center gap-1 border border-[#184627] px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white/90 hover:bg-[#184627] text-[#184627] hover:text-white text-[9px] sm:text-xs md:text-sm font-bold uppercase rounded-md shadow-sm transition-colors cursor-pointer w-fit"
                        >
                            <span>{isSlovenian ? 'REZERVIRAJTE MIZO' : 'BOOK A TABLE'}</span>
                            <span className="text-xs">→</span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
