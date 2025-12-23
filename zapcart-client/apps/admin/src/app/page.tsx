"use client";

import { Header } from "@/components/Header";
import {
  Filter,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    category: "Women Cloths",
    price: 79.80,
    stock: 79,
    status: "Scheduled",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    name: "Shirt",
    category: "Man Cloths",
    price: 76.89,
    stock: 86,
    status: "Active",
    image: "https://images.unsplash.com/photo-1596755094514-f87034a264c6?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    name: "Pant",
    category: "Kid Cloths",
    price: 86.65,
    stock: 74,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 4,
    name: "Sweater",
    category: "Man Cloths",
    price: 56.07,
    stock: 69,
    status: "Active",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 5,
    name: "Sweater",
    category: "Man Cloths",
    price: 56.07,
    stock: 69,
    status: "Scheduled",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 6,
    name: "Light Jacket",
    category: "Women Cloths",
    price: 36.00,
    stock: 65,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 7,
    name: "Half Shirt",
    category: "Man Cloths",
    price: 46.78,
    stock: 58,
    status: "Active",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 8,
    name: "Half Shirt",
    category: "Sweater",
    price: 46.78,
    stock: 58,
    status: "Active",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-600 border-green-100";
    case "Scheduled":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "Draft":
      return "bg-orange-50 text-orange-600 border-orange-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Products" />

      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Products list</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                See All
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                <Plus className="h-4 w-4" strokeWidth={3} />
                Add Product
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/30">
                  <th className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </th>
                  <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 font-medium">{product.category}</td>
                    <td className="px-3 py-4 text-sm text-gray-900 font-bold">${product.price.toFixed(2)}</td>
                    <td className="px-3 py-4 text-sm text-gray-500 font-medium">{product.stock}</td>
                    <td className="px-3 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                        getStatusStyles(product.status)
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary text-sm font-bold hover:underline">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors",
                    page === 1 ? "bg-primary/5 text-primary border border-primary/10" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
