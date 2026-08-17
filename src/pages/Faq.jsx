import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/deskco/Reveal';
import FaqAccordion from '@/components/deskco/FaqAccordion';

// Shipping, returns and the rest of the logistics, on a URL that support
// emails can point at.
export default function Faq() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 pt-12 sm:pt-16">
        <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
          Questions
        </Reveal>
        <Reveal variant="fade-up">
          <h1 className="font-display text-[44px] sm:text-[60px] leading-none text-charcoal">
            Shipping, returns, the rest
          </h1>
        </Reveal>
        <p className="mt-4 text-[16px] leading-[1.65] text-charcoal/75 max-w-lg">
          The things worth knowing before you buy. If your question is not here, email us and a
          person will answer it.
        </p>
      </div>

      <FaqAccordion />

      <div className="mx-auto max-w-focus px-4 sm:px-6 pb-16">
        <Link to="/contact" className="text-[12px] tracking-label text-maroon underline-offset-4 hover:underline">
          Still stuck? Talk to us →
        </Link>
      </div>
    </div>
  );
}
