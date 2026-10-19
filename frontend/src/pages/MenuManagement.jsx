import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Search, Filter, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    priceQuarter: '',
    priceHalf: '',
    priceFull: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const { data } = await axios.get(`${baseUrl}/categories`);
      const cats = Array.isArray(data) ? data : [];
      setCategories(cats);
      return cats;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/menu`);
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  };

  const resetForm = (cats = categories) => {
    setFormData({
      name: '',
      description: '',
      category: cats && cats.length > 0 ? cats[0].name : '',
      image: '',
      priceQuarter: '',
      priceHalf: '',
      priceFull: ''
    });
    setImageFile(null);
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    resetForm(categories);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);

    // Map variants back to form fields
    let pQ = '', pH = '', pF = '';
    if (item.variants) {
      item.variants.forEach(v => {
        if (v.name === 'Quarter') pQ = v.price;
        if (v.name === 'Half') pH = v.price;
        if (v.name === 'Full') pF = v.price;
      });
    }

    setFormData({
      name: item.name || '',
      description: item.description || '',
      category: item.category || (categories[0]?.name || ''),
      image: item.image || '',
      priceQuarter: pQ,
      priceHalf: pH,
      priceFull: pF
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (!formData.category) {
      alert('Please select or specify a category for this dish.');
      return;
    }

    // Construct variants array
    const variants = [];
    if (formData.priceQuarter) variants.push({ name: 'Quarter', price: Number(formData.priceQuarter) });
    if (formData.priceHalf) variants.push({ name: 'Half', price: Number(formData.priceHalf) });
    if (formData.priceFull) variants.push({ name: 'Full', price: Number(formData.priceFull) });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('variants', JSON.stringify(variants));
    data.append('price', variants.length > 0 ? variants[0].price : 0);
    data.append('available', 'true');

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editItem) {
        await axios.put(`${baseUrl}/menu/${editItem._id}`, data, config);
      } else {
        await axios.post(`${baseUrl}/menu`, data, config);
      }
      setIsModalOpen(false);
      setEditItem(null);
      resetForm(categories);
      fetchItems();
    } catch (error) {
      console.error(error);
      alert('Error saving item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${baseUrl}/menu/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchItems();
      } catch (error) {
        alert('Error deleting item');
      }
    }
  };

  // Filter items by category and search term
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-[#142218] p-6 rounded-2xl border border-[#253c2b] shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">Menu Management</h1>
          <p className="text-xs sm:text-sm text-[#8ea693] mt-1 font-medium">
            Add, edit, and organize restaurant dishes assigned to your admin categories
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="bg-[#192b1e] hover:bg-[#203626] text-[#b5cbba] border border-[#253c2b] px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition text-xs sm:text-sm cursor-pointer"
          >
            <Layers size={16} className="text-[#d4af37]" /> Manage Categories
          </Link>
          <button
            onClick={handleOpenAdd}
            className="bg-[#1c4d25] hover:bg-[#256331] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-md cursor-pointer text-xs sm:text-sm"
          >
            <Plus size={18} /> Add Dish
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-[#142218] p-4 rounded-xl border border-[#253c2b]">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ea693]" />
          <input
            type="text"
            placeholder="Search dish by name, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1610] border border-[#253c2b] rounded-lg pl-10 pr-4 py-2 text-white text-xs outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-[#8ea693] font-semibold flex items-center gap-1.5 whitespace-nowrap">
            <Filter size={14} /> Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0d1610] border border-[#253c2b] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#d4af37] cursor-pointer w-full sm:w-auto"
          >
            <option value="All">All Categories ({items.length})</option>
            {categories.map((c) => {
              const count = items.filter(it => it.category === c.name).length;
              return (
                <option key={c._id || c.name} value={c.name}>
                  {c.name} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Items Table */}
      {loading ? (
        <p className="text-[#8ea693] text-center py-12">Loading menu items...</p>
      ) : filteredItems.length === 0 ? (
        <div className="bg-[#142218] rounded-2xl border border-[#253c2b] p-12 text-center">
          <p className="text-[#8ea693] text-base font-semibold">No dishes found matching your criteria.</p>
          <p className="text-[#5f7465] text-xs mt-1">Try changing your search or filter, or add a new dish.</p>
        </div>
      ) : (
        <div className="bg-[#142218] rounded-2xl border border-[#253c2b] overflow-hidden shadow-xl">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-[#0d1610] text-[#d4af37] uppercase text-xs font-bold border-b border-[#253c2b]">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Dish Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3323] text-sm">
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-[#192b1e] transition-colors">
                  <td className="p-4">
                    <img
                      src={item.image || 'https://placehold.co/100?text=No+Image'}
                      alt={item.name}
                      className="w-14 h-12 rounded-lg object-cover border border-[#253c2b]"
                    />
                  </td>
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#1c4d25]/30 text-[#a9d9b3] border border-[#2d5a27]/40 text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-[#d4af37] font-bold">
                    {item.variants && item.variants.length > 0
                      ? item.variants.map(v => `${v.name.charAt(0)}: ${v.price}€ `).join(' | ')
                      : `${item.price || 0} €`}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => openEdit(item)} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#142218] p-6 sm:p-8 rounded-2xl w-full max-w-lg border border-[#253c2b] relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-serif font-bold text-white mb-6 tracking-wide">
              {editItem ? 'Edit Dish' : 'Add New Dish'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">
                  Dish Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Pečena govedina s praženim krompirjem"
                  className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none"
                  required
                />
              </div>

              {/* Dynamic Category Dropdown from Admin Categories */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider">
                    Category *
                  </label>
                  <span className="text-[11px] text-[#8ea693]">
                    {categories.length} {categories.length === 1 ? 'admin category' : 'admin categories'}
                  </span>
                </div>

                {loadingCategories ? (
                  <p className="text-xs text-[#8ea693] py-2">Loading categories...</p>
                ) : categories.length === 0 ? (
                  <div className="bg-[#0d1610] border border-amber-600/40 rounded-xl p-3 text-xs text-amber-200">
                    <p className="mb-2">
                      ⚠️ No categories found in database. Create them in the <strong>Daily Categories</strong> tab, or type a category name below:
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. Dnevna Kosila, Glavne Jedi, Juhe"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#142218] border border-[#253c2b] rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-[#d4af37]"
                      required
                    />
                  </div>
                ) : (
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c._id || c.name} value={c.name} className="bg-[#142218] text-white">
                        {c.name} {c.today ? '⭐ (Today Showcase)' : ''}
                      </option>
                    ))}
                    {formData.category && !categories.some(c => c.name === formData.category) && (
                      <option value={formData.category} className="bg-[#142218] text-amber-300">
                        {formData.category} (Current)
                      </option>
                    )}
                  </select>
                )}
              </div>

              {/* Price Variants */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#b5cbba] mb-1">Small / Half (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceQuarter}
                    onChange={(e) => setFormData({ ...formData, priceQuarter: e.target.value })}
                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-3 py-2 text-white text-sm focus:border-[#d4af37] outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#b5cbba] mb-1">Medium (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceHalf}
                    onChange={(e) => setFormData({ ...formData, priceHalf: e.target.value })}
                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-3 py-2 text-white text-sm focus:border-[#d4af37] outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#b5cbba] mb-1">Full (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceFull}
                    onChange={(e) => setFormData({ ...formData, priceFull: e.target.value })}
                    className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-3 py-2 text-white text-sm focus:border-[#d4af37] outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingredients, preparation details or allergens..."
                  className="w-full bg-[#0d1610] border border-[#253c2b] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-1.5">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-xs text-[#8ea693] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                />
                {editItem && editItem.image && !imageFile && (
                  <p className="text-[11px] text-emerald-400 mt-1">Current image: {editItem.image.split('/').pop()}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#1c4d25] hover:bg-[#256331] text-white font-bold py-3 mt-4 transition shadow-md uppercase tracking-wider text-xs rounded-xl cursor-pointer"
              >
                {editItem ? 'Save Changes' : 'Add to Menu'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
