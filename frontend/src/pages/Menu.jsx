import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
    Search, 
    X, 
    Plus, 
    Minus, 
    Check, 
    ShoppingBag, 
    Utensils, 
    Sparkles, 
    Clock, 
    MapPin, 
    Phone, 
    Leaf, 
    Award, 
    ArrowRight,
    SlidersHorizontal
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Rich, authentic Wilma restaurant fallback dishes (authentic European & Slovenian cuisine)
export const DEFAULT_RICH_MENU = [
    {
        _id: 'wlm-1',
        name: 'Daily Self-Service Lunch Special',
        category: 'Daily Lunches',
        description: 'Freshly prepared daily lunch featuring a hot main course, side dish, and seasonal salad.',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        today: true,
        isSpecial: true,
        dietary: 'standard'
    },
    {
        _id: 'wlm-2',
        name: 'Authentic Wiener Schnitzel with Buttered Potatoes',
        category: 'Main Courses',
        description: 'Golden crispy breaded cutlet served with buttered pan-fried potatoes, lemon wedge, and tart cranberry sauce.',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&w=800&q=80',
        variants: [
            { name: 'Turkey Cutlet', price: 11.50 },
            { name: 'Traditional Veal', price: 13.90 }
        ],
        isSpecial: true,
        dietary: 'standard'
    },
    {
        _id: 'wlm-3',
        name: 'Traditional Carniolan Sausage (Kranjska Klobasa)',
        category: 'Slovenian Classics',
        description: 'Protected Slovenian geographical specialty served with freshly grated horseradish, homemade mustard, and fresh artisan bread.',
        price: 9.80,
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
        today: true,
        dietary: 'standard'
    },
    {
        _id: 'wlm-4',
        name: 'Traditional Beef Soup with Golden Egg Noodles',
        category: 'Soups & Starters',
        description: 'Clear beef broth simmered with local root vegetables, sweet carrots, and delicate hand-rolled thin noodles.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        dietary: 'standard'
    },
    {
        _id: 'wlm-5',
        name: 'Creamy Wild Porcini Mushroom Soup',
        category: 'Soups & Starters',
        description: 'Hearty forest porcini mushroom soup finished with fresh herb cream and golden toasted croutons.',
        price: 5.40,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        dietary: 'vegetarian'
    },
    {
        _id: 'wlm-6',
        name: 'Slow-Roasted Herb Chicken Breast',
        category: 'Main Courses',
        description: 'Tender juicy chicken breast seasoned with Mediterranean rosemary, roasted baby potatoes, and sauteed zucchini.',
        price: 10.80,
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
        today: true,
        dietary: 'standard'
    },
    {
        _id: 'wlm-7',
        name: 'Pan-Seared Wild Salmon on Buttered Spinach',
        category: 'Main Courses',
        description: 'Delicately pan-seared wild salmon fillet served over a bed of baby spinach leaves and savory tomato herb rice.',
        price: 15.80,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
        isSpecial: true,
        dietary: 'standard'
    },
    {
        _id: 'wlm-8',
        name: 'Authentic Cottage Cheese Štruklji',
        category: 'Slovenian Classics',
        description: 'Traditional Slovenian rolled dough pastry filled with fresh curd cheese, drizzled with browned butter breadcrumbs.',
        price: 7.90,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        dietary: 'vegetarian'
    },
    {
        _id: 'wlm-9',
        name: 'Wilma Crisp Garden Salad with Pumpkin Seed Oil',
        category: 'Salads & Sides',
        description: 'Crisp mix of garden greens, sweet cherry tomatoes, roasted pumpkin seeds, and authentic dark Styrian pumpkin seed oil.',
        price: 5.20,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        dietary: 'vegan'
    },
    {
        _id: 'wlm-10',
        name: 'Traditional Prekmurska Gibanica Cake',
        category: 'Desserts',
        description: 'Slovenia’s signature multi-layered festive cake with rich fillings of poppy seed, cottage cheese, walnuts, and apples.',
        price: 5.80,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
        isSpecial: true,
        dietary: 'vegetarian'
    },
    {
        _id: 'wlm-11',
        name: 'Warm Homemade Apple Strudel',
        category: 'Desserts',
        description: 'Flaky baked pastry filled with cinnamon-spiced local apples, dusted with powdered sugar and vanilla sauce.',
        price: 4.60,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        dietary: 'vegetarian'
    },
    {
        _id: 'wlm-12',
        name: 'Fresh House Lemonade & Beverages',
        category: 'Beverages',
        description: 'Freshly squeezed mint lemonade, natural fruit juices, regional Slovenian wines, and specialty roasted espresso.',
        price: 2.80,
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
        dietary: 'vegan'
    }
];

