import React from 'react';
import { Link } from 'react-router-dom';

// Simple info pages for shipping / returns / privacy / terms.
export default function InfoPage({ title, body }) {
  return (
    <div className="bg-cream min-h-[70vh]">
      <div className="mx-auto max-w-focus px-4 sm:px-6 py-16 sm:py-24">
        <Link to="/" className="text-[11px] tracking-label text-maroon hover:underline">← Back to desk</Link>
        <h1 className="font-display text-[44px] sm:text-[56px] leading-none text-charcoal mt-6">{title}</h1>
        <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-[1.7] text-charcoal/75">
          {body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

export function Shipping() {
  return (
    <InfoPage
      title="Shipping"
      body={[
        'Orders arrive in 5 to 12 business days.',
        'Shipping is calculated at checkout based on your address.',
      ]}
    />
  );
}

export function Privacy() {
  return (
    <InfoPage
      title="Privacy"
      body={[
        'We collect only what is needed to fulfil your order: name, email, and shipping address.',
        'We do not sell or share your data with third parties for marketing.',
        'Payment is processed through our store provider. We never see or store your card details.',
        'You can request deletion of your account and data at any time by contacting us.',
      ]}
    />
  );
}

export function Terms() {
  return (
    <InfoPage
      title="Terms"
      body={[
        'By placing an order you agree to these terms. Prices are in AUD and include GST where applicable.',
        'All product images are representative. Small variations in ceramic, wood, and concrete finishes are inherent to the materials.',
        'Ownership of goods passes to you on dispatch. We are not liable for delays caused by carriers.',
      ]}
    />
  );
}