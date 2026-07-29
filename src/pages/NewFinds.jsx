import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/deskco/ProductCard';
import Marquee from '@/components/deskco/Marquee';
import Reveal from '@/components/deskco/Reveal';
import { fetchProducts } from '@/lib/wixProducts';

export default function NewFinds() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-16">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          Just landed
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[60px] leading-none text-charcoal">New finds</h1>
        </Reveal>
        <p className="mt-4 text-[15px] text-charcoal/70 max-w-lg">
          The newest eight. Small batches, so this page moves slowly on purpose.
        </p>

        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-charcoal/8 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Marquee />
    </div>
  );
}