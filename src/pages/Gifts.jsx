import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';
import { fetchProducts } from '@/lib/wixProducts';
import { COLLECTIONS, pickForCollection } from '@/lib/collections';
import GiftQuiz from '@/components/gifts/GiftQuiz';
import GiftGuides from '@/components/gifts/GiftGuides';

export default function Gifts() {
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
          Gifting
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[60px] leading-none text-charcoal">
            Gift collections
          </h1>
        </Reveal>
        <p className="mt-4 text-[15px] text-charcoal/70 max-w-lg">
          Sorted by the person, not the category.
        </p>
        <a
          href="#quiz"
          className="mt-7 inline-block bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
        >
          Take the gift quiz
        </a>
      </div>

      <GiftQuiz products={products} />
      <GiftGuides />

      {loading ? (
        <div className="mx-auto max-w-focus px-4 sm:px-6 pb-20 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-charcoal/8 animate-pulse" />
          ))}
        </div>
      ) : (
        COLLECTIONS.map((c) => {
          const picks = pickForCollection(products, c);
          if (picks.length === 0) return null;
          return (
            <section key={c.id} id={c.id} className="border-t border-charcoal/10 py-12 sm:py-16 scroll-mt-24">
              <div className="mx-auto max-w-focus px-4 sm:px-6">
                <div className="flex items-end justify-between gap-6 mb-8">
                  <div>
                    <h2 className="font-display text-[30px] sm:text-[38px] leading-none text-charcoal">
                      {c.name}
                    </h2>
                    <p className="mt-2 text-[14px] text-charcoal/60">{c.line}</p>
                  </div>
                  <span className="text-[11px] tracking-label text-charcoal/40 shrink-0 hidden sm:block">
                    {c.band}
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
                  {picks.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      <div className="mx-auto max-w-focus px-4 sm:px-6 py-14 border-t border-charcoal/10">
        <Link to="/shop" className="text-[12px] tracking-label text-maroon underline-offset-4 hover:underline">
          None of these? Browse the whole shop →
        </Link>
      </div>
    </div>
  );
}