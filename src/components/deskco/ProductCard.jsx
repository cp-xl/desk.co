import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block spring-lift">
      <div className="relative overflow-hidden bg-charcoal/5 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          fittingType="fill"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-amber text-charcoal text-[10px] tracking-label px-2 py-1">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-charcoal/85 text-cream text-[10px] tracking-label px-2 py-1">
            Sold out
          </span>
        )}
      </div>

      <div className="pt-3">
        {product.category && (
          <p className="text-[10px] tracking-label text-maroon">{product.category}</p>
        )}
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <p className="text-[14px] leading-snug text-charcoal group-hover:text-maroon transition-colors">
            {product.name}
          </p>
          <p className="font-ui text-[12px] text-charcoal/70 shrink-0 tabular-nums">{product.priceDisplay}</p>
        </div>
      </div>
    </Link>
  );
}