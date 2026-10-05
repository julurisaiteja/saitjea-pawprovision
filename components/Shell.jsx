'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

const links = [
  { href: '/shop?species=dog', label: brand.nav[0] },
  { href: '/shop?species=cat', label: brand.nav[1] },
  { href: '/special', label: brand.nav[2] },
  { href: '/#guides', label: brand.nav[3] },
];

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div data-diamond="batch-1" className="pp-shell">
      <a href="#main" className="skip-link">Skip to pet shop</a>
      <div className="offer-banner pp-banner">{brand.offer.code} · {brand.offer.label}</div>
      <header className="pp-header">
        <div className="pp-header-inner">
          <Link href="/" className="pp-logo">
            <span className="pp-blob-mark" aria-hidden="true" />
            <span className="font-display pp-logo-text">{brand.name}</span>
          </Link>
          <nav className="pp-nav" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="pp-nav-link">{l.label}</Link>
            ))}
            <Link href="/cart" className="btn-brand pp-cart">Cart{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
          <div className="pp-mobile">
            <Link href="/cart" className="btn-brand !py-2 !px-3 text-sm">Cart {count || ''}</Link>
            <button type="button" className="pp-burger" aria-expanded={open} aria-controls="pp-drawer" onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        <div id="pp-drawer" className="pp-drawer" hidden={!open}>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>Cart{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="pp-footer">
        <div className="pp-footer-grid">
          <div>
            <p className="font-display pp-footer-brand">{brand.name}</p>
            <p className="text-muted mt-2 max-w-md">{brand.description}</p>
          </div>
          <div>
            <p className="pp-footer-h">Sniff around</p>
            <ul>
              <li><Link href="/shop">{brand.nav[0]} & {brand.nav[1]}</Link></li>
              <li><Link href="/special">{brand.nav[2]}</Link></li>
              <li><Link href="/#guides">{brand.nav[3]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="pp-footer-h">Trust dens</p>
            <ul>
              <li>Secure checkout UI (demo)</li>
              <li>Wishlist & auto-refill</li>
              <li>{brand.aiName}</li>
            </ul>
          </div>
          <div>
            <p className="pp-footer-h">Treat mail</p>
            <form className="pp-mail" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email for refill deals" aria-label="Email for refill deals" />
              <button type="submit" className="btn-brand !py-2">Join</button>
            </form>
          </div>
        </div>
        <p className="pp-legal">Demo storefront · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/special" className="btn-brand !py-2 !px-4 text-sm">Pet profile</Link>
        <Link href="/shop" className="btn-ghost !py-2 !px-4 text-sm">Shop</Link>
      </div>
      <AIAssistant />
    </div>
  );
}
