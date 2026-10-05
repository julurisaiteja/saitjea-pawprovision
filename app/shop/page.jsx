'use client';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [species, setSpecies] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search).get('species');
    if (sp === 'dog' || sp === 'cat') setSpecies(sp);
  }, []);

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.tags || []).join(' ')).toLowerCase();
      const speciesOk = species === 'All' || p.species === species || p.species === 'both';
      return (cat === 'All' || p.cat === cat) && speciesOk && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, species, sort]);

  return (
    <div className="pp-shop">
      <header className="pp-shop-hero">
        <p className="pp-shop-kicker">Clay morph shelf</p>
        <h1 className="font-display">Bowl & toy aisle</h1>
        <p className="text-muted mt-2">Squishy shelves for dogs, cats, and refill routines.</p>
        <div className="pp-species-toggle">
          {['All', 'dog', 'cat'].map((s) => (
            <button key={s} type="button" className={`pp-species-btn ${species === s ? 'is-on' : ''}`} onClick={() => setSpecies(s)}>
              {s === 'All' ? 'Everyone' : s === 'dog' ? brand.nav[0] : brand.nav[1]}
            </button>
          ))}
        </div>
        <div className="pp-shop-controls">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search food, toys, litter…" className="pp-input" aria-label="Search shop" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="pp-input" aria-label="Category">
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="pp-input" aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </header>

      <div className="pp-morph-shelf">
        {list.map((p, i) => (
          <article key={p.id} className={`pp-clay-card morph-${(i % 4) + 1}`}>
            <Link href={`/product/${p.id}`} className="pp-clay-media">
              <img src={p.img} alt={p.name} />
            </Link>
            <div className="pp-clay-body">
              <div className="flex justify-between gap-2">
                <Link href={`/product/${p.id}`} className="font-extrabold">{p.name}</Link>
                <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist">{wish.includes(p.id) ? '♥' : '♡'}</button>
              </div>
              <p className="text-sm text-muted mt-1">{p.blurb}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-extrabold" style={{ color: 'var(--brand)' }}>${p.price}</span>
                <span className="text-xs text-muted">★ {p.rating} · {p.cat}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!list.length && <p className="pp-empty">No matches — try another shelf filter.</p>}
    </div>
  );
}
