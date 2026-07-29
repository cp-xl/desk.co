import React from 'react';
import Reveal from '@/components/deskco/Reveal';

export default function ThinkingBand() {
  return (
    <section className="bg-charcoal/[0.04] border-t border-charcoal/10 py-16 sm:py-24">
      <div className="mx-auto max-w-focus px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-4">
            The thinking
          </Reveal>
          <Reveal variant="fade-up">
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[0.95] text-charcoal">
              A gift should<br />outlast<br />the wrapping.
            </h2>
          </Reveal>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-charcoal/70">
          <p>
            Most gift tech is an afterthought — plastic, replaceable, forgotten by February.
            We keep the opposite: a short, deliberate list, bought and used before it goes up.
          </p>
          <p>
            Every piece does one job well and stays interesting while it does it. No bundles,
            no upsells, nothing on the list because a supplier had stock.
          </p>
        </div>
      </div>
    </section>
  );
}