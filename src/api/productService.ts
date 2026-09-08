import api from './axiosInstance';

export interface ProductListParams {
    page?: number;
    limit?: number;
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
}

export interface ProductSummary {
    _id: string;
    name: string;
    slug: string;
    brand: string;
    basePrice: number;
    discountPercentage: number;
    category: string;
    averageRating: number;
    numberOfReviews: number;
    thumbnail: string | null;
}

export interface PaginatedResponse<T> {
    statusCode: number;
    data: {
        products: T[];
        page: number;
        pages: number;
        total: number;
    };
    message: string;
    success: boolean;
}

export const getProducts = async (params?: ProductListParams): Promise<PaginatedResponse<ProductSummary>> => {
    const response = await api.get('/products', { params });
    return response.data;
};

export interface ProductDetails extends Omit<ProductSummary, 'thumbnail'> {
    images: { _id?: string; url: string; altText?: string }[];
    description: string;
    variants: any[];
    specifications: Record<string, string>;
    youMayAlsoLike: ProductSummary[];
}

export interface SingleProductResponse {
    statusCode: number;
    data: ProductDetails;
    message: string;
    success: boolean;
}

export const getProductDetails = async (slug: string): Promise<SingleProductResponse> => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
};

export const getRecommendedProducts = async (slug: string) => {
    const response = await api.get(`/products/recommended/${slug}`);
    return response.data;
};
