import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useCart } from '@/lib/CartContext';

const FREE_SHIPPING = 80;

export default function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-display text-[44px] sm:text-[56px] leading-none text-charcoal">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-10 border-t border-charcoal/15 pt-10">
            <p className="font-display text-3xl text-charcoal">Empty.</p>
            <p className="mt-2 text-[14px] text-charcoal/60">Nothing chosen yet.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
            >
              Browse the shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <ul className="lg:col-span-7 border-t border-charcoal/15">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-6 border-b border-charcoal/15">
                  <div className="h-24 w-24 shrink-0 overflow-hidden bg-charcoal/5">
                    <Image src={item.image} alt={item.name} className="h-full w-full object-cover" fittingType="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[15px] text-charcoal">{item.name}</p>
                        {item.variant && item.variant !== 'Default' && (
                          <p className="mt-1 text-[11px] tracking-label text-maroon">{item.variant}</p>
                        )}
                      </div>
                      <p className="font-ui text-[13px] text-charcoal tabular-nums">
                        ${(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/20">
                        <button
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          className="p-2 text-charcoal hover:bg-charcoal/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 font-ui text-[13px] tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          className="p-2 text-charcoal hover:bg-charcoal/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-[11px] tracking-label text-charcoal/40 hover:text-maroon transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:col-span-5 lg:pl-6">
              <div className="border border-charcoal/15 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-label text-charcoal/50">Subtotal</span>
                  <span className="font-display text-3xl text-charcoal">${subtotal.toFixed(0)}</span>
                </div>
                <p className="mt-3 text-[12px] text-charcoal/60">
                  {remaining > 0 ? `$${remaining.toFixed(0)} from free shipping.` : 'Free shipping applied.'}
                </p>
                <a
                  href="https://www.descko.com/cart-page"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-amber text-charcoal py-4 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-center text-[11px] tracking-label text-charcoal/40">
                  Payment handled by our Wix store
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}