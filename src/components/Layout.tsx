import { Link, Outlet } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export function Layout() {
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

      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16">
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
      </footer> */}
    </div>
  );
}
