
import { ProductCard } from "../components/ProductCard";
import { Search, ShoppingCart, User, Menu, ArrowRight, ArrowLeft, Leaf, Truck, RefreshCw } from "lucide-react";
import { FEATURED_PRODUCTS } from "./data";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-black tracking-tighter text-black">VOGUE.</span>
              <div className="hidden md:flex gap-6 font-medium text-sm text-gray-500">
                <a href="#" className="text-black transition-colors">Home</a>
                <a href="#" className="hover:text-black transition-colors">Shop</a>
                <a href="#" className="hover:text-black transition-colors">Categories</a>
                <a href="#" className="hover:text-black transition-colors">Events</a>
                <a href="#" className="hover:text-black transition-colors">Blog</a>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="text-gray-600 hover:text-black transition-colors"><Search size={22} /></button>
              <button className="text-gray-600 hover:text-black transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="text-gray-600 hover:text-black transition-colors"><User size={22} /></button>
              <button className="md:hidden text-gray-600 hover:text-black transition-colors"><Menu size={24} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Overview Section */}
      <section className="relative w-full min-h-[90dvh] bg-[#e8e4dc] overflow-hidden flex items-center">
        {/* Right Side Image (Model) */}
        <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 opacity-40 md:opacity-100">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
            alt="Autumn Fashion"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay to blend the left edge smoothly into the background color */}
          <div className="absolute inset-0 bg-linear-to-r from-[#e8e4dc] via-[#e8e4dc]/80 to-transparent w-full md:w-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex w-full z-10 py-12 md:py-0">
          <div className="w-full md:w-[55%] flex flex-col justify-center">
            {/* NEW ARRIVALS */}
            <div className="flex items-center gap-4 mb-6">
              <span className="uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold text-gray-700">New Arrivals</span>
              <div className="w-8 sm:w-12 h-[1px] bg-gray-400"></div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-[#1a1a1a] leading-[1.05] mb-6 tracking-tight">
              Autumn<br />Collection '26
            </h1>

            <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-[420px] leading-relaxed">
              Elevate your everyday wardrobe with timeless pieces, made for the season.
            </p>

            <button className="bg-[#1a1c23] text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm w-fit flex items-center gap-3 hover:bg-black transition-colors mb-12 sm:mb-16 shadow-lg shadow-black/10">
              Shop Now <ArrowRight size={16} />
            </button>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[500px] mb-12">
              {/* Feature 1 */}
              <div className="flex gap-3 items-start">
                <Leaf size={18} className="text-gray-700 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Premium Quality</span>
                  <span className="text-[11px] text-gray-500 leading-tight">Crafted to last</span>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex gap-3 items-start">
                <Truck size={18} className="text-gray-700 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Free Shipping</span>
                  <span className="text-[11px] text-gray-500 leading-tight">On orders over $100</span>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex gap-3 items-start">
                <RefreshCw size={18} className="text-gray-700 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Easy Returns</span>
                  <span className="text-[11px] text-gray-500 leading-tight">Hassle free</span>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-4 mt-auto">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white transition-colors">
                <ArrowLeft size={16} />
              </button>
              <span className="text-[11px] font-bold text-gray-500 tracking-[0.15em]">01 / 04</span>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Handwritten Text on Right */}
          <div className="hidden lg:flex absolute right-16 xl:right-32 top-1/2 -translate-y-1/2 z-10 flex-col items-center">
            <div className="font-serif italic text-2xl xl:text-3xl text-white mix-blend-overlay -rotate-12 opacity-90 text-right leading-tight drop-shadow-md">
              Style<br />for a new<br />season
            </div>
            <svg className="w-16 h-3 mt-3 -rotate-12 text-white opacity-70 mix-blend-overlay drop-shadow-md" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 0 100 5" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Events / Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Clearance Sale */}
          <div className="bg-white rounded-2xl h-[350px] relative overflow-hidden flex shadow-sm border border-gray-100 group cursor-pointer">
            {/* Background decorative faint circle */}
            <div className="absolute top-0 right-1/2 w-64 h-64 bg-gray-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 z-0"></div>
            
            {/* Left Text */}
            <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
              <div className="mb-4">
                <span className="bg-[#ffe4e6] text-[#e11d48] font-bold text-[10px] tracking-wider px-3 py-1.5 rounded-full uppercase">
                  Limited Time
                </span>
              </div>
              <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                End of Season<br />Clearance Sale
              </h2>
              <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
                Up to 70% off on selected items. Don't miss your chance to own your favorites.
              </p>
              <div>
                <button className="bg-[#111111] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  Shop Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-1/2 sm:w-[45%] h-full relative z-10">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800"
                alt="Sale Event"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 right-[40%] sm:right-[38%] bg-[#f4ece3] text-[#111] py-3 px-4 rounded-2xl rotate-[-6deg] shadow-xl flex flex-col items-center justify-center z-20 min-w-[90px] border border-white/50 backdrop-blur-sm">
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">Up To</span>
              <span className="text-3xl font-black leading-none my-0.5">70%</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">Off</span>
            </div>
          </div>
          
          {/* Banner 2: Autumn Collection */}
          <div className="bg-[#f6f2eb] rounded-2xl h-[350px] relative overflow-hidden flex group cursor-pointer">
            {/* Left Text */}
            <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
              <div className="mb-4 flex flex-col items-start">
                <span className="text-gray-800 font-bold tracking-wider text-[11px] uppercase mb-1.5">
                  New Arrivals
                </span>
                <div className="w-8 h-[2px] bg-[#a46e45]"></div>
              </div>
              <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                Autumn<br />Collection '26
              </h2>
              <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
                Elevate your everyday wardrobe with timeless pieces.
              </p>
              <div>
                <button className="bg-[#a46e45] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#8d5b35] transition-colors shadow-sm">
                  Shop Now <ArrowRight size={16} />
                </button>
              </div>
              
              {/* Decorative SVG (simulated with a simple shape or leaf icon if we had one, leaving subtle shape) */}
              <div className="absolute bottom-4 left-4 opacity-20 w-12 h-12 bg-[#a46e45] rounded-tl-full rounded-br-full -rotate-12 pointer-events-none"></div>
            </div>
            
            {/* Right Image */}
            <div className="w-1/2 sm:w-[45%] h-full relative z-10">
              <img
                src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800"
                alt="Autumn Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
            <p className="text-gray-500">Discover what our customers are loving right now.</p>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 font-semibold text-gray-900 hover:text-gray-600 transition-colors">
            View All Products <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <button className="border border-gray-300 rounded-full px-8 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
            View All Products
          </button>
        </div>
      </section>

      {/* Footer (Simplified) */}
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
    </div>
  );
}
