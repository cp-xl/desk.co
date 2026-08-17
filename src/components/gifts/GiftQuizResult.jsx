import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Check, Link2, RotateCcw } from 'lucide-react';
import { Image } from '@/components/ui/image';

const BRAND_COLORS = ['#C4932A', '#F2EDE3', '#6B1A2A'];

function celebrate() {
  // Anyone who has asked the OS to calm animations down gets no cannon.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  confetti({
    particleCount: 70,
    spread: 68,
    startVelocity: 34,
    scalar: 0.9,
    ticks: 160,
    origin: { y: 0.42 },
    colors: BRAND_COLORS,
    disableForReducedMotion: true,
  });
}

// A pick, with the reason it is on the shortlist. Rendered dark: this whole
// section sits on the charcoal band.
function Pick({ entry, index }) {
  const { product, reason, overBudget } = entry;
  return (
    <Link to={`/product/${product.slug}`} className="group block spring-lift">
      <div className="relative aspect-square overflow-hidden bg-cream/5">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          fittingType="fill"
        />
        <span className="absolute top-3 left-3 bg-charcoal/80 px-2 py-1 text-[10px] tracking-label text-cream">
          No. {String(index + 1).padStart(2, '0')}
        </span>
        {overBudget && (
          <span className="absolute bottom-3 left-3 bg-amber px-2 py-1 text-[10px] tracking-label text-charcoal">
            Over budget
          </span>
        )}
      </div>
      <div className="pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[14px] leading-snug text-cream group-hover:text-amber transition-colors">
            {product.name}
          </p>
          <p className="font-ui text-[12px] text-cream/60 shrink-0 tabular-nums">{product.priceDisplay}</p>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-cream/50">{reason}</p>
      </div>
    </Link>
  );
}

export default function GiftQuizResult({
  archetype,
  runnerUp,
  share,
  pronounWord,
  budgetLabel,
  picks,
  shareUrl,
  onRestart,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    celebrate();
  }, [archetype.id]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  const shareResult = async () => {
    const text = `Descko says ${pronounWord.replace("'ll", ' is')} ${archetype.name}.`;
    // The native sheet is the better experience where it exists; the clipboard
    // is the fallback, and a refusal to share is not an error worth reporting.
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Descko gift quiz', text, url: shareUrl });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <h3 className="font-display text-[30px] sm:text-[40px] leading-[1.02] text-cream">
        I think {pronounWord} {archetype.verdict}.
      </h3>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="bg-amber px-3 py-1.5 text-[11px] tracking-label text-charcoal">{archetype.name}</span>
        {share != null && (
          <span className="font-ui text-[11px] text-cream/40 tabular-nums">{share}% match</span>
        )}
        {runnerUp && (
          <span className="text-[11px] tracking-label text-cream/40">
            with a streak of {runnerUp.name}
          </span>
        )}
      </div>

      <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-cream/60">{archetype.line}</p>

      {picks.length > 0 ? (
        <>
          <p className="mt-9 text-[10px] tracking-label text-cream/35">
            {budgetLabel ? `Three to buy — ${budgetLabel}` : 'Three to buy'}
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6">
            {picks.map((entry, i) => (
              <Pick key={entry.product.id} entry={entry} index={i} />
            ))}
          </div>
        </>
      ) : (
        <p className="mt-8 text-[14px] text-cream/60">Nothing in stock for that combination right now.</p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={shareResult}
          className="inline-flex items-center gap-2 border border-cream/25 px-5 py-2.5 text-[11px] tracking-label text-cream hover:border-amber hover:text-amber transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
          {copied ? 'Link copied' : 'Share this result'}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-[11px] tracking-label text-cream/60 hover:text-amber transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start again
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
