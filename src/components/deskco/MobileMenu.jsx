import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Rendered into document.body: the header uses backdrop-blur, which would make
// it the containing block for a fixed-position drawer and clip it to the bar.
export default function MobileMenu({ links, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-charcoal/50 animate-fade-in" onClick={onClose} />
      <div className="absolute left-0 right-0 top-0 bg-cream shadow-2xl flex flex-col animate-sheet-down">
        <div className="flex items-center justify-between px-5 h-16 border-b border-charcoal/10">
          <span className="font-display text-xl tracking-label">MENU</span>
          <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col p-5">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={onClose}
              className="font-display text-3xl tracking-wide py-3 text-charcoal hover:text-maroon transition-colors border-b border-charcoal/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>,
    document.body,
  );
}