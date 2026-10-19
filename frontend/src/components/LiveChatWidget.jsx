import React, { useState } from 'react';

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hello! Welcome to Wilma Restaurant in Ljubljana. How can we help you today? 😊'
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
                    text: 'Thank you for reaching out! You can book a table directly on our website or call us at 040 791 618 for immediate reservations.'
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
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Box */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="bg-[#1c241b] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#1c241b] flex items-center justify-center font-bold text-xs">
                                W
                            </div>
                            <div>
                                <h4 className="font-bold text-xs">Wilma Assistant (Support)</h4>
                                <span className="text-[10px] text-[#8fa382] flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                                    <span>Available live</span>
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white p-1"
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

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a question..."
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

            {/* Chat Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#2d5a27] hover:bg-[#4a7c44] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all transform hover:scale-110 relative cursor-pointer"
                aria-label="Open Live Chat"
            >
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-headset'}`}></i>
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4af37] rounded-full border-2 border-white animate-pulse"></span>
                )}
            </button>
        </div>
    );
};

export default LiveChatWidget;
