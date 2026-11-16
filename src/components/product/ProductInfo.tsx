import { useState, useEffect } from "react";
import { Star, ShoppingBag, Heart, Truck, RefreshCw, ShieldCheck, ChevronDown } from "lucide-react";
import type { ProductDetails } from "../../api/productService";

interface ProductInfoProps {
  product: ProductDetails;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url || "");
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const currentPrice = product.discountPercentage > 0 
      ? product.basePrice * (1 - product.discountPercentage / 100) 
      : product.basePrice;

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16 sm:mb-24">
      {/* Images Section */}
      <div className="flex gap-4 lg:w-[55%] sm:h-162.5">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img.url)}
              className={`border-2 rounded-vogue-control overflow-hidden aspect-4/5 ${selectedImage === img.url ? 'border-vogue-action' : 'border-vogue-border'}`}
            >
              <img src={img.url} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
          <button className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 border border-vogue-border rounded-vogue-pill text-vogue-text-muted hover:bg-vogue-surface-subtle mt-2 mx-auto shadow-vogue-soft">
            <ChevronDown size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main Image */}
        <div className="flex-1 min-w-0 min-h-0 relative h-full">
          <img src={selectedImage} alt="Product" className="w-full h-full object-cover object-top rounded-vogue-card bg-vogue-media" />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col lg:w-[45%] pt-2">
        <div className="mb-4">
          <span className="bg-vogue-neutral text-vogue-text text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
            {product.brand}
          </span>
        </div>

        <h1 className="text-3xl sm:text-vogue-title font-bold text-vogue-text leading-[1.15] mb-3 tracking-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={15} className="fill-vogue-action text-vogue-action" />
            ))}
          </div>
          <span className="text-[14px] font-medium text-vogue-text-muted">{product.averageRating.toFixed(1)} ({product.numberOfReviews} reviews)</span>
        </div>

        <div className="flex items-end gap-3 mb-6">
          <span className="text-vogue-price font-bold text-vogue-text leading-none">${currentPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-[16px] text-vogue-text-subtle line-through font-medium mb-1">${product.basePrice.toFixed(2)}</span>
              <span className="bg-vogue-action text-vogue-canvas text-[11px] font-bold px-2.5 py-1 rounded mb-1.5">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>

        <p className="text-vogue-text-muted text-[15px] leading-relaxed mb-8 sm:w-[85%]">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="mb-8 mt-2">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-[14px] text-vogue-text">Size: <span className="font-medium ml-1">{selectedSize}</span></span>
            <button className="text-vogue-text-muted text-[13px] font-medium flex items-center gap-1.5 hover:text-vogue-action-hover transition-colors underline underline-offset-4 decoration-vogue-border">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H2.5" /><path d="M21.5 5H2.5" /><path d="M21.5 19H2.5" /><path d="M12 22V2" /><path d="M7 22V2" /><path d="M17 22V2" /></svg>
              Size Guide
            </button>
          </div>
          <div className="flex gap-2.5">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-vogue-control h-12 flex items-center justify-center rounded-vogue-control border font-semibold text-[13px] transition-colors ${selectedSize === size
                    ? "bg-vogue-action text-vogue-canvas border-vogue-action"
                    : "bg-vogue-canvas text-vogue-text border-vogue-border hover:border-vogue-action"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-10">
          <button className="flex-1 bg-vogue-action text-vogue-canvas h-vogue-control rounded-vogue-card font-bold flex items-center justify-center gap-2.5 hover:bg-vogue-action-hover transition-colors text-[15px]">
            <ShoppingBag size={18} strokeWidth={2.5} />
            Add to Cart
          </button>
          <button className="w-vogue-control h-vogue-control flex items-center justify-center border border-vogue-border rounded-vogue-card text-vogue-text hover:border-vogue-action transition-colors shrink-0">
            <Heart size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Features (Shipping/Returns) */}
        <div className="flex justify-between border-t border-vogue-border-subtle pt-6">
          <div className="flex gap-3 items-start">
            <Truck size={20} className="text-vogue-text-muted shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-vogue-text mb-0.5">Free Shipping</span>
              <span className="text-[11px] text-vogue-text-muted leading-tight">On orders over $99</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <RefreshCw size={20} className="text-vogue-text-muted shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-vogue-text mb-0.5">Easy Returns</span>
              <span className="text-[11px] text-vogue-text-muted leading-tight">30-day return policy</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <ShieldCheck size={20} className="text-vogue-text-muted shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-vogue-text mb-0.5">Secure Payment</span>
              <span className="text-[11px] text-vogue-text-muted leading-tight">100% secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16 sm:mb-24 animate-pulse">
      {/* Images Section */}
      <div className="flex gap-4 lg:w-[55%] sm:h-162.5">
        <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-vogue-surface-skeleton rounded-vogue-control aspect-4/5"></div>
          ))}
        </div>
        <div className="flex-1 rounded-vogue-card bg-vogue-surface-skeleton h-96 sm:h-full"></div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col lg:w-[45%] pt-2">
        <div className="mb-4">
          <div className="h-6 bg-vogue-surface-skeleton rounded w-20"></div>
        </div>
        <div className="h-10 sm:h-12 bg-vogue-surface-skeleton rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-32 mb-6"></div>
        <div className="h-8 bg-vogue-surface-skeleton rounded w-24 mb-6"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-full mb-2"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-full mb-2"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-5/6 mb-8"></div>
        
        <div className="h-6 bg-vogue-surface-skeleton rounded w-32 mb-3 mt-2"></div>
        <div className="flex gap-2.5 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-vogue-control h-12 bg-vogue-surface-skeleton rounded-vogue-control"></div>
          ))}
        </div>

        <div className="flex gap-3 mb-10">
          <div className="flex-1 bg-vogue-surface-skeleton h-vogue-control rounded-vogue-card"></div>
          <div className="w-vogue-control h-vogue-control bg-vogue-surface-skeleton rounded-vogue-card"></div>
        </div>

        <div className="flex justify-between border-t border-vogue-border-subtle pt-6">
          <div className="h-10 bg-vogue-surface-skeleton rounded w-1/4"></div>
          <div className="h-10 bg-vogue-surface-skeleton rounded w-1/4"></div>
          <div className="h-10 bg-vogue-surface-skeleton rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
