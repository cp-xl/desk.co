import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const LINKS = [
  { label: 'Shop', to: '/shop' },
  { label: 'Tech', to: '/tech' },
  { label: 'Gifts', to: '/gifts' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-charcoal/10">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            className="lg:hidden p-2 -ml-2 text-charcoal"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="font-display text-2xl sm:text-3xl tracking-label text-charcoal leading-none">
            DESCKO<span className="text-maroon">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[12px] tracking-label text-charcoal/80 hover:text-maroon transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={openCart}
            className="relative p-2 -mr-2 text-charcoal hover:text-maroon transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-amber text-charcoal text-[10px] font-semibold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-cream shadow-2xl flex flex-col animate-drawer-in">
            <div className="flex items-center justify-between px-5 h-16 border-b border-charcoal/10">
              <span className="font-display text-xl tracking-label">MENU</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-5">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl tracking-wide py-3 text-charcoal hover:text-maroon transition-colors border-b border-charcoal/10"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}