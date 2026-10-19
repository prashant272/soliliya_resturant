import React from 'react';
import { Clock, ShieldCheck, CheckCircle, Leaf } from 'lucide-react';

const Features = () => {
    return (
        <section className="py-20 relative bg-dark-800">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                        Why India Loves <span className="text-gold-gradient italic">Biryani YoYo</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {/* Feature 1 */}
                    <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-16 h-16 mx-auto bg-black border border-gold rounded-full flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-display text-white mb-3">45-Min Express Delivery</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Hot and fresh biryani delivered to your doorstep in under 45 minutes, guaranteed.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-16 h-16 mx-auto bg-black border border-gold rounded-full flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                            <Leaf size={32} />
                        </div>
                        <h3 className="text-xl font-display text-white mb-3">Freshly Prepared</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            We cook fresh on every order. No frozen or reheated food, ever.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-16 h-16 mx-auto bg-black border border-gold rounded-full flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-display text-white mb-3">No Preservatives</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Zero artificial colors or preservatives. Just pure, authentic spices and ingredients.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-16 h-16 mx-auto bg-black border border-gold rounded-full flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-display text-white mb-3">FSSAI Approved</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Certified hygiene standards and FSSAI approved kitchen for your peace of mind.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
