import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

// Splits a product name around the matched terms so the reason for a result is
// visible. Terms are escaped: they come straight from the search input.
function Highlight({ text, terms }) {
  const usable = terms.filter((t) => t.length > 1);
  if (usable.length === 0) return text;
  const pattern = new RegExp(`(${usable.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return text.split(pattern).map((part, i) =>
    usable.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
      <mark key={i} className="bg-amber/30 text-charcoal">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

// Hover deliberately does not set the active option: it is a pointer affordance
// only, handled by the `hover:` class below. Letting it move activeIndex means a
// pointer resting over the dropdown changes what Enter does.
function Row({ product, terms, active, id, onPick }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      id={id}
      role="option"
      aria-selected={active}
      onClick={() => onPick(product)}
      className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
        active ? 'bg-charcoal/8' : 'hover:bg-charcoal/5'
      }`}
    >
      <div className="h-11 w-11 shrink-0 overflow-hidden bg-charcoal/5">
        <Image src={product.image} alt="" className="h-full w-full object-cover" fittingType="fill" quality={60} />
      </div>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] leading-snug text-charcoal line-clamp-2">
          <Highlight text={product.name} terms={terms} />
        </span>
        {product.category && (
          <span className="mt-0.5 block text-[10px] tracking-label text-charcoal/40">{product.category}</span>
        )}
      </span>
      <span className="font-ui text-[12px] text-charcoal/60 tabular-nums shrink-0">{product.priceDisplay}</span>
    </Link>
  );
}

/**
 * Listbox under the search input. Shows recent searches and category shortcuts
 * before anything is typed, then ranked matches, then a recovery path when
 * nothing matches.
 */
export default function SearchSuggestions({
  query,
  items,
  terms,
  activeIndex,
  optionId,
  recents,
  categories,
  onPick,
  onPickTerm,
  onClearRecents,
  listboxId,
}) {
  const idle = !query.trim();

  return (
    <div
      id={listboxId}
      role="listbox"
      aria-label="Search results"
      className="max-h-[70vh] overflow-y-auto overscroll-contain"
    >
      {idle ? (
        <div className="py-2">
          {recents.length > 0 && (
            <div className="pb-2">
              <div className="flex items-center justify-between px-4 pb-1.5 pt-2">
                <p className="text-[10px] tracking-label text-charcoal/40">Recent</p>
                <button
                  type="button"
                  onClick={onClearRecents}
                  className="inline-flex items-center gap-1 text-[10px] tracking-label text-charcoal/40 hover:text-maroon transition-colors"
                >
                  Clear <X className="h-3 w-3" />
                </button>
              </div>
              {recents.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onPickTerm(term)}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-[13px] text-charcoal/80 hover:bg-charcoal/5 transition-colors"
                >
                  <Clock className="h-3.5 w-3.5 shrink-0 text-charcoal/30" />
                  {term}
                </button>
              ))}
            </div>
          )}
          {categories.length > 0 && (
            <div className={recents.length > 0 ? 'border-t border-charcoal/10 pt-2' : ''}>
              <p className="px-4 pb-1.5 pt-2 text-[10px] tracking-label text-charcoal/40">Browse</p>
              <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onPickTerm(c)}
                    className="border border-charcoal/20 px-3 py-1.5 text-[11px] tracking-label text-charcoal/70 hover:border-maroon hover:text-maroon transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : items.length === 0 ? (
        <div className="px-4 py-5">
          <p className="text-[13px] text-charcoal/70">
            Nothing on the list matches <span className="text-charcoal">{query.trim()}</span>.
          </p>
          {categories.length > 0 && (
            <>
              <p className="mt-4 text-[10px] tracking-label text-charcoal/40">Try one of these</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onPickTerm(c)}
                    className="border border-charcoal/20 px-3 py-1.5 text-[11px] tracking-label text-charcoal/70 hover:border-maroon hover:text-maroon transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {items.map((product, i) => (
            <Row
              key={product.id}
              id={optionId(i)}
              product={product}
              terms={terms}
              active={i === activeIndex}
              onPick={onPick}
            />
          ))}
          <div className="border-t border-charcoal/10">
            <button
              type="button"
              onClick={() => onPickTerm(query)}
              className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-[12px] tracking-label transition-colors ${
                activeIndex === items.length ? 'bg-charcoal/8 text-maroon' : 'text-charcoal/60 hover:text-maroon'
              }`}
              id={optionId(items.length)}
              role="option"
              aria-selected={activeIndex === items.length}
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              See all results for {query.trim()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
