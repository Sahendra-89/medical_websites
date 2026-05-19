"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const posts = {
    'understanding-generic-vs-branded-medicines': {
      title: 'Understanding Generic vs. Branded Medicines: What You Need to Know',
      content: `When your doctor prescribes a medicine, you often have a choice between a well-known brand and a generic alternative. Many people wonder: Are generic medicines really as effective as branded ones?

      The short answer is yes. Regulatory bodies like the FDA and Indian drug control authorities require generic medicines to have the exact same active pharmaceutical ingredient (API), dosage form, safety profile, strength, and intended use as the branded product.
      
      Why are generics cheaper? Branded pharmaceutical companies invest billions in research, clinical trials, and marketing. Once their patent expires, other manufacturers can produce the medicine without these massive overhead costs, passing the savings directly to the consumer.
      
      At Paridhi Pharma, we ensure all our generic and branded medicines are sourced directly from verified, licensed manufacturers to guarantee 100% bioequivalence and therapeutic success.`,
      category: 'Medicine Education',
      author: 'Sahendra Yadav (B.Pharm)',
      date: 'May 14, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200'
    },
    'managing-blood-pressure-at-home': {
      title: 'How to Accurately Measure & Manage Blood Pressure at Home',
      content: `High blood pressure (hypertension) is often called the silent killer because it rarely exhibits noticeable symptoms. Regular home monitoring using a reliable automatic digital BP monitor (such as Omron or Accu-Chek) is essential for effective cardiovascular management.

      Follow these best practices for an accurate reading:
      1. Rest for 5 minutes before taking a measurement. Avoid caffeine, exercise, or smoking for 30 minutes prior.
      2. Sit with your back straight, feet flat on the floor, and arm supported on a table at heart level.
      3. Wrap the cuff securely around your upper bare arm, about 1 inch above the bend of your elbow.
      4. Take two readings 1-2 minutes apart and average the results.
      
      Always log your readings and share them with your healthcare provider during checkups.`,
      category: 'Medical Devices',
      author: 'Dr. R. Mehta (MBBS)',
      date: 'May 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=1200'
    },
    'essential-vitamins-for-immune-support': {
      title: 'Top 5 Essential Vitamins & Minerals for Year-Round Immune Support',
      content: `Maintaining a robust immune system requires a balanced diet, adequate sleep, and the right micronutrients. Here are the top 5 essential vitamins and minerals supported by clinical research:

      1. Vitamin C: A powerful antioxidant that supports cellular immune response and protects against oxidative stress.
      2. Vitamin D3: Crucial for activating immune defenses. Many individuals have suboptimal levels and benefit from daily supplementation.
      3. Zinc: Essential for normal immune cell function and inflammatory response modulation.
      4. B-Complex Vitamins: Support energy metabolism and overall cellular health.
      5. Herbal & Ayurvedic Supplements: Time-tested formulations like Himalaya Liv.52 provide excellent hepatoprotective and detoxifying support.
      
      Explore our complete Wellness & Nutrition catalog at Paridhi Pharma to find genuine, high-quality supplements for your family.`,
      category: 'Wellness & Nutrition',
      author: 'Priya Sharma (Nutritionist)',
      date: 'May 2, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200'
    }
  };

  const post = posts[id] || posts['understanding-generic-vs-branded-medicines'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <button onClick={() => router.push('/blog')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to All Articles
      </button>

      <article className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-12 overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <span className="bg-blue-50 text-medical-blue font-bold text-xs px-3 py-1 rounded-full border border-blue-100 mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
            <span className="font-bold text-slate-700 flex items-center gap-1"><User size={14} className="text-medical-blue" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-slate-100 bg-slate-50">
          <img src={post.image} alt={post.title} className="w-full h-auto max-h-96 object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6 whitespace-pre-line font-medium">
          {post.content}
        </div>
      </article>
    </div>
  );
}
