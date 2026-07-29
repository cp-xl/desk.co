import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/deskco/Hero';
import TrustBar from '@/components/deskco/TrustBar';
import Marquee from '@/components/deskco/Marquee';
import GiftCollections from '@/components/deskco/GiftCollections';
import ManifestoProof from '@/components/deskco/ManifestoProof';
import FaqAccordion from '@/components/deskco/FaqAccordion';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';
import { fetchProducts } from '@/lib/wixProducts';

function Crew({ products, loading }) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
              Eight worth your time
            </Reveal>
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[44px] leading-none text-charcoal">The Crew</h2>
            </Reveal>
          </div>
          <Link to="/shop" className="text-[11px] tracking-label text-charcoal/50 hover:text-maroon transition-colors">
            All of it →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-charcoal/8 animate-pulse" />
                <div className="h-3 bg-charcoal/8 animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-[14px] text-charcoal/50">Nothing in the store yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
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
      <TrustBar />
      <Marquee />
      <Crew products={products} loading={loading} />
      <GiftCollections />
      <ManifestoProof />
      <FaqAccordion />
    </div>
  );
}