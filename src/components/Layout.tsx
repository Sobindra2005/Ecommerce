import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productService";
import { Search, ShoppingCart, User, Menu, MessageCircle, X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Hi there! 👋 Welcome to Vogue. How can we help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: 2, text: "Can you recommend something for the upcoming season?", sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    {
      id: 3,
      text: "Here are our top recommended picks for this season! 🔥",
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
    <div className="min-h-screen bg-vogue-canvas text-vogue-text font-sans flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-vogue-border-subtle sticky top-0 bg-vogue-canvas/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-8">
              <span className="text-2xl font-black tracking-tighter text-vogue-action">VOGUE.</span>
            </Link>
            <div className="hidden md:flex gap-6 font-medium text-sm text-vogue-text-muted">
              <Link to="/" className="text-vogue-action transition-colors">Home</Link>
              <a href="#" className="hover:text-vogue-action-hover transition-colors">Shop</a>
              <a href="#" className="hover:text-vogue-action-hover transition-colors">Categories</a>
              <a href="#" className="hover:text-vogue-action-hover transition-colors">Events</a>
              <a href="#" className="hover:text-vogue-action-hover transition-colors">Blog</a>
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => navigate("/search")} className="text-vogue-text-muted hover:text-vogue-action-hover transition-colors"><Search size={22} /></button>
              <button onClick={() => navigate("/shoppingcart")} className="text-vogue-text-muted hover:text-vogue-action-hover transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-vogue-action text-vogue-canvas text-[10px] font-bold h-4 w-4 rounded-vogue-pill flex items-center justify-center">3</span>
              </button>
              <button className="text-vogue-text-muted hover:text-vogue-action-hover transition-colors"><User size={22} /></button>
              <button className="md:hidden text-vogue-text-muted hover:text-vogue-action-hover transition-colors"><Menu size={24} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-vogue-dark text-vogue-canvas py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-black tracking-tighter mb-4 block">VOGUE.</span>
            <p className="text-vogue-text-subtle text-sm mb-6">Your premier destination for the latest fashion trends and timeless classics.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-vogue-text-subtle text-sm">
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Shoes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-vogue-text-subtle text-sm">
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-vogue-canvas transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-vogue-text-subtle text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-vogue-dark-muted border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-vogue-canvas rounded-l-vogue-control outline-none" />
              <button className="bg-vogue-canvas text-vogue-action px-4 py-2 text-sm font-bold rounded-r-vogue-control">Subscribe</button>
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
            className="fixed bottom-6 right-6 w-vogue-control h-vogue-control rounded-vogue-card bg-vogue-text-muted text-vogue-canvas shadow-vogue-card hover:bg-vogue-dark-hover transition-colors z-50 flex items-center justify-center cursor-pointer"
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
            className="fixed bottom-6 right-6 w-vogue-chat-width h-vogue-chat-height rounded-vogue-card bg-vogue-canvas shadow-vogue-popover z-50 flex flex-col overflow-hidden border border-vogue-border"
          >
            {/* Chat Header */}
            <div className="bg-vogue-chat text-vogue-canvas p-4 flex justify-between items-center">
              <motion.span layoutId="chat-icon" className="flex items-center gap-3 font-bold">
                <div className="relative">
                  <div className="bg-vogue-canvas/20 p-1.5 rounded-vogue-pill">
                    <MessageCircle size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-vogue-chat-status border-2 border-vogue-chat rounded-vogue-pill"></div>
                </div>
                <div>
                  <div className="text-sm">Customer Support</div>
                  <div className="text-xs text-vogue-chat-muted font-normal">We usually reply in minutes</div>
                </div>
              </motion.span>
              <button
                onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}
                className="text-vogue-canvas/70 hover:text-vogue-canvas transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 bg-vogue-surface-subtle flex flex-col gap-3 overflow-y-auto">
              <div className="text-center text-xs text-vogue-text-subtle my-2">
                Today
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-vogue-pill bg-vogue-chat-soft flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-vogue-chat" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 max-w-[80%]">
                    <div className={`p-3 rounded-vogue-card shadow-vogue-soft text-sm ${msg.sender === 'user'
                      ? 'bg-vogue-chat text-vogue-canvas rounded-tr-none'
                      : 'bg-vogue-canvas border border-vogue-border-subtle text-vogue-text-muted rounded-tl-none'
                      }`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-vogue-chat-muted' : 'text-vogue-text-subtle'}`}>
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
            <form onSubmit={handleSendMessage} className="p-4 border-t border-vogue-border-subtle bg-vogue-canvas">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2.5 border border-vogue-border rounded-vogue-control focus:outline-none focus:ring-1 focus:ring-vogue-chat text-sm bg-vogue-surface-subtle focus:bg-vogue-canvas transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-vogue-chat text-vogue-canvas p-2.5 rounded-vogue-control hover:bg-vogue-chat-hover disabled:opacity-50 disabled:hover:bg-vogue-chat transition-colors flex-shrink-0 flex items-center justify-center shadow-vogue-soft"
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
            className="snap-start shrink-0 w-[120px] bg-vogue-canvas border border-vogue-border-subtle rounded-vogue-card p-1 cursor-pointer transition-all hover:shadow-md flex flex-col"
          >
            <div
              onClick={() => onProductClick(product.id)}
              className="w-full aspect-[4/4] rounded-vogue-control overflow-hidden bg-vogue-surface-subtle mb-1.5"
            >
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
            </div>
            <h4 className=" text-[13px] font-semibold text-vogue-text-muted truncate">{product.name}</h4>
            <span className="font-extrabold text-[13px] text-vogue-text mb-1 ">${product.price.toFixed(2)}</span>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-full flex items-center justify-center gap-2 bg-vogue-dark-muted hover:bg-vogue-dark-hover text-vogue-canvas text-[12px] font-medium py-1.5 rounded-vogue-control transition-colors"
            >
              <ShoppingCart size={15} />
              Add to cart
            </button>
          </div>
        ))}
      </div>


      <button
        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
        className="absolute left-0 top-[35%] -translate-y-1/2 w-8 h-8 bg-vogue-canvas/90 backdrop-blur shadow-vogue-card rounded-vogue-pill flex items-center justify-center border border-vogue-border text-vogue-text-muted z-10 hover:bg-vogue-canvas hover:shadow-vogue-popover transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
        className="absolute right-0 top-[35%] -translate-y-1/2 w-8 h-8 bg-vogue-canvas/90 backdrop-blur shadow-vogue-card rounded-vogue-pill flex items-center justify-center border border-vogue-border text-vogue-text-muted z-10 hover:bg-vogue-canvas hover:shadow-vogue-popover transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
