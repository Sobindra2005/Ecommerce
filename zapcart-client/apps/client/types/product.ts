export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title?: string;
    comment: string;
    date: string;
}

export interface ShippingInfo {
    discount: string;
    packageType: string;
    deliveryTime: string;
    estimatedDelivery: string;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
    unit: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    parent: string | null;
    ancestors: string[];
    level: number;
    image: string;
    icon: string;
    color: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    isActive: boolean;
    displayOrder: number;
    productCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isRoot: boolean;
    id: string;
}

export interface IProductVariant {
  sku: string;
  size?: string;
  color?: string;
  material?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
}

export interface Product {
    id: string;
    _id?: string;
    name: string;
    slug?: string;
    description: string;
    shortDescription?: string;
    
    basePrice: number;
    compareAtPrice?: number;
    images?: string[];
    thumbnail?: string;
    averageRating: number;
    reviewCount: number;
    reviews?: Review[];
    category: string | Category;
    subcategories?: string[] | Category[];
    brand?: string;
    videoUrl?: string;
    tags?: string[];
    shippingInfo?: ShippingInfo;
    dimensions?: Dimensions;
    specifications?: Record<string, string>;
    features?: string[];
    hasVariants?: boolean;
    variants?: IProductVariant[];
    totalStock?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: number;
    status?: string;
    visibility?: string;
    publishedAt?: string;
    viewCount?: number;
    salesCount?: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    inStock?: boolean;
    isLowStock?: boolean;
    discountPercentage?: number;
}
