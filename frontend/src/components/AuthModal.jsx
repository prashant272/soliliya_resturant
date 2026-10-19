import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const { login, register } = useAuth();

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Signup state
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(loginEmail, loginPassword);
            if (res.success) {
                onClose();
            } else {
                setError(res.message || 'Login failed. Please check credentials.');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (signupPassword !== signupConfirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await register({
                name: signupName,
                email: signupEmail,
                phone: signupPhone,
                password: signupPassword
            });
            if (res.success) {
                onClose();
            } else {
                setError(res.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="bg-[#1c241b] text-white p-6 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 text-lg cursor-pointer"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <div className="w-14 h-14 bg-[#d4af37] text-[#1c241b] rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fa-solid fa-user text-2xl"></i>
                    </div>

                    <h3 className="font-heading text-xl font-bold">
                        {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h3>
                    <p className="text-xs text-[#8fa382] mt-1">
                        {activeTab === 'login' ? 'Login to your Wilma account' : 'Join Wilma Restaurant Ljubljana'}
                    </p>
                </div>

                {/* Toggle Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => { setActiveTab('login'); setError(''); }}
                        className={`flex-1 py-3 text-sm font-bold transition-all cursor-pointer ${
                            activeTab === 'login'
                                ? 'text-[#2d5a27] border-b-2 border-[#2d5a27] bg-green-50'
                                : 'text-gray-500 hover:text-[#2d5a27] hover:bg-gray-50'
                        }`}
                    >
                        <i className="fa-solid fa-right-to-bracket mr-2"></i>
                        Login
                    </button>
                    <button
                        onClick={() => { setActiveTab('signup'); setError(''); }}
                        className={`flex-1 py-3 text-sm font-bold transition-all cursor-pointer ${
                            activeTab === 'signup'
                                ? 'text-[#2d5a27] border-b-2 border-[#2d5a27] bg-green-50'
                                : 'text-gray-500 hover:text-[#2d5a27] hover:bg-gray-50'
                        }`}
                    >
                        <i className="fa-solid fa-user-plus mr-2"></i>
                        Sign Up
                    </button>
                </div>

                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                {activeTab === 'login' && (
                    <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#2d5a27] hover:text-[#d4af37] font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#2d5a27] hover:bg-[#4a7c44] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
                        >
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <span>{loading ? 'Logging in...' : 'Login'}</span>
                        </button>

                        <p className="text-center text-xs text-gray-500 pt-2">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => { setActiveTab('signup'); setError(''); }}
                                className="text-[#2d5a27] hover:text-[#d4af37] font-bold cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </p>
                    </form>
                )}

                {/* Signup Form */}
                {activeTab === 'signup' && (
                    <form onSubmit={handleSignupSubmit} className="p-6 space-y-4 max-h-[calc(85vh-200px)] overflow-y-auto">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    required
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    placeholder="Janez Novak"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="email"
                                    required
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="tel"
                                    required
                                    value={signupPhone}
                                    onChange={(e) => setSignupPhone(e.target.value)}
                                    placeholder="040 123 456"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="password"
                                    required
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="password"
                                    required
                                    value={signupConfirmPassword}
                                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2d5a27] focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
                        >
                            <i className="fa-solid fa-user-plus"></i>
                            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                        </button>

                        <p className="text-center text-xs text-gray-500 pt-2">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => { setActiveTab('login'); setError(''); }}
                                className="text-[#2d5a27] hover:text-[#d4af37] font-bold cursor-pointer"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                )}

            </div>
        </div>
    );
};

export default AuthModal;
