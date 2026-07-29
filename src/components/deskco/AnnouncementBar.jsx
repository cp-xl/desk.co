import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 py-2.5 text-[11px] sm:text-[12px] tracking-label">
          <span className="hidden sm:inline">Free shipping over $80 — Australian orders</span>
          <span className="sm:hidden">Free shipping over $80</span>
          <span className="h-3 w-px bg-amber/40" />
          <span className="text-amber">New: The Sentinel series is in studio</span>
        </div>
      </div>
    </div>
  );
}