// Helper to resolve an item's category relative to admin categories
const getEffectiveCategory = (item, adminCatNames) => {
    if (!adminCatNames || adminCatNames.length === 0) {
        return item.category || 'Other';
    }
    const matched = adminCatNames.find(
        (ac) => ac.toLowerCase().trim() === (item.category || '').toLowerCase().trim()
    );
    return matched ? matched : 'Other';
};

const MenuItemCard = ({ item, displayCategory }) => {
    const hasVariants = item.variants && item.variants.length > 0;
    const [selectedVariant, setSelectedVariant] = useState(hasVariants ? item.variants[0] : null);

    const currentPrice = selectedVariant
        ? selectedVariant.price
        : (item.price || (hasVariants ? item.variants[0].price : 0));

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ede8dd] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            
            {/* Top section: Image & Content */}
            <div>
                {/* Image Container with Badges */}
                <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-100">
                    <img
                        src={item.image || '/images/food.jpeg'}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/food.jpeg';
                        }}
                        loading="lazy"
                    />

                    {/* Gradient Overlay for subtle contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Category Pill (Top Left) */}
                    <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 bg-[#142218]/90 backdrop-blur-md text-[#d4af37] text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-xs">
                        {displayCategory || item.category || 'Specialty'}
                    </span>

                    {/* Fresh Today or Chef Special (Top Right) */}
                    {item.today && (
                        <span className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-emerald-400/40">
                            <Sparkles size={11} className="text-yellow-300" />
                            <span>Fresh Today</span>
                        </span>
                    )}

                    {item.isSpecial && !item.today && (
                        <span className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 bg-[#c9a227]/95 backdrop-blur-md text-[#142218] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-yellow-200">
                            <Award size={11} />
                            <span>Chef's Choice</span>
                        </span>
                    )}

                    {/* Dietary indicator icon on bottom left of image */}
                    {item.dietary === 'vegetarian' && (
                        <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Leaf size={11} className="text-emerald-600" /> Vegetarian
                        </span>
                    )}
                    {item.dietary === 'vegan' && (
                        <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Leaf size={11} className="text-emerald-600" /> Vegan
                        </span>
                    )}

                    {/* Price Tag (Bottom Right overlay) */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#2d5a27] font-black text-sm sm:text-base px-2.5 sm:px-3 py-1 rounded-xl shadow-md border border-gray-100 flex items-center gap-0.5">
                        <span className="text-xs sm:text-sm">€</span>
                        <span>{Number(currentPrice).toFixed(2)}</span>
                    </div>

                    {/* Sold out overlay */}
                    {item.available === false && (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center">
                            <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                Sold Out
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14331e] group-hover:text-[#2d5a27] transition-colors leading-snug line-clamp-1 mb-1.5">
                        {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                        {item.description || 'Prepared fresh daily with authentic regional recipes and premium local ingredients.'}
                    </p>

                    {/* Variants Selector (if dish has multiple options) */}
                    {hasVariants && item.variants.length > 1 && (
                        <div className="pt-1">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Portions / Options:
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {item.variants.map((v) => (
                                    <button
                                        key={v.name}
                                        type="button"
                                        onClick={() => setSelectedVariant(v)}
                                        className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                                            selectedVariant?.name === v.name
                                                ? 'bg-[#142218] text-[#d4af37] border-[#d4af37]/60 shadow-2xs'
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span>{v.name}</span>
                                        <span className="ml-1 opacity-80">(€{Number(v.price).toFixed(2)})</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [adminCategories, setAdminCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [todayOnly, setTodayOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const { addToCart, cartCount, cartTotal, setIsCartOpen } = useCart();
    const [addedId, setAddedId] = useState(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    // Fetch categories created in Admin panel + Live menu items from backend
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            try {
                // 1. Fetch categories created in Admin panel (including their today flag)
                let fetchedAdminCategories = [];
                try {
                    const catRes = await axios.get(`${baseUrl}/categories`);
                    if (catRes.data && Array.isArray(catRes.data)) {
                        fetchedAdminCategories = catRes.data;
                    }
                } catch (catErr) {
                    console.warn("Could not fetch admin categories:", catErr.message);
                }

                // 2. Fetch menu items
                let fetchedItems = [];
                try {
                    const menuRes = await axios.get(`${baseUrl}/menu`);
                    if (menuRes.data && Array.isArray(menuRes.data) && menuRes.data.length > 0) {
                        fetchedItems = menuRes.data;
                    }
                } catch (menuErr) {
                    console.warn("Could not fetch menu from server:", menuErr.message);
                }

                if (!isMounted) return;

                // Merge fetched items with default rich menu
                let combinedItems = [];
                if (fetchedItems.length > 0) {
                    const dbNames = new Set(fetchedItems.map(i => i.name.toLowerCase().trim()));
                    const supplemental = DEFAULT_RICH_MENU.filter(d => !dbNames.has(d.name.toLowerCase().trim()));
                    combinedItems = [...fetchedItems, ...supplemental];
                } else {
                    combinedItems = DEFAULT_RICH_MENU;
                }

                setMenuItems(combinedItems);
                setAdminCategories(fetchedAdminCategories);

            } catch (err) {
                console.error("Overall menu loading error:", err);
                if (isMounted) {
                    setMenuItems(DEFAULT_RICH_MENU);
                    setAdminCategories([]);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [baseUrl]);

    // Admin category names list
    const adminCategoryNames = useMemo(() => {
        return adminCategories.map(c => (c.name ? c.name.trim() : '')).filter(Boolean);
    }, [adminCategories]);

    // Admin categories where today flag is true in Admin panel
    const todayCategoryNames = useMemo(() => {
        return adminCategories
            .filter(c => c.today === true)
            .map(c => (c.name ? c.name.trim() : ''))
            .filter(Boolean);
    }, [adminCategories]);

    // Build category tabs:
    // When "Available Today" is selected: only show categories from Admin where category.today === true
    // When "All Dishes" is selected: show all admin categories + 'Other' (for static/unmatched items)
    const categoryTabs = useMemo(() => {
        if (todayOnly) {
            // Only categories where today === true in admin
            return ['All', ...todayCategoryNames];
        }

        if (adminCategoryNames.length === 0) {
            const rawCats = Array.from(new Set(menuItems.map(i => i.category).filter(Boolean)));
            return ['All', ...rawCats];
        }

        const hasOtherDishes = menuItems.some(
            (item) => getEffectiveCategory(item, adminCategoryNames) === 'Other'
        );

        return ['All', ...adminCategoryNames, ...(hasOtherDishes ? ['Other'] : [])];
    }, [todayOnly, todayCategoryNames, adminCategoryNames, menuItems]);

    // Automatically switch activeCategory if it's no longer present in categoryTabs
    useEffect(() => {
        if (!categoryTabs.includes(activeCategory)) {
            setActiveCategory('All');
        }
    }, [categoryTabs, activeCategory]);

    // Automatically sync category filter from URL query parameters (e.g. /menu?category=klk)
    useEffect(() => {
        const paramCat = searchParams.get('category');
        if (paramCat) {
            const decoded = decodeURIComponent(paramCat).trim();

            // 1. Check if it matches an admin category
            const adminMatch = adminCategories.find(
                c => c.name && c.name.toLowerCase().trim() === decoded.toLowerCase()
            );

            if (adminMatch) {
                if (adminMatch.today) {
                    setTodayOnly(true);
                } else {
                    setTodayOnly(false);
                }
                setActiveCategory(adminMatch.name.trim());
                setSearchQuery('');
            } else if (decoded.toLowerCase() === 'today' || decoded.toLowerCase() === 'available today') {
                setTodayOnly(true);
                setActiveCategory('All');
                setSearchQuery('');
            } else if (menuItems.length > 0) {
                // Raw item category or dish name
                const itemCatMatch = menuItems.find(
                    it => it.category && it.category.toLowerCase().trim() === decoded.toLowerCase()
                );
                if (itemCatMatch) {
                    setTodayOnly(false);
                    const effective = getEffectiveCategory(itemCatMatch, adminCategoryNames);
                    setActiveCategory(effective);
                    setSearchQuery(decoded);
                } else {
                    const dishNameMatch = menuItems.find(
                        it => it.name && it.name.toLowerCase().trim() === decoded.toLowerCase()
                    );
                    if (dishNameMatch) {
                        setTodayOnly(false);
                        const effective = getEffectiveCategory(dishNameMatch, adminCategoryNames);
                        setActiveCategory(effective);
                        setSearchQuery(decoded);
                    }
                }
            }

            // Smoothly scroll to the menu filter/products section
            setTimeout(() => {
                const catalog = document.getElementById('menu-catalog-section');
                if (catalog) {
                    catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 250);
        }
    }, [searchParams, adminCategories, adminCategoryNames, menuItems]);

    // Filter and Sort Items
    const filteredAndSortedItems = useMemo(() => {
        let result = [...menuItems];

        // 1. Available Today Filter:
        // Only show products whose category has today === true in Admin panel
        if (todayOnly) {
            result = result.filter(item => {
                const effectiveCat = getEffectiveCategory(item, adminCategoryNames);
                const isTodayCat = todayCategoryNames.some(
                    tc => tc.toLowerCase() === effectiveCat.toLowerCase()
                );
                return isTodayCat || (todayCategoryNames.length === 0 && (item.today === true || item.isToday === true));
            });
        }

        // 2. Category Tab Filter
        if (activeCategory !== 'All') {
            if (activeCategory === 'Other') {
                result = result.filter(
                    (item) => getEffectiveCategory(item, adminCategoryNames) === 'Other'
                );
            } else {
                result = result.filter(
                    (item) => getEffectiveCategory(item, adminCategoryNames).toLowerCase() === activeCategory.toLowerCase()
                );
            }
        }

        // 3. Search Query Filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(item => 
                (item.name && item.name.toLowerCase().includes(q)) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q))
            );
        }

        // 4. Sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        } else if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [menuItems, activeCategory, adminCategoryNames, todayCategoryNames, searchQuery, todayOnly, sortBy]);

    const handleAdd = (item, variant, quantity) => {
        addToCart(
            {
                _id: item._id,
                name: item.name,
                price: variant ? variant.price : item.price,
                description: item.description,
                image: item.image || '/images/food.jpeg'
            },
            variant,
            quantity
        );
        setAddedId(item._id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div 
            className="min-h-screen text-[#1c241b] relative pb-28"
            style={{
                backgroundColor: '#faf6ee',
                backgroundImage: "url('/images/menu-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >

            {/* HERO SECTION (Editorial, Balanced with Warm Ivory Glow) */}
            <div className="pt-6 sm:pt-8 pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    
                    {/* Top European Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#2d5a27]/20 text-[#2d5a27] text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
                        <Utensils size={12} />
                        <span>RESTAVRACIJA WILMA • EST. LJUBLJANA</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#14331e] tracking-tight leading-tight">
                        Curated Lunch &amp; Dining Selection
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl mx-auto font-normal leading-relaxed">
                        Freshly prepared daily self-service lunches, authentic Slovenian specialties, and chef’s signature creations, crafted with local seasonal ingredients.
                    </p>

                    {/* Quick Restaurant Badges */}
                    <div className="mt-3 flex flex-wrap justify-center items-center gap-2.5 text-xs text-gray-800">
                        <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-gray-200/80 px-3 py-1 rounded-full shadow-2xs font-semibold">
                            <Clock size={12} className="text-[#2d5a27]" />
                            <span>Daily Lunch: 11:30 AM – 3:00 PM</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-gray-200/80 px-3 py-1 rounded-full shadow-2xs font-semibold">
                            <MapPin size={12} className="text-[#2d5a27]" />
                            <span>Dunajska cesta 106, Ljubljana</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-gray-200/80 px-3 py-1 rounded-full shadow-2xs font-semibold">
                            <Phone size={12} className="text-[#2d5a27]" />
                            <span>40 791 618</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* SEARCH & FILTERS CARD */}
                <div id="menu-catalog-section" className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs border border-[#ede8dd] mb-6 sm:mb-9 space-y-3.5 sm:space-y-4 scroll-mt-24">
                    
                    {/* Top Row: Search Input & Sort Dropdown */}
                    <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full sm:flex-1">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search dishes, ingredients or categories..."
                                className="w-full pl-10 pr-9 py-3 rounded-2xl border border-gray-200 bg-[#fdfbf7] focus:bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/30 focus:border-[#2d5a27] transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Sort Selector */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <SlidersHorizontal size={16} className="text-gray-500 hidden sm:block" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-gray-200 bg-[#fdfbf7] text-xs font-bold text-gray-800 focus:outline-none focus:border-[#2d5a27] cursor-pointer"
                            >
                                <option value="featured">Featured (Recommended)</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Alphabetical (A - Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Middle Row: Filter by All vs Available Today */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-1">
                            Filter by:
                        </span>
                        <button
                            onClick={() => setTodayOnly(false)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                                !todayOnly
                                    ? 'bg-[#142218] text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            All Dishes
                        </button>
                        <button
                            onClick={() => setTodayOnly(true)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                todayOnly
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Sparkles size={13} className={todayOnly ? "text-yellow-300" : "text-amber-500"} />
                            <span>Available Today</span>
                        </button>
                    </div>

                    {/* Bottom Row: Dynamic Category Pills */}
                    <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {categoryTabs.map((category) => {
                                let count = 0;
                                if (todayOnly) {
                                    if (category === 'All') {
                                        count = menuItems.filter(item => {
                                            const cat = getEffectiveCategory(item, adminCategoryNames);
                                            return todayCategoryNames.some(tc => tc.toLowerCase() === cat.toLowerCase()) ||
                                                (todayCategoryNames.length === 0 && (item.today === true || item.isToday === true));
                                        }).length;
                                    } else {
                                        count = menuItems.filter(item => {
                                            const cat = getEffectiveCategory(item, adminCategoryNames);
                                            return cat.toLowerCase() === category.toLowerCase();
                                        }).length;
                                    }
                                } else {
                                    if (category === 'All') {
                                        count = menuItems.length;
                                    } else if (category === 'Other') {
                                        count = menuItems.filter(i => getEffectiveCategory(i, adminCategoryNames) === 'Other').length;
                                    } else {
                                        count = menuItems.filter(i => getEffectiveCategory(i, adminCategoryNames).toLowerCase() === category.toLowerCase()).length;
                                    }
                                }

                                const isActive = activeCategory === category;

                                return (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                            isActive
                                                ? 'bg-[#2d5a27] text-white shadow-sm ring-2 ring-[#2d5a27]/30'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-200'
                                        }`}
                                    >
                                        <span>{category}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* RESULTS HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14331e]">
                            {activeCategory === 'All' 
                                ? (todayOnly ? "Today's Available Menu" : 'All Selected Dishes')
                                : activeCategory}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Showing: <strong>{filteredAndSortedItems.length}</strong> {filteredAndSortedItems.length === 1 ? 'dish' : 'dishes'}
                        </p>
                    </div>

                    {/* Reset Filters shortcut */}
                    {(activeCategory !== 'All' || searchQuery || todayOnly) && (
                        <button
                            onClick={() => {
                                setActiveCategory('All');
                                setSearchQuery('');
                                setTodayOnly(false);
                            }}
                            className="text-xs font-bold text-[#2d5a27] hover:underline cursor-pointer bg-white px-3.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs"
                        >
                            Reset filters
                        </button>
                    )}
                </div>

                {/* LOADING STATE */}
                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-12 h-12 border-4 border-[#2d5a27] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-800 font-bold text-base">Loading Wilma Restaurant Menu...</p>
                        <p className="text-xs text-gray-500 mt-1">Fetching fresh daily prices and chef specials.</p>
                    </div>
                ) : filteredAndSortedItems.length === 0 ? (
                    /* EMPTY RESULTS */
                    <div className="py-20 text-center bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 p-8 shadow-xs max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-[#f5ede0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#2d5a27]">
                            <Utensils size={28} />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-gray-800">No dishes found matching your selection</h3>
                        <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                            {todayOnly 
                                ? "No dishes are currently assigned to today's active categories. Select 'All Dishes' or assign dishes to this category in the Admin panel."
                                : "Try adjusting your search terms or select another category tab from the menu."}
                        </p>
                        <button
                            onClick={() => {
                                setActiveCategory('All');
                                setSearchQuery('');
                                setTodayOnly(false);
                            }}
                            className="mt-6 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                        >
                            Show All Dishes
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {filteredAndSortedItems.map((item) => (
                            <MenuItemCard
                                key={item._id}
                                item={item}
                                displayCategory={getEffectiveCategory(item, adminCategoryNames)}
                            />
                        ))}
                    </div>
                )}

                {/* TABLE RESERVATION PROMO BANNER */}
                <div className="mt-12 sm:mt-20 bg-gradient-to-r from-[#142218] via-[#1c3a23] to-[#142218] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl border border-[#d4af37]/30">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest block">
                            LIVE TABLE RESERVATION
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                            Prefer to dine in at our restaurant?
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                            Reserve your table at Dunajska cesta 106 and receive your personal <strong>VIP Dining QR Pass</strong> for instant arrival check-in.
                        </p>
                    </div>
                    <Link
                        to="/dashboard?tab=bookings"
                        className="w-full sm:w-auto justify-center bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl sm:rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95 text-center"
                    >
                        <span>Book a Table Now</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>

            </div>

            {/* FLOATING CART SUMMARY (VISIBLE WHEN ITEMS IN CART) */}
            {cartCount > 0 && (
                <aside 
                    aria-label="Order Cart"
                    className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-40 bg-[#142218] text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-[#d4af37]/50 flex items-center justify-between animate-in slide-in-from-bottom-5 duration-300"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2d5a27] text-white flex items-center justify-center font-bold text-sm relative">
                            <ShoppingBag size={18} />
                            <span className="absolute -top-1.5 -right-1.5 bg-[#c9a227] text-[#1c241b] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-300 block">Your Order:</span>
                            <strong className="text-sm font-bold text-white">
                                €{cartTotal.toFixed(2)}
                            </strong>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                        <span>View Order</span>
                        <ArrowRight size={14} />
                    </button>
                </aside>
            )}

        </div>
    );
};

export default Menu;
