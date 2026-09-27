import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/deskco/Reveal';

export default function Contact() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
            Contact
          </Reveal>
          <Reveal variant="fade-up">
            <h1 className="font-display text-[44px] sm:text-[56px] leading-none text-charcoal">Say something</h1>
          </Reveal>
          <p className="mt-4 text-[16px] leading-[1.65] text-charcoal/75 max-w-md">
            Order questions, returns, or a product we should look at. A person reads these.
          </p>

          <div className="mt-10 border border-charcoal/15 p-6 sm:p-8">
            <p className="text-[13px] leading-relaxed text-charcoal/70">
              Email us at{' '}
              <a
                href="mailto:hello@descko.com"
                className="text-maroon underline underline-offset-4"
              >
                hello@descko.com
              </a>{' '}
              with your order number if you have one. A real person replies, usually within
              one business day.
            </p>
            <a
              href="mailto:hello@descko.com"
              className="mt-6 inline-block bg-amber text-charcoal px-7 py-3.5 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors"
            >
              Email us
            </a>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:border-l border-charcoal/15 lg:pl-10">
          <h2 className="text-[11px] tracking-label text-charcoal/40 mb-4">Elsewhere</h2>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="mailto:hello@descko.com" className="text-charcoal hover:text-maroon transition-colors">
                hello@descko.com
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@descko"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-charcoal hover:text-maroon transition-colors"
              >
                TikTok <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/descko"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-charcoal hover:text-maroon transition-colors"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}