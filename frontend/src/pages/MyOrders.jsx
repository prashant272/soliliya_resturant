import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, XCircle, CheckCircle, Truck, ShoppingBag, MapPin, Loader, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/my-orders-auth`, config);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="text-amber-600" size={16} />;
            case 'Confirmed': return <CheckCircle className="text-blue-600" size={16} />;
            case 'Preparing': return <Package className="text-orange-600" size={16} />;
            case 'Out for Delivery': return <Truck className="text-indigo-600" size={16} />;
            case 'Delivered': return <CheckCircle className="text-[#2d5a27]" size={16} />;
            case 'Cancelled': return <XCircle className="text-red-600" size={16} />;
            default: return <Clock className="text-gray-500" size={16} />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-800 border-amber-200';
            case 'Confirmed': return 'bg-blue-50 text-blue-800 border-blue-200';
            case 'Preparing': return 'bg-orange-50 text-orange-800 border-orange-200';
            case 'Out for Delivery': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
            case 'Delivered': return 'bg-emerald-50 text-[#2d5a27] border-emerald-200';
            case 'Cancelled': return 'bg-red-50 text-red-800 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const formatPrice = (amount) => {
        const num = Number(amount);
        if (num > 50) return `₹${num}`;
        return `€${num.toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-[#fcfbf7] text-[#1c241b] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-gray-600 hover:text-black p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Back to Home"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-[#1c241b] flex items-center gap-3">
                                <ShoppingBag className="text-[#2d5a27]" size={28} />
                                <span>My Orders</span>
                            </h1>
                            <p className="text-xs text-gray-500 mt-0.5">Order history and live delivery tracking</p>
                        </div>
                    </div>

                    <Link 
                        to="/menu" 
                        className="hidden sm:inline-flex items-center gap-2 bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                    >
                        Order More Food
                    </Link>
                </div>

                {loading ? (
                    <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-sm">
                        <Loader className="animate-spin text-[#2d5a27] mx-auto mb-3" size={32} />
                        <span className="text-gray-600 font-medium text-sm">Loading your orders...</span>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
                        <div className="w-16 h-16 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag size={32} />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-[#1c241b] mb-2">You haven't placed any orders yet</h2>
                        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                            Your order history is empty. Check out our menu for delicious dishes.
                        </p>
                        <Link 
                            to="/menu" 
                            className="bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold px-6 py-3 rounded-xl inline-block shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
                        >
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all">
                                
                                {/* Card Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadge(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span>{order.status}</span>
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1.5 font-mono">
                                            Order ID: #{order._id.slice(-8).toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-xs text-gray-500 block">Total Amount</span>
                                        <span className="text-2xl font-bold text-[#2d5a27]">
                                            {formatPrice(order.finalAmount || order.totalAmount)}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="py-4 space-y-2.5">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                            <div>
                                                <span className="text-[#1c241b] font-semibold">{item.name}</span>
                                                {item.variant && (
                                                    <span className="text-[#c9a227] text-xs font-semibold ml-2">({item.variant})</span>
                                                )}
                                                <span className="text-gray-500 text-xs block">Quantity: {item.quantity}x</span>
                                            </div>
                                            <span className="text-[#1c241b] font-bold">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery & Details */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 gap-2 text-xs">
                                    <div className="text-gray-600 flex items-center gap-1.5">
                                        <MapPin size={15} className="text-[#2d5a27] shrink-0" />
                                        <span>{order.customer?.address || 'Restaurant Pickup'}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500">
                                            Payment: <strong className="text-[#1c241b]">{order.paymentMethod || 'Cash'}</strong>
                                        </span>
                                        {order.status === 'Pending' && (
                                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                                                Waiting for confirmation
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyOrders;
