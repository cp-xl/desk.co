import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from './Reveal';

// Gifting-led hero. Leads with the gift line, backed by the newest product image.
export default function Hero({ firstProduct }) {
  const heroImage =
    firstProduct?.image ||
    'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/fcddca1c9_generated_8222d48a.png';

  return (
    <section className="relative bg-cream">
      <div className="h-px w-full bg-maroon/30" />
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] lg:min-h-[86vh]">
          <div className="lg:col-span-6 flex flex-col justify-center py-10 lg:py-0 lg:pr-10">
            <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-5">
              Gifting, mostly
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <h1 className="font-display text-charcoal leading-[0.92] text-[48px] sm:text-[62px] lg:text-[74px]">
                For someone<br />who has<br />everything<br /><span className="text-maroon">boring.</span>
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={180}>
              <p className="mt-7 text-[15px] leading-relaxed text-charcoal/70 max-w-md">
                Hand-picked tech with a bit of personality. The kind of thing you will not
                find at JB Hi-Fi, priced between a decent lunch and a serious present.
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/gifts"
                  className="group inline-flex items-center gap-2 bg-charcoal text-cream px-7 py-3.5 text-[12px] tracking-label hover:bg-maroon transition-colors"
                >
                  Gift collections
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/shop"
                  className="text-[12px] tracking-label text-charcoal/60 hover:text-maroon transition-colors underline-offset-4 hover:underline"
                >
                  Or browse everything
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative flex items-center py-8 lg:py-0">
            <Reveal variant="fade-up" delay={120} className="relative w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5">
                <Image src={heroImage} alt="Descko" className="h-full w-full object-cover" fittingType="fill" />
                {firstProduct && (
                  <Link
                    to={`/product/${firstProduct.slug}`}
                    className="absolute bottom-4 left-4 bg-cream/95 px-4 py-2.5 text-[11px] tracking-label text-charcoal hover:text-maroon transition-colors"
                  >
                    Just landed — {firstProduct.name}
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