import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '@/lib/collections';
import Reveal from './Reveal';

// Index-style row list of gift collections with price bands. Routes into /gifts.
export default function GiftCollections() {
  return (
    <section className="bg-cream py-14 sm:py-20 border-t border-charcoal/10">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          Gift collections
        </Reveal>
        <Reveal variant="fade-up">
          <h2 className="font-display text-[36px] sm:text-[44px] leading-none text-charcoal">
            Pick a person, not a product
          </h2>
        </Reveal>

        <ul className="mt-10 border-t border-charcoal/15">
          {COLLECTIONS.map((c, i) => (
            <li key={c.id} className="border-b border-charcoal/15">
              <Link
                to={`/gifts#${c.id}`}
                className="group flex items-baseline gap-4 sm:gap-8 py-6 hover:text-maroon transition-colors"
              >
                <span className="text-[11px] tracking-label text-charcoal/35 w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display text-2xl sm:text-3xl text-charcoal group-hover:text-maroon transition-colors">
                    {c.name}
                  </span>
                  <span className="block mt-1 text-[13px] text-charcoal/60">{c.line}</span>
                </span>
                <span className="text-[11px] tracking-label text-charcoal/50 hidden sm:block">{c.band}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-charcoal/40 group-hover:text-maroon transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}