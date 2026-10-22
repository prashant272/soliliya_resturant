import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hello! Welcome to Wilma Restaurant in Ljubljana. How can we assist you today? 😊'
        }
    ]);

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;

        const newMessages = [...messages, { sender: 'user', text }];
        setMessages(newMessages);
        setInput('');

        // Automatic polite reply
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    sender: 'bot',
                    text: 'Thank you for reaching out! You can book a table directly on our website, call us at 40 791 618, or message us directly on WhatsApp.'
                }
            ]);
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
            {/* Chat Box */}
            {isOpen && (
                <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="bg-[#1c241b] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#1c241b] flex items-center justify-center font-bold text-xs">
                                W
                            </div>
                            <div>
                                <h4 className="font-bold text-xs">Wilma Assistant (Live Concierge)</h4>
                                <span className="text-[10px] text-[#8fa382] flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                                    <span>Online &amp; Ready</span>
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white p-1 cursor-pointer"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="p-4 h-64 overflow-y-auto space-y-3 bg-gray-50 text-xs">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                                    msg.sender === 'user'
                                        ? 'bg-[#2d5a27] text-white rounded-tr-none ml-auto'
                                        : 'bg-white rounded-tl-none border border-gray-200 text-gray-700'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Direct WhatsApp Option inside chat window */}
                    <div className="px-4 py-2.5 bg-emerald-50/80 border-t border-emerald-100 flex items-center justify-between text-xs">
                        <span className="text-gray-700 font-medium flex items-center gap-1.5 text-[11px]">
                            <FaWhatsapp className="text-[#25D366] text-base shrink-0" />
                            <span>Chat on WhatsApp:</span>
                        </span>
                        <a
                            href="https://wa.me/38640791618?text=Hello,%20I%20have%20an%20inquiry%20about%20Wilma%20Restaurant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-3 py-1 rounded-lg text-[10px] transition-colors flex items-center gap-1 shadow-2xs"
                        >
                            <span>Open WhatsApp</span>
                            <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your question..."
                            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d5a27]"
                        />
                        <button
                            onClick={handleSend}
                            className="w-9 h-9 bg-[#2d5a27] hover:bg-[#4a7c44] text-white rounded-xl flex items-center justify-center text-xs transition-colors cursor-pointer"
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}

            {/* Triggers Group: WhatsApp (On Top) + Chatbot Trigger (Below) */}
            <div className="flex flex-col items-end gap-2.5 sm:gap-3">
                {/* Clean Circular WhatsApp Floating Button */}
                <a
                    href="https://wa.me/38640791618?text=Hello,%20I%20have%20an%20inquiry%20about%20Wilma%20Restaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative cursor-pointer"
                    aria-label="Chat on WhatsApp"
                    title="WhatsApp (+386 40 791 618)"
                >
                    <FaWhatsapp className="drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border-2 border-white"></span>
                    </span>
                </a>

                {/* Chatbot Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#2d5a27] hover:bg-[#4a7c44] text-white rounded-full shadow-2xl flex items-center justify-center text-xl sm:text-2xl transition-all transform hover:scale-105 active:scale-95 relative cursor-pointer"
                    aria-label="Open Live Chat"
                    title="Wilma Assistant"
                >
                    <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-headset'}`}></i>
                    {!isOpen && (
                        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#d4af37] rounded-full border-2 border-white animate-pulse"></span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LiveChatWidget;
