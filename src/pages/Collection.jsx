import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '@/lib/wixProducts';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.blurb || '').toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="bg-cream min-h-screen">
      {/* header */}
      <section className="border-b border-charcoal/10 pt-12 sm:pt-16 pb-10">
        <div className="mx-auto max-w-focus px-4 sm:px-6">
          <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-4">
            The full catalog
          </Reveal>
          <Reveal variant="fade-up">
            <h1 className="font-display text-[44px] sm:text-[60px] leading-[0.95] text-charcoal">
              All buddies
            </h1>
          </Reveal>

          {/* search */}
          <Reveal variant="fade-up" delay={120}>
            <div className="mt-8 flex items-center gap-3 max-w-sm">
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => {
                  if (e.target.value) setParams({ q: e.target.value });
                  else setParams({});
                }}
                className="w-full bg-transparent border-b-2 border-charcoal/20 focus:border-charcoal outline-none py-2 text-[14px] text-charcoal placeholder:text-charcoal/30 transition-colors"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-focus px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-charcoal/8 animate-pulse" />
                  <div className="h-3 bg-charcoal/8 animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl text-charcoal">No buddies found</p>
              <p className="mt-2 text-[14px] text-charcoal/50">
                {search ? `No results for "${search}".` : 'No products in store.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} wide={i === 1} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}