import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 py-2.5 text-[11px] sm:text-[12px] tracking-label">
          <span>Hand chosen items</span>
          <span className="h-3 w-px bg-amber/40" />
          <Link to="/gifts" className="text-amber hover:underline underline-offset-4">
            Something better than a gift card
          </Link>
        </div>
      </div>
    </div>
  );
}