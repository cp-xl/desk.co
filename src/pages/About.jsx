import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/deskco/Reveal';

const VALUES = [
  { title: 'A tight list', body: 'Under a hundred products, ever. If something better arrives, something leaves.' },
  { title: 'Not in the aisle', body: 'Things the big chain stores do not carry, at prices that still make sense as a gift.' },
  { title: 'Readable in one sitting', body: 'The whole catalogue fits in a coffee break. No endless scroll, no filters you need.' },
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
        <div className="mt-8 max-w-xl space-y-5 text-[16px] leading-[1.7] text-charcoal/75">
          <p>
            You know the feeling. Your name gets pulled out of the office Secret Santa hat,
            your best friend’s birthday is in four days, or you just like collecting desk
            buddies and don’t need much of an excuse. Either way, you end up two hundred
            boxes deep at the big electronics chain, and none of them read as a gift.
          </p>
          <p>
            So we keep a short list instead. Sound, desk gear, and small things that do one
            job properly. Mostly $25 to $80. That’s the range where a present still feels like
            a decision, not something you grabbed on the way home.
          </p>
          <p>
            Here’s the thing about gifting: nobody wants to overthink it, and nobody wants to
            be forgettable either. You want to hand over something good, watch their face do
            the thing, and not have to think about it again after that.
          </p>
          <p>Short list, clear prices, no aisle to walk.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant="fade-up" delay={i * 70} className="border-t border-charcoal/15 pt-5">
              <p className="font-display text-2xl text-charcoal">{v.title}</p>
              <p className="mt-2 text-[15px] leading-[1.65] text-charcoal/75">{v.body}</p>
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