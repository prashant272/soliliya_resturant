import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
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
                    <h1 className="text-3xl font-heading font-bold text-[#1c241b]">Welcome Back</h1>
                    <p className="text-gray-500 mt-2 text-xs">Login to your Wilma account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2d5a27] hover:bg-[#4a7c44] text-white font-bold py-3.5 rounded-xl transition-all uppercase tracking-wider text-xs shadow-md cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-500 text-xs">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#2d5a27] hover:text-[#d4af37] font-bold">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
