import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { fetchProducts } from '@/lib/wixProducts';
import {
  searchProducts,
  topCategories,
  readRecentSearches,
  rememberSearch,
  clearRecentSearches,
} from '@/lib/search';
import SearchSuggestions from '@/components/deskco/SearchSuggestions';
import { useIsMobile } from '@/hooks/use-mobile';

const MAX_SUGGESTIONS = 6;
const LISTBOX_ID = 'search-suggestions';

// Navbar search. On a wide screen the icon expands into an inline combobox; on
// a phone it opens a full-screen sheet, because a 128px input inside a 16px-tall
// header is not a search experience.
export default function SearchBox() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recents, setRecents] = useState([]);
  const inputRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    setRecents(readRecentSearches());
    if (!products.length) fetchProducts().then(setProducts);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setValue('');
    setActiveIndex(-1);
  }, []);

  // Clicking anywhere else dismisses the inline (desktop) combobox.
  useEffect(() => {
    if (!open || isMobile) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, isMobile, close]);

  // The sheet covers the page, so stop the page behind it from scrolling.
  useEffect(() => {
    if (!open || !isMobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, isMobile]);

  const terms = useMemo(() => value.trim().split(/\s+/).filter(Boolean), [value]);
  const suggestions = useMemo(
    () => searchProducts(products, value, { limit: MAX_SUGGESTIONS }),
    [products, value],
  );
  const categories = useMemo(() => topCategories(products), [products]);

  // The trailing "see all results" row is selectable too.
  const optionCount = value.trim() && suggestions.length > 0 ? suggestions.length + 1 : 0;

  // A typed query always renders something, if only the "nothing matches"
  // recovery block. Idle with no recents and no categories yet renders nothing,
  // and the desktop dropdown's border and shadow would frame the emptiness.
  const hasSuggestions = Boolean(value.trim()) || recents.length > 0 || categories.length > 0;
  const optionId = (i) => `${LISTBOX_ID}-option-${i}`;

  const goToResults = (term) => {
    const q = term.trim();
    if (!q) return;
    rememberSearch(q);
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    close();
  };

  const goToProduct = (product) => {
    rememberSearch(value.trim() || product.name);
    close();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (optionCount === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % optionCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? optionCount - 1 : i - 1));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const picked = activeIndex >= 0 && activeIndex < suggestions.length ? suggestions[activeIndex] : null;
    if (picked) {
      rememberSearch(value.trim());
      navigate(`/product/${picked.slug}`);
      close();
      return;
    }
    goToResults(value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setActiveIndex(-1);
  };

  const suggestionProps = {
    query: value,
    items: suggestions,
    terms,
    activeIndex,
    optionId,
    recents,
    categories,
    listboxId: LISTBOX_ID,
    onPick: goToProduct,
    onPickTerm: goToResults,
    onClearRecents: () => {
      clearRecentSearches();
      setRecents([]);
    },
  };

  const inputAria = {
    role: 'combobox',
    // The mobile sheet always renders the listbox; the desktop dropdown only
    // when it has something in it, and aria-expanded has to agree with that.
    'aria-expanded': isMobile || hasSuggestions,
    'aria-controls': LISTBOX_ID,
    'aria-autocomplete': 'list',
    'aria-activedescendant': activeIndex >= 0 ? optionId(activeIndex) : undefined,
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-charcoal hover:text-maroon transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  if (isMobile) {
    // Portalled for the same reason as MobileMenu: the header's backdrop-blur
    // would otherwise become the containing block for a fixed child.
    return createPortal(
      <div className="fixed inset-0 z-[70] flex flex-col bg-cream">
        <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-charcoal/15 px-4 h-16">
          <Search className="h-5 w-5 shrink-0 text-charcoal/40" />
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Search the list"
            aria-label="Search products"
            className="flex-1 bg-transparent text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            {...inputAria}
          />
          <button type="button" onClick={close} aria-label="Close search" className="p-2 -mr-2 text-charcoal/60">
            <X className="h-5 w-5" />
          </button>
        </form>
        <div className="flex-1 overflow-y-auto">
          <SearchSuggestions {...suggestionProps} />
        </div>
      </div>,
      document.body,
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <form onSubmit={onSubmit} className="flex items-center gap-2 border-b border-charcoal/40 pl-1">
        <Search className="h-4 w-4 shrink-0 text-charcoal/50" />
        <input
          ref={inputRef}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search the list"
          aria-label="Search products"
          className="w-48 lg:w-60 bg-transparent py-2 text-[13px] text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          {...inputAria}
        />
        <button
          type="button"
          onClick={close}
          className="p-1 text-charcoal/50 hover:text-maroon transition-colors"
          aria-label="Close search"
        >
          <X className="h-4 w-4" />
        </button>
      </form>
      {hasSuggestions && (
        <div className="absolute top-full right-0 mt-2 w-80 border border-charcoal/15 bg-cream shadow-lg z-50">
          <SearchSuggestions {...suggestionProps} />
        </div>
      )}
    </div>
  );
}
