import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    const currency = cart.some(item => Number(item.price) > 50) ? '₹' : '€';
    const formatAmount = (num) => currency === '€' ? Number(num).toFixed(2) : num;

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-gray-200 flex flex-col transform transition-transform duration-300">
                <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-[#1c241b] text-white">
                    <h2 className="text-xl font-heading text-[#d4af37] flex items-center gap-2">
                        <ShoppingBag size={20} /> Your Order
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-300 hover:text-white cursor-pointer">
                        <X size={22} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 mt-12">
                            <i className="fa-solid fa-basket-shopping text-4xl mb-3 text-gray-300"></i>
                            <p className="text-sm">Your order is empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-[#2d5a27] font-bold text-sm hover:underline cursor-pointer"
                            >
                                Browse Menu
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartItemId} className="flex gap-4 p-3 bg-[#fcfbf7] rounded-xl border border-gray-200">
                                <img src={item.image || '/images/food.jpeg'} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="text-[#1c241b] font-bold text-sm">{item.name}</h3>
                                    {item.variant && <p className="text-xs text-[#c9a227] uppercase">{item.variant}</p>}
                                    <p className="text-[#2d5a27] font-bold text-sm">{currency}{formatAmount(item.price)}</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-2 py-1">
                                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="text-gray-600 hover:text-black cursor-pointer">
                                            <Minus size={13} />
                                        </button>
                                        <span className="text-[#1c241b] text-xs font-bold w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="text-gray-600 hover:text-black cursor-pointer">
                                            <Plus size={13} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-[#fcfbf7]">
                        <div className="flex justify-between items-center mb-4 text-[#1c241b]">
                            <span className="font-semibold text-sm">Total Amount</span>
                            <span className="text-xl font-bold text-[#2d5a27]">{currency}{formatAmount(cartTotal)}</span>
                        </div>
                        <button
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/checkout');
                            }}
                            className="w-full bg-[#c9a227] hover:bg-yellow-500 text-[#1c241b] font-bold py-3.5 rounded-xl transition-all shadow-md uppercase tracking-wider text-xs cursor-pointer"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
