import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 max-w-7xl mx-auto bg-[#fdfbf7]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Info Block */}
                <div className="space-y-6">
                    <div className="inline-block px-3.5 py-1.5 bg-[#2d5a27]/10 text-[#2d5a27] font-semibold text-xs tracking-widest rounded-full uppercase">
                        About Wilma Restaurant
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c241b] leading-tight">
                        Your First Choice for Business and Private Meetings in Ljubljana
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Restaurant <strong className="text-[#1c241b]">Wilma</strong> is located in a prime location at Dunajska cesta 106 in Ljubljana. We offer the perfect balance between top-notch Slovenian cuisine and a modern ambiance, suitable for business meetings, relaxed lunches, and formal dinners.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Whether you are planning a quick business breakfast, a presentation for clients (2 to 8 people or more), or an evening gathering over a glass of selected Slovenian wine, Wilma guarantees top-notch service and unforgettable flavors.
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#2d5a27] flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-xs"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-[#1c241b]">Business Meetings</h4>
                                <p className="text-xs text-gray-500">Tables for 2, 4 or 8 people with complete peace of mind.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#2d5a27] flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-xs"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-[#1c241b]">Traditional Flavors</h4>
                                <p className="text-xs text-gray-500">Carniolan sausage, Štruklji and authentic local dishes.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#2d5a27] flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-xs"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-[#1c241b]">Quick Online Booking</h4>
                                <p className="text-xs text-gray-500">Instant confirmation card with QR code generator.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#2d5a27] flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-check text-xs"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-[#1c241b]">Parking &amp; Access</h4>
                                <p className="text-xs text-gray-500">Easy access and free parking on Dunajska cesta.</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="pt-4 border-t border-gray-200 flex items-center gap-8">
                        <div>
                            <span className="block text-2xl font-bold font-heading text-[#2d5a27]">100%</span>
                            <span className="text-xs text-gray-500">Local Ingredients</span>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div>
                            <span className="block text-2xl font-bold font-heading text-[#2d5a27]">040 791 618</span>
                            <span className="text-xs text-gray-500">Direct Reservation Line</span>
                        </div>
                    </div>
                </div>

                {/* Right Image Cards */}
                <div className="grid grid-cols-2 gap-4 relative">
                    <div className="space-y-4">
                        <img 
                            src="/images/food.jpeg" 
                            alt="Wilma Culinary Dish" 
                            className="rounded-2xl shadow-md object-cover h-64 w-full hover:scale-105 transition-transform duration-500"
                        />
                        <img 
                            src="/images/hero.jpeg" 
                            alt="Wilma Ambiance" 
                            className="rounded-2xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="space-y-4 pt-8">
                        <img 
                            src="/images/food3.jpeg" 
                            alt="Delicious Slovenian Cuisine" 
                            className="rounded-2xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform duration-500"
                        />
                        <div className="bg-[#2d5a27] text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                            <i className="fa-solid fa-quote-left text-2xl text-[#d4af37]"></i>
                            <p className="text-xs font-light italic my-3 text-gray-100">
                                "Top-notch service and an exceptional environment for our business partners!"
                            </p>
                            <span className="text-[11px] font-bold text-[#f5d76e]">
                                — Ljubljana Business Club
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
