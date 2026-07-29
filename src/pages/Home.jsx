import React, { useState, useEffect } from 'react';
import HeroSplit from '@/components/home/HeroSplit';
import PersonalityPicker from '@/components/home/PersonalityPicker';
import CatalogGrid from '@/components/home/CatalogGrid';
import ThinkingBand from '@/components/home/ThinkingBand';
import TrustBar from '@/components/deskco/TrustBar';
import Marquee from '@/components/deskco/Marquee';
import FaqAccordion from '@/components/deskco/FaqAccordion';
import { fetchProducts } from '@/lib/wixProducts';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <HeroSplit leadProduct={products[0] || null} />
      <TrustBar />
      <PersonalityPicker />
      <CatalogGrid products={products} loading={loading} />
      <Marquee />
      <ThinkingBand />
      <FaqAccordion />
    </div>
  );
}