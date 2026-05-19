"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, RefreshCw, X } from 'lucide-react';
import { getProducts, getCategories } from '../../lib/api';
import ProductCard from '../../components/ProductCard';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialB2b = searchParams.get('b2b') === 'true';
  const initialFeatured = searchParams.get('is_featured') === 'true';
  const initialBestseller = searchParams.get('is_bestseller') === 'true';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [brand, setBrand] = useState('');
  const [isFeatured, setIsFeatured] = useState(initialFeatured);
  const [isBestseller, setIsBestseller] = useState(initialBestseller);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const catRes = await getCategories();
        if (catRes.categories) setCategories(catRes.categories);

        const prodRes = await getProducts({
          category,
          search,
          brand,
          is_featured: isFeatured ? true : undefined,
          is_bestseller: isBestseller ? true : undefined,
          limit: 50
        });

        if (prodRes.products) {
          // If B2B mode, adjust prices or filter B2B specific items if needed
          setProducts(prodRes.products);
        }
      } catch (err) {
        console.error('Error fetching shop data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [category, search, brand, isFeatured, isBestseller]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // URL update can be done if needed, but state already triggers fetch
  };

  const resetFilters = () => {
    setCategory('');
    setSearch('');
    setBrand('');
    setIsFeatured(false);
    setIsBestseller(false);
    router.push('/shop');
  };

  const brands = ['Cipla', 'Sun Pharma', 'GSK', 'Abbott', 'P&G', 'Omron', 'Accu-Chek', 'Himalaya', 'Dabur', 'Cetaphil', 'Dettol', 'Johnson & Johnson', 'Nestle'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      {/* Header */}
      <div className="flex flex-col mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          All Products
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Browse our complete catalog of genuine medicines, healthcare devices, and wellness products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2"><Filter size={16} /> Filters</h3>
            <button onClick={resetFilters} className="text-xs text-medical-blue hover:underline font-semibold flex items-center gap-1">
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Search Catalog</label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search medicines, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </form>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2.5">Category</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
              <button
                onClick={() => setCategory('')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${category === '' ? 'bg-blue-50 text-medical-blue font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${category === cat.id ? 'bg-blue-50 text-medical-blue font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="flex items-center gap-2"><span>{cat.icon}</span> {cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2.5">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white font-medium text-slate-700"
            >
              <option value="">All Brands</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Status Filters */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-medical-blue focus:ring-medical-blue"
              />
              <span className="text-xs font-medium text-slate-700">Featured Products Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-medical-blue focus:ring-medical-blue"
              />
              <span className="text-xs font-medium text-slate-700">Best Sellers Only</span>
            </label>
          </div>


        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filters Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500">Active Filters:</span>
              {category && <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-700 flex items-center gap-1">{category} <button onClick={() => setCategory('')}><X size={12} /></button></span>}
              {search && <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-700 flex items-center gap-1">Search: "{search}" <button onClick={() => setSearch('')}><X size={12} /></button></span>}
              {brand && <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-700 flex items-center gap-1">Brand: {brand} <button onClick={() => setBrand('')}><X size={12} /></button></span>}
              {isFeatured && <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-700 flex items-center gap-1">Featured <button onClick={() => setIsFeatured(false)}><X size={12} /></button></span>}
              {isBestseller && <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium text-slate-700 flex items-center gap-1">Best Seller <button onClick={() => setIsBestseller(false)}><X size={12} /></button></span>}
              {!category && !search && !brand && !isFeatured && !isBestseller && <span className="text-slate-400 italic">None (Showing All Products)</span>}
            </div>

            <span className="text-xs font-bold text-slate-700">Showing {products.length} Products</span>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl"></div>)}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center justify-center">
              <SlidersHorizontal size={48} className="text-slate-300 mb-4" />
              <h3 className="font-bold text-lg text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">We couldn't find any products matching your selected filters. Try resetting filters or searching for something else.</p>
              <button onClick={resetFilters} className="mt-6 bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-medical-blue2 transition shadow-blue">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading shop catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
