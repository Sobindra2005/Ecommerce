import { CartItem } from "../components/CartItem";
import { OrderSummary } from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

export function ShoppingCart() {
    const { cart, updateCartItem } = useCart();
    
    const items = cart?.items || [];

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        updateCartItem(productId, Math.max(1, newQuantity));
    };

    const handleDelete = (productId: string) => {
        updateCartItem(productId, 0);
    };

    // Calculations
    const subTotal = items.reduce((sum, item) => sum + ((item.product.basePrice || item.product.price || 0) * item.quantity), 0);
    const discountPercent = 10;
    const discountAmount = subTotal * (discountPercent / 100);
    const deliveryFee = items.length > 0 ? 50.00 : 0;

    const formattedSubTotal = Math.round(subTotal);
    const formattedDiscountAmount = Math.round(discountAmount);
    const total = Math.round(subTotal - discountAmount + deliveryFee);

    return (
        <div className="min-h-screen text-gray-200 p-4 md:p-8 ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-100">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column - Cart Items */}
                    <div className="w-full border border-gray-800 rounded-3xl bg-gray-900 p-6 mb-6">
                        <div className="hidden md:flex items-center text-sm font-semibold text-gray-100 pb-4 border-b border-gray-800">
                            <div className="flex-1">Product Details</div>
                            <div className="w-[120px] text-center">Quantity</div>
                            <div className="w-[80px] text-center">Total</div>
                            <div className="w-[40px] text-right">Action</div>
                        </div>

                        <div className="flex flex-col">
                            {items.length > 0 ? (
                                items.map(item => (
                                    <CartItem
                                        key={item.product._id}
                                        image={item.product.images?.[0]?.url || item.product.thumbnail || 'https://via.placeholder.com/150'}
                                        title={item.product.name}
                                        subtitle={item.product.category || item.product.brand || 'Item'}
                                        price={item.product.basePrice || item.product.price || 0}
                                        quantity={item.quantity}
                                        onUpdateQuantity={(newQ: number) => handleUpdateQuantity(item.product._id, newQ)}
                                        onDelete={() => handleDelete(item.product._id)}
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
