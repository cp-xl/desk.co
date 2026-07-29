import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { GIFTING_PROFILES } from '@/lib/products';

export default function GiftingSection() {
  return (
    <section className="bg-charcoal text-cream py-16 sm:py-24">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-amber mb-4">
              For a friend's desk
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h2 className="font-display text-[40px] sm:text-[52px] leading-[0.95] text-cream">
                Shopping<br />for someone<br />else?
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={160}>
              <p className="mt-6 text-[15px] leading-relaxed text-cream/60 max-w-xs">
                Pick a personality, not a product. We'll show you the buddies that
                suit how they actually work.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/10">
            {GIFTING_PROFILES.map((profile, i) => (
              <Reveal key={profile.id} variant="fade-up" delay={i * 100}>
                <Link
                  to={`/collection?filter=${profile.id}`}
                  className="group block bg-charcoal hover:bg-[#26262a] transition-colors p-7 sm:p-8 h-full min-h-[260px] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] tracking-label text-amber">
                      No. 0{i + 1}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl mt-3 text-cream">
                      {profile.title}
                    </h3>
                    <p className="mt-3 text-[13px] text-cream/50 leading-relaxed">
                      {profile.copy}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[11px] tracking-label text-cream/40">
                      {profile.line}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-amber transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}