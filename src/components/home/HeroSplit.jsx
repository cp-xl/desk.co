import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/deskco/Reveal';

// Split hero: numbered lead object on the left, the gifting line on the right.
export default function HeroSplit({ leadProduct }) {
  return (
    <section className="bg-cream border-t border-maroon/25">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-charcoal/10">
          <div className="py-8 lg:py-14 lg:pr-12">
            <Reveal variant="fade-up" className="relative">
              {/* No stand-in image: until the lead product loads the frame stays
                  empty, so the first thing anyone sees is the real product. */}
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5 ${
                  leadProduct?.image ? '' : 'animate-pulse'
                }`}
              >
                {leadProduct?.image && (
                  <Image
                    src={leadProduct.image}
                    alt={leadProduct.name}
                    className="h-full w-full object-cover"
                    fittingType="fill"
                  />
                )}
                <span className="absolute top-4 left-4 bg-charcoal/85 text-cream text-[10px] tracking-label px-2 py-1">
                  No. 01
                </span>
                {leadProduct && (
                  <span className="absolute bottom-4 left-4 bg-cream/90 px-2 py-1 text-[10px] tracking-label text-charcoal">
                    {leadProduct.name}
                  </span>
                )}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center pb-14 lg:py-14 lg:pl-12">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-5">
              Meet the short list
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h1 className="font-display text-charcoal leading-[0.92] text-[44px] sm:text-[58px] lg:text-[66px]">
                Desk gear<br />that feels like<br />
                <span className="text-maroon">you picked it.</span>
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={160}>
              <p className="mt-7 max-w-md text-[16px] leading-[1.65] text-charcoal/75">
                Stuff you won't find at the local chain store. Speakers, keyboards, clocks,
                desk gear. Mostly $25 to $80, so it's never a stretch and never feels random.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={240}>
              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <Link
                  to="/gifts"
                  className="group inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
                >
                  Gift collections
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {leadProduct && (
                  <Link
                    to={`/product/${leadProduct.slug}`}
                    className="text-[11px] tracking-label text-charcoal/50 hover:text-maroon transition-colors"
                  >
                    Start with {leadProduct.name}
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