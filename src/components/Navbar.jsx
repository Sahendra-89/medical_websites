"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, Heart, User, Menu, X,
  ChevronDown, MapPin, Clock,
  Pill, Activity, Stethoscope, FlaskConical, BookOpen, BadgePercent
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getCategories, getProducts } from '../lib/api';

const OFFERS = [
  '🎉 Use code FLAT100 → ₹100 OFF on orders above ₹999',
  '🚚 Same-Day Delivery in Gurgaon, Delhi & Faridabad',
  '💊 Up to 30% OFF on generics',
  '📋 Prescription medicines — Upload Rx in minutes',
  '🏥 B2B Bulk Pricing for Clinics & Pharmacies — Register Now',
  '⭐ 5000+ Genuine Products | Licensed Pharmacy HR-GUR-2026-98765',
];



// ── Main category nav links (PharmEasy-style)
const NAV_LINKS = [
  { label: 'Medicine',        href: '/shop?category=otc',          icon: <Pill size={14} />,          dot: false, mega: false },
  { label: 'Healthcare',      href: '/shop?category=wellness',      icon: <Activity size={14} />,      dot: false, mega: 'healthcare' },
  { label: 'Doctor Consult',  href: '/contact',                     icon: <Stethoscope size={14} />,   dot: true,  mega: false },
  { label: 'Lab Tests',       href: '/shop?category=devices',       icon: <FlaskConical size={14} />,  dot: false, mega: false },
  { label: 'Offers',          href: '/shop?offers=true',            icon: <BadgePercent size={14} />,  dot: false, mega: false },
  { label: 'Health Insights', href: '/blog',                        icon: <BookOpen size={14} />,      dot: false, mega: false },
];

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dynamicCategories, setDynamicCategories] = useState([]);

  const dropdownRef = useRef(null);
  const router = useRouter();
  const { cart, wishlist } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);

    // Fetch dynamic categories
    getCategories().then(res => {
      if (res.categories && res.categories.length > 0) {
        setDynamicCategories(res.categories);
      }
    });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${encodeURIComponent(search)}`);
      setMobileMenu(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>

      {/* ── Offer Ticker ── */}
      <div className="bg-medical-blue text-white text-[11px] font-medium py-1.5 overflow-hidden ticker-wrap">
        <div className="ticker-inner gap-16 px-4">
          {[...OFFERS, ...OFFERS].map((offer, i) => (
            <span key={i} className="mr-12 inline-flex items-center gap-2">{offer}</span>
          ))}
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-blue to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-premium">
            P
          </div>
          <div className="hidden sm:block">
            <div className="font-black text-xl text-slate-900 leading-none tracking-tight">
              Paridhi <span className="text-medical-blue">Pharma</span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
              Medicines & Healthcare
            </div>
          </div>
        </Link>

        {/* Location Pill */}
        <button className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium hover:border-medical-blue hover:text-medical-blue transition flex-shrink-0">
          <MapPin size={13} className="text-medical-blue" />
          <span>Gurgaon 122001</span>
          <ChevronDown size={12} />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 relative min-w-0 max-w-2xl mx-6">
          <div className="flex items-center w-full bg-slate-50 border-2 border-slate-200 rounded-2xl focus-within:border-medical-blue focus-within:bg-white focus-within:shadow-md transition-all duration-300 shadow-sm overflow-hidden group">
            <Search size={18} className="text-slate-400 ml-4 flex-shrink-0 group-focus-within:text-medical-blue transition-colors" />
            <input
              type="text"
              placeholder='Search medicines, brands (e.g. "Crocin", "Cipla")…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-3 px-3 text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button type="submit" className="bg-medical-blue text-white font-bold px-6 py-3 text-[14px] hover:bg-blue-700 transition flex-shrink-0">
              Search
            </button>
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-auto md:ml-0">


          <Link href="/cart?tab=wishlist" className="relative p-2 text-slate-500 hover:text-red-500 transition">
            <Heart size={21} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative flex items-center gap-1.5 bg-medical-blue text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-700 transition shadow-premium">
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-medical-blue rounded-full w-5 h-5 flex items-center justify-center font-black text-[10px] shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 p-1.5 border border-slate-200 rounded-full hover:border-medical-blue transition">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-medical-blue flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden xl:inline text-xs font-semibold text-slate-700 pr-1">{user.name}</span>
              </Link>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-float py-2 border border-slate-100 hidden group-hover:block z-50 animate-fade-in">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-medical-blue transition">
                  {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                </Link>
                {user.role !== 'admin' && (
                  <Link href="/dashboard?tab=orders" className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-medical-blue transition">My Orders</Link>
                )}
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 border-t border-slate-100 mt-1 transition">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/cart?tab=login" className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-medical-blue border border-medical-blue/30 bg-blue-50 px-3 py-2 rounded-xl hover:bg-medical-blue hover:text-white transition">
              <User size={14} /> Login
            </Link>
          )}

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-slate-600">
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Category Nav Bar (PharmEasy-style) ── */}
      <nav className="hidden md:block border-t border-slate-100 bg-white relative shadow-sm z-40" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-8 lg:gap-12 w-full overflow-x-auto no-scrollbar">

            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative flex-shrink-0 group">
                {link.mega === 'healthcare' ? (
                  // Healthcare with dropdown trigger
                  <button
                    onMouseEnter={() => { setActiveDropdown('healthcare'); }}
                    onClick={() => setActiveDropdown(activeDropdown === 'healthcare' ? null : 'healthcare')}
                    className={`flex items-center gap-2 px-4 py-3.5 text-[14px] font-bold border-b-[3px] transition-all duration-200 ${
                      activeDropdown === 'healthcare'
                        ? 'text-medical-blue border-medical-blue bg-blue-50/50'
                        : 'text-slate-700 border-transparent hover:text-medical-blue hover:border-medical-blue hover:bg-slate-50'
                    }`}
                  >
                    <span className={`transition-colors ${activeDropdown === 'healthcare' ? 'text-medical-blue' : 'text-slate-400 group-hover:text-medical-blue'}`}>{link.icon}</span>
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'healthcare' ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href}
                    onMouseEnter={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-4 py-3.5 text-[14px] font-bold text-slate-700 hover:text-medical-blue border-b-[3px] border-transparent hover:border-medical-blue hover:bg-slate-50 transition-all duration-200"
                  >
                    {link.dot && <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-pulse" />}
                    <span className="text-slate-400 group-hover:text-medical-blue transition-colors">{link.icon}</span>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Healthcare Mega Dropdown (PharmEasy-style) ── */}
        {activeDropdown === 'healthcare' && (
          <div
            className="absolute left-0 right-0 top-full z-[9999] bg-white border-b border-slate-200 shadow-xl overflow-hidden"
            style={{ animation: 'fadeSlideDown 0.18s ease' }}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                <h3 className="font-black text-lg text-slate-800">Healthcare Categories</h3>
                <Link href="/shop?category=wellness" onClick={() => setActiveDropdown(null)} className="text-xs font-bold text-medical-blue hover:underline">
                  View All Healthcare
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {dynamicCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.id}`}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3.5 px-4 py-3.5 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-medical-blue transition-all group shadow-sm hover:shadow-md"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <div>
                       <div className="font-bold text-[13px] text-slate-800 group-hover:text-medical-blue transition-colors">{cat.name}</div>
                       <div className="text-[10px] text-slate-500 font-medium mt-0.5">Explore Products ›</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenu && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3 shadow-lg animate-fade-in">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input type="text" placeholder="Search medicines..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-medical-blue" />
            <button type="submit" className="absolute right-1 p-2 bg-medical-blue text-white rounded-lg">
              <Search size={14} />
            </button>
          </form>

          <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-100">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenu(false)}
                className="py-2.5 px-2 text-sm font-medium text-slate-700 hover:text-medical-blue flex items-center gap-2">
                <span className="text-medical-blue opacity-70">{link.icon}</span>
                {link.dot && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                {link.label}
              </Link>
            ))}

          </div>

          {/* Mobile: Healthcare sub-links */}
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Healthcare Categories</p>
            <div className="grid grid-cols-2 gap-1.5">
              {dynamicCategories.slice(0, 8).map((cat) => (
                <Link key={cat.id} href={`/shop?category=${cat.id}`}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-700 hover:text-medical-blue font-medium truncate flex items-center gap-1.5">
                  <span className="text-sm opacity-80">{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>


        </div>
      )}
    </header>
  );
};

export default Navbar;
