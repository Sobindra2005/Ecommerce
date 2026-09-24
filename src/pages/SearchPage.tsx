import { useState, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp, LayoutGrid, List } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import type { Product as UIProduct } from "../components/ProductCard";
import { getProducts } from "../api/productService";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<[number, number]>([0, 1000]);
  const [sizeCounts, setSizeCounts] = useState<Record<string, number>>({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => clearTimeout(handler);
  }, [priceRange]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const params: any = activeSearch
          ? { keyword: activeSearch, limit: 24 }
          : { limit: 8, sort: 'rating' };

        params.minPrice = debouncedPriceRange[0];
        params.maxPrice = debouncedPriceRange[1];
        if (selectedSizes.length > 0) {
          params.sizes = selectedSizes.join(',');
        }

        const response = await getProducts(params);
        if (response.success) {
          const mappedProducts = response.data.products.map((p) => ({
            id: p.slug,
            name: p.name,
            category: p.category,
            price: p.discountPercentage > 0 ? p.basePrice * (1 - p.discountPercentage / 100) : p.basePrice,
            originalPrice: p.discountPercentage > 0 ? p.basePrice : undefined,
            rating: p.averageRating,
            imageUrl: p.thumbnail || "https://images.unsplash.com/photo-1551028719-00167b16eac5",
            discountBadge: p.discountPercentage > 0 ? `${p.discountPercentage}% OFF` : undefined
          }));
          setProducts(mappedProducts);
          if (response.data.sizeCounts) setSizeCounts(response.data.sizeCounts);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [activeSearch, selectedSizes, debouncedPriceRange]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setActiveSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="w-full lg:w-[240px] shrink-0 hidden lg:block">
            <h2 className="text-xl font-extrabold text-white mb-8 tracking-tight">Filters</h2>

            {/* Size Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-100 group-hover:text-white">Size</h3>
                <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-300" />
              </div>
              <div className="space-y-3">
                {[
                  { name: 'XS', count: sizeCounts['XS'] || 0 },
                  { name: 'S', count: sizeCounts['S'] || 0 },
                  { name: 'M', count: sizeCounts['M'] || 0 },
                  { name: 'L', count: sizeCounts['L'] || 0 },
                  { name: 'XL', count: sizeCounts['XL'] || 0 },
                ].map((size) => {
                  const isChecked = selectedSizes.includes(size.name);
                  return (
                    <label key={size.name} className="flex items-center justify-between cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleSize(size.name); }}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isChecked ? 'bg-white border-white text-black' : 'border-gray-600 group-hover:border-gray-400'}`}>
                          {isChecked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <span className={`text-[13.5px] ${isChecked ? 'text-white font-semibold' : 'text-gray-400'}`}>{size.name}</span>
                      </div>
                      <span className="text-[12px] text-gray-500">({size.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer group">
                <h3 className="font-bold text-[14px] text-gray-100 group-hover:text-white">Price Range</h3>
                <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-300" />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-1/2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
                  <input
                    type="number"
                    min={0}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full h-10 bg-[#181b22] border border-gray-700 rounded-lg pl-6 pr-3 text-[13.5px] text-gray-100 outline-none focus:border-gray-500 focus:bg-[#20242d] transition-colors"
                    placeholder="Min"
                  />
                </div>
                <div className="w-2 h-[1px] bg-gray-600"></div>
                <div className="relative w-1/2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
                  <input
                    type="number"
                    min={0}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-10 bg-[#181b22] border border-gray-700 rounded-lg pl-6 pr-3 text-[13.5px] text-gray-100 outline-none focus:border-gray-500 focus:bg-[#20242d] transition-colors"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>


          </aside>

          {/* Right Content */}
          <div className="flex-1">

            {/* Top Search Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <form onSubmit={handleSearch} className="flex-1 relative flex items-center w-full bg-[#181b22] rounded-full px-4 h-14 border border-gray-700 focus-within:border-gray-500 focus-within:bg-[#20242d] transition-all">
                <Search size={20} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent border-none outline-none px-3 h-full text-[15px] text-gray-100 placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 p-1">
                    <X size={16} />
                  </button>
                )}
              </form>
              <button
                onClick={handleSearch}
                className="h-14 px-8 bg-white hover:bg-gray-200 text-black rounded-full font-semibold text-[14px] flex items-center gap-2 transition-colors shrink-0"
              >
                Search <span className="text-lg leading-none">→</span>
              </button>
            </div>

            {/* Header row (Results + Sort/View) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <span className="text-[14px] text-gray-400 font-medium">
                {activeSearch
                  ? <>Showing {products.length} results for "<span className="font-bold text-white">{activeSearch}</span>"</>
                  : <>Showing {products.length} recommended products</>
                }
              </span>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-transparent px-2 py-1 hover:text-black transition-colors">
                  Sort by: Featured <ChevronDown size={14} className="text-gray-400" />
                </button>

                <div className="flex items-center gap-1 border border-gray-700 rounded-lg p-1">
                  <button className="p-1.5 bg-gray-700 rounded-[4px] text-white transition-colors">
                    <LayoutGrid size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>

            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-[#181b22] rounded-2xl border border-gray-800">
                <Search size={40} className="text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-white mb-2">No results found</h2>
                <p className="text-gray-500 text-sm">We couldn't find anything matching "{activeSearch}".</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
