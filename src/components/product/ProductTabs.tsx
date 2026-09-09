import { useState } from "react";
import type { ProductDetails } from "../../api/productService";

interface ProductTabsProps {
  product: ProductDetails;
}

const TABS = ["Details", "Materials", "Size & Fit", "Shipping & Returns"];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div className="flex flex-col md:flex-row gap-12 sm:gap-20 mb-20 max-h-100">
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
  );
}

export function ProductTabsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-12 sm:gap-20 mb-20 max-h-100 animate-pulse">
      <div className="md:w-[45%]">
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
             <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
          ))}
        </div>
      </div>
      <div className="md:w-[55%] rounded-2xl bg-gray-200 h-64 md:h-full min-h-[300px]"></div>
    </div>
  );
}
