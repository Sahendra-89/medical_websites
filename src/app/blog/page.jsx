import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: 'understanding-generic-vs-branded-medicines',
      title: 'Understanding Generic vs. Branded Medicines: What You Need to Know',
      excerpt: 'Are generic medicines as effective as their branded counterparts? Learn how the FDA and Indian regulatory authorities ensure quality and bioequivalence.',
      category: 'Medicine Education',
      author: 'Sahendra Yadav (B.Pharm)',
      date: 'May 14, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'
    },
    {
      id: 'managing-blood-pressure-at-home',
      title: 'How to Accurately Measure & Manage Blood Pressure at Home',
      excerpt: 'A comprehensive guide on using automatic digital BP monitors, avoiding common measurement errors, and maintaining a healthy cardiovascular lifestyle.',
      category: 'Medical Devices',
      author: 'Dr. R. Mehta (MBBS)',
      date: 'May 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=600'
    },
    {
      id: 'essential-vitamins-for-immune-support',
      title: 'Top 5 Essential Vitamins & Minerals for Year-Round Immune Support',
      excerpt: 'Explore the scientifically backed benefits of Vitamin C, Zinc, Vitamin D3, and Ayurvedic supplements like Liv.52 for boosting your immune system.',
      category: 'Wellness & Nutrition',
      author: 'Priya Sharma (Nutritionist)',
      date: 'May 2, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3">
          <BookOpen size={14} /> Paridhi Health Journal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">Expert Health & Medicine Articles</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Stay informed with medical guides, wellness advice, and healthcare insights authored by experienced doctors and registered pharmacists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col overflow-hidden group">
            <div className="relative pt-[60%] bg-slate-50 overflow-hidden border-b border-slate-100">
              <Link href={`/blog/${post.id}`}>
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </Link>
              <span className="absolute top-4 left-4 bg-medical-blue text-white font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
                {post.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-medical-blue transition line-clamp-2 mb-3 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5"><User size={14} className="text-medical-blue" /> {post.author}</span>
                <Link href={`/blog/${post.id}`} className="font-bold text-medical-blue hover:underline flex items-center gap-1">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
