import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';
import { fetchProducts } from '@/lib/wixProducts';

const GENERAL = ['Audio', 'Wearables', 'Gaming', 'Rigs & Mounts', 'Storage', 'Odd Ones'];

function Group({ title, items }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-charcoal/10 py-12">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <h2 className="font-display text-[30px] sm:text-[38px] leading-none text-charcoal mb-8">{title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Tech() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const power = products.filter((p) => p.category === 'Power');

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-16">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          By type
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[60px] leading-none text-charcoal">Tech</h1>
        </Reveal>
        <p className="mt-4 text-[15px] text-charcoal/70 max-w-lg">
          The gear, grouped. Power and solar sit on their own at the bottom.
        </p>
      </div>

      {loading ? (
        <div className="mx-auto max-w-focus px-4 sm:px-6 pb-20 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-charcoal/8 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {GENERAL.map((c) => (
            <Group key={c} title={c} items={products.filter((p) => p.category === c)} />
          ))}
          {power.length > 0 && (
            <div className="bg-charcoal/[0.04]">
              <Group title="Power & solar" items={power} />
            </div>
          )}
        </>
      )}
    </div>
  );
}