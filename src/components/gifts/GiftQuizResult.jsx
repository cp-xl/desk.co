import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/deskco/ProductCard';

export default function GiftQuizResult({ archetype, pronounWord, picks, onRestart }) {
  return (
    <div>
      <p className="text-[11px] tracking-label text-amber">The verdict</p>
      <h3 className="mt-3 font-display text-[30px] sm:text-[40px] leading-[1.02] text-cream">
        I think {pronounWord} {archetype.verdict}.
      </h3>
      <p className="mt-4 text-[14px] text-cream/60 max-w-lg">
        Reads like <span className="text-cream">{archetype.name}</span>. {archetype.line}
      </p>

      {picks.length > 0 ? (
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6">
          {picks.map((p) => (
            <div key={p.id} className="[&_p]:text-cream/80 [&_.text-charcoal]:text-cream">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[14px] text-cream/60">
          Nothing in stock for that combination right now.
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={onRestart}
          className="text-[11px] tracking-label text-cream/60 hover:text-amber transition-colors"
        >
          Start again
        </button>
        <Link
          to="/shop"
          className="text-[11px] tracking-label text-cream/60 hover:text-amber transition-colors"
        >
          Or browse everything →
        </Link>
      </div>
    </div>
  );
}