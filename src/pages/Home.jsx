import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/deskco/Hero';
import GiftingSection from '@/components/deskco/GiftingSection';
import Reveal from '@/components/deskco/Reveal';
import ProductCard from '@/components/deskco/ProductCard';
import { fetchProducts } from '@/lib/wixProducts';

function AboutStrip() {
  return (
    <section id="about" className="bg-cream py-16 sm:py-24 border-t border-charcoal/10">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-4">
              The thinking
            </Reveal>
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[44px] leading-[0.95] text-charcoal">
                A desk is where<br />you spend<br />your life.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal variant="fade-up" delay={100}>
              <p className="text-[15px] leading-relaxed text-charcoal/70">
                Most desk objects are afterthoughts — plastic, replaceable, forgettable.
                We make the opposite. A small, deliberate catalog of objects that earn
                their place on the surface you stare at all day.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
                Each buddy does one job well and stays interesting while it does it.
                No bundles, no upsells, no objects that exist only to fill a shelf.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGridSection({ products, loading }) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
              The full lineup
            </Reveal>
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[44px] leading-none text-charcoal">
                The Catalog
              </h2>
            </Reveal>
          </div>
          {!loading && (
            <Reveal variant="fade-up" delay={100} className="hidden sm:block text-right">
              <span className="text-[11px] tracking-label text-charcoal/40">
                {products.length} {products.length === 1 ? 'buddy' : 'buddies'}
              </span>
            </Reveal>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-charcoal/8 animate-pulse" />
                <div className="h-3 bg-charcoal/8 animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-charcoal/50 text-[14px]">No products found in store.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} wide={i === 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero firstProduct={products[0] || null} />
      <GiftingSection />
      <ProductGridSection products={products} loading={loading} />
      <AboutStrip />
    </div>
  );
}