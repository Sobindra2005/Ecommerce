const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

interface OrderSummaryProps {
  subTotal: number;
  discountPercent: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({ subTotal, discountPercent, discountAmount, deliveryFee, total }: OrderSummaryProps) {
  return (
    <div className="border border-vogue-border rounded-vogue-panel p-6 bg-vogue-canvas flex flex-col h-full">
      <h2 className="text-lg font-semibold text-vogue-text mb-6">Order Summary</h2>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Discount voucher"
          className="flex-1 border border-vogue-border rounded-vogue-pill px-4 py-2 text-sm focus:outline-none focus:border-vogue-focus focus:ring-1 focus:ring-vogue-focus"
        />
        <button className="border border-vogue-border rounded-vogue-pill px-6 py-2 text-sm font-medium hover:bg-vogue-surface-subtle transition-colors cursor-pointer">
          Apply
        </button>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-vogue-text-muted">Sub Total</span>
          <span className="font-semibold text-vogue-text">{subTotal.toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-vogue-text-muted">Discount ({discountPercent}%)</span>
          <span className="font-semibold text-vogue-text">-{discountAmount.toLocaleString()}USD</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-vogue-text-muted">Delivery fee</span>
          <span className="font-semibold text-vogue-text">{deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-vogue-border-subtle flex justify-between items-center">
          <span className="font-medium text-vogue-text">Total</span>
          <span className="text-xl font-bold text-vogue-text">${total} USD</span>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-6 bg-vogue-surface-subtle/50 p-3 rounded-vogue-card text-xs text-vogue-text-muted">
        <div className="shrink-0 mt-0.5 text-vogue-text-subtle">
          <ShieldIcon />
        </div>
        <p>
          90 Day Limited Warranty against manufacturer's defects <a href="#" className="font-semibold underline decoration-vogue-border hover:text-vogue-action-hover">Details</a>
        </p>
      </div>

      <button className="w-full bg-vogue-action text-vogue-canvas rounded-vogue-pill py-4 font-medium hover:bg-vogue-dark-hover transition-colors cursor-pointer">
        Checkout Now
      </button>
    </div>
  );
}
