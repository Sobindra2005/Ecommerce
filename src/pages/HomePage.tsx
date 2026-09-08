
import { useState, useEffect, Fragment } from "react";
import { ProductCard } from "../components/ProductCard";
import type { Product as UIProduct } from "../components/ProductCard";
import { ArrowRight, ArrowLeft, Leaf, Truck, RefreshCw } from "lucide-react";
import { getProducts } from "../api/productService";
import { getHomeContent } from "../api/contentService";
import type { HeroSlide, EventBanner } from "../api/contentService";

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [events, setEvents] = useState<EventBanner[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ limit: 4 });
        if (response.success) {
          const mappedProducts = response.data.products.map((p) => ({
            id: p.slug,
            name: p.name,
            category: p.category,
            price: p.discountPercentage > 0 ? p.basePrice * (1 - p.discountPercentage / 100) : p.basePrice,
            originalPrice: p.discountPercentage > 0 ? p.basePrice : undefined,
            rating: p.averageRating,
            imageUrl: p.thumbnail,
            discountBadge: p.discountPercentage > 0 ? `${p.discountPercentage}% OFF` : undefined
          }));
          setFeaturedProducts(mappedProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchContent = async () => {
      try {
        const res = await getHomeContent();
        if (res.success && res.data) {
          setHeroSlides(res.data.heroSlides);
          setEvents(res.data.events);
        }
      } catch (err) {
        console.error("Failed to fetch home content:", err);
      }
    };

    fetchContent();
    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide] || null;

  return (
    <>
      {/* Hero / Overview Section */}
      <section className="relative w-full min-h-[90vh] bg-[#e8e4dc] overflow-hidden flex items-center">
        {slide && (
          <>
            {/* Right Side Image (Model) */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 opacity-40 md:opacity-100">
              <img
                key={slide._id}
                src={slide.image}
                alt={slide.title.replace('\n', ' ')}
                className="w-full h-full object-cover object-center animate-[fadeIn_0.5s_ease-in-out]"
              />
              {/* Gradient overlay to blend the left edge smoothly into the background color */}
              <div className="absolute inset-0 bg-linear-to-r from-[#e8e4dc] via-[#e8e4dc]/80 to-transparent w-full md:w-1/2"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex w-full z-10 py-12 md:py-12">
              <div className="w-full md:w-[55%] flex flex-col justify-center">
                {/* TAGLINE */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold text-gray-700">{slide.tagline}</span>
                  <div className="w-8 sm:w-12 h-[1px] bg-gray-400"></div>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-[#1a1a1a] leading-[1.05] mb-6 tracking-tight">
                  {slide.title.split('\n').map((line, i, arr) => (
                    <Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </Fragment>
                  ))}
                </h1>

                <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-[420px] leading-relaxed">
                  {slide.description}
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
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white transition-colors cursor-pointer z-20"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <span className="text-[11px] font-bold text-gray-500 tracking-[0.15em] w-12 text-center">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white transition-colors cursor-pointer z-20"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Handwritten Text on Right */}
              <div className="hidden lg:flex absolute right-16 xl:right-32 top-1/2 -translate-y-1/2 z-10 flex-col items-center">
                <div className="font-serif italic text-2xl xl:text-3xl text-white mix-blend-overlay -rotate-12 opacity-90 text-right leading-tight drop-shadow-md">
                  {slide.handwritten.split('\n').map((line, i, arr) => (
                    <Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </Fragment>
                  ))}
                </div>
                <svg className="w-16 h-3 mt-3 -rotate-12 text-white opacity-70 mix-blend-overlay drop-shadow-md" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Main Events / Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            if (event.type === 'clearance') {
              return (
                <div key={event._id} className="bg-white rounded-2xl h-[350px] relative overflow-hidden flex shadow-sm border border-gray-100 group cursor-pointer">
                  <div className="absolute top-0 right-1/2 w-64 h-64 bg-gray-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 z-0"></div>
                  
                  <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
                    <div className="mb-4">
                      <span className="bg-[#ffe4e6] text-[#e11d48] font-bold text-[10px] tracking-wider px-3 py-1.5 rounded-full uppercase">
                        {event.tagline}
                      </span>
                    </div>
                    <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                      {event.title.split('\n').map((line, i, arr) => (
                        <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
                      ))}
                    </h2>
                    <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
                      {event.description}
                    </p>
                    <div>
                      <button className="bg-[#111111] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        {event.buttonText} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-1/2 sm:w-[45%] h-full relative z-10">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  
                  {event.badgePrimaryText && (
                    <div className="absolute bottom-8 right-[40%] sm:right-[38%] bg-[#f4ece3] text-[#111] py-3 px-4 rounded-2xl rotate-[-6deg] shadow-xl flex flex-col items-center justify-center z-20 min-w-[90px] border border-white/50 backdrop-blur-sm">
                      {event.badgeSecondaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">{event.badgeSecondaryText}</span>}
                      <span className="text-3xl font-black leading-none my-0.5">{event.badgePrimaryText}</span>
                      {event.badgeTertiaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">{event.badgeTertiaryText}</span>}
                    </div>
                  )}
                </div>
              );
            }

            if (event.type === 'collection') {
              return (
                <div key={event._id} className="bg-[#f6f2eb] rounded-2xl h-[350px] relative overflow-hidden flex group cursor-pointer">
                  <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
                    <div className="mb-4 flex flex-col items-start">
                      <span className="text-gray-800 font-bold tracking-wider text-[11px] uppercase mb-1.5">
                        {event.tagline}
                      </span>
                      <div className="w-8 h-[2px] bg-[#a46e45]"></div>
                    </div>
                    <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                      {event.title.split('\n').map((line, i, arr) => (
                        <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
                      ))}
                    </h2>
                    <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
                      {event.description}
                    </p>
                    <div>
                      <button className="bg-[#a46e45] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#8d5b35] transition-colors shadow-sm">
                        {event.buttonText} <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-20 w-12 h-12 bg-[#a46e45] rounded-tl-full rounded-br-full -rotate-12 pointer-events-none"></div>
                  </div>
                  
                  <div className="w-1/2 sm:w-[45%] h-full relative z-10">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              );
            }

            return null;
          })}
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
          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500 font-medium">Loading amazing products...</div>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 font-medium">No products found.</div>
          )}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <button className="border border-gray-300 rounded-full px-8 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
            View All Products
          </button>
        </div>
      </section>

    </>
  );
}
