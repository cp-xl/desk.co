import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { createWixCheckoutUrl } from '@/lib/checkout';

export default function CheckoutButton({ items }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await createWixCheckoutUrl(items);
      window.location.href = url;
    } catch (e) {
      setError('Could not reach checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full bg-amber text-charcoal py-4 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors disabled:opacity-70"
      >
        {loading ? (
          <>
            Starting checkout <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Checkout <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error && <p className="mt-2 text-[12px] text-maroon text-center">{error}</p>}
    </div>
  );
}