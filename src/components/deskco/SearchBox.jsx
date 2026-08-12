import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { fetchProducts } from '@/lib/wixProducts';
import SearchSuggestions from '@/components/deskco/SearchSuggestions';

// Navbar search: icon expands into an input, submitting sends you to /shop?q=
export default function SearchBox() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (!products.length) fetchProducts().then(setProducts);
  }, [open]);

  const q = value.trim().toLowerCase();
  const suggestions = q
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q),
        )
        .slice(0, 5)
    : [];

  const submit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setValue('');
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

  return (
    <form onSubmit={submit} className="relative flex items-center gap-2 border-b border-charcoal/40 pl-1">
      <Search className="h-4 w-4 text-charcoal/50 shrink-0" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search the list"
        className="w-32 sm:w-52 bg-transparent py-2 text-[13px] text-charcoal placeholder:text-charcoal/40 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => { setOpen(false); setValue(''); }}
        className="p-1 text-charcoal/50 hover:text-maroon transition-colors"
        aria-label="Close search"
      >
        <X className="h-4 w-4" />
      </button>
      {q && (
        <SearchSuggestions
          items={suggestions}
          onPick={() => { setOpen(false); setValue(''); }}
        />
      )}
    </form>
  );
}