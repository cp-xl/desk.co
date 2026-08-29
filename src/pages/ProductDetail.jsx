import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { fetchProductBySlug, fetchProducts } from '@/lib/wixProducts';
import { buildHeroUrl } from '@/lib/heroImage';
import { renderRichText } from '@/lib/richText';
import { useCart } from '@/lib/CartContext';
import ProductCard from '@/components/deskco/ProductCard';
import TrustBar from '@/components/deskco/TrustBar';

export default function ProductDetail() {
  const { slug } = useParams();
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
    setQuantity(1);
    fetchProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        if (p?.variants?.length) setVariant(p.variants[0].value);
      })
      .finally(() => {
        setLoading(false);
        // Related products load after the main product so they never compete
        // with the hero image for bandwidth.
        fetchProducts().then((all) => setRelated(all.filter((p) => p.slug !== slug).slice(0, 4)));
      });
  }, [slug]);

  // Parsing the description walks a DOM tree, so keep it off the re-render
  // path that variant and quantity clicks trigger.
  const description = useMemo(
    () => renderRichText(product?.descriptionHtml),
    [product?.descriptionHtml]
  );

  if (loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-focus px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 aspect-square bg-charcoal/8 animate-pulse" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 bg-charcoal/8 animate-pulse w-1/3" />
            <div className="h-10 bg-charcoal/8 animate-pulse w-2/3" />
            <div className="h-6 bg-charcoal/8 animate-pulse w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-4xl text-charcoal">Not on the list</p>
        <Link to="/shop" className="mt-4 text-[12px] tracking-label text-maroon hover:underline">
          ← Back to the shop
        </Link>
      </div>
    );
  }

  const gallery = product.gallery.length ? product.gallery : [product.image].filter(Boolean);

  // Selecting an option shows its own image: the one linked to that choice in
  // Wix, otherwise the gallery shot in the same position as the choice.
  const selectVariant = (v) => {
    setVariant(v.value);
    const index = v.image
      ? gallery.indexOf(v.image)
      : product.variants.findIndex((x) => x.value === v.value);
    if (index >= 0 && index < gallery.length) setActiveImage(index);
  };

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-focus px-4 sm:px-6 pt-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[11px] tracking-label text-charcoal/50 hover:text-maroon transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to shop
        </Link>
      </div>

      <div className="mx-auto max-w-focus px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-square overflow-hidden bg-charcoal/5">
                {gallery[activeImage] && (
                  <img
                    src={buildHeroUrl(gallery[activeImage])}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="eager"
                    // Lowercase on purpose: React 18 has no fetchPriority prop,
                    // so the camelCase form is dropped with a warning while an
                    // unknown lowercase attribute is passed through to the DOM.
                    // eslint-disable-next-line react/no-unknown-property
                    fetchpriority="high"
                    decoding="async"
                  />
                )}
                {product.badge && (
                  <span className="absolute top-5 left-5 bg-amber text-charcoal text-[10px] tracking-label px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>
              {gallery.length > 1 && (
                // Scrolls rather than wraps: a long gallery would otherwise push
                // the page sideways on a phone.
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`Show image ${i + 1} of ${gallery.length}`}
                      aria-current={activeImage === i}
                      className={`relative h-20 w-20 shrink-0 snap-start overflow-hidden bg-charcoal/5 border-2 transition-colors ${
                        activeImage === i ? 'border-charcoal' : 'border-transparent hover:border-charcoal/30'
                      }`}
                    >
                      <Image src={g} alt="" className="h-full w-full object-cover" fittingType="fill" quality={70} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            {product.category && (
              <p className="text-[11px] tracking-label text-maroon mb-3">{product.category}</p>
            )}
            <h1 className="font-body text-[34px] sm:text-[42px] leading-tight text-charcoal">{product.name}</h1>
            <p className="mt-3 font-ui text-xl text-charcoal tabular-nums">{product.priceDisplay}</p>
            <p className="mt-2 text-[12px] tracking-label text-charcoal/50">
              {product.inStock ? 'In stock' : 'Not in stock yet.'}
            </p>

            {(description || product.blurb) && (
              <div className="mt-8 border-t border-charcoal/15 pt-5">
                {description ? (
                  <div className="space-y-3">{description}</div>
                ) : (
                  <p className="text-[15px] leading-[1.7] text-charcoal/80">{product.blurb}</p>
                )}
              </div>
            )}

            <div className="mt-6 border-t border-charcoal/15 pt-5">
              <p className="text-[11px] tracking-label text-charcoal/40 mb-2">Why it is on the list</p>
              <p className="text-[15px] leading-[1.65] text-charcoal/70">
                It does one thing properly, it looks like someone designed it on purpose, and it
                lands in the range where a gift still reads as a decision.
              </p>
            </div>

            {product.variants.length > 1 && (
              <div className="mt-8">
                <p className="text-[11px] tracking-label text-charcoal/50 mb-3">
                  {product.optionName || 'Option'}: {variant}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => selectVariant(v)}
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

            <div className="mt-6 flex items-center gap-5">
              <span className="text-[11px] tracking-label text-charcoal/50">Quantity</span>
              <div className="flex items-center border-2 border-charcoal/30">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-ui text-[14px] tabular-nums w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                disabled={!product.inStock}
                onClick={() => addItem(product, variant, quantity)}
                className="w-full bg-amber text-charcoal py-4 text-[12px] tracking-label font-semibold hover:bg-[#d4a23a] transition-colors disabled:bg-charcoal/20 disabled:text-charcoal/40 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to cart' : 'Not in stock yet'}
              </button>
            </div>

          </div>
        </div>
      </div>

      <TrustBar />

      {related.length > 0 && (
        <section className="bg-cream py-14 sm:py-20">
          <div className="mx-auto max-w-focus px-4 sm:px-6">
            <h2 className="font-display text-[32px] sm:text-[40px] text-charcoal mb-8">More from the shop</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}