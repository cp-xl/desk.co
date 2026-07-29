import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getFilteredProducts, GIFTING_PROFILES } from '@/lib/products';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const filter = params.get('filter') || 'all';

  const products = getFilteredProducts(filter);
  const activeProfile = GIFTING_PROFILES.find((p) => p.id === filter);

  const tabs = [
    { id: 'all', label: 'All' },
    ...GIFTING_PROFILES.map((p) => ({ id: p.id, label: p.title })),
  ];

  const setFilter = (id) => {
    if (id === 'all') setParams({});
    else setParams({ filter: id });
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* header */}
      <section className="border-b border-charcoal/10 pt-12 sm:pt-16 pb-10">
        <div className="mx-auto max-w-focus px-4 sm:px-6">
          <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-4">
            {activeProfile ? 'Shopping for a friend' : 'The full catalog'}
          </Reveal>
          <Reveal variant="fade-up">
            <h1 className="font-display text-[44px] sm:text-[60px] leading-[0.95] text-charcoal">
              {activeProfile ? activeProfile.title : 'All buddies'}
            </h1>
          </Reveal>
          {activeProfile && (
            <Reveal variant="fade-up" delay={100}>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70 max-w-md">
                {activeProfile.copy}
              </p>
            </Reveal>
          )}

          {/* filter tabs */}
          <Reveal variant="fade-up" delay={160}>
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id)}
                  className={`px-4 sm:px-5 py-2.5 text-[11px] tracking-label border transition-colors ${
                    filter === t.id
                      ? 'bg-charcoal text-cream border-charcoal'
                      : 'bg-transparent text-charcoal/60 border-charcoal/20 hover:border-charcoal'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-focus px-4 sm:px-6">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl text-charcoal">No buddies here yet</p>
              <p className="mt-2 text-[14px] text-charcoal/50">Try another personality.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} wide={i === 1} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}