import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="font-display text-4xl tracking-label">
              DESCKO<span className="text-amber">.</span>
            </div>
            <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
              A short list of good tech. Bought, used, then listed — or not listed at all.
            </p>
            <p className="mt-6 text-[11px] tracking-label text-amber">
              Gear with personality, not aisle filler.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="text-cream/80 hover:text-amber transition-colors">Everything</Link></li>
              <li><Link to="/tech" className="text-cream/80 hover:text-amber transition-colors">Tech by type</Link></li>
              <li><Link to="/gifts" className="text-cream/80 hover:text-amber transition-colors">Gifts</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-cream/80 hover:text-amber transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-cream/80 hover:text-amber transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="text-cream/80 hover:text-amber transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-cream/80 hover:text-amber transition-colors">Returns</Link></li>
              <li><Link to="/privacy" className="text-cream/80 hover:text-amber transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-cream/80 hover:text-amber transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-label text-cream/40 mb-4">Elsewhere</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://www.instagram.com/descko" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-cream/80 hover:text-amber transition-colors">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@descko" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-cream/80 hover:text-amber transition-colors">
                  TikTok <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="mailto:hello@descko.com" className="text-cream/80 hover:text-amber transition-colors">
                  hello@descko.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-label text-cream/40">© {year} Descko — Australia</p>
          <p className="text-[11px] tracking-label text-cream/40">A drop, not a firehose.</p>
        </div>
      </div>
    </footer>
  );
}