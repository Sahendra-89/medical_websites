"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, ArrowRight, Star, CheckCircle, FileText,
  Sparkles, TrendingUp, ChevronRight, Clock, ShieldCheck
} from 'lucide-react';
import { getProducts, getCategories } from '../lib/api';
import ProductCard from '../components/ProductCard';

const REVIEWS = [
  { id: 1, user: 'Rajesh K.', loc: 'Gurgaon Sector 14', rating: 5, comment: 'Fast delivery and genuine products. Ordered BP monitor and monthly medicines — all arrived same day!', date: '2 days ago', verified: true },
  { id: 2, user: 'Priya S.', loc: 'DLF Phase 3', rating: 5, comment: 'Found all my monthly medicines at great discounts. Prescription upload was very convenient.', date: '1 week ago', verified: true },
  { id: 3, user: 'Amit G.', loc: 'Faridabad', rating: 4, comment: 'Good range of products. Same-day delivery in Gurgaon is amazing. Highly recommended.', date: '2 weeks ago', verified: true },
  { id: 4, user: 'Dr. Sharma', loc: 'City Clinic, Delhi', rating: 5, comment: 'As a clinic owner I love the bulk ordering. Great B2B prices and reliable service.', date: '1 month ago', verified: true },
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const [catRes, featRes, bestRes] = await Promise.all([
          getCategories(),
          getProducts({ is_featured: true, limit: 4 }),
          getProducts({ is_bestseller: true, limit: 4 }),
        ]);
        if (catRes.categories) setCategories(catRes.categories);
        if (featRes.products) setFeaturedProducts(featRes.products);
        if (bestRes.products) setBestSellers(bestRes.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/shop?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-medical-blue via-blue-700 to-medical-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 lg:py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 border border-white/10 mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Same-Day Delivery · Gurgaon, Delhi & Faridabad
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
              India's Trusted<br />
              <span className="text-blue-200">Online Pharmacy</span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
              Order genuine medicines, upload prescriptions, and get expert pharmacist-verified delivery — up to <strong className="text-white">30% OFF</strong> every day.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-xl mx-auto mb-4">
              <Search size={18} className="text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder='Search "Crocin", "Cipla"…'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3.5 px-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent min-w-0"
              />
              <button type="submit" className="bg-medical-blue text-white font-bold px-4 sm:px-6 py-3.5 text-sm hover:bg-blue-700 transition flex-shrink-0">
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-white">Popular:</span>
              {['Crocin', 'Amoxicillin', 'Omron BP', 'Liv.52', 'Vitamin D3'].map(tag => (
                <Link key={tag} href={`/shop?search=${tag}`} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">
                  {tag}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <Link href="/shop" className="bg-white text-medical-blue font-bold px-7 py-3.5 rounded-2xl text-sm shadow-lg hover:bg-blue-50 transition flex items-center gap-2">
                Explore All Products <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Promo Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="text-2xl flex-shrink-0">🎉</div>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">Limited Offer</div>
              <div className="text-sm font-black text-white">₹100 OFF above ₹999</div>
              <div className="text-[10px] text-blue-200 mt-0.5">Code: <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold">FLAT100</span></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="text-2xl flex-shrink-0">🚚</div>
            <div>
              <div className="text-xs font-bold text-green-300 uppercase tracking-wide">Free Delivery</div>
              <div className="text-sm font-black text-white">On orders above ₹499</div>
              <div className="text-[10px] text-blue-200 mt-0.5">Same-day in Gurgaon &amp; NCR</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="text-2xl flex-shrink-0">🏥</div>
            <div>
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wide">B2B Portal</div>
              <div className="text-sm font-black text-white">Clinic &amp; Pharmacy Pricing</div>
              <div className="text-[10px] text-blue-200 mt-0.5">GST invoices + bulk stock</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── CATEGORIES ── */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Shop by Category</h2>
              <p className="text-sm text-slate-500 mt-1">Explore our wide range of medicines and healthcare products</p>
            </div>
            <Link href="/categories" className="text-xs font-bold text-medical-blue hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-3xl flex items-center justify-center group-hover:scale-110 transition duration-300 mb-3 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xs text-slate-800 group-hover:text-medical-blue transition leading-tight">{cat.name}</h3>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <TrendingUp size={13} /> Best Sellers
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Most Popular Products</h2>
              <p className="text-sm text-slate-500 mt-1">Top-rated medicines ordered by thousands of customers</p>
            </div>
            <Link href="/shop?is_bestseller=true" className="text-xs font-bold text-medical-blue hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1,2,3,4].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>



      {/* ── FEATURED ── */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Sparkles size={13} /> Featured
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Featured Medicines & Devices</h2>
              <p className="text-sm text-slate-500 mt-1">Handpicked healthcare devices and prescription medicines</p>
            </div>
            <Link href="/shop?is_featured=true" className="text-xs font-bold text-medical-blue hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1,2,3,4].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Choose Paridhi Pharma?</h2>
            <p className="text-sm text-slate-500 mt-2">Trusted by thousands of families and clinics across Delhi NCR</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <ShieldCheck size={28} />, color: 'text-medical-blue bg-blue-50', title: '100% Genuine', sub: 'Every product sourced from licensed manufacturers only' },
              { icon: <Clock size={28} />, color: 'text-orange-600 bg-orange-50', title: 'Same-Day Delivery', sub: 'Order before 4 PM for guaranteed same-day delivery' },
              { icon: <FileText size={28} />, color: 'text-sky-600 bg-sky-50', title: 'Easy Rx Upload', sub: 'Upload prescription & get medicines delivered to your door' },
              { icon: <Star size={28} />, color: 'text-amber-600 bg-amber-50', title: '4.8★ Rated', sub: 'Loved by 5000+ customers across Gurgaon and NCR' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-slate-100 hover:shadow-card hover:-translate-y-1 transition duration-300 bg-slate-50">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Our Customers Say</h2>
            <p className="text-sm text-slate-500 mt-2">Trusted by families, clinics, and retail buyers across Delhi NCR</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {REVIEWS.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic flex-1">"{r.comment}"</p>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      {r.user} {r.verified && <CheckCircle size={11} className="text-green-500" />}
                    </div>
                    <div className="text-[10px] text-slate-400">{r.loc}</div>
                  </div>
                  <span className="text-[10px] text-slate-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
