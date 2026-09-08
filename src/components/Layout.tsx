import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FEATURED_PRODUCTS } from "../pages/data";
import { Search, ShoppingCart, User, Menu, MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Hi there! 👋 Welcome to Vogue. How can we help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: 2, text: "Can you recommend something for the upcoming season?", sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { 
      id: 3, 
      text: "I highly recommend our Trendy Brown Coat. It's currently on sale and perfect for the season!", 
      sender: "bot", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      product: FEATURED_PRODUCTS[0]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for your message! A representative will connect with you shortly.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-8">
              <span className="text-2xl font-black tracking-tighter text-black">VOGUE.</span>
            </Link>
            <div className="hidden md:flex gap-6 font-medium text-sm text-gray-500">
              <Link to="/" className="text-black transition-colors">Home</Link>
              <a href="#" className="hover:text-black transition-colors">Shop</a>
              <a href="#" className="hover:text-black transition-colors">Categories</a>
              <a href="#" className="hover:text-black transition-colors">Events</a>
              <a href="#" className="hover:text-black transition-colors">Blog</a>
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => navigate("/search")} className="text-gray-600 hover:text-black transition-colors"><Search size={22} /></button>
              <button onClick={() => navigate("/shoppingcart")} className="text-gray-600 hover:text-black transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="text-gray-600 hover:text-black transition-colors"><User size={22} /></button>
              <button className="md:hidden text-gray-600 hover:text-black transition-colors"><Menu size={24} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-black tracking-tighter mb-4 block">VOGUE.</span>
            <p className="text-gray-400 text-sm mb-6">Your premier destination for the latest fashion trends and timeless classics.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shoes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-white rounded-l-md outline-none" />
              <button className="bg-white text-black px-4 py-2 text-sm font-bold rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Icon */}
      <AnimatePresence>
        {!isChatOpen ? (
          <motion.div
            layoutId="chat-widget"
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-gray-500 text-white shadow-lg hover:bg-gray-800 transition-colors z-50 flex items-center justify-center cursor-pointer"
            style={{ borderRadius: "16px", width: "56px", height: "56px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                duration:0
              }}
              layoutId="chat-icon">
              <MessageCircle size={24} className="w-8 h-8" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            layoutId="chat-widget"
            className="fixed bottom-6 right-6 bg-white shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
            style={{ borderRadius: "16px", width: "370px", height: "500px" }}
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <motion.span layoutId="chat-icon" className="flex items-center gap-3 font-bold">
                <div className="relative">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <MessageCircle size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-600 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm">Customer Support</div>
                  <div className="text-xs text-blue-100 font-normal">We usually reply in minutes</div>
                </div>
              </motion.span>
              <button
                onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 bg-gray-50 flex flex-col gap-3 overflow-y-auto">
              <div className="text-center text-xs text-gray-400 my-2">
                Today
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 max-w-[80%]">
                    <div className={`p-3 rounded-2xl shadow-sm text-sm ${msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                      }`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {msg.time}
                      </div>
                    </div>
                    {msg.product && (
                      <div 
                        onClick={() => navigate(`/product/${msg.product.id}`)}
                        className="bg-white border border-gray-200 rounded-xl p-2 flex gap-3 items-center shadow-sm cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <img src={msg.product.imageUrl} alt={msg.product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 overflow-hidden">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">{msg.product.name}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-bold text-sm">${msg.product.price.toFixed(2)}</span>
                            {msg.product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">${msg.product.originalPrice.toFixed(2)}</span>
                            )}
                            {msg.product.discountBadge && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">{msg.product.discountBadge}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-blue-600 font-bold px-1">
                          ›
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex-shrink-0 flex items-center justify-center shadow-sm"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
