import React from 'react';
import { Link } from 'react-router-dom';
import { HOW_IT_WORKS } from '@/lib/copy';
import Reveal from './Reveal';

export default function ManifestoProof() {
  return (
    <section className="bg-cream py-14 sm:py-20 border-t border-charcoal/10">
      <div className="mx-auto max-w-focus px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal variant="fade-up" className="lg:col-span-7 bg-charcoal text-cream p-8 sm:p-12">
          <p className="text-[11px] tracking-label text-amber mb-5">The short version</p>
          <h2 className="font-display text-[36px] sm:text-[48px] leading-[0.95]">
            Good tech, chosen<br />by people who<br />actually use it.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-cream/70 max-w-md">
            Descko is a short list of gear you will not find stacked in a big-box aisle.
            Speakers, earbuds, rings, handhelds, mounts, power. Priced from about $20 to
            $1,000, and every listing says plainly what the thing does.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block text-[12px] tracking-label text-amber underline-offset-4 hover:underline"
          >
            More on how we pick →
          </Link>
        </Reveal>

        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {HOW_IT_WORKS.map((h, i) => (
            <Reveal key={h.title} variant="fade-up" delay={i * 80} className="border-t border-charcoal/15 pt-5">
              <p className="font-display text-2xl text-charcoal">{h.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-charcoal/70">{h.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}