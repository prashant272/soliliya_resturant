import React from 'react';
import { 
    UtensilsCrossed, 
    Briefcase, 
    MapPin, 
    Phone, 
    CheckCircle2, 
    Sparkles 
} from 'lucide-react';

const AboutSection = () => {
    const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('wilma_lang') || 'sl') : 'sl';
    const isSlovenian = savedLang === 'sl';

    return (
        <section id="about" className="relative py-14 sm:py-20 lg:py-24 bg-[#fdfbf7] border-b border-[#ece6d8]">
            {/* Ambient Background Decorative Glows */}
            <div className="absolute top-1/4 -left-10 w-96 h-96 bg-[#2d5a27]/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-10 w-96 h-96 bg-[#d4af37]/12 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                    {/* Left Column: Narrative, Features & Stats (6 cols on lg, scrolls naturally) */}
                    <div className="lg:col-span-6 space-y-6 sm:space-y-7">
                        
                        <div className="space-y-4 sm:space-y-5">
                            {/* Sub-badge */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2d5a27]/12 border border-[#2d5a27]/25 shadow-xs">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#2d5a27] animate-pulse"></span>
                                <span className="text-[#1b431e] font-bold text-xs sm:text-sm tracking-[0.18em] uppercase">
                                    {isSlovenian ? 'O RESTAVRACIJI WILMA' : 'ABOUT WILMA RESTAURANT'}
                                </span>
                            </div>

                            {/* Main Heading with Strong High-Contrast Color */}
                            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[46px] font-bold text-[#111c12] leading-[1.22] tracking-tight">
                                {isSlovenian ? (
                                    <>
                                        Vaša prva izbira za{' '}
                                        <span className="text-[#2d5a27] relative inline-block">
                                            poslovna kosila
                                            <span className="absolute left-0 bottom-1.5 w-full h-[3.5px] bg-[#d4af37] rounded-full"></span>
                                        </span>{' '}
                                        in zasebna srečanja v Ljubljani
                                    </>
                                ) : (
                                    <>
                                        Your First Choice for{' '}
                                        <span className="text-[#2d5a27] relative inline-block">
                                            Business Lunches
                                            <span className="absolute left-0 bottom-1.5 w-full h-[3.5px] bg-[#d4af37] rounded-full"></span>
                                        </span>{' '}
                                        & Private Gatherings in Ljubljana
                                    </>
                                )}
                            </h2>

                            {/* Refined Strong Narrative Description */}
                            <div className="space-y-3 text-[#1f2920] text-base sm:text-lg leading-relaxed">
                                <p>
                                    {isSlovenian ? (
                                        <>
                                            Restavracija <strong className="text-[#111c12] font-bold">Wilma</strong> se nahaja na prestižni in hitro dostopni lokaciji na <strong className="text-[#111c12] font-bold">Dunajski cesti 106</strong> v Ljubljani. Združujemo kulinarično dovršenost pristne slovenske kuhinje s sodobnim, mirnim ambientom, oblikovanim za poslovne partnerje in kulinarične navdušence.
                                        </>
                                    ) : (
                                        <>
                                            Restaurant <strong className="text-[#111c12] font-bold">Wilma</strong> is situated at an easily accessible address on <strong className="text-[#111c12] font-bold">Dunajska cesta 106</strong> in Ljubljana. We combine authentic Slovenian culinary excellence with a tranquil, modern ambiance curated for business meetings and casual lunches.
                                        </>
                                    )}
                                </p>
                                <p className="text-[#2c372d] text-sm sm:text-base font-medium">
                                    {isSlovenian ? (
                                        <>
                                            Od hitrih jutranjih sestankov do dnevnih samopostrežnih malic, poslovnih kosil za 2 do 8+ oseb ter večernih kulinaričnih doživetij z vrhunskimi slovenskimi vini – pri nas je vsak obisk zagotovilo za kakovost in prijetno počutje.
                                        </>
                                    ) : (
                                        <>
                                            From productive morning meetings and daily lunch specials to private business meals (2 to 8+ guests) and evening dinners with fine local wines — Wilma guarantees unmatched hospitality.
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* 4 Feature Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1.5">
                                {/* Feature 1 */}
                                <div className="group flex items-start gap-4 p-4 sm:p-4.5 rounded-2xl bg-white border border-[#2d5a27]/15 hover:border-[#2d5a27]/40 hover:shadow-md transition-all duration-300">
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2d5a27]/12 text-[#2d5a27] group-hover:bg-[#2d5a27] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-[#111c12]">
                                            {isSlovenian ? 'Poslovna kosila & sestanki' : 'Business Meetings'}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#2d3a2d] font-medium mt-1 leading-snug">
                                            {isSlovenian 
                                                ? 'Mize za 2, 4 ali 8+ oseb v mirnem kotičku z visoko stopnjo zasebnosti.'
                                                : 'Dedicated tables for 2, 4 or 8+ guests with quiet, discreet ambiance.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="group flex items-start gap-4 p-4 sm:p-4.5 rounded-2xl bg-white border border-[#2d5a27]/15 hover:border-[#2d5a27]/40 hover:shadow-md transition-all duration-300">
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#d4af37]/25 text-[#2d5a27] group-hover:bg-[#d4af37] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                        <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-[#111c12]">
                                            {isSlovenian ? 'Avtentična kulinarika' : 'Authentic Cuisine'}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#2d3a2d] font-medium mt-1 leading-snug">
                                            {isSlovenian
                                                ? 'Kranjska klobasa, domači štruklji in dnevno sveže lokalne sestavine.'
                                                : 'Carniolan sausage, handmade štruklji, and daily fresh local ingredients.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="group flex items-start gap-4 p-4 sm:p-4.5 rounded-2xl bg-white border border-[#2d5a27]/15 hover:border-[#2d5a27]/40 hover:shadow-md transition-all duration-300">
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2d5a27]/12 text-[#2d5a27] group-hover:bg-[#2d5a27] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-[#111c12]">
                                            {isSlovenian ? 'Dostopnost & parkirišče' : 'Easy Access & Parking'}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#2d3a2d] font-medium mt-1 leading-snug">
                                            {isSlovenian
                                                ? 'Dunajska cesta 106 z enostavnim dostopom in parkirnimi mesti.'
                                                : 'Dunajska cesta 106 with effortless access and dedicated guest parking.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 4 */}
                                <div className="group flex items-start gap-4 p-4 sm:p-4.5 rounded-2xl bg-white border border-[#2d5a27]/15 hover:border-[#2d5a27]/40 hover:shadow-md transition-all duration-300">
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#d4af37]/25 text-[#2d5a27] group-hover:bg-[#d4af37] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-[#111c12]">
                                            {isSlovenian ? 'Hitra rezervacija mize' : 'Quick Reservation'}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#2d3a2d] font-medium mt-1 leading-snug">
                                            {isSlovenian
                                                ? 'Takojšnja potrditev mize s QR kodo ali preko neposrednega klica.'
                                                : 'Instant table confirmation with QR code or direct reservation call.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clean High-Contrast Stats & Direct Phone Line */}
                        <div className="pt-5 border-t border-gray-300 flex items-center gap-8 sm:gap-12">
                            <div>
                                <span className="block text-3xl sm:text-4xl font-bold font-heading text-[#2d5a27]">100%</span>
                                <span className="text-xs sm:text-sm font-semibold text-[#111c12]">
                                    {isSlovenian ? 'Lokalne sestavine' : 'Local Ingredients'}
                                </span>
                            </div>

                            <div className="h-10 w-px bg-gray-300"></div>

                            <div>
                                <a 
                                    href="tel:+38640791618" 
                                    className="flex items-center gap-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#2d5a27] hover:text-[#1c4d25] transition-colors"
                                >
                                    <Phone className="w-6 h-6 text-[#d4af37]" />
                                    <span>40 791 618</span>
                                </a>
                                <span className="text-xs sm:text-sm font-semibold text-[#111c12]">
                                    {isSlovenian ? 'Neposredna linija za rezervacije' : 'Direct Reservation Line'}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Curated Collage Showcase (Sticky on Desktop) */}
                    <div className="lg:col-span-6 relative mt-6 lg:mt-0 lg:sticky lg:top-24 self-start z-20">
                        {/* Outer Glow Ring */}
                        <div className="absolute -inset-3 bg-gradient-to-tr from-[#2d5a27]/12 to-[#d4af37]/22 rounded-3xl blur-3xl opacity-70 pointer-events-none"></div>

                        {/* Collage Image Container with exact 1024/682 (3:2) Aspect Ratio */}
                        <div className="relative aspect-[1024/682] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#2d5a27]/25 bg-black flex items-center justify-center group">
                            <img
                                src="/images/about-collage.jpg"
                                alt="Restavracija Wilma ambient in kulinarika"
                                className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                loading="lazy"
                            />

                            {/* Floating Top Pill Badge */}
                            <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-[#d4af37]/45 text-white shadow-xl">
                                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                                <span className="text-xs font-bold tracking-wider uppercase text-[#fdfbf7]">
                                    {isSlovenian ? 'Pristni ambient & kulinarika' : 'Authentic Ambiance & Cuisine'}
                                </span>
                            </div>
                        </div>

                        {/* Location / Review Bar */}
                        <div className="mt-4 sm:mt-5">
                            <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-[#2d5a27]/15 shadow-md flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#2d5a27] text-white flex items-center justify-center shrink-0 shadow-xs">
                                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base font-bold text-[#111c12]">Dunajska cesta 106, 1000 Ljubljana</p>
                                        <p className="text-xs sm:text-sm text-[#2d3a2d] font-medium">
                                            {isSlovenian ? 'Brezplačna parkirna mesta za goste' : 'Free guest parking available'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="inline-block px-3 py-1.5 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] text-xs sm:text-sm font-bold">
                                        {isSlovenian ? 'Odprto danes' : 'Open Today'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;


