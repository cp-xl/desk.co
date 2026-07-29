import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

// Asymmetrical grid card. `wide` spans two columns on desktop.
export default function ProductCard({ product, wide = false, index = 0 }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block ${wide ? 'lg:col-span-2' : ''} spring-lift`}
    >
      <div className="relative overflow-hidden bg-charcoal/5 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.17,0.67,0.83,0.67)] group-hover:scale-[1.05]"
          fittingType="fill"
        />

        {/* badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-amber text-charcoal text-[10px] tracking-label px-2.5 py-1">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-4 left-4 bg-charcoal/80 text-cream text-[10px] tracking-label px-2.5 py-1">
            Sold out
          </span>
        )}

        {/* corner-pinned metadata */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-4">
          <span className="font-display text-2xl tracking-wide text-charcoal drop-shadow-[0_1px_2px_rgba(242,237,227,0.6)]">
            {product.name}
          </span>
          <span className="text-[12px] tracking-label text-charcoal drop-shadow-[0_1px_2px_rgba(242,237,227,0.6)]">
            ${product.price}
          </span>
        </div>
      </div>

      {/* personality trait pinned below */}
      <div className="flex items-baseline justify-between pt-3 pb-1 border-t border-charcoal/10 mt-0">
        <span className="text-[12px] text-maroon tracking-label">{product.personality}</span>
        <span className="text-[11px] tracking-label text-charcoal/40">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
    </Link>
  );
}