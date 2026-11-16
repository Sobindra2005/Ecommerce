import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  discountBadge?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group bg-vogue-canvas p-3 rounded-vogue-card shadow-vogue-soft border border-vogue-border-subtle flex flex-col w-full cursor-pointer hover:shadow-vogue-card transition-shadow duration-300 block">
      {/* Image Container */}
      <div className="relative bg-vogue-surface rounded-vogue-card overflow-hidden aspect-[4/5] mb-4">
        {/* Discount Badge */}
        {product.discountBadge && (
          <div className="absolute top-3 left-3 bg-vogue-success px-3 py-1 rounded-vogue-pill z-10">
            <span className="text-vogue-success-ink font-bold text-xs tracking-wide">
              {product.discountBadge}
            </span>
          </div>
        )}

        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:opacity-100 md:group-hover:opacity-100">

          <button className="bg-vogue-canvas p-2 rounded-vogue-pill shadow-vogue-control text-vogue-text-muted hover:text-vogue-action-hover transition-colors flex items-center justify-center">
            <ShoppingBag size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1 pb-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-medium text-vogue-text-muted text-[13px]">{product.category}</span>
          <div className="flex items-center gap-1 font-bold text-vogue-text text-sm">
            <Star size={14} className="fill-vogue-rating text-vogue-rating" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        <h3 className="font-bold text-vogue-text text-vogue-body leading-tight mb-2.5">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="font-extrabold text-vogue-text text-vogue-body">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="font-medium text-vogue-text-subtle line-through text-[14px]">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-vogue-canvas p-3 rounded-vogue-card shadow-vogue-soft border border-vogue-border-subtle flex flex-col w-full animate-pulse">
      {/* Image Container */}
      <div className="relative bg-vogue-surface-skeleton rounded-vogue-card overflow-hidden aspect-[4/5] mb-4"></div>

      {/* Product Info */}
      <div className="flex flex-col px-1 pb-1">
        <div className="flex justify-between items-center mb-2">
          {/* Category */}
          <div className="h-3.5 bg-vogue-surface-skeleton rounded w-16"></div>
          {/* Rating */}
          <div className="h-3.5 bg-vogue-surface-skeleton rounded w-10"></div>
        </div>

        {/* Title */}
        <div className="h-4 bg-vogue-surface-skeleton rounded w-3/4 mb-1.5"></div>

        {/* Price */}
        <div className="h-4 bg-vogue-surface-skeleton rounded w-1/2 mb-3"></div>

      </div>
    </div>
  );
}
