import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/deskco/Reveal';

const VALUES = [
  { title: 'A tight list', body: 'Under a hundred products, ever. If something better arrives, something leaves.' },
  { title: 'Hand-picked', body: 'Bought, unboxed, used. Spec sheets are marketing, not evidence.' },
  { title: 'A drop, not a firehose', body: 'New finds land in small batches so the list stays readable.' },
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
            Gear with personality you won't get at JB Hi-Fi.
          </h1>
        </Reveal>
        <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-charcoal/70">
          <p>
            Descko started because buying tech as a gift is miserable. You either spend too
            little on something plastic, or too much on something everyone already owns.
          </p>
          <p>
            So we keep a short list. Speakers, earbuds, smart rings, handhelds, mics, mounts,
            portable power, solar. Roughly $20 to $1,000, most of it between $30 and $80 —
            which happens to be the range where a present still feels like a decision.
          </p>
          <p>Nothing here is on the list because a supplier had stock.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant="fade-up" delay={i * 70} className="border-t border-charcoal/15 pt-5">
              <p className="font-display text-2xl text-charcoal">{v.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-charcoal/70">{v.body}</p>
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