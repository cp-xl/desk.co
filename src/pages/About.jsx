import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/deskco/Reveal';

const VALUES = [
  { title: 'A tight list', body: 'Under a hundred products, ever. If something better arrives, something leaves.' },
  { title: 'Hand-picked', body: 'Bought, unboxed, used. Spec sheets are marketing, not evidence.' },
  { title: 'A drop, not a firehose', body: 'Stock lands in small batches, so the whole list stays readable in a coffee break.' },
  { title: 'No hype voice', body: 'We describe the thing. You decide if you want it.' },
];

export default function About() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-20">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          About
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[64px] leading-[0.95] text-charcoal max-w-2xl">
            Gear with personality, not aisle filler.
          </h1>
        </Reveal>
        <div className="mt-8 max-w-xl space-y-5 text-[18px] leading-[1.65] text-charcoal/75">
          <p>
            Descko is for the person who has drawn a name out of a hat, has a birthday in
            four days, or just likes good objects. You know the walk down the aisle at the
            local electronics chain: two hundred boxes, all the same, none of them a gift.
          </p>
          <p>
            So we keep a short list instead. Speakers, earbuds, smart rings, handhelds, mics,
            mounts, portable power, solar. Roughly $20 to $1,000, most of it between $30 and
            $80. That is the range where a present still reads as a decision rather than an errand.
          </p>
          <p>
            The people who buy here are not chasing specs. They want one good thing that
            arrives on time, looks considered on a desk, and gets used past January.
          </p>
          <p>Nothing is on the list because a supplier had stock.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant="fade-up" delay={i * 70} className="border-t border-charcoal/15 pt-5">
              <p className="font-display text-2xl text-charcoal">{v.title}</p>
              <p className="mt-2 text-[16px] leading-[1.6] text-charcoal/75">{v.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-charcoal/15 pt-10">
          <Link
            to="/shop"
            className="inline-block bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
          >
            See the list
          </Link>
        </div>
      </div>
    </div>
  );
}