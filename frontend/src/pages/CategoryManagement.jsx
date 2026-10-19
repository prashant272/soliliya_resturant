import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Check, Eye, EyeOff } from 'lucide-react';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        today: false,
        order: 0
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${baseUrl}/categories`);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditCategory(category);
            setFormData({
                name: category.name || '',
                image: category.image || '',
                today: category.today || false,
                order: category.order || 0
            });
        } else {
            setEditCategory(null);
            setFormData({
                name: '',
                image: '',
                today: true, // Default to true when adding so it shows on homepage
                order: categories.length + 1
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditCategory(null);
        setImageFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            let payload;
            if (imageFile) {
                payload = new FormData();
                payload.append('name', formData.name);
                payload.append('today', String(formData.today));
                payload.append('order', String(formData.order));
                payload.append('image', imageFile);
            } else {
                payload = {
                    name: formData.name,
                    image: formData.image,
                    today: formData.today,
                    order: Number(formData.order) || 0
                };
            }

            if (editCategory) {
                await axios.put(`${baseUrl}/categories/${editCategory._id}`, payload, config);
            } else {
                await axios.post(`${baseUrl}/categories`, payload, config);
            }

            handleCloseModal();
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Error saving category: ' + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleToday = async (id) => {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.patch(`${baseUrl}/categories/${id}/toggle-today`, {}, config);
            fetchCategories();
        } catch (error) {
            console.error('Error toggling today flag:', error);
            alert('Failed to toggle status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${baseUrl}/categories/${id}`, config);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category');
            }
        }
    };

    const formatImageUrl = (url) => {
        if (!url) return '/images/food.jpeg';
        if (url.startsWith('http') || url.startsWith('//') || url.startsWith('/')) return url;
        return `${baseUrl.replace(/\/api\/?$/, '')}/${url}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#142218] p-6 rounded-2xl border border-[#253c2b] shadow-sm">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-white tracking-wide">Daily Categories (Showcase)</h1>
                    <p className="text-xs sm:text-sm text-[#8ea693] mt-1 font-medium">
                        Add dishes with image and name. Toggle "Show on Homepage (Today: True)" to feature them in the daily showcase.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 bg-[#1c4d25] hover:bg-[#256331] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md cursor-pointer text-xs sm:text-sm"
                >
                    <Plus size={18} />
                    <span>Add Category</span>
                </button>
            </div>

            {/* List / Table */}
            <div className="bg-[#142218] rounded-2xl border border-[#253c2b] overflow-hidden shadow-xl">
                {loading ? (
                    <div className="text-center py-16 text-[#8ea693]">Loading categories...</div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-16 px-4">
                        <p className="text-[#a4bba9] text-base font-semibold">No categories added yet.</p>
                        <p className="text-[#6c8572] text-xs sm:text-sm mt-1">Click "Add Category" to create your first dish category with an image.</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="mt-4 inline-flex items-center space-x-2 bg-[#1c4d25] hover:bg-[#256331] text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                        >
                            <Plus size={16} />
                            <span>Create Now</span>
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#253c2b] bg-[#0d1610] text-[#8ea693] text-xs uppercase tracking-wider font-bold">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Category Name</th>
                                    <th className="p-4">Homepage Showcase (Today)</th>
                                    <th className="p-4">Order</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1e3323] text-sm">
                                {categories.map((cat) => (
                                    <tr key={cat._id} className="hover:bg-[#192b1e] transition">
                                        <td className="p-4">
                                            <img
                                                src={formatImageUrl(cat.image)}
                                                alt={cat.name}
                                                className="w-16 h-12 rounded-lg object-cover border border-[#2b4432] shadow-xs"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/images/food.jpeg';
                                                }}
                                            />
                                        </td>
                                        <td className="p-4 font-bold text-white text-base">
                                            {cat.name}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleToggleToday(cat._id)}
                                                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                                                    cat.today
                                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                                }`}
                                                title="Click to toggle homepage display"
                                            >
                                                {cat.today ? <Eye size={13} /> : <EyeOff size={13} />}
                                                <span>{cat.today ? 'Active (True)' : 'Hidden (False)'}</span>
                                            </button>
                                        </td>
                                        <td className="p-4 text-[#8ea693]">
                                            {cat.order || 0}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(cat)}
                                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                    <div className="bg-[#142218] border border-[#253c2b] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="font-serif text-xl font-bold text-white mb-6">
                            {editCategory ? 'Edit Category' : 'New Category'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">
                                    Category / Dish Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Roast Chicken, Daily Soup, Seasonal Salad"
                                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">
                                    Image (Image URL or Upload File)
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://... or /images/food.jpeg"
                                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none mb-2"
                                />
                                <div className="text-[11px] text-[#8ea693] mb-1">Or upload image from your computer:</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full text-xs text-[#8ea693] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center space-x-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="todayCheck"
                                    checked={formData.today}
                                    onChange={(e) => setFormData({ ...formData, today: e.target.checked })}
                                    className="w-4 h-4 rounded text-[#1c4d25] focus:ring-[#1c4d25] bg-[#0d1610] border-[#253c2b] cursor-pointer"
                                />
                                <label htmlFor="todayCheck" className="text-xs sm:text-sm text-white font-medium cursor-pointer select-none">
                                    Show on Homepage in Daily Showcase (Today = True)
                                </label>
                            </div>

                            <div className="pt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-semibold text-xs sm:text-sm transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2.5 rounded-xl bg-[#1c4d25] hover:bg-[#256331] text-white font-bold text-xs sm:text-sm transition shadow-md disabled:opacity-50 cursor-pointer"
                                >
                                    {submitting ? 'Saving...' : 'Save Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
