
import { useState, useEffect } from "react";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import type { Product as UIProduct } from "../components/ProductCard";
import { ArrowRight, ArrowLeft, Leaf, Truck, RefreshCw } from "lucide-react";
import { EventBannerCard, EventBannerSkeleton } from "../components/EventBannerCard";
import { HeroSection, HeroSkeleton } from "../components/HeroSection";
import { getProducts } from "../api/productService";
import { getHomeContent } from "../api/contentService";
import type { HeroSlide, EventBanner } from "../api/contentService";

export function HomePage() {
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

  return (
    <>
      {loading ? (
        <HeroSkeleton />
      ) : heroSlides.length > 0 ? (
        <HeroSection slides={heroSlides} />
      ) : null}

      {/* Main Events / Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <EventBannerSkeleton key={i} />
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventBannerCard key={event._id} event={event} />
            ))
          ) : null}
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
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
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
