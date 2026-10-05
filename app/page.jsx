'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

function Stars({ n }) {
  return <span className="stars">{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>;
}

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live = typeof brand.stats[0].value === 'number' ? brand.stats[0].value + (tick % 7) : brand.stats[0].value;

  return (
    <>
      <section className="clay-hero">
        <div className="clay-blob">
          <video autoPlay muted loop playsInline poster={brand.poster}>
            <source src={brand.video} type="video/mp4" />
          </video>
        </div>
        <div className="clay-copy">
          <p className="clay-brand reveal-pop">{brand.name}</p>
          <h1 className="mt-3 text-2xl font-extrabold reveal-pop delay-1">{brand.tagline}</h1>
          <p className="mt-3 text-muted reveal-pop delay-2">{brand.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 reveal-pop delay-3">
            <Link href="/special" className="btn-brand">Pet profile</Link>
            <Link href="/shop" className="btn-ghost">Shop bowls</Link>
          </div>
        </div>
      </section>

      <section className="pp-offer-strip" aria-label="Offer">
        <p><strong>{brand.offer.code}</strong> · {brand.offer.label}</p>
      </section>

      <div className="clay-shelf">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <img src={p.img} alt={p.name} />
            <p className="font-extrabold">{p.name}</p>
            <p className="text-sm text-muted">${p.price}</p>
          </Link>
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-4 py-12 grid gap-4 md:grid-cols-3">
        {brand.stats.map((s, i) => (
          <div key={s.label} className="card-soft p-6 text-center pp-stat">
            <p className="clay-brand" style={{ fontSize: '2.8rem' }}>{i === 0 ? live : s.value}</p>
            <p className="font-bold mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      <section id="guides" className="pp-guides">
        <h2 className="font-display clay-brand" style={{ fontSize: 'clamp(2.4rem,6vw,3.8rem)' }}>{brand.nav[3]}</h2>
        <p className="text-muted mt-2">Breed-aware starting points — pair with the pet profile for calorie targets.</p>
        <div className="pp-guide-grid">
          {brand.variants.breeds.slice(0, 4).map((b) => (
            <Link key={b} href="/special" className="card-soft p-5 pp-guide-card">
              <p className="font-extrabold text-xl">{b}</p>
              <p className="text-sm text-muted mt-2">Open profile · get bowl picks</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pp-refill">
        <div className="card-soft p-8">
          <h2 className="font-display text-3xl" style={{ color: 'var(--brand)' }}>{brand.nav[2]} without the scramble</h2>
          <p className="text-muted mt-2">Auto-ship every 4, 6, or 8 weeks. Pause whenever life (or the dog) gets chaotic.</p>
          <Link href="/special" className="btn-brand mt-6">Set a refill</Link>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-5xl px-4 pb-20 grid gap-4 md:grid-cols-2">
        {brand.reviews.map((r) => (
          <blockquote key={r.name} className="card-soft p-5">
            <Stars n={r.stars} />
            <p className="mt-3 font-bold text-lg">&ldquo;{r.text}&rdquo;</p>
            <footer className="mt-3 text-sm">{r.name}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
