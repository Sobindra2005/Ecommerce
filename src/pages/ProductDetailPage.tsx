import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/productService";
import type { ProductDetails } from "../api/productService";
import { ProductInfo, ProductInfoSkeleton } from "../components/product/ProductInfo";
import { ProductTabs, ProductTabsSkeleton } from "../components/product/ProductTabs";
import { ProductRecommendations, ProductRecommendationsSkeleton } from "../components/product/ProductRecommendations";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>(); // Using ID param which acts as slug
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getProductDetails(id);
        if (response.success) {
          setProduct(response.data);
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

  if (error) return <div className="text-center py-32 text-red-500 font-medium text-lg">{error}</div>;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading || !product ? (
          <>
            <ProductInfoSkeleton />
            <ProductTabsSkeleton />
            <ProductRecommendationsSkeleton />
          </>
        ) : (
          <>
            <ProductInfo product={product} />
            <ProductTabs product={product} />
            <ProductRecommendations recommendations={product.youMayAlsoLike} />
          </>
        )}
      </main>
    </>
  );
}
