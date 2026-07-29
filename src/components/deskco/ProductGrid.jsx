import React from 'react';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

// Asymmetrical "Technical Gallery". Some cards span two columns for rhythm.
export default function ProductGrid({ products, title = 'The Catalog', kicker }) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            {kicker && (
              <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
                {kicker}
              </Reveal>
            )}
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[44px] leading-none text-charcoal">
                {title}
              </h2>
            </Reveal>
          </div>
          <Reveal variant="fade-up" delay={100} className="hidden sm:block text-right">
            <span className="text-[11px] tracking-label text-charcoal/40">
              {products.length} buddies
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              wide={i === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}