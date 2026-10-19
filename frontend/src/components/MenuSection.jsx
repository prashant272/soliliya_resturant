import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Default 6 items matching the exact reference design
export const WILMA_MENU_ITEMS = [
    {
        _id: 'daily-1',
        name: 'Daily Soup',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food.jpeg',
        today: true
    },
    {
        _id: 'daily-2',
        name: 'Roasted Chicken',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food2.jpeg',
        today: true
    },
    {
        _id: 'daily-3',
        name: 'Vegetable Stew',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food3.jpeg',
        today: true
    },
    {
        _id: 'daily-4',
        name: 'Roasted Potatoes',
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a07?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food.jpeg',
        today: true
    },
    {
        _id: 'daily-5',
        name: 'Rice with Vegetables',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food2.jpeg',
        today: true
    },
    {
        _id: 'daily-6',
        name: 'Seasonal Salad',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        fallback: '/images/food3.jpeg',
        today: true
    }
];

const getImageUrl = (img, fallback) => {
    if (!img) return fallback || '/images/food.jpeg';
    if (img.startsWith('http') || img.startsWith('//') || img.startsWith('data:')) return img;
    if (img.startsWith('/')) return img;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    return `${baseUrl.replace(/\/api\/?$/, '')}/${img}`;
};

const MenuSection = () => {
    const [items, setItems] = useState(WILMA_MENU_ITEMS);
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        if (!categoryName) return;
        // Direct navigation to /menu with active category filter query
        navigate(`/menu?category=${encodeURIComponent(categoryName.trim())}`);
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;
                if (!baseUrl) return;

                // 1. Try fetching categories with today=true flag
                try {
                    const catRes = await axios.get(`${baseUrl}/categories?today=true`);
                    if (catRes.data && Array.isArray(catRes.data) && catRes.data.length > 0) {
                        setItems(catRes.data.slice(0, 6));
                        return;
                    }
                } catch (catErr) {
                    console.warn("Categories fetch note:", catErr.message);
                }

                // 2. Fallback check for menu items with today: true
                const { data } = await axios.get(`${baseUrl}/menu`);
                if (data && Array.isArray(data)) {
                    const todayOnly = data.filter(item => item.today === true || item.isToday === true);
                    if (todayOnly.length > 0) {
                        setItems(todayOnly.slice(0, 6));
                        return;
                    }
                }

                // 3. Fallback to default reference items
                setItems(WILMA_MENU_ITEMS);
            } catch (err) {
                // Keep default items
                setItems(WILMA_MENU_ITEMS);
            }
        };

        fetchItems();
    }, []);

    return (
        <section id="menu" className="pt-6 sm:pt-8 pb-8 sm:pb-10 bg-[#faf8f4] border-b border-[#ece6d8] text-[#1c241b]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
                    {/* Top Badge */}
                    <span className="inline-block bg-[#eaf1e9] text-[#244b2c] uppercase tracking-[0.18em] text-[10px] sm:text-[11px] font-bold px-3.5 py-1 rounded-full mb-2.5 shadow-2xs">
                        OUR OFFER
                    </span>

                    {/* Main Heading */}
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#14331e] tracking-tight uppercase leading-snug">
                        Self-service lunches to suit your taste
                    </h2>

                    {/* Subtitle */}
                    <p className="mt-1.5 text-xs sm:text-sm md:text-base text-[#526053] font-normal">
                        Choose from our daily self-service lunch selection.
                    </p>

                    {/* Section Subheading */}
                    <div className="mt-4 sm:mt-5">
                        <h3 className="font-bold text-base sm:text-lg text-[#14331e] tracking-wider uppercase">
                            AVAILABLE TODAY
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6c7b6d] mt-0.5 italic">
                            Explore today's freshly prepared lunch selection.
                        </p>
                    </div>
                </div>

                {/* 3 Columns x 2 Rows Food Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                    {items.slice(0, 6).map((item, index) => (
                        <div 
                            key={item._id || index} 
                            onClick={() => handleCategoryClick(item.name)}
                            className="flex flex-col group cursor-pointer"
                            title={`View ${item.name} in Menu`}
                        >
                            {/* Dish / Category Name directly above image */}
                            <h4 className="text-center font-bold text-sm sm:text-base text-[#14331e] mb-2 sm:mb-2.5 transition-colors group-hover:text-[#2d5a27] line-clamp-1 flex items-center justify-center gap-1.5">
                                <span>{item.name}</span>
                                <span className="text-xs text-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-4px] group-hover:translate-x-0">
                                    →
                                </span>
                            </h4>

                            {/* Food Image Card */}
                            <div className="overflow-hidden rounded-2xl bg-white border border-[#eae3d5] shadow-xs group-hover:shadow-xl transition-all duration-300 aspect-[16/11] relative group-hover:-translate-y-1">
                                <img
                                    src={getImageUrl(item.image, item.fallback)}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 select-none"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = item.fallback || '/images/food.jpeg';
                                    }}
                                    loading="lazy"
                                />

                                {/* Subtle hover badge */}
                                <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <span className="bg-white/95 text-[#142218] text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg border border-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        View in Menu →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Supporting Footnote */}
                <p className="text-center text-xs text-[#718096] italic mt-4 sm:mt-5">
                    Dishes and photos are shown as an example.
                </p>

            </div>
        </section>
    );
};

export default MenuSection;
