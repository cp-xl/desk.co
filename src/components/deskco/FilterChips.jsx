import React from 'react';

export default function FilterChips({ label, options, active, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] tracking-label text-charcoal/40 mr-2">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(active === o.id ? null : o.id)}
          className={`px-4 py-2 text-[11px] tracking-label border transition-colors ${
            active === o.id
              ? 'bg-charcoal text-cream border-charcoal'
              : 'border-charcoal/25 text-charcoal/70 hover:border-charcoal'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}