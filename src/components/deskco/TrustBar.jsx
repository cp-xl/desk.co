import React from 'react';
import { TRUST } from '@/lib/copy';

export default function TrustBar() {
  return (
    <section className="border-y border-charcoal/10 bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center justify-center border border-charcoal/15 bg-charcoal/[0.03] px-6 py-[24px] text-center text-[13px] tracking-label text-charcoal/70"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}