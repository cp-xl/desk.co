import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from './Reveal';

export default function Hero({ firstProduct }) {
  const heroImage = firstProduct?.image || 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/fcddca1c9_generated_8222d48a.png';
  const heroName = firstProduct?.name || 'The Sentinel';
  const heroId = firstProduct?.id || null;

  return (
    <section className="relative bg-cream">
      {/* full-bleed top hairline */}
      <div className="h-px w-full bg-maroon/30" />
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[88vh] lg:min-h-[92vh]">
          {/* Left: portrait 60% */}
          <div className="lg:col-span-7 relative flex items-center justify-center py-12 lg:py-0 lg:pr-10">
            <Reveal variant="fade-up" className="relative w-full max-w-xl mx-auto">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5">
                <Image
                  src={heroImage}
                  alt={heroName}
                  className="h-full w-full object-cover"
                  fittingType="fill"
                />
                <span className="absolute top-4 left-4 text-[11px] tracking-label text-cream bg-charcoal/70 px-2 py-1">
                  No. 01
                </span>
                <span className="absolute bottom-4 left-4 text-[11px] tracking-label text-cream/90">
                  {heroName}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: type 40% */}
          <div className="lg:col-span-5 flex flex-col justify-center py-8 lg:py-0 lg:pl-8 lg:border-l border-charcoal/10">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-5">
              Meet your desk buddies
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h1 className="font-display text-charcoal leading-[0.95] text-[52px] sm:text-[64px] lg:text-[76px]">
                Your desk<br />deserves<br />better<br /><span className="text-maroon">company.</span>
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={180}>
              <p className="mt-7 text-[15px] leading-relaxed text-charcoal/70 max-w-sm">
                A small catalog of objects with personality. Each one does a job on
                your desk and stays interesting while it does it. No filler, no fuss.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/collection"
                  className="group inline-flex items-center gap-2 bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
                >
                  Meet the buddies
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {heroId && (
                  <Link
                    to={`/product/${heroId}`}
                    className="text-[12px] tracking-label text-charcoal/60 hover:text-maroon transition-colors underline-offset-4 hover:underline"
                  >
                    Start with {heroName}
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}