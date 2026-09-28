import  { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CartItem {
    product: {
        _id: string;
        name: string;
        price?: number;
        basePrice?: number;
        images?: { url: string }[];
        thumbnail?: string;
        category?: string;
        brand?: string;
    };
    quantity: number;
}

interface Cart {
    guestSessionId: string;
    items: CartItem[];
}

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateCartItem: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

const API_URL = 'http://localhost:5000/api/v1/cart';

const fetchOptions: RequestInit = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        try {
            const response = await fetch(API_URL, fetchOptions);
            const result = await response.json();
            if (result.success) {
                setCart(result.data);
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const addToCart = async (productId: string, quantity = 1) => {
        try {
            const response = await fetch(API_URL, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ productId, quantity })
            });
            const result = await response.json();
            if (result.success) {
                setCart(result.data);
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    const updateCartItem = async (productId: string, quantity: number) => {
        try {
            const response = await fetch(API_URL, {
                ...fetchOptions,
                method: 'PUT',
                body: JSON.stringify({ productId, quantity })
            });
            const result = await response.json();
            if (result.success) {
                setCart(result.data);
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
