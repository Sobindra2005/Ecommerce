import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp, LayoutGrid, List } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { FEATURED_PRODUCTS } from "./data";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setActiveSearch(searchQuery);
  };

  const filteredProducts = activeSearch 
    ? FEATURED_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(activeSearch.toLowerCase())
      )
    : FEATURED_PRODUCTS;

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans text-[#333]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-[240px] shrink-0 hidden lg:block">
            <h2 className="text-xl font-extrabold text-gray-900 mb-8 tracking-tight">Filters</h2>
            
            {/* Size Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-black">Size</h3>
                <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-700" />
              </div>
              <div className="space-y-3">
                {[
                  { name: 'XS', count: 4, checked: false },
                  { name: 'S', count: 8, checked: false },
                  { name: 'M', count: 12, checked: true },
                  { name: 'L', count: 10, checked: false },
                  { name: 'XL', count: 6, checked: false },
                ].map((size) => (
                  <label key={size.name} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${size.checked ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-gray-400'}`}>
                        {size.checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className={`text-[13.5px] ${size.checked ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{size.name}</span>
                    </div>
                    <span className="text-[12px] text-gray-400">({size.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-black">Color</h3>
                <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-700" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="w-5 h-5 rounded-full bg-black ring-2 ring-offset-2 ring-gray-200"></button>
                <button className="w-5 h-5 rounded-full bg-[#8c7a6b]"></button>
                <button className="w-5 h-5 rounded-full bg-[#c6b4a3]"></button>
                <button className="w-5 h-5 rounded-full bg-[#5c4a3d]"></button>
                <button className="w-5 h-5 rounded-full bg-[#4a5d23]"></button>
                <button className="w-5 h-5 rounded-full bg-[#1e2a4f]"></button>
                <button className="w-5 h-5 rounded-full bg-white border border-gray-300"></button>
              </div>
              <button className="text-[11px] text-gray-500 mt-3 font-medium hover:text-gray-800 transition-colors">+2 more</button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-black">Price Range</h3>
                <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-700" />
              </div>
              <div className="mt-6 mb-2 relative px-1">
                <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-black rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-3.5 h-3.5 bg-black rounded-full -translate-y-1/2 border-2 border-white shadow"></div>
                <div className="absolute top-1/2 right-0 w-3.5 h-3.5 bg-black rounded-full -translate-y-1/2 border-2 border-white shadow"></div>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-gray-500 mt-2">
                <span>$50</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-black">Brand</h3>
                <ChevronDown size={16} className="text-gray-500 group-hover:text-gray-700" />
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Zara', count: 6 },
                  { name: 'Mango', count: 5 },
                  { name: 'H&M', count: 4 },
                  { name: 'Other Brands', count: 9 },
                ].map((brand) => (
                  <label key={brand.name} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-[4px] border border-gray-300 group-hover:border-gray-400 flex items-center justify-center transition-colors"></div>
                      <span className="text-[13.5px] text-gray-600">{brand.name}</span>
                    </div>
                    <span className="text-[12px] text-gray-400">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1">
            
            {/* Top Search Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <form onSubmit={handleSearch} className="flex-1 relative flex items-center w-full bg-[#f8f9fa] rounded-full px-4 h-14 border border-transparent focus-within:border-gray-300 focus-within:bg-white transition-all">
                <Search size={20} className="text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent border-none outline-none px-3 h-full text-[15px] placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 p-1">
                    <X size={16} />
                  </button>
                )}
              </form>
              <button 
                onClick={handleSearch}
                className="h-14 px-8 bg-[#1a1c23] hover:bg-black text-white rounded-full font-semibold text-[14px] flex items-center gap-2 transition-colors shrink-0"
              >
                Search <span className="text-lg leading-none">→</span>
              </button>
            </div>

            {/* Header row (Results + Sort/View) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <span className="text-[14px] text-gray-600 font-medium">
                {activeSearch 
                  ? <>Showing {filteredProducts.length} results for "<span className="font-bold text-gray-900">{activeSearch}</span>"</> 
                  : <>Showing {filteredProducts.length} recommended products</>
                }
              </span>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-transparent px-2 py-1 hover:text-black transition-colors">
                  Sort by: Featured <ChevronDown size={14} className="text-gray-500" />
                </button>
                
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                  <button className="p-1.5 bg-gray-100 rounded-[4px] text-gray-900 transition-colors">
                    <LayoutGrid size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100">
                <Search size={40} className="text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-500 text-sm">We couldn't find anything matching "{activeSearch}".</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
