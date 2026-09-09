import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "../ProductCard";
import type { Product as UIProduct } from "../ProductCard";
import type { ProductDetails } from "../../api/productService";

interface ProductRecommendationsProps {
  recommendations: ProductDetails['youMayAlsoLike'];
}

export function ProductRecommendations({ recommendations }: ProductRecommendationsProps) {
  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[22px] font-extrabold text-gray-900">You May Also Like</h2>
        <Link to="/" className="text-[13px] font-bold text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-1">
          View All <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((rec) => {
            const uiRec: UIProduct = {
              id: rec.slug,
              name: rec.name,
              category: rec.category,
              price: rec.discountPercentage > 0 ? rec.basePrice * (1 - rec.discountPercentage / 100) : rec.basePrice,
              originalPrice: rec.discountPercentage > 0 ? rec.basePrice : undefined,
              rating: rec.averageRating,
              imageUrl: rec.thumbnail ?? "",
              discountBadge: rec.discountPercentage > 0 ? `${rec.discountPercentage}% OFF` : undefined
            };
            return <ProductCard key={uiRec.id} product={uiRec} />;
          })
        ) : (
           <div className="col-span-full text-gray-500">No recommendations available at the moment.</div>
        )}
      </div>
    </div>
  );
}

export function ProductRecommendationsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-end mb-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
