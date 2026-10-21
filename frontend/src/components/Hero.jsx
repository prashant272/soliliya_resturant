import React, { useRef, useEffect } from 'react';

const Hero = () => {
    const videoRef = useRef(null);
    const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('wilma_lang') || 'sl') : 'sl';
    const isSlovenian = savedLang === 'sl';

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {
                // Autoplay was prevented or will play on first interaction
            });
        }
    }, []);

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
            className="relative w-full min-h-[350px] sm:min-h-[390px] md:min-h-[430px] lg:h-[50vh] max-h-[480px] bg-black border-b border-[#283227] overflow-hidden flex items-center justify-center group"
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/hero-banner.png"
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0"
            >
                <source src="/images/hero.mp4" type="video/mp4" />
                {/* Fallback Image */}
                <img
                    src="/images/hero-banner.png"
                    alt="Wilma kosila"
                    className="w-full h-full object-cover object-center"
                />
            </video>

            {/* Subtle Cinematic Dark Overlay */}
            <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none"></div>

            {/* Centered Content Container */}
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col items-center justify-center text-center py-6 sm:py-8 md:py-10">
                
                {/* Tagline Pill */}
                <div className="inline-flex items-center gap-2 mb-2 md:mb-2.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-[#d4af37]/40 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                    <span className="text-[#d4af37] text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                        {isSlovenian ? 'RESTAVRACIJA & KOSILA' : 'RESTAURANT & LUNCH'}
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-white font-serif font-black leading-[1.12] mb-2 md:mb-2.5 text-center">
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-md">
                        {isSlovenian ? 'Dobro kosilo.' : 'Good lunch.'}
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#d4af37] drop-shadow-lg mt-0.5">
                        {isSlovenian ? 'Še boljša večerja.' : 'Even better dinner.'}
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 text-gray-200 drop-shadow-sm max-w-xl mx-auto">
                    {isSlovenian ? 'KOSILA NA DUNAJSKI CESTI 106, LJUBLJANA' : 'LUNCHES AT DUNAJSKA CESTA 106, LJUBLJANA'}
                </p>

                {/* Promo Coupon Pill */}
                <div className="inline-flex items-center gap-2 bg-black/55 backdrop-blur-md border border-[#d4af37]/40 px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 md:mb-5 shadow-xl">
                    <span className="text-gray-200 text-[11px] sm:text-xs">
                        {isSlovenian ? 'Prvi obisk? Obrok za samo 8 €:' : 'First visit? Meal for just €8:'}
                    </span>
                    <span
                        className="bg-[#d4af37] hover:bg-[#c9a227] text-[#142218] px-2 py-0.5 rounded-full font-black text-[11px] sm:text-xs tracking-wider cursor-pointer select-all transition-transform hover:scale-105"
                        title="Koda za popust"
                    >
                        WILMA@8
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                    <a
                        href="#menu"
                        onClick={(e) => scrollToSection(e, 'menu')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#d4af37] hover:bg-[#c9a227] text-[#142218] text-xs sm:text-sm font-extrabold uppercase rounded-xl shadow-lg hover:shadow-[#d4af37]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <span>{isSlovenian ? 'DANAŠNJI MENI' : "TODAY'S MENU"}</span>
                        <span className="text-sm">↓</span>
                    </a>
                    <a
                        href="#booking"
                        onClick={(e) => scrollToSection(e, 'booking')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#d4af37] text-white hover:text-[#d4af37] text-xs sm:text-sm font-extrabold uppercase rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <span>{isSlovenian ? 'REZERVIRAJTE MIZO' : 'BOOK A TABLE'}</span>
                        <span className="text-sm">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Hero;