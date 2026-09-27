import React from 'react';
import { MARQUEE } from '@/lib/copy';

// Static numbered strip, replacing the old infinite scroll — a short list
// shouldn't look like it's scrolling forever.
export default function Marquee() {
  return (
    <div className="bg-charcoal py-8">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {MARQUEE.map((word, i) => (
            <span key={word} className="font-display text-lg sm:text-xl tracking-display text-cream/80">
              <span className="text-amber">{String(i + 1).padStart(2, '0')}</span> {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}