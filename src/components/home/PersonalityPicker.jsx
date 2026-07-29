import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/deskco/Reveal';

const PERSONALITIES = [
  {
    number: 'No. 01',
    title: 'The tinkerer',
    body: 'Things to open, mount, charge and rearrange. Half the fun is the setup.',
    footnote: 'For the one with a drawer full of cables.',
  },
  {
    number: 'No. 02',
    title: 'The one on the move',
    body: 'Earbuds, power, small speakers. Gear that survives a backpack.',
    footnote: 'For the desk that is never in one place.',
  },
  {
    number: 'No. 03',
    title: 'The minimalist',
    body: 'Single-purpose objects that do one job well. Nothing decorative.',
    footnote: 'For the one who owns five things.',
  },
];

export default function PersonalityPicker() {
  return (
    <section className="bg-charcoal text-cream py-16 sm:py-24">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-8">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-amber mb-4">
              Buying for someone else
            </Reveal>
            <Reveal variant="fade-up">
              <h2 className="font-display text-[36px] sm:text-[46px] leading-[0.95]">
                Shopping<br />for someone<br />else?
              </h2>
            </Reveal>
            <p className="mt-5 text-[14px] leading-relaxed text-cream/60 max-w-xs">
              Pick a personality, not a product. We will show you the gear that suits how they
              actually use it.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-cream/10">
            {PERSONALITIES.map((p, i) => (
              <Reveal
                key={p.title}
                variant="fade-up"
                delay={i * 90}
                className="border-t border-cream/10 sm:border-t-0 pt-6 sm:pt-0 sm:px-6 first:sm:pl-0 last:sm:pr-0"
              >
                <Link to="/gifts" className="group flex h-full flex-col">
                  <p className="text-[10px] tracking-label text-amber">{p.number}</p>
                  <p className="mt-3 font-display text-2xl group-hover:text-amber transition-colors">
                    {p.title}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-cream/60">{p.body}</p>
                  <span className="mt-6 inline-flex items-start gap-1.5 text-[10px] tracking-label text-cream/35 group-hover:text-cream/70 transition-colors">
                    {p.footnote}
                    <ArrowUpRight className="h-3 w-3 shrink-0 mt-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}