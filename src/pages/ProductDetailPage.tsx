import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import type { Product as UIProduct } from "../components/ProductCard";
import { getProductDetails } from "../api/productService";
import type { ProductDetails } from "../api/productService";

const TABS = ["Details", "Materials", "Size & Fit", "Shipping & Returns"];


export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>(); // Using ID param which acts as slug
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("Details");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getProductDetails(id);
        if (response.success) {
          setProduct(response.data);
          if (response.data.images && response.data.images.length > 0) {
             setSelectedImage(response.data.images[0].url);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-32 text-gray-500 font-medium text-lg animate-pulse">Loading product details...</div>;
  if (error || !product) return <div className="text-center py-32 text-red-500 font-medium text-lg">{error || "Product not found"}</div>;

  const currentPrice = product.discountPercentage > 0 
      ? product.basePrice * (1 - product.discountPercentage / 100) 
      : product.basePrice;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Top Section - Product Details */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16 sm:mb-24">

          {/* Images Section */}
          <div className="flex gap-4 lg:w-[55%] sm:h-162.5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img.url)}
                  className={`border-[1.5px]  rounded-lg overflow-hidden aspect-4/5 ${selectedImage === img.url ? 'border-black' : 'border-gray-200'}`}
                >
                  <img src={img.url} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
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
                {product.brand}
              </span>
            </div>

            <h1 className="text-3xl sm:text-[42px] font-bold text-gray-900 leading-[1.15] mb-3 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={15} className="fill-black text-black" />
                ))}
              </div>
              <span className="text-[14px] font-medium text-gray-600">{product.averageRating.toFixed(1)} ({product.numberOfReviews} reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-[32px] font-bold text-gray-900 leading-none">${currentPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-[16px] text-gray-400 line-through font-medium mb-1">${product.basePrice.toFixed(2)}</span>
                  <span className="bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded mb-1.5">{product.discountPercentage}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-[15px] leading-relaxed mb-8 sm:w-[85%]">
              {product.description}
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
                  {product.description}
                </p>
                <ul className="space-y-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, value], idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[14px] text-gray-800 font-medium">
                      <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></div>
                      <span className="font-bold">{key}:</span> {value as string}
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
              src={product.images.length > 1 ? product.images[1].url : product.images[0].url}
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
            {product.youMayAlsoLike && product.youMayAlsoLike.length > 0 ? (
              product.youMayAlsoLike.map((rec) => {
                const uiRec: UIProduct = {
                  id: rec.slug,
                  name: rec.name,
                  category: rec.category,
                  price: rec.discountPercentage > 0 ? rec.basePrice * (1 - rec.discountPercentage / 100) : rec.basePrice,
                  originalPrice: rec.discountPercentage > 0 ? rec.basePrice : undefined,
                  rating: rec.averageRating,
                  imageUrl: rec.thumbnail,
                  discountBadge: rec.discountPercentage > 0 ? `${rec.discountPercentage}% OFF` : undefined
                };
                return <ProductCard key={uiRec.id} product={uiRec} />;
              })
            ) : (
               <div className="col-span-full text-gray-500">No recommendations available at the moment.</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
