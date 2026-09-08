import { useState } from "react";
import { CartItem } from "../components/CartItem";
import { OrderSummary } from "../components/OrderSummary";

const initialItems = [
    {
        id: 1,
        title: 'Furniture Set',
        subtitle: 'Set : Colour: Coffee',
        price: 109.25,
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 2,
        title: 'Vintage Dining Set',
        subtitle: 'Set : Colour: Brown',
        price: 472.5,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1617325247661-675ab034a77d?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 3,
        title: 'Studio Chair',
        subtitle: 'Set : Colour: Deep Green',
        price: 85.285,
        quantity: 7,
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80'
    }
];

export function ShoppingCart() {
    const [items, setItems] = useState(initialItems);

    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Calculations
    const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountPercent = 10;
    const discountAmount = subTotal * (discountPercent / 100);
    const deliveryFee = items.length > 0 ? 50.00 : 0;

    // Format numbers to roughly match the screenshot's style
    const formattedSubTotal = Math.round(subTotal);
    const formattedDiscountAmount = Math.round(discountAmount);
    const total = Math.round(subTotal - discountAmount + deliveryFee);

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8 ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-900">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column - Cart Items */}
                    <div className="w-full border border-gray-200 rounded-3xl bg-white p-6 mb-6">

                        {/* Header Row (Desktop only) */}
                        <div className="hidden md:flex items-center text-sm font-semibold text-gray-900 pb-4 border-b border-gray-100">
                            <div className="flex-1">Product Code</div>
                            <div className="w-[120px] text-center">Quantity</div>
                            <div className="w-[80px] text-center">Total</div>
                            <div className="w-[40px] text-right">Action</div>
                        </div>

                        {/* Items List */}
                        <div className="flex flex-col">
                            {items.length > 0 ? (
                                items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        {...item}
                                        onUpdateQuantity={(newQ: number) => handleUpdateQuantity(item.id, newQ)}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-500">
                                    Your cart is empty.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0 sticky top-8">
                        <OrderSummary
                            subTotal={formattedSubTotal}
                            discountPercent={discountPercent}
                            discountAmount={formattedDiscountAmount}
                            deliveryFee={deliveryFee}
                            total={total}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}