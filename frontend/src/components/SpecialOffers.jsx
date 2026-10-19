import React from 'react';
import { Percent, Gift, CreditCard } from 'lucide-react';

const SpecialOffers = () => {
    return (
        <section className="py-20 bg-dark-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                        Limited Time Deals
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                        Today's <span className="text-gold-gradient italic">Special Offers</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Offer 1 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-gold/30 rounded-xl p-8 group hover:border-gold transition-all duration-300">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                                <Percent size={28} />
                            </div>
                            <h3 className="text-2xl font-display text-white">First Order</h3>
                        </div>
                        <p className="text-gold font-bold text-lg mb-2">FLAT 20% OFF</p>
                        <p className="text-gray-400 text-sm mb-6">Use Code: <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">YOYO20</span></p>
                        <button className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all text-sm font-bold uppercase tracking-wider rounded">
                            Claim Offer
                        </button>
                    </div>

                    {/* Offer 2 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-gold/30 rounded-xl p-8 group hover:border-gold transition-all duration-300">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
                        {/* Tag */}
                        <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                            Weekend Special
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                                <Gift size={28} />
                            </div>
                            <h3 className="text-2xl font-display text-white">Biryani Fest</h3>
                        </div>
                        <p className="text-gold font-bold text-lg mb-2">BUY 2 GET 1 FREE</p>
                        <p className="text-gray-400 text-sm mb-6">On all Dum Biryanis (Fri-Sun)</p>
                        <button className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all text-sm font-bold uppercase tracking-wider rounded">
                            Order Now
                        </button>
                    </div>

                    {/* Offer 3 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-gold/30 rounded-xl p-8 group hover:border-gold transition-all duration-300">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                                <CreditCard size={28} />
                            </div>
                            <h3 className="text-2xl font-display text-white">UPI Payment</h3>
                        </div>
                        <p className="text-gold font-bold text-lg mb-2">EXTRA 10% OFF</p>
                        <p className="text-gray-400 text-sm mb-6">Applicable on all orders above ₹500</p>
                        <button className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all text-sm font-bold uppercase tracking-wider rounded">
                            Pay via UPI
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
