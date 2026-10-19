import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('admin@biryaniyoyo.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, { email, password });
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Napačno geslo ali elektronski naslov (Invalid credentials)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c140e] px-4 py-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1c4d25]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-md">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#8ea693] hover:text-[#d4af37] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Website</span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-[#142117]/95 border border-[#2b4432] rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
                    {/* Header with Wilma Branding */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1c4d25]/30 border border-[#2d5a27]/50 text-[#d4af37] mb-4 shadow-sm">
                            <ShieldCheck size={28} />
                        </div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                            Admin Login
                        </h1>
                        <p className="text-xs sm:text-sm text-[#8ea693] mt-1.5 font-medium">
                            Wilma Restaurant • Control Panel
                        </p>
                    </div>

                    {/* Error Notification */}
                    {error && (
                        <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e8a75]">
                                    <Mail size={16} />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#0d1610] border border-[#283f2e] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#5a7360] outline-none transition-all"
                                    placeholder="admin@wilma.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-bold text-[#b5cbba] uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e8a75]">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#0d1610] border border-[#283f2e] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-[#5a7360] outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6e8a75] hover:text-[#b5cbba] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1c4d25] hover:bg-[#256331] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-[#1c4d25]/40 transition-all duration-200 uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transform active:scale-[0.99]"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <span>Sign In to Dashboard</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[11px] text-[#6e8a75]">
                            Secure Admin Access • Wilma Restaurant
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
