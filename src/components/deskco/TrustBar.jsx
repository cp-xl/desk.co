import React from 'react';
import { TRUST } from '@/lib/copy';

export default function TrustBar() {
  return (
    <section className="border-y border-charcoal/10 bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <ul className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-charcoal/10">
          {TRUST.map((t) => (
            <li key={t} className="py-5 px-4 text-center text-[11px] tracking-label text-charcoal/60">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}