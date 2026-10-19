import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, CreditCard, ShoppingBag } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: '',
        landmark: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');

    // Currency helper: Euro for Wilma items (< 50), Rupee if legacy items
    const currency = cart.some(item => Number(item.price) > 50) ? '₹' : '€';
    const formatAmount = (num) => currency === '€' ? Number(num).toFixed(2) : num;

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: location } });
        } else {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || ''
            }));
        }
    }, [user, navigate, location]);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#fcfbf7] text-[#1c241b] flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} />
                </div>
                <h2 className="text-2xl font-heading font-bold mb-2 text-[#1c241b]">Your Cart is Empty</h2>
                <p className="text-gray-500 text-sm mb-6">Add delicious dishes from our menu to place an order.</p>
                <button
                    onClick={() => navigate('/menu')}
                    className="bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] px-6 py-3 rounded-xl font-bold shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Please fill in all required fields.");
            return;
        }
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const orderPayload = {
                customer: {
                    name: formData.name,
                    phone: formData.phone,
                    address: `${formData.address}${formData.landmark ? ', ' + formData.landmark : ''}${formData.pincode ? ', ' + formData.pincode : ''}`,
                    location: 'Ljubljana'
                },
                items: cart.map(item => ({
                    menuId: item._id,
                    name: item.name,
                    variant: item.variant || '',
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: cartTotal,
                finalAmount: cartTotal,
                paymentMethod: paymentMethod,
                user: user?._id
            };

            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const { data } = await axios.post(`${baseUrl}/orders`, orderPayload, config);

            clearCart();
            navigate('/order-success', { state: { orderId: data._id } });

        } catch (error) {
            console.error("Order placement failed:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfbf7] text-[#1c241b] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Back Button & Header */}
                <div className="mb-8 flex items-center gap-4">
                    <button 
                        onClick={() => step === 1 ? navigate(-1) : setStep(1)} 
                        className="text-[#1c241b] hover:text-[#2d5a27] p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
                        aria-label="Go Back"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-[#1c241b]">
                            Checkout
                        </h1>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Wilma Restaurant • Dunajska cesta 106, Ljubljana
                        </p>
                    </div>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>

                    <div className={`relative z-10 flex items-center gap-2.5 bg-[#fcfbf7] pr-4 ${step >= 1 ? 'text-[#2d5a27]' : 'text-gray-400'}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                            step >= 1 ? 'bg-[#2d5a27] text-white ring-4 ring-[#2d5a27]/15' : 'bg-gray-200 text-gray-600'
                        }`}>
                            1
                        </div>
                        <span className="font-bold text-sm text-[#1c241b]">1. Delivery Address</span>
                    </div>

                    <div className="flex-1"></div>

                    <div className={`relative z-10 flex items-center gap-2.5 bg-[#fcfbf7] pl-4 ${step >= 2 ? 'text-[#2d5a27]' : 'text-gray-400'}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                            step >= 2 ? 'bg-[#2d5a27] text-white ring-4 ring-[#2d5a27]/15' : 'bg-gray-200 text-gray-600'
                        }`}>
                            2
                        </div>
                        <span className={`font-bold text-sm ${step >= 2 ? 'text-[#1c241b]' : 'text-gray-400'}`}>
                            2. Payment
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {step === 1 ? (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ede8dd] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                                <h2 className="text-xl text-[#1c241b] font-bold mb-6 flex items-center gap-2.5 pb-3 border-b border-gray-100">
                                    <MapPin className="text-[#2d5a27]" size={22} />
                                    <span>Delivery Address</span>
                                </h2>

                                <form onSubmit={handleAddressSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-[#374151] mb-1.5 tracking-wider">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text" 
                                                name="name" 
                                                required
                                                value={formData.name} 
                                                onChange={handleChange}
                                                placeholder="e.g. Janez Novak"
                                                className="w-full bg-[#fdfdfd] border border-gray-300 rounded-xl p-3 text-sm text-[#111827] focus:ring-2 focus:ring-[#2d5a27] focus:border-[#2d5a27] outline-none transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-[#374151] mb-1.5 tracking-wider">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel" 
                                                name="phone" 
                                                required
                                                value={formData.phone} 
                                                onChange={handleChange}
                                                placeholder="e.g. 040 123 456"
                                                className="w-full bg-[#fdfdfd] border border-gray-300 rounded-xl p-3 text-sm text-[#111827] focus:ring-2 focus:ring-[#2d5a27] focus:border-[#2d5a27] outline-none transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-[#374151] mb-1.5 tracking-wider">
                                            Address (House No, Street, City) *
                                        </label>
                                        <textarea
                                            name="address" 
                                            required 
                                            rows="3"
                                            value={formData.address} 
                                            onChange={handleChange}
                                            placeholder="Dunajska cesta 106, 1000 Ljubljana"
                                            className="w-full bg-[#fdfdfd] border border-gray-300 rounded-xl p-3 text-sm text-[#111827] focus:ring-2 focus:ring-[#2d5a27] focus:border-[#2d5a27] outline-none transition-all placeholder:text-gray-400"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-[#374151] mb-1.5 tracking-wider">
                                                Postal Code / Pincode
                                            </label>
                                            <input
                                                type="text" 
                                                name="pincode"
                                                value={formData.pincode} 
                                                onChange={handleChange}
                                                placeholder="1000"
                                                className="w-full bg-[#fdfdfd] border border-gray-300 rounded-xl p-3 text-sm text-[#111827] focus:ring-2 focus:ring-[#2d5a27] focus:border-[#2d5a27] outline-none transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-[#374151] mb-1.5 tracking-wider">
                                                Landmark / Note (Optional)
                                            </label>
                                            <input
                                                type="text" 
                                                name="landmark"
                                                value={formData.landmark} 
                                                onChange={handleChange}
                                                placeholder="e.g. 2nd floor / near reception"
                                                className="w-full bg-[#fdfdfd] border border-gray-300 rounded-xl p-3 text-sm text-[#111827] focus:ring-2 focus:ring-[#2d5a27] focus:border-[#2d5a27] outline-none transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-4 rounded-xl shadow-md transition-all mt-6 uppercase tracking-wider text-xs cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <span>Proceed to Payment</span>
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ede8dd] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                                <h2 className="text-xl text-[#1c241b] font-bold mb-6 flex items-center gap-2.5 pb-3 border-b border-gray-100">
                                    <CreditCard className="text-[#2d5a27]" size={22} />
                                    <span>Payment Method</span>
                                </h2>

                                <div className="space-y-4">
                                    {/* COD Option */}
                                    <label 
                                        onClick={() => setPaymentMethod('COD')}
                                        className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                                            paymentMethod === 'COD' 
                                                ? 'border-2 border-[#2d5a27] bg-[#2d5a27]/5 shadow-sm' 
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio" 
                                            name="payment" 
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={() => setPaymentMethod('COD')}
                                            className="text-[#2d5a27] focus:ring-[#2d5a27] w-4 h-4"
                                        />
                                        <div className="ml-4">
                                            <span className="block text-[#1c241b] font-bold text-sm">
                                                Cash on Delivery
                                            </span>
                                            <span className="block text-xs text-gray-500">
                                                Pay cash to the courier upon delivery
                                            </span>
                                        </div>
                                    </label>

                                    {/* Card POS Option */}
                                    <label 
                                        onClick={() => setPaymentMethod('CARD')}
                                        className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                                            paymentMethod === 'CARD' 
                                                ? 'border-2 border-[#2d5a27] bg-[#2d5a27]/5 shadow-sm' 
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio" 
                                            name="payment" 
                                            value="CARD"
                                            checked={paymentMethod === 'CARD'}
                                            onChange={() => setPaymentMethod('CARD')}
                                            className="text-[#2d5a27] focus:ring-[#2d5a27] w-4 h-4"
                                        />
                                        <div className="ml-4">
                                            <span className="block text-[#1c241b] font-bold text-sm">
                                                Credit / Debit Card (POS Terminal)
                                            </span>
                                            <span className="block text-xs text-gray-500">
                                                Contactless card payment upon delivery
                                            </span>
                                        </div>
                                    </label>

                                    {/* Online Payment Option */}
                                    <label 
                                        onClick={() => setPaymentMethod('UPI')}
                                        className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                                            paymentMethod === 'UPI' 
                                                ? 'border-2 border-[#2d5a27] bg-[#2d5a27]/5 shadow-sm' 
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio" 
                                            name="payment" 
                                            value="UPI"
                                            checked={paymentMethod === 'UPI'}
                                            onChange={() => setPaymentMethod('UPI')}
                                            className="text-[#2d5a27] focus:ring-[#2d5a27] w-4 h-4"
                                        />
                                        <div className="ml-4">
                                            <span className="block text-[#1c241b] font-bold text-sm">
                                                Online / Mobile Payment
                                            </span>
                                            <span className="block text-xs text-gray-500">
                                                Fast digital scan or mobile bank transfer
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all uppercase tracking-wider text-xs cursor-pointer"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className="flex-1 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-4 rounded-xl shadow-md transition-all uppercase tracking-wider text-xs cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : `Place Order • ${currency}${formatAmount(cartTotal)}`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl border border-[#ede8dd] shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-28 space-y-4">
                            <h3 className="text-lg text-[#1c241b] font-bold border-b border-gray-100 pb-3 flex items-center justify-between">
                                <span>Order Summary</span>
                            </h3>

                            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                {cart.map(item => (
                                    <div key={item.cartItemId} className="flex justify-between items-start text-xs border-b border-gray-50 pb-2.5">
                                        <div>
                                            <span className="text-[#1c241b] font-semibold block text-sm">{item.name}</span>
                                            {item.variant && <span className="text-[#c9a227] text-[11px] block font-semibold">{item.variant}</span>}
                                            <span className="text-gray-500 text-xs">Quantity: {item.quantity}x</span>
                                        </div>
                                        <span className="text-[#2d5a27] font-bold text-sm whitespace-nowrap">
                                            {currency}{formatAmount(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-semibold">{currency}{formatAmount(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-[#2d5a27] font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-[#1c241b] pt-3 border-t border-gray-100">
                                    <span>Total</span>
                                    <span className="text-[#2d5a27] text-xl font-extrabold">{currency}{formatAmount(cartTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
