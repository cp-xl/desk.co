import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/deskco/Reveal';

const FALLBACK_IMAGE =
  'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/fcddca1c9_generated_8222d48a.png';

// Split hero: numbered lead object on the left, the gifting line on the right.
export default function HeroSplit({ leadProduct }) {
  const image = leadProduct?.image || FALLBACK_IMAGE;

  return (
    <section className="bg-cream border-t border-maroon/25">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-charcoal/10">
          <div className="py-8 lg:py-14 lg:pr-12">
            <Reveal variant="fade-up" className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5">
                <Image
                  src={image}
                  alt={leadProduct?.name || 'Descko'}
                  className="h-full w-full object-cover"
                  fittingType="fill"
                />
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
                For someone<br />who has<br />everything<br />
                <span className="text-maroon">boring.</span>
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={160}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-charcoal/70">
                A small catalogue of tech with a bit of personality — the kind your local
                electronics chain does not stock. Each one does a job properly and stays
                interesting while it does it.
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