import React from 'react';
import Reveal from '@/components/deskco/Reveal';
import { ARCHETYPES } from '@/lib/archetypes';

// Short written gifting guides — one per archetype, no product listing.
export default function GiftGuides() {
  return (
    <section className="border-t border-charcoal/10 py-14 sm:py-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          Gifting guides
        </Reveal>
        <Reveal variant="fade-up">
          <h2 className="font-display text-[32px] sm:text-[42px] leading-none text-charcoal">
            How to buy for each of them
          </h2>
        </Reveal>
        <p className="mt-4 text-[15px] text-charcoal/70 max-w-lg">
          Five kinds of people, and what actually lands with each. Read the one that sounds like them.
        </p>

        <div className="mt-12 space-y-10">
          {ARCHETYPES.map((a, i) => (
            <Reveal
              key={a.id}
              variant="fade-up"
              delay={i * 60}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-t border-charcoal/10 pt-8"
            >
              <div className="lg:col-span-4">
                <p className="text-[10px] tracking-label text-maroon">
                  No. {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-[26px] leading-none text-charcoal">{a.name}</h3>
                <p className="mt-2 text-[13px] text-charcoal/55">{a.line}</p>
              </div>
              <ul className="lg:col-span-8 space-y-3">
                {a.guide.map((point) => (
                  <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-charcoal/70">
                    <span className="text-maroon/60 shrink-0">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}