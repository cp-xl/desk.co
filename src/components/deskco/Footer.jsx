import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-display text-4xl tracking-label">
              DESK<span className="text-amber">.</span>CO
            </div>
            <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
              Objects with personality for desks and workspaces. Considered, specific,
              built to stay.
            </p>
            <p className="mt-6 text-[11px] tracking-label text-amber">Your desk deserves better company.</p>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/collection" className="text-cream/80 hover:text-amber transition-colors">All buddies</Link></li>
              <li><Link to="/collection?filter=thinker" className="text-cream/80 hover:text-amber transition-colors">The Thinker</Link></li>
              <li><Link to="/collection?filter=chaotic" className="text-cream/80 hover:text-amber transition-colors">The Chaotic</Link></li>
              <li><Link to="/collection?filter=minimalist" className="text-cream/80 hover:text-amber transition-colors">The Minimalist</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shipping" className="text-cream/80 hover:text-amber transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-cream/80 hover:text-amber transition-colors">Returns</Link></li>
              <li><Link to="/privacy" className="text-cream/80 hover:text-amber transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-cream/80 hover:text-amber transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Elsewhere</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-cream/80 hover:text-amber transition-colors">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-cream/80 hover:text-amber transition-colors">
                  TikTok <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-label text-cream/40">© {year} DESK.CO — Melbourne, AU</p>
          <p className="text-[11px] tracking-label text-cream/40">Built for desks, not dropshipping.</p>
        </div>
      </div>
    </footer>
  );
}