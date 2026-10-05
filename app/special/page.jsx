'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { brand, products } from '../../lib/brand';
export default function SpecialPage(){
  const [species,setSpecies]=useState('dog'); const [breed,setBreed]=useState(brand.variants.breeds[0]);
  const [weight,setWeight]=useState(45); const [age,setAge]=useState('Adult');
  const cals=useMemo(()=>Math.round(weight*28*(age==='Puppy'?1.4:age==='Senior'?0.85:1)),[weight,age]);
  const recs=products.filter(p=>p.species===species||p.species==='both').slice(0,4);
  return (
    <div className="pp-special">
      <header className="pp-special-hero">
        <p className="pp-shop-kicker">{brand.nav[2]} · breed-aware</p>
        <h1>Pet profile</h1>
        <p className="text-muted mt-2">Breed-aware recommendations & calorie targets.</p>
      </header>
      <div className="mt-8 card-soft p-6 grid gap-4 md:grid-cols-2">
        <div><p className="font-semibold mb-2">Species</p><div className="flex gap-2">{['dog','cat'].map(s=><button key={s} onClick={()=>setSpecies(s)} className="chip capitalize" style={{outline:species===s?'3px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
        <div><p className="font-semibold mb-2">Breed</p><div className="flex flex-wrap gap-2">{brand.variants.breeds.map(b=><button key={b} onClick={()=>setBreed(b)} className="chip" style={{outline:breed===b?'3px solid var(--brand)':undefined}}>{b}</button>)}</div></div>
        <div><p className="font-semibold mb-2">Weight (lb)</p><input type="range" min={5} max={120} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full" /><p className="text-sm">{weight} lb</p></div>
        <div><p className="font-semibold mb-2">Life stage</p><div className="flex flex-wrap gap-2">{['Puppy','Adult','Senior'].map(a=><button key={a} onClick={()=>setAge(a)} className="chip" style={{outline:age===a?'3px solid var(--brand)':undefined}}>{a}</button>)}</div></div>
      </div>
      <div className="mt-6 card-soft p-6"><p className="font-display text-3xl" style={{color:'var(--brand)'}}>~{cals} kcal/day</p><p className="text-muted text-sm mt-1">Target for {breed} · demo estimate only</p></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{recs.map(p=>(
        <Link key={p.id} href={`/product/${p.id}`} className="card-soft overflow-hidden"><img src={p.img} alt="" className="aspect-video w-full object-cover" /><div className="p-3"><p className="font-semibold text-sm">{p.name}</p><p className="text-xs text-muted">${p.price}</p></div></Link>
      ))}</div>
    </div>
  );
}
