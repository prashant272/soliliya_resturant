import React from 'react';
import { MousePointerClick, ChefHat, Truck } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: MousePointerClick,
            title: "Choose Your Dish",
            desc: "Browse our extensive menu of authentic Biryanis and Kebabs."
        },
        {
            icon: ChefHat,
            title: "We Cook Fresh",
            desc: "Our master chefs prepare your meal with fresh ingredients."
        },
        {
            icon: Truck,
            title: "Express Delivery",
            desc: "Get your hot & fresh meal delivered in 45 mins."
        }
    ];

    return (
        <section className="py-20 bg-dark-800 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                        How It <span className="text-gold-gradient italic">Works</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-full z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex-1 flex flex-col items-center text-center p-6">
                            <div className="w-20 h-20 bg-dark-900 border-2 border-gold rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                <step.icon size={32} className="text-gold" />
                            </div>
                            <div className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                                STEP 0{index + 1}
                            </div>
                            <h3 className="text-xl font-display text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
