import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/deskco/Hero';
import ProductGrid from '@/components/deskco/ProductGrid';
import GiftingSection from '@/components/deskco/GiftingSection';
import Reveal from '@/components/deskco/Reveal';
import { PRODUCTS } from '@/lib/products';

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
            <Reveal variant="fade-up" delay={180}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-6">
                <div>
                  <div className="font-display text-3xl text-charcoal">14</div>
                  <div className="text-[11px] tracking-label text-charcoal/40 mt-1">Materials</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-charcoal">6</div>
                  <div className="text-[11px] tracking-label text-charcoal/40 mt-1">Buddies</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-charcoal">0</div>
                  <div className="text-[11px] tracking-label text-charcoal/40 mt-1">Filler</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <GiftingSection />
      <ProductGrid products={PRODUCTS} title="The Catalog" kicker="Six buddies, one desk" />
      <AboutStrip />
    </div>
  );
}