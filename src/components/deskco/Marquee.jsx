import React from 'react';
import { MARQUEE } from '@/lib/copy';

export default function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-charcoal py-4">
      <div className="flex whitespace-nowrap animate-marquee">
        {row.map((word, i) => (
          <span key={i} className="mx-6 font-display text-2xl tracking-label text-cream/80">
            {word}
            <span className="ml-6 text-amber">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}