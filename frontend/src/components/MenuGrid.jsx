import React, { useState, useEffect } from 'react';
import { Star, Plus, X } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const MenuGrid = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [selectedItem, setSelectedItem] = useState(null); // For variant selection modal

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/menu`);
                // Show only top 8 items or specific ones
                setMenuItems(data.slice(0, 8));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const handleAddToCartClick = (item) => {
        if (item.variants && item.variants.length > 0) {
            setSelectedItem(item);
        } else {
            addToCart(item);
        }
    };

    const handleVariantSelect = (variant) => {
        if (selectedItem) {
            addToCart(selectedItem, variant);
            setSelectedItem(null);
        }
    };

    if (loading) return <div className="text-center py-20 text-white">Loading Menu...</div>;

    return (
        <section className="py-20 bg-dark-900 text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-2">
                        Taste the Tradition
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                        Our <span className="text-gold-gradient italic">Specialties</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menuItems.map((item) => (
                        <div key={item._id} className="group relative bg-dark-800 border border-white/5 rounded-0 overflow-hidden hover:border-gold/30 transition-all duration-300">
                            {/* Image */}
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                {item.tag && (
                                    <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                        {item.tag}
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 text-gold text-sm font-bold rounded-full border border-gold/20">
                                    {item.variants && item.variants.length > 0
                                        ? `₹${item.variants[0].price}+`
                                        : `₹${item.price}`
                                    }
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-display text-white mb-2 group-hover:text-gold transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-white/90 text-sm mb-6 line-clamp-2 h-10">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => handleAddToCartClick(item)}
                                    className="w-full py-3 border border-white/10 hover:bg-gold hover:border-gold hover:text-black transition-all uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Plus size={16} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/menu" className="inline-block px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all uppercase text-sm font-bold tracking-widest">
                        View Full Menu
                    </a>
                </div>
            </div>

            {/* Variant Selection Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-800 p-6 rounded-lg w-full max-w-sm border border-white/10 relative">
                        <button onClick={() => setSelectedItem(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-display text-gold mb-2">{selectedItem.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">Select Portion Size</p>

                        <div className="space-y-3">
                            {selectedItem.variants.map((variant) => (
                                <button
                                    key={variant.name}
                                    onClick={() => handleVariantSelect(variant)}
                                    className="w-full flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded transition-colors"
                                >
                                    <span className="text-white font-bold">{variant.name}</span>
                                    <span className="text-gold">₹{variant.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MenuGrid;
