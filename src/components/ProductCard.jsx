"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, FileText, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const savings = product.mrp && product.price ? product.mrp - product.price : 0;

  return (
    <div className="product-card bg-white rounded-2xl border border-slate-100 shadow-card flex flex-col overflow-hidden group">

      {/* Image Area */}
      <div className="relative bg-slate-50 border-b border-slate-100 overflow-hidden" style={{ paddingTop: '75%' }}>
        <Link href={`/shop/${product.id}`}>
          <img
            src={product.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge — top-left corner like PharmEasy */}
        {product.discount_percent > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white font-black text-[11px] px-2.5 py-1 rounded-br-xl">
            {product.discount_percent}% OFF
          </div>
        )}

        {/* Rx Badge */}
        {product.prescription_required && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-white font-bold text-[9px] px-2 py-0.5 flex items-center gap-0.5 rounded-full shadow">
            <FileText size={8} /> Rx Required
          </div>
        )}

        {/* Bestseller Badge */}
        {product.is_bestseller && (
          <div className="absolute bottom-2 right-2 bg-orange-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
            <Zap size={9} /> Bestseller
          </div>
        )}

        {/* Wishlist */}
        <button onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow hover:shadow-md transition z-10">
          <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">

        {/* Brand */}
        <div className="text-[10px] font-bold text-medical-blue uppercase tracking-wider mb-1">
          {product.brand || 'Generic'}
        </div>

        {/* Title */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-sm text-slate-800 group-hover:text-medical-blue transition line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Stock */}
        <div className="flex items-center gap-1 text-[11px] mb-3">
          {product.stock > 10 ? (
            <span className="text-green-600 flex items-center gap-1 font-medium"><CheckCircle size={11} /> In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-amber-600 flex items-center gap-1 font-medium"><AlertCircle size={11} /> Only {product.stock} left</span>
          ) : (
            <span className="text-red-500 flex items-center gap-1 font-medium"><AlertCircle size={11} /> Out of Stock</span>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-lg text-slate-900">₹{product.price}</span>
                {product.discount_percent > 0 && (
                  <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
                )}
              </div>
              {savings > 0 && <p className="text-[10px] text-green-600 font-semibold">Save ₹{savings}</p>}
              <p className="text-[10px] text-slate-400">Incl. all taxes</p>
            </div>

            <button onClick={() => addToCart(product)} disabled={product.stock === 0}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition shadow-sm ${
                product.stock > 0
                  ? 'bg-medical-blue text-white hover:bg-blue-700 hover:shadow-premium'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}>
              <ShoppingCart size={13} />
              {product.stock > 0 ? 'Add' : 'NA'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
