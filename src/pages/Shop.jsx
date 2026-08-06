import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/deskco/ProductCard';
import FilterChips from '@/components/deskco/FilterChips';
import Reveal from '@/components/deskco/Reveal';
import { fetchProducts } from '@/lib/wixProducts';
import { BUDGET_BANDS } from '@/lib/collections';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const band = BUDGET_BANDS.find((b) => b.id === budget);
    return products.filter((p) => (!type || p.category === type) && (!band || band.match(p)));
  }, [products, type, budget]);

  // Types are the Wix categories the products actually belong to.
  const typeOptions = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort().map((c) => ({ id: c, label: c })),
    [products],
  );

  const budgetOptions = useMemo(
    () => BUDGET_BANDS.filter((b) => products.some(b.match)),
    [products],
  );

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-16">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          The whole list
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[60px] leading-none text-charcoal">Shop</h1>
        </Reveal>
        <p className="mt-4 text-[16px] leading-[1.65] text-charcoal/75 max-w-lg">
          The full list, in the order it landed. Narrow it by what the thing is, or by what
          you actually want to spend.
        </p>

        <div className="mt-10 space-y-4">
          <FilterChips label="Type" options={typeOptions} active={type} onSelect={setType} />
          <FilterChips label="Budget" options={budgetOptions} active={budget} onSelect={setBudget} />
        </div>

        <p className="mt-6 text-[11px] tracking-label text-charcoal/40">
          {loading ? 'Loading' : `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`}
        </p>

        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-charcoal/8 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 border-t border-charcoal/15">
              <p className="font-display text-3xl text-charcoal">Nothing matches that.</p>
              <button
                onClick={() => {
                  setType(null);
                  setBudget(null);
                }}
                className="mt-4 text-[12px] tracking-label text-maroon underline-offset-4 hover:underline"
              >
                Clear the filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}