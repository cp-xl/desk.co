import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import MobileMenu from '@/components/deskco/MobileMenu';
import SearchBox from '@/components/deskco/SearchBox';

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

          <Link to="/" className="wordmark text-xl sm:text-2xl text-charcoal leading-none">
            DESCKO<span className="text-vermilion">.</span>
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

          <div className="flex items-center gap-1">
          <SearchBox />
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
      </div>

      {open && <MobileMenu links={LINKS} onClose={() => setOpen(false)} />}
    </header>
  );
}