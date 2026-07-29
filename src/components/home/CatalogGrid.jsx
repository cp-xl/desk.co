import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/deskco/Reveal';

// Editorial catalogue tile: name and price sit over the image, index number below.
function CatalogTile({ product, index, feature }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block spring-lift ${feature ? 'sm:col-span-2 sm:row-span-2' : ''}`}
    >
      <div className={`relative overflow-hidden bg-charcoal/5 ${feature ? 'aspect-square' : 'aspect-[4/5]'}`}>
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          fittingType="fill"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
          <p className="font-display text-[15px] sm:text-[18px] leading-tight text-charcoal">
            {product.name}
          </p>
          <p className="text-[12px] text-charcoal/70 tabular-nums shrink-0">{product.priceDisplay}</p>
        </div>
        {!product.inStock && (
          <span className="absolute bottom-3 left-3 bg-charcoal/85 text-cream text-[10px] tracking-label px-2 py-1">
            Sold out
          </span>
        )}
      </div>
      <p className="mt-2 text-[10px] tracking-label text-charcoal/35 text-right">
        No. {String(index + 1).padStart(2, '0')}
      </p>
    </Link>
  );
}

export default function CatalogGrid({ products, loading }) {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
              The full lineup
            </Reveal>
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[46px] leading-none text-charcoal">
                The catalogue
              </h2>
            </Reveal>
          </div>
          <Link to="/shop" className="text-[11px] tracking-label text-charcoal/50 hover:text-maroon transition-colors">
            {loading ? 'Loading' : `${products.length} on the list →`}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-charcoal/8 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-[14px] text-charcoal/50">Nothing in the store yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto">
            {products.slice(0, 9).map((p, i) => (
              <CatalogTile key={p.id} product={p} index={i} feature={i === 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}