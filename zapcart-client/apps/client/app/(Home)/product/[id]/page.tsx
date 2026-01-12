import { notFound } from "next/navigation";
import { sampleProducts } from "@/data/products";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { ReviewsSection } from "@/components/ReviewsSection";
import { MainContainer } from "@/components/wrapper";
import { getQueryClient } from "../../../../../../packages/ui/src/get-query-client";
import { reviewsApi, systemSettingsApi } from "@/utils/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = sampleProducts.find((p) => p.id === id);

    if (!product) {
        return notFound();
    }
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['systemSettings'],
        queryFn: systemSettingsApi.getSettings
    })

    await queryClient.prefetchQuery({
        queryKey: ['reviews', id],
        queryFn: () => reviewsApi.getReviewsByProductId(id)
    })

    const data = queryClient.getQueryData(['systemSettings'])
    console.log('SERVER PREFETCH DATA:', data)

    const images = (product.images && product.images.filter((img): img is string => typeof img === "string")) ||
        [product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail].filter((img): img is string => typeof img === "string");

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MainContainer className="max-w-7xl">
                <div className="py-8 md:py-12">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left: Image Gallery */}
                        <ProductImageGallery images={images} />

                        {/* Right: Product Info */}
                        <ProductInfo product={product} />
                    </div>

                    {/* Reviews Section */}
                    {product.reviews && product.reviews.length > 0 && (
                        <ReviewsSection
                            rating={product.averageRating}
                            reviewCount={product.reviewCount}
                            reviews={product.reviews}
                        />
                    )}
                </div>
            </MainContainer>
        </HydrationBoundary>
    );
}
