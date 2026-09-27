import React from 'react';
import moment from 'moment';

const TONE = {
  new: 'bg-charcoal/10 text-charcoal',
  paid: 'bg-amber/20 text-charcoal',
  fulfilled: 'bg-charcoal text-cream',
  cancelled: 'bg-maroon/15 text-maroon',
};

export default function OrderRow({ order }) {
  return (
    <li className="border-t border-charcoal/15 py-5 grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-3 sm:gap-6">
      <div>
        <p className="font-display text-2xl text-charcoal">#{order.order_number}</p>
        <p className="text-[12px] text-charcoal/60">{order.ordered_at ? moment(order.ordered_at).format('D MMM, h:mma') : ''}</p>
      </div>
      <div className="min-w-0">
        <p className="text-[15px] text-charcoal">{order.customer_name || 'Guest'}</p>
        <p className="text-[13px] text-charcoal/60 truncate">{order.email}</p>
        <ul className="mt-2 text-[13px] text-charcoal/75 space-y-0.5">
          {(order.line_items || []).map((i, idx) => (
            <li key={idx}>{i.quantity} × {i.name}</li>
          ))}
        </ul>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end gap-3">
        <span className={`px-2.5 py-1 text-[11px] tracking-label ${TONE[order.status] || TONE.new}`}>{order.status}</span>
        <p className="text-[15px] text-charcoal font-medium">{order.total}</p>
      </div>
    </li>
  );
}