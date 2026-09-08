const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

interface CartItemProps {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onDelete: () => void;
}

export function CartItem({ image, title, subtitle, price, quantity, onUpdateQuantity, onDelete }: CartItemProps) {
  return (
    <div className="flex items-center py-6 border-b border-gray-100 last:border-b-0 gap-4">
      {/* Product Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center justify-center min-w-[120px] border border-gray-200 rounded-full h-8 px-1">
        <button
          onClick={() => onUpdateQuantity(quantity - 1)}
          disabled={quantity <= 1}
          className="p-1 text-gray-500 hover:text-black disabled:opacity-50 transition-colors cursor-pointer"
        >
          <MinusIcon />
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(quantity + 1)}
          className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Price */}
      <div className="min-w-[80px] text-center font-semibold text-gray-900">
        ${Math.round(price * quantity)}
      </div>

      {/* Action */}
      <div className="min-w-[40px] flex justify-end">
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-50 cursor-pointer"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
