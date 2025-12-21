import { Hero } from "@repo/ui/Hero";
import { FlashSaleCard } from "@repo/ui/FlashSaleCard";
import { PopularCategories } from "@repo/ui/PopularCategories";
import { ProductGrid } from "@repo/ui/ProductGrid";
import { sampleProducts } from "@/data/products";
import { FeaturedProducts } from "@repo/ui/featuredProduct";

export default function Home() {
  return (
      <main>
        <Hero />
        <PopularCategories />
        <FlashSaleCard />
        <FeaturedProducts />
        <ProductGrid products={sampleProducts} />
      </main>
  );
}