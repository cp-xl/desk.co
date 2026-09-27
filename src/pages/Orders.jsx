import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import OrderRow from '@/components/orders/OrderRow';

const FILTERS = ['all', 'new', 'paid', 'fulfilled', 'cancelled'];

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState('all');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;
    base44.entities.Order.list('-ordered_at', 200).then(setOrders);
    return base44.entities.Order.subscribe(() => base44.entities.Order.list('-ordered_at', 200).then(setOrders));
  }, [isAdmin]);

  if (!isAdmin) {
    return <div className="mx-auto max-w-focus px-4 sm:px-6 py-20 text-charcoal/70">This page is for store admins only.</div>;
  }

  const shown = (orders || []).filter((o) => filter === 'all' || o.status === filter);

  return (
    <div className="mx-auto max-w-focus px-4 sm:px-6 py-12 sm:py-16">
      <p className="text-[11px] tracking-label text-maroon mb-3">Admin</p>
      <h1 className="font-display text-[44px] sm:text-[56px] leading-[0.95] text-charcoal">Orders</h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-[11px] tracking-label border transition-colors ${filter === f ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/20 text-charcoal/70 hover:border-charcoal'}`}
          >
            {f}
          </button>
        ))}
      </div>
      {orders === null ? (
        <p className="mt-10 text-charcoal/60">Loading orders…</p>
      ) : shown.length === 0 ? (
        <p className="mt-10 text-charcoal/60">No orders here yet. New Wix orders will show up automatically.</p>
      ) : (
        <ul className="mt-8">{shown.map((o) => <OrderRow key={o.id} order={o} />)}</ul>
      )}
    </div>
  );
}