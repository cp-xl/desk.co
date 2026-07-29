import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { fetchProduct, fetchProducts } from '@/lib/wixProducts';
import { useCart } from '@/lib/CartContext';
import ProductCard from '@/components/deskco/ProductCard';
import Reveal from '@/components/deskco/Reveal';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    fetchProduct(id)
      .then(p => {
        setProduct(p);
        if (p?.variants?.length > 0) setVariant(p.variants[0].value);
      })
      .finally(() => setLoading(false));

    fetchProducts().then(all => {
      setRelated(all.filter(p => p.id !== id).slice(0, 4));
    });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-focus px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="aspect-square bg-charcoal/8 animate-pulse" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-4 bg-charcoal/8 animate-pulse w-1/3" />
              <div className="h-10 bg-charcoal/8 animate-pulse w-2/3" />
              <div className="h-6 bg-charcoal/8 animate-pulse w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-4xl text-charcoal">Buddy not found</p>
        <Link to="/collection" className="mt-4 text-[12px] tracking-label text-maroon hover:underline">
          ← Back to the catalog
        </Link>
      </div>
    );
  }

  const gallery = product.gallery.length > 1 ? product.gallery : [product.image, product.image].filter(Boolean);

  return (
    <div className="bg-cream">
      {/* breadcrumb */}
      <div className="mx-auto max-w-focus px-4 sm:px-6 pt-6">
        <Link to="/collection" className="inline-flex items-center gap-2 text-[11px] tracking-label text-charcoal/50 hover:text-maroon transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to catalog
        </Link>
      </div>

      <div className="mx-auto max-w-focus px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: sticky gallery */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-square overflow-hidden bg-charcoal/5">
                {gallery[activeImage] && (
                  <Image
                    src={gallery[activeImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    fittingType="fill"
                  />
                )}
                {product.badge && (
                  <span className="absolute top-5 left-5 bg-amber text-charcoal text-[10px] tracking-label px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative h-20 w-20 overflow-hidden bg-charcoal/5 border-2 transition-colors ${activeImage === i ? 'border-charcoal' : 'border-transparent'}`}
                    >
                      <Image src={g} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" fittingType="fill" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: spec sheet */}
          <div className="lg:col-span-5">
            {product.personality && (
              <Reveal variant="slide-in-left" className="text-[11px] tracking-label text-maroon mb-3">
                {product.personality}
              </Reveal>
            )}
            <Reveal variant="fade-up">
              <h1 className="font-display text-[48px] sm:text-[56px] leading-none text-charcoal">
                {product.name}
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={80}>
              <p className="mt-4 text-2xl font-display text-charcoal">{product.priceDisplay}</p>
            </Reveal>

            {/* description */}
            {product.blurb && (
              <div className="mt-8 border-t border-charcoal/15">
                <p className="text-[11px] tracking-label text-charcoal/40 pt-4 mb-3">About</p>
                <p className="text-[15px] leading-relaxed text-charcoal/80">{product.blurb}</p>
              </div>
            )}

            {/* variant selector */}
            {product.variants.length > 1 && (
              <div className="mt-8">
                <p className="text-[11px] tracking-label text-charcoal/50 mb-3">
                  Option — {variant}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v.value)}
                      className={`px-5 py-3 text-[12px] tracking-label border-2 transition-colors ${
                        variant === v.value
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-charcoal/30 text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {variant === v.value && <Check className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* quantity */}
            <div className="mt-6 flex items-center gap-5">
              <span className="text-[11px] tracking-label text-charcoal/50">Quantity</span>
              <div className="flex items-center border-2 border-charcoal/30">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2.5 text-charcoal hover:bg-charcoal/5 transition-colors" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-[14px] tabular-nums w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2.5 text-charcoal hover:bg-charcoal/5 transition-colors" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* add to cart or redirect to Wix checkout */}
            <div className="mt-8 space-y-3">
              <button
                disabled={!product.inStock}
                onClick={() => addItem(product, variant, quantity)}
                className="w-full bg-amber text-charcoal py-4 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors disabled:bg-charcoal/20 disabled:text-charcoal/40 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to company' : 'Currently sold out'}
              </button>

              {product.wixUrl && (
                <a
                  href={product.wixUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full border-2 border-charcoal text-charcoal text-center py-4 text-[12px] tracking-label hover:bg-charcoal hover:text-cream transition-colors"
                >
                  View on store →
                </a>
              )}
            </div>

            <p className="mt-4 text-[11px] tracking-label text-charcoal/40 text-center">
              Ships in 2–3 days · Free over $80 · 30-day returns
            </p>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="bg-cream border-t border-charcoal/10 py-14 sm:py-20">
          <div className="mx-auto max-w-focus px-4 sm:px-6">
            <Reveal variant="fade-up">
              <h2 className="font-display text-[32px] sm:text-[40px] text-charcoal mb-8 sm:mb-10">
                Other company
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}