import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Image } from '@/components/ui/image';

export default function CartDrawer() {
  const { items, isOpen, subtotal, closeCart, removeItem, setQuantity } = useCart();

  if (!isOpen) return null;

  const freeShipThreshold = 80;
  const remaining = Math.max(0, freeShipThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShipThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] animate-fade-in"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[42%] max-w-md bg-cream flex flex-col animate-drawer-in">
        {/* header */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-16 border-b border-charcoal/10">
          <span className="font-display text-xl tracking-label text-charcoal">YOUR CART</span>
          <button onClick={closeCart} aria-label="Close cart" className="p-2 -mr-2 text-charcoal hover:text-maroon transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* shipping progress */}
        {items.length > 0 && (
          <div className="px-5 sm:px-6 py-4 border-b border-charcoal/10">
            <p className="text-[11px] tracking-label text-charcoal/60">
              {remaining > 0
                ? `$${remaining.toFixed(0)} from free shipping`
                : 'You have free shipping'}
            </p>
            <div className="mt-2 h-1 w-full bg-charcoal/10 overflow-hidden">
              <div className="h-full bg-amber transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <p className="font-display text-2xl tracking-wide text-charcoal">Nothing here yet</p>
              <p className="mt-2 text-[13px] text-charcoal/50 leading-relaxed">
                The list is short. Pick something off it.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 bg-charcoal text-cream px-6 py-3 text-[12px] tracking-label hover:bg-maroon transition-colors"
              >
                Browse the shop <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-charcoal/10">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 px-5 sm:px-6 py-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden bg-charcoal/5">
                    <Image src={item.image} alt={item.name} className="h-full w-full object-cover" fittingType="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-xl leading-none text-charcoal">{item.name}</p>
                        <p className="mt-1 text-[11px] tracking-label text-maroon">{item.variant}</p>
                      </div>
                      <p className="text-[13px] text-charcoal">${(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/20">
                        <button
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          className="p-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-[13px] tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          className="p-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-[11px] tracking-label text-charcoal/40 hover:text-maroon transition-colors underline-offset-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-charcoal/10 px-5 sm:px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] tracking-label text-charcoal/50">Subtotal</span>
              <span className="font-display text-2xl text-charcoal">${subtotal.toFixed(0)}</span>
            </div>
            <Link
              to="/cart"
              onClick={closeCart}
              className="w-full bg-amber text-charcoal py-4 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors flex items-center justify-center gap-2"
            >
              View cart &amp; checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-[11px] tracking-label text-charcoal/40">
              Shipping &amp; taxes at checkout
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}