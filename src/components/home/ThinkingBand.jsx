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
        <div className="space-y-5 text-[16px] leading-[1.65] text-charcoal/75">
          <p>
            Most gift tech gets bought in a rush and forgotten by February. This is the
            opposite: stuff that holds up, long after the wrapping paper's in the bin.
          </p>
          <p>
            Everything here does one job well and still looks good on a desk a year later.
            No bundles, no upsells, no aisle of near-identical boxes.
          </p>
        </div>
      </div>
    </section>
  );
}