import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = location.state || { orderId: '#WLM-' + Math.floor(1000 + Math.random() * 9000) };

    return (
        <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 max-w-lg w-full shadow-xl">
                <div className="w-20 h-20 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#1c241b] mb-2">
                    Order Confirmed!
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Your order has been placed successfully and is being prepared with care.
                </p>

                <div className="bg-[#fcfbf7] border border-gray-200 rounded-2xl p-4 mb-8">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-semibold">
                        Order Reference ID
                    </p>
                    <p className="text-[#2d5a27] font-mono font-bold text-xl">
                        {orderId}
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-full bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-3.5 rounded-xl shadow-md transition-all uppercase tracking-wider text-xs cursor-pointer"
                    >
                        Order More Food
                    </button>

                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-semibold pt-2"
                    >
                        <Home size={18} /> 
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
