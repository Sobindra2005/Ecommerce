import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { FEATURED_PRODUCTS } from "./data";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1572495641004-28421ae52e52?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
];

const TABS = ["Details", "Materials", "Size & Fit", "Shipping & Returns"];

export function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Top Section - Product Details */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16 sm:mb-24">

          {/* Images Section */}
          <div className="flex gap-4 lg:w-[55%] sm:h-162.5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
              {PRODUCT_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`border-[1.5px]  rounded-lg overflow-hidden aspect-4/5 ${selectedImage === img ? 'border-black' : 'border-gray-200'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
              <button className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 mt-2 mx-auto shadow-sm">
                <ChevronDown size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 min-w-0 min-h-0 relative h-full">
              <img src={selectedImage} alt="Product" className="w-full h-full object-cover object-top rounded-2xl bg-[#f4f5f7]" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col lg:w-[45%] pt-2">
            <div className="mb-4">
              <span className="bg-[#f0f0f0] text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                New Arrival
              </span>
            </div>

            <h1 className="text-3xl sm:text-[42px] font-bold text-gray-900 leading-[1.15] mb-3 tracking-tight">
              Essential Oversized<br />Hoodie
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={15} className="fill-black text-black" />
                ))}
              </div>
              <span className="text-[14px] font-medium text-gray-600">4.8 (128 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-[32px] font-bold text-gray-900 leading-none">$59.99</span>
              <span className="text-[16px] text-gray-400 line-through font-medium mb-1">$89.99</span>
              <span className="bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded mb-1.5">33% OFF</span>
            </div>

            <p className="text-gray-600 text-[15px] leading-relaxed mb-8 sm:w-[85%]">
              Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style.
            </p>

            {/* Size Selector */}
            <div className="mb-8 mt-2">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[14px] text-gray-900">Size: <span className="font-medium ml-1">{selectedSize}</span></span>
                <button className="text-gray-600 text-[13px] font-medium flex items-center gap-1.5 hover:text-black transition-colors underline underline-offset-4 decoration-gray-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H2.5" /><path d="M21.5 5H2.5" /><path d="M21.5 19H2.5" /><path d="M12 22V2" /><path d="M7 22V2" /><path d="M17 22V2" /></svg>
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2.5">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[56px] h-12 flex items-center justify-center rounded-lg border font-semibold text-[13px] transition-colors ${selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-900 border-gray-200 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-10">
              <button className="flex-1 bg-black text-white h-[56px] rounded-xl font-bold flex items-center justify-center gap-2.5 hover:bg-gray-900 transition-colors text-[15px]">
                <ShoppingBag size={18} strokeWidth={2.5} />
                Add to Cart
              </button>
              <button className="w-[56px] h-[56px] flex items-center justify-center border border-gray-200 rounded-xl text-gray-900 hover:border-black transition-colors shrink-0">
                <Heart size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Features (Shipping/Returns) */}
            <div className="flex justify-between border-t border-gray-100 pt-6">
              <div className="flex gap-3 items-start">
                <Truck size={20} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Free Shipping</span>
                  <span className="text-[11px] text-gray-500 leading-tight">On orders over $99</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <RefreshCw size={20} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Easy Returns</span>
                  <span className="text-[11px] text-gray-500 leading-tight">30-day return policy</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck size={20} className="text-gray-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 mb-0.5">Secure Payment</span>
                  <span className="text-[11px] text-gray-500 leading-tight">100% secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Details & Materials */}
        <div className="flex flex-col md:flex-row gap-12 sm:gap-20 mb-20  max-h-100">
          <div className="md:w-[45%]">
            <div className="flex gap-8 border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[14px] font-bold transition-colors relative ${activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900"></div>
                  )}
                </button>
              ))}
            </div>

            {activeTab === "Details" && (
              <div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
                  Crafted from high-quality heavyweight cotton, this hoodie delivers unmatched comfort and durability. The oversized fit and minimal design make it a versatile staple for any wardrobe.
                </p>
                <ul className="space-y-4">
                  {[
                    { label: "Oversized fit", icon: <ShoppingBag size={18} strokeWidth={1.5} /> },
                    { label: "Soft & heavyweight fabric", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
                    { label: "Adjustable drawstring hood", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" y1="8" x2="12" y2="8" /><line x1="3.95" y1="6.06" x2="8.54" y2="14" /></svg> },
                    { label: "Ribbed cuffs and hem", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> },
                    { label: "Unisex style", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> }
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[14px] text-gray-800 font-medium">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-900">
                        {feature.icon}
                      </div>
                      {feature.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab !== "Details" && (
              <div>
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  Information for {activeTab} goes here.
                </p>
              </div>
            )}
          </div>

          <div className="md:w-[55%] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800"
              alt="Fabric Detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Section - You May Also Like */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-[22px] font-extrabold text-gray-900">You May Also Like</h2>
            <Link to="/" className="text-[13px] font-bold text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {FEATURED_PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
