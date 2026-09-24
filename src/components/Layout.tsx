import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productService";
import { Search, ShoppingCart, User, Menu, MessageCircle, X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

export function Layout() {
  const { cart } = useCart();
  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Hi there! ðŸ‘‹ Welcome to Vogue. How can we help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: 2, text: "Can you recommend something for the upcoming season?", sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    {
      id: 3,
      text: "Here are our top recommended picks for this season! ðŸ”¥",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      products: [],
      highlightedProductId: "1"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await getProducts({ limit: 5, sort: 'rating' });
        if (response.success && response.data.products.length > 0) {
          const mapped = response.data.products.map((p) => ({
            id: p.slug,
            name: p.name,
            price: p.discountPercentage > 0 ? p.basePrice * (1 - p.discountPercentage / 100) : p.basePrice,
            imageUrl: p.thumbnail || "https://images.unsplash.com/photo-1551028719-00167b16eac5",
          }));
          setMessages(prev => prev.map(msg =>
            msg.id === 3 ? { ...msg, products: mapped } : msg
          ));
        }
      } catch (err) {
        console.error("Failed to fetch recommended products:", err);
      }
    };
    fetchRecommended();
  }, []);

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
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-8">
              <span className="text-2xl font-black tracking-tighter text-white">VOGUE.</span>
            </Link>
            <div className="hidden md:flex gap-6 font-medium text-sm text-gray-400">
              <Link to="/" className="text-white transition-colors">Home</Link>
              <a href="#" className="hover:text-white transition-colors">Shop</a>
              <a href="#" className="hover:text-white transition-colors">Categories</a>
              <a href="#" className="hover:text-white transition-colors">Events</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => navigate("/search")} className="text-gray-400 hover:text-white transition-colors"><Search size={22} /></button>
              <button onClick={() => navigate("/shoppingcart")} className="text-gray-400 hover:text-white transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-white text-slate-950 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{totalItems}</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors"><User size={22} /></button>
              <button className="md:hidden text-gray-400 hover:text-white transition-colors"><Menu size={24} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-slate-800">
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
              <input type="email" placeholder="Your email" className="bg-slate-800 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-white rounded-l-md outline-none" />
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
            className="fixed bottom-6 right-6 bg-slate-700 text-white shadow-lg hover:bg-slate-600 transition-colors z-50 flex items-center justify-center cursor-pointer"
            style={{ borderRadius: "16px", width: "56px", height: "56px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0
              }}
              layoutId="chat-icon">
              <MessageCircle size={24} className="w-8 h-8" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            layoutId="chat-widget"
            className="fixed bottom-6 right-6 bg-slate-900 shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-700"
            style={{ borderRadius: "16px", width: "400px", height: "550px" }}
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
            <div className="flex-1 p-4 bg-slate-950 flex flex-col gap-3 overflow-y-auto">
              <div className="text-center text-xs text-gray-400 my-2">
                Today
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' && "flex-row-reverse")}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 max-w-[80%]">
                    <div className={cn("p-3 rounded-2xl shadow-sm text-sm", msg.sender === 'user'
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-slate-800 border border-slate-700 text-gray-200 rounded-tl-none")}>
                      {msg.text}
                      <div className={cn("text-[10px] mt-1 text-right", msg.sender === 'user' ? "text-blue-200" : "text-gray-400")}>
                        {msg.time}
                      </div>
                    </div>
                    {msg.products && (
                      <MessageCarousel
                        products={msg.products}
                        onProductClick={(id) => navigate(`/product/${id}`)}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 bg-slate-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2.5 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-slate-800 text-white focus:bg-slate-700 transition-colors"
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

const MessageCarousel = ({ products, onProductClick }: { products: any[], onProductClick: (id: string) => void }) => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.55 : clientWidth * 0.55;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-3 -mx-2 px-2 w-[calc(100%+1rem)] max-w-[560px]">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-1 pb-2 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[120px] bg-slate-800 border border-slate-700 rounded-xl p-1 cursor-pointer transition-all hover:shadow-md flex flex-col"
          >
            <div
              onClick={() => onProductClick(product.id)}
              className="w-full aspect-[4/4] rounded-lg overflow-hidden bg-slate-700 mb-1.5"
            >
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
            </div>
            <h4 className=" text-[13px] font-semibold text-gray-200 truncate">{product.name}</h4>
            <span className="font-extrabold text-[13px] text-white mb-1 ">${product.price.toFixed(2)}</span>
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product.id, 1); }}
              className="w-full flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white text-[12px] font-medium py-1.5 rounded-md transition-colors"
            >
              <ShoppingCart size={15} />
              Add to cart
            </button>
          </div>
        ))}
      </div>


      <button
        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
        className="absolute left-0 top-[35%] -translate-y-1/2 w-8 h-8 bg-slate-800/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center border border-slate-600 text-gray-200 z-10 hover:bg-slate-700 hover:shadow-xl transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
        className="absolute right-0 top-[35%] -translate-y-1/2 w-8 h-8 bg-slate-800/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center border border-slate-600 text-gray-200 z-10 hover:bg-slate-700 hover:shadow-xl transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};


