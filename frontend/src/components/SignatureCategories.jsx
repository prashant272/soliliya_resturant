import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignatureCategories = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: "The Royal Dum Series",
            desc: "Authentic Hyderabadi & Lucknowi Biryanis",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            filter: "Biryani"
        },
        {
            id: 2,
            name: "Tandoori & Kebabs",
            desc: "Charcoal Grilled Starters",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            filter: "Starters"
        },
        {
            id: 3,
            name: "Family Combos",
            desc: "Perfect Feasts for Groups",
            image: "../biryani/family.jpg",
            filter: "Chicken"
        },
        {
            id: 4,
            name: "Veg Specials",
            desc: "Paneer, Mushroom & Soya Chaap",
            image: "../biryani/veg.jpg",
            filter: "Veg"
        }
    ];

    const handleCategoryClick = (category) => {
        navigate(`/menu?category=${category}`);
    };

    return (
        <section className="py-20 bg-dark-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                        Collections
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                        Signature <span className="text-gold-gradient italic">Categories</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.filter)}
                            className="group relative h-80 rounded-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-display text-white mb-1 group-hover:text-gold transition-colors">{cat.name}</h3>
                                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">{cat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default SignatureCategories;
