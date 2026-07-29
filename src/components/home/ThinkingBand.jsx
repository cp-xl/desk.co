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
        <div className="space-y-5 text-[18px] leading-[1.65] text-charcoal/75">
          <p>
            Most gift tech is bought in a hurry and gone by February. Ours gets ordered,
            unboxed and lived with for a few weeks first. Plenty of it never makes the list.
          </p>
          <p>
            What survives does one job well and still looks good on a desk a year later.
            No bundles, no upsells, nothing here because a supplier had stock to move.
          </p>
        </div>
      </div>
    </section>
  );
}