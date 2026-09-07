const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

export function OrderSummary({ subTotal, discountPercent, discountAmount, deliveryFee, total }) {
  return (
    <div className="border border-gray-200 rounded-3xl p-6 bg-white flex flex-col h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Discount voucher"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
        <button className="border border-gray-300 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
          Apply
        </button>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Sub Total</span>
          <span className="font-semibold text-gray-900">{subTotal.toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Discount ({discountPercent}%)</span>
          <span className="font-semibold text-gray-900">-{discountAmount.toLocaleString()}USD</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Delivery fee</span>
          <span className="font-semibold text-gray-900">{deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-medium text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${total} USD</span>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-6 bg-gray-50/50 p-3 rounded-xl text-xs text-gray-600">
        <div className="shrink-0 mt-0.5 text-gray-400">
          <ShieldIcon />
        </div>
        <p>
          90 Day Limited Warranty against manufacturer's defects <a href="#" className="font-semibold underline decoration-gray-300 hover:text-black">Details</a>
        </p>
      </div>

      <button className="w-full bg-black text-white rounded-full py-4 font-medium hover:bg-gray-800 transition-colors cursor-pointer">
        Checkout Now
      </button>
    </div>
  );
}
