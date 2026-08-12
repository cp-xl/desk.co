import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

// Dropdown of matching products shown under the navbar search input.
export default function SearchSuggestions({ items, onPick }) {
  return (
    <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-cream border border-charcoal/15 shadow-lg z-50">
      {items.length === 0 ? (
        <p className="px-4 py-3 text-[12px] text-charcoal/50">No matches on the list.</p>
      ) : (
        items.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.slug}`}
            onClick={onPick}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-charcoal/5 transition-colors"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden bg-charcoal/5">
              <Image src={p.image} alt={p.name} className="h-full w-full object-cover" fittingType="fill" />
            </div>
            <span className="text-[13px] leading-snug text-charcoal line-clamp-2 flex-1">{p.name}</span>
            <span className="font-ui text-[12px] text-charcoal/60 tabular-nums shrink-0">{p.priceDisplay}</span>
          </Link>
        ))
      )}
    </div>
  );
}