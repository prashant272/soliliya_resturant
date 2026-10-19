import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Eye, X } from 'lucide-react';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state and selected order if open
            const updatedOrders = orders.map(order =>
                order._id === id ? { ...order, status } : order
            );
            setOrders(updatedOrders);
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder({ ...selectedOrder, status });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
            case 'Confirmed': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
            case 'Preparing': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
            case 'Out for Delivery': return 'bg-indigo-500/20 text-indigo-500 border-indigo-500/50';
            case 'Delivered': return 'bg-green-500/20 text-green-500 border-green-500/50';
            case 'Cancelled': return 'bg-red-500/20 text-red-500 border-red-500/50';
            default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
        }
    };

    if (loading) return <div className="text-[#8ea693] text-center py-12">Loading orders...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#142218] p-6 rounded-2xl border border-[#253c2b] shadow-sm">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                        <Package className="text-[#d4af37]" /> Order Management
                    </h1>
                    <p className="text-xs sm:text-sm text-[#8ea693] mt-1 font-medium">View and manage customer orders and order status</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-[#142218] rounded-2xl border border-[#253c2b] shadow-xl">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-[#0d1610] text-[#d4af37] uppercase text-xs font-bold border-b border-[#253c2b]">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e3323] text-sm">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-[#192b1e] transition-colors">
                                <td className="p-4 font-mono text-xs text-[#8ea693]">{order._id.substring(order._id.length - 6)}...</td>
                                <td className="p-4 text-white font-bold">{order.customer?.name}</td>
                                <td className="p-4 text-xs text-[#8ea693]">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-[#d4af37] font-bold">{order.finalAmount} €</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 bg-[#1c4d25]/20 text-[#a9d9b3] hover:bg-[#1c4d25] hover:text-white rounded-xl transition cursor-pointer"
                                        title="View Details"
                                    >
                                        <Eye size={17} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-12 text-center text-[#8ea693]">No orders received yet.</div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-[#142218] rounded-2xl w-full max-w-2xl border border-[#253c2b] shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 sm:p-8">
                            <h3 className="text-xl font-serif font-bold text-white mb-1">Order Details</h3>
                            <p className="text-[#d4af37] font-mono text-xs mb-6">ID: {selectedOrder._id}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#0d1610] p-4 rounded-xl border border-[#253c2b]">
                                    <h4 className="text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2.5">Customer Information</h4>
                                    <p className="text-white font-bold">{selectedOrder.customer?.name}</p>
                                    <p className="text-[#8ea693] text-xs mt-0.5">{selectedOrder.customer?.phone}</p>
                                    <p className="text-[#8ea693] text-xs mt-1.5">{selectedOrder.customer?.address}</p>
                                </div>
                                <div className="bg-[#0d1610] p-4 rounded-xl border border-[#253c2b]">
                                    <h4 className="text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2.5">Payment &amp; Totals</h4>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-[#8ea693]">Payment Method:</span>
                                        <span className="text-white font-semibold">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-3">
                                        <span className="text-[#8ea693]">Total Amount:</span>
                                        <span className="text-[#d4af37] font-bold text-sm">{selectedOrder.finalAmount} €</span>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-[#8ea693] uppercase font-bold mb-1">Update Status</label>
                                        <select
                                            value={selectedOrder.status}
                                            onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                                            className="w-full bg-[#142218] border border-[#253c2b] rounded-xl px-3 py-1.5 text-white text-xs outline-none focus:border-[#d4af37]"
                                        >
                                            {['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
                                                <option key={st} value={st} className="bg-[#0d1610]">{st}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#253c2b] pt-4">
                                <h4 className="text-white font-bold text-sm mb-3">Items Ordered</h4>
                                <ul className="space-y-2">
                                    {selectedOrder.items?.map((item, idx) => (
                                        <li key={idx} className="flex justify-between items-center text-xs bg-[#0d1610] p-3 rounded-xl border border-[#253c2b]/50">
                                            <span className="text-[#a4bba9]">
                                                <span className="font-bold text-white mr-2">{item.quantity}x</span>
                                                {item.name}
                                                {item.variant && <span className="text-[#d4af37] ml-1">({item.variant})</span>}
                                            </span>
                                            <span className="text-white font-bold">{item.price * item.quantity} €</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
