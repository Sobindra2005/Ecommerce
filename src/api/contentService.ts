import api from './axiosInstance';

export interface HeroSlide {
    _id: string;
    image: string;
    tagline: string;
    title: string;
    description: string;
    handwritten: string;
    isActive: boolean;
    order: number;
}

export interface EventBanner {
    _id: string;
    type: 'clearance' | 'collection';
    tagline: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    badgePrimaryText?: string;
    badgeSecondaryText?: string;
    badgeTertiaryText?: string;
    isActive: boolean;
    order: number;
}

export interface HomeContentDetails {
    _id: string;
    heroSlides: HeroSlide[];
    events: EventBanner[];
}

export interface HomeContentResponse {
    statusCode: number;
    data: HomeContentDetails;
    message: string;
    success: boolean;
}

export const getHomeContent = async (): Promise<HomeContentResponse> => {
    const response = await api.get('/content/home');
    return response.data;
};
