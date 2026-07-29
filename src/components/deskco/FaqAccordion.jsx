import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/lib/copy';

export default function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-cream border-t border-charcoal/10 py-14 sm:py-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <h2 className="font-display text-[36px] sm:text-[44px] leading-none text-charcoal mb-8">
          Questions, answered
        </h2>
        <ul className="border-t border-charcoal/15">
          {FAQ.map((item, i) => (
            <li key={item.q} className="border-b border-charcoal/15">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-[15px] text-charcoal hover:text-maroon transition-colors"
              >
                {item.q}
                {open === i ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </button>
              {open === i && (
                <p className="pb-6 pr-8 text-[14px] leading-relaxed text-charcoal/70">{item.a}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}