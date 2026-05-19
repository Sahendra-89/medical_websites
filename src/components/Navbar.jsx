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

const OFFERS = [
  '🎉 Use code FLAT100 → ₹100 OFF on orders above ₹999',
  '🚚 Same-Day Delivery in Gurgaon, Delhi & Faridabad',
  '💊 Up to 30% OFF on generics',
  '📋 Prescription medicines — Upload Rx in minutes',
  '🏥 B2B Bulk Pricing for Clinics & Pharmacies — Register Now',
  '⭐ 5000+ Genuine Products | Licensed Pharmacy HR-GUR-2026-98765',
];

// ── Healthcare mega-menu (PharmEasy-style)
const SIDEBAR_CATEGORIES = [
  'Must Haves',
  'Vitamin Store',
  'Personal Care',
  'Sexual Wellness',
  'Summer Store',
  'Pet Care',
  'Health Food & Drinks',
  'Diabetes Essentials',
  'Ayurvedic Care',
  'Mother & Baby Care',
  'Mobility & Elderly Care',
  'Sports Nutrition',
  'Devices & Monitors',
  'Skin & Hair Care',
];

const HEALTHCARE_SUBMENU = {
  'Must Haves': [
    { title: 'Diabetic Care',          sub: 'All Diabetic Care',          href: '/shop?search=diabetic+care' },
    { title: 'Feet Problem',           sub: 'All Feet Problem',           href: '/shop?search=feet+problem' },
    { title: 'Skin & Hair Care',       sub: 'All Skin & Hair Care',       href: '/shop?search=skin+hair+care' },
    { title: 'Never Seen Before Deals',sub: 'All Never Seen Before Deals',href: '/shop?offers=true' },
    { title: 'Vitamin',                sub: 'All Vitamin',                href: '/shop?search=vitamin' },
    { title: 'Ortho Care',             sub: 'All Ortho Care',             href: '/shop?search=ortho+care' },
    { title: 'Therapy Others',         sub: 'All Therapy Others',         href: '/shop?search=therapy' },
  ],
  'Vitamin Store': [
    { title: 'Vitamin D3',      sub: 'All Vitamin D3',      href: '/shop?search=vitamin+d3' },
    { title: 'Vitamin C',       sub: 'All Vitamin C',       href: '/shop?search=vitamin+c' },
    { title: 'Multivitamins',   sub: 'All Multivitamins',   href: '/shop?search=multivitamin' },
    { title: 'Omega 3',         sub: 'All Omega 3',         href: '/shop?search=omega+3' },
    { title: 'Calcium',         sub: 'All Calcium',         href: '/shop?search=calcium' },
    { title: 'Iron Supplements',sub: 'All Iron Supplements',href: '/shop?search=iron+supplement' },
  ],
  'Personal Care': [
    { title: 'Skin Care',        sub: 'All Skin Care',        href: '/shop?search=skin+care' },
    { title: 'Hair Care',        sub: 'All Hair Care',        href: '/shop?search=hair+care' },
    { title: 'Oral Care',        sub: 'All Oral Care',        href: '/shop?search=oral+care' },
    { title: 'Eye Care',         sub: 'All Eye Care',         href: '/shop?search=eye+care' },
    { title: 'Feminine Hygiene', sub: 'All Feminine Hygiene', href: '/shop?search=feminine' },
    { title: 'Sun Care',         sub: 'All Sun Care',         href: '/shop?search=sun+care' },
  ],
  'Sexual Wellness': [
    { title: 'Sexual Health',   sub: 'All Sexual Health',   href: '/shop?search=sexual+health' },
    { title: 'Family Planning', sub: 'All Family Planning', href: '/shop?search=family+planning' },
  ],
  'Summer Store': [
    { title: 'Sunscreen',       sub: 'All Sunscreen',       href: '/shop?search=sunscreen' },
    { title: 'Hydration',       sub: 'All Hydration',       href: '/shop?search=hydration' },
    { title: 'Cooling Products',sub: 'All Cooling Products',href: '/shop?search=cooling' },
  ],
  'Pet Care': [
    { title: 'Pet Supplements', sub: 'All Pet Supplements', href: '/shop?search=pet+supplement' },
    { title: 'Pet Hygiene',     sub: 'All Pet Hygiene',     href: '/shop?search=pet+hygiene' },
  ],
  'Health Food & Drinks': [
    { title: 'Protein Powder',  sub: 'All Protein Powder',  href: '/shop?search=protein+powder' },
    { title: 'Health Drinks',   sub: 'All Health Drinks',   href: '/shop?search=health+drinks' },
    { title: 'Energy Bars',     sub: 'All Energy Bars',     href: '/shop?search=energy+bars' },
    { title: 'Green Tea',       sub: 'All Green Tea',       href: '/shop?search=green+tea' },
  ],
  'Diabetes Essentials': [
    { title: 'Glucometers',     sub: 'All Glucometers',     href: '/shop?search=glucometer' },
    { title: 'Test Strips',     sub: 'All Test Strips',     href: '/shop?search=test+strips' },
    { title: 'Insulin Syringes',sub: 'All Insulin Syringes',href: '/shop?search=insulin+syringe' },
    { title: 'Diabetic Food',   sub: 'All Diabetic Food',   href: '/shop?search=diabetic+food' },
  ],
  'Ayurvedic Care': [
    { title: 'Chyawanprash',    sub: 'All Chyawanprash',    href: '/shop?search=chyawanprash' },
    { title: 'Ashwagandha',     sub: 'All Ashwagandha',     href: '/shop?search=ashwagandha' },
    { title: 'Triphala',        sub: 'All Triphala',        href: '/shop?search=triphala' },
    { title: 'Giloy',           sub: 'All Giloy',           href: '/shop?search=giloy' },
  ],
  'Mother & Baby Care': [
    { title: 'Baby Nutrition',  sub: 'All Baby Nutrition',  href: '/shop?search=baby+nutrition' },
    { title: 'Baby Hygiene',    sub: 'All Baby Hygiene',    href: '/shop?search=baby+hygiene' },
    { title: 'Prenatal Care',   sub: 'All Prenatal Care',   href: '/shop?search=prenatal' },
    { title: 'Baby Monitors',   sub: 'All Baby Monitors',   href: '/shop?search=baby+monitor' },
  ],
  'Mobility & Elderly Care': [
    { title: 'Walking Aids',    sub: 'All Walking Aids',    href: '/shop?search=walking+aids' },
    { title: 'Joint Support',   sub: 'All Joint Support',   href: '/shop?search=joint+support' },
    { title: 'Pain Relief',     sub: 'All Pain Relief',     href: '/shop?search=pain+relief' },
  ],
  'Sports Nutrition': [
    { title: 'Whey Protein',    sub: 'All Whey Protein',    href: '/shop?search=whey+protein' },
    { title: 'BCAA',            sub: 'All BCAA',            href: '/shop?search=bcaa' },
    { title: 'Pre-Workout',     sub: 'All Pre-Workout',     href: '/shop?search=pre+workout' },
    { title: 'Creatine',        sub: 'All Creatine',        href: '/shop?search=creatine' },
  ],
  'Devices & Monitors': [
    { title: 'BP Monitors',     sub: 'All BP Monitors',     href: '/shop?search=bp+monitor' },
    { title: 'Pulse Oximeters', sub: 'All Pulse Oximeters', href: '/shop?search=pulse+oximeter' },
    { title: 'Thermometers',    sub: 'All Thermometers',    href: '/shop?search=thermometer' },
    { title: 'Nebulizers',      sub: 'All Nebulizers',      href: '/shop?search=nebulizer' },
  ],
  'Skin & Hair Care': [
    { title: 'Moisturizers',    sub: 'All Moisturizers',    href: '/shop?search=moisturizer' },
    { title: 'Serums',          sub: 'All Serums',          href: '/shop?search=serum' },
    { title: 'Shampoos',        sub: 'All Shampoos',        href: '/shop?search=shampoo' },
    { title: 'Hair Oils',       sub: 'All Hair Oils',       href: '/shop?search=hair+oil' },
  ],
};

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
  const [activeSideTab, setActiveSideTab] = useState('Must Haves');
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { cart, wishlist } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
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
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-medical-blue flex items-center justify-center text-white font-black text-lg shadow-premium">
            P
          </div>
          <div className="hidden sm:block">
            <div className="font-black text-lg text-slate-900 leading-none tracking-tight">
              Paridhi <span className="text-medical-blue">Pharma</span>
            </div>
            <div className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">
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
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 relative min-w-0">
          <div className="flex items-center w-full bg-slate-50 border-2 border-slate-200 rounded-2xl focus-within:border-medical-blue focus-within:bg-white transition-all duration-200 shadow-sm overflow-hidden">
            <Search size={16} className="text-slate-400 ml-4 flex-shrink-0" />
            <input
              type="text"
              placeholder='Search medicines, brands (e.g. "Crocin", "Cipla")…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2.5 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button type="submit" className="bg-medical-blue text-white font-bold px-5 py-2.5 text-sm hover:bg-blue-700 transition rounded-r-xl flex-shrink-0">
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
      <nav className="hidden md:block border-t border-slate-100 bg-white relative" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-0">

            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative flex-shrink-0">
                {link.mega === 'healthcare' ? (
                  // Healthcare with dropdown trigger
                  <button
                    onMouseEnter={() => { setActiveDropdown('healthcare'); }}
                    onClick={() => setActiveDropdown(activeDropdown === 'healthcare' ? null : 'healthcare')}
                    className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 ${
                      activeDropdown === 'healthcare'
                        ? 'text-medical-blue border-medical-blue'
                        : 'text-slate-600 border-transparent hover:text-medical-blue hover:border-medical-blue'
                    }`}
                  >
                    <span className="text-medical-blue">{link.icon}</span>
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'healthcare' ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href}
                    onMouseEnter={() => setActiveDropdown(null)}
                    className="flex items-center gap-1.5 px-4 py-3 text-[13px] font-semibold text-slate-600 hover:text-medical-blue border-b-2 border-transparent hover:border-medical-blue transition-all duration-200"
                  >
                    {link.dot && <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 animate-pulse" />}
                    <span className="text-medical-blue opacity-80">{link.icon}</span>
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
            className="absolute left-0 right-0 top-full z-[9999] bg-white border border-slate-200 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18)] rounded-b-2xl overflow-hidden"
            style={{ animation: 'fadeSlideDown 0.18s ease' }}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto flex">

              {/* Left Sidebar */}
              <div className="w-52 flex-shrink-0 bg-slate-50 border-r border-slate-100 overflow-y-auto py-2">
                {SIDEBAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => setActiveSideTab(cat)}
                    onClick={() => setActiveSideTab(cat)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-all duration-100 flex items-center justify-between ${
                      activeSideTab === cat
                        ? 'bg-white font-semibold text-slate-900 border-r-2 border-medical-blue'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    {cat}
                    {activeSideTab === cat && <span className="text-medical-blue">›</span>}
                  </button>
                ))}
              </div>

              {/* Right: Sub-category grid */}
              <div className="flex-1 px-8 py-5">
                <div className="grid gap-x-8 gap-y-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                  {(HEALTHCARE_SUBMENU[activeSideTab] || []).map((item) => (
                    <div key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block font-bold text-[13px] text-slate-800 hover:text-medical-blue transition mb-1"
                      >
                        {item.title}
                      </Link>
                      <Link
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block text-xs text-slate-400 hover:text-medical-blue transition"
                      >
                        {item.sub}
                      </Link>
                    </div>
                  ))}
                </div>
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
              {SIDEBAR_CATEGORIES.slice(0, 8).map((cat) => (
                <Link key={cat} href={`/shop?search=${encodeURIComponent(cat)}`}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-700 hover:text-medical-blue font-medium truncate">
                  {cat}
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
