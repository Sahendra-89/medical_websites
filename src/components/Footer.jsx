import React from 'react';
import Link from 'next/link';
import {
  HeartHandshake, PhoneCall,
  Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a2540] text-slate-300 pt-14 pb-6 border-t border-slate-800 font-sans">


      {/* ── Main Links Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 pb-10 border-b border-slate-700/50">

        {/* Brand Column */}
        <div className="col-span-2 md:col-span-2 pr-0 sm:pr-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-medical-blue flex items-center justify-center text-white font-black text-lg">P</div>
            <span className="font-black text-xl text-white">Paridhi <span className="text-blue-400">Pharma</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-sm">
            Paridhi Pharma is a leading B2C & B2B pharmaceutical e-commerce platform offering genuine medicines, devices, and wellness products across Gurgaon, Delhi NCR & Faridabad.
          </p>

          {/* License Box */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/40 text-[11px] space-y-1.5 mb-5">
            <div className="text-white font-semibold flex items-center gap-1.5 mb-2">
              <HeartHandshake size={13} className="text-blue-400" /> Legal Compliance & Licenses
            </div>
            {[
              ['Drug License', 'HR-GUR-2026-98765'],
              ['FSSAI License', '10826005001234'],
              ['GSTIN', '06AAAAA0000A1Z5'],
              ['Pharmacist', 'Harsh (B.Pharm)'],
            ].map(([k, v]) => (
              <div key={k} className="text-slate-400">{k}: <span className="text-slate-300 font-medium">{v}</span></div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
              { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
              { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
              { icon: <Youtube size={16} />, href: '#', label: 'YouTube' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="w-8 h-8 rounded-xl bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-medical-blue transition duration-200">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-700 pb-2">Categories</h4>
          <ul className="text-xs space-y-2.5">
            {[
              ['OTC Medicines', '/shop?category=otc'],
              ['Prescription Rx', '/shop?category=prescription'],
              ['Medical Devices', '/shop?category=devices'],
              ['Wellness & Nutrition', '/shop?category=wellness'],
              ['Personal Care', '/shop?category=personal-care'],
              ['Baby Care', '/shop?category=baby-care'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white hover:translate-x-1 inline-block transition duration-200">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-700 pb-2">Quick Links</h4>
          <ul className="text-xs space-y-2.5">
            {[
              ['All Products', '/shop'],
              ['B2B / Bulk Orders', '/shop?b2b=true'],
              ['View Cart', '/cart'],
              ['My Dashboard', '/dashboard'],
              ['Health Blog', '/blog'],
              ['About Us', '/about'],
              ['Contact Us', '/contact'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white hover:translate-x-1 inline-block transition duration-200">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-700 pb-2">Contact & Support</h4>
          <ul className="text-xs space-y-3 text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin size={13} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Shop No. 12, Main Market, Sector 14, Gurgaon, Haryana - 122001</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall size={13} className="text-blue-400 flex-shrink-0" />
              <div>
                <a href="tel:01244567890" className="hover:text-white block transition">0124-4567890</a>
                <a href="tel:+919341660370" className="hover:text-white block transition">+91 9341660370</a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={13} className="text-blue-400 flex-shrink-0" />
              <a href="mailto:support@paridhipharma.com" className="hover:text-white transition break-all">[EMAIL_ADDRESS]</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={13} className="text-blue-400 flex-shrink-0" />
              <span>24/7 Online · Store: 8 AM – 10 PM</span>
            </li>
          </ul>
        </div>
      </div>


      {/* ── Bottom Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
        <p>© 2026 Paridhi Pharma. All Rights Reserved. Built for B2C + B2B Pharma E-commerce.</p>
        <div className="flex items-center gap-5">
          <Link href="/legal/terms" className="hover:text-slate-300 transition">Terms & Conditions</Link>
          <Link href="/legal/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
          <Link href="/legal/license" className="hover:text-slate-300 transition">Drug License</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
