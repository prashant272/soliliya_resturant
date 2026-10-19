import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-16 px-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#ede8dd] shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#d4af37] text-[#1c241b] rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-2xl">
                        W
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-[#1c241b]">Create Account</h1>
                    <p className="text-gray-500 mt-2 text-xs">Join Restavracija Wilma Ljubljana</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                            placeholder="Janez Novak"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                            placeholder="040 123 456"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-3.5 rounded-xl transition-all uppercase tracking-wider text-xs shadow-md cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-500 text-xs">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#2d5a27] hover:text-[#d4af37] font-bold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
