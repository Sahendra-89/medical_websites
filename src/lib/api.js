import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('pp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

// Helper for local storage persistence of mock data
const getMockStorage = () => {
  if (typeof window === 'undefined') return defaultMockStorage;
  const stored = localStorage.getItem('pp_mock_storage');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing mock storage', e);
    }
  }
  localStorage.setItem('pp_mock_storage', JSON.stringify(defaultMockStorage));
  return defaultMockStorage;
};

const saveMockStorage = (storage) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pp_mock_storage', JSON.stringify(storage));
  }
};

const defaultMockStorage = {
  products: [
    { id: 1, name: 'Crocin Advance 500mg (15 Tablets)', brand: 'GSK', category_id: 'otc', mrp: 42.00, discount_percent: 15, price: 35.70, stock: 250, sku: 'PP-OTC-001', description: 'Crocin Advance contains Paracetamol 500mg for fast relief from fever and pain.', usage_instructions: 'Take 1-2 tablets every 4-6 hours.', side_effects: 'Rare nausea.', prescription_required: false, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', is_featured: true, is_bestseller: true, rating: 4.5, review_count: 234 },
    { id: 2, name: 'Vicks VapoRub 50ml', brand: 'P&G', category_id: 'otc', mrp: 145.00, discount_percent: 10, price: 130.50, stock: 300, sku: 'PP-OTC-002', description: 'Vicks VapoRub provides multi-symptom relief from cold and cough.', usage_instructions: 'Apply gently on chest and throat.', side_effects: 'Mild skin irritation.', prescription_required: false, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', is_featured: true, is_bestseller: true, rating: 4.7, review_count: 567 },
    { id: 3, name: 'Digene Antacid Gel Mint 200ml', brand: 'Abbott', category_id: 'otc', mrp: 115.00, discount_percent: 12, price: 101.20, stock: 150, sku: 'PP-OTC-003', description: 'Fast-acting antacid gel providing quick relief from acidity.', usage_instructions: 'Take 1-2 teaspoons after meals.', side_effects: 'None.', prescription_required: false, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', is_featured: false, is_bestseller: true, rating: 4.3, review_count: 189 },
    { id: 5, name: 'Amoxicillin 500mg (Strip of 10)', brand: 'Cipla', category_id: 'prescription', mrp: 85.00, discount_percent: 20, price: 68.00, stock: 120, sku: 'PP-RX-001', description: 'Broad-spectrum antibiotic used to treat bacterial infections.', usage_instructions: 'Take as prescribed by doctor.', side_effects: 'Nausea, skin rash.', prescription_required: true, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', is_featured: true, is_bestseller: false, rating: 4.5, review_count: 156 },
    { id: 6, name: 'Metformin 500mg (Strip of 15)', brand: 'USV', category_id: 'prescription', mrp: 42.00, discount_percent: 25, price: 31.50, stock: 350, sku: 'PP-RX-002', description: 'Oral anti-diabetic medicine for Type 2 diabetes management.', usage_instructions: 'Take with meals as prescribed.', side_effects: 'Stomach upset.', prescription_required: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', is_featured: false, is_bestseller: true, rating: 4.3, review_count: 298 },
    { id: 9, name: 'Omron HEM-7120 Automatic BP Monitor', brand: 'Omron', category_id: 'devices', mrp: 1999.00, discount_percent: 25, price: 1499.25, stock: 45, sku: 'PP-DEV-001', description: 'Automatic upper arm blood pressure monitor.', usage_instructions: 'Wrap cuff securely around upper arm.', side_effects: 'None.', prescription_required: false, image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', is_featured: true, is_bestseller: true, rating: 4.7, review_count: 892 },
    { id: 12, name: 'Himalaya Liv.52 Tablets (100 Tablets)', brand: 'Himalaya', category_id: 'wellness', mrp: 175.00, discount_percent: 15, price: 148.75, stock: 400, sku: 'PP-WEL-001', description: 'Ayurvedic hepatoprotective supplement for liver care.', usage_instructions: 'Take 2 tablets twice daily.', side_effects: 'None.', prescription_required: false, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', is_featured: true, is_bestseller: true, rating: 4.4, review_count: 1567 },
    { id: 15, name: 'Cetaphil Gentle Skin Cleanser 250ml', brand: 'Cetaphil', category_id: 'personal-care', mrp: 545.00, discount_percent: 15, price: 463.25, stock: 90, sku: 'PP-PC-001', description: 'Gentle, non-irritating skin cleanser for sensitive skin.', usage_instructions: 'Apply to skin and rinse.', side_effects: 'None.', prescription_required: false, image: 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400', is_featured: true, is_bestseller: true, rating: 4.7, review_count: 1234 },
    { id: 17, name: 'Johnson\'s Baby Powder 400g', brand: 'Johnson & Johnson', category_id: 'baby-care', mrp: 299.00, discount_percent: 12, price: 263.12, stock: 180, sku: 'PP-BC-001', description: 'Mild baby powder that absorbs excess moisture.', usage_instructions: 'Smooth onto baby skin.', side_effects: 'Avoid inhalation.', prescription_required: false, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', is_featured: true, is_bestseller: false, rating: 4.4, review_count: 987 }
  ],
  categories: [
    { id: 'otc', name: 'OTC Medicines', description: 'Over-the-counter medicines for common ailments', icon: '💊', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { id: 'prescription', name: 'Prescription Drugs', description: 'Prescription medicines - verification required', icon: '📋', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400' },
    { id: 'devices', name: 'Medical Devices', description: 'Health monitoring and medical devices', icon: '🩺', image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400' },
    { id: 'wellness', name: 'Wellness & Nutrition', description: 'Vitamins, supplements & wellness products', icon: '🌿', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'personal-care', name: 'Personal Care', description: 'Skincare, haircare & hygiene products', icon: '🧴', image: 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400' },
    { id: 'baby-care', name: 'Baby Care', description: 'Baby health, nutrition & care essentials', icon: '👶', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' }
  ],
  blogs: [
    {
      id: 'understanding-generic-vs-branded-medicines',
      title: 'Understanding Generic vs. Branded Medicines: What You Need to Know',
      excerpt: 'Are generic medicines as effective as their branded counterparts? Learn how the FDA and Indian regulatory authorities ensure quality and bioequivalence.',
      content: `When your doctor prescribes a medicine, you often have a choice between a well-known brand and a generic alternative. Many people wonder: Are generic medicines really as effective as branded ones?

      The short answer is yes. Regulatory bodies like the FDA and Indian drug control authorities require generic medicines to have the exact same active pharmaceutical ingredient (API), dosage form, safety profile, strength, and intended use as the branded product.
      
      Why are generics cheaper? Branded pharmaceutical companies invest billions in research, clinical trials, and marketing. Once their patent expires, other manufacturers can produce the medicine without these massive overhead costs, passing the savings directly to the consumer.
      
      At Paridhi Pharma, we ensure all our generic and branded medicines are sourced directly from verified, licensed manufacturers to guarantee 100% bioequivalence and therapeutic success.`,
      category: 'Medicine Education',
      author: 'Harsh (B.Pharm)',
      date: 'May 14, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'
    },
    {
      id: 'managing-blood-pressure-at-home',
      title: 'How to Accurately Measure & Manage Blood Pressure at Home',
      excerpt: 'A comprehensive guide on using automatic digital BP monitors, avoiding common measurement errors, and maintaining a healthy cardiovascular lifestyle.',
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
      image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=600'
    },
    {
      id: 'essential-vitamins-for-immune-support',
      title: 'Top 5 Essential Vitamins & Minerals for Year-Round Immune Support',
      excerpt: 'Explore the scientifically backed benefits of Vitamin C, Zinc, Vitamin D3, and Ayurvedic supplements like Liv.52 for boosting your immune system.',
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
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600'
    }
  ],
  coupons: [
    { code: 'PARIDHI10', type: 'percent', discount_value: 10, min_order_value: 500, max_discount: 200, is_active: true },
    { code: 'FIRST20', type: 'percent', discount_value: 20, min_order_value: 300, max_discount: 300, is_active: true },
    { code: 'FLAT100', type: 'flat', discount_value: 100, min_order_value: 999, max_discount: null, is_active: true },
    { code: 'HEALTH50', type: 'flat', discount_value: 50, min_order_value: 499, max_discount: null, is_active: true }
  ],
  orders: [],
  prescriptions: []
};

// API Helper Functions with Automatic Mock Fallback
export const getProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', { params });
    return res.data;
  } catch (err) {
    console.warn('⚠️ Backend not reachable. Using mock products data.');
    const mockStorage = getMockStorage();
    let filtered = [...mockStorage.products];
    if (params.category) filtered = filtered.filter(p => p.category_id === params.category);
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (params.is_featured) filtered = filtered.filter(p => p.is_featured);
    if (params.is_bestseller) filtered = filtered.filter(p => p.is_bestseller);
    return { success: true, count: filtered.length, products: filtered };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const product = mockStorage.products.find(p => p.id === parseInt(id) || p.sku === id);
    if (!product) throw new Error('Product not found');
    return { success: true, product };
  }
};

export const getCategories = async () => {
  try {
    const res = await api.get('/categories');
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    return { success: true, count: mockStorage.categories.length, categories: mockStorage.categories };
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await api.post('/orders', orderData);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-8),
      ...orderData,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    mockStorage.orders.push(newOrder);
    saveMockStorage(mockStorage);
    return { success: true, order: newOrder, message: 'Order placed successfully (Mock mode)' };
  }
};

export const getUserOrders = async () => {
  try {
    const res = await api.get('/orders/myorders');
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    return { success: true, count: mockStorage.orders.length, orders: mockStorage.orders };
  }
};

export const uploadPrescription = async (data) => {
  try {
    const res = await api.post('/prescriptions/upload', data);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const newRx = { id: Date.now(), ...data, approval_status: 'pending', created_at: new Date().toISOString() };
    mockStorage.prescriptions.push(newRx);
    saveMockStorage(mockStorage);
    return { success: true, prescription: newRx, message: 'Prescription uploaded successfully (Mock mode)' };
  }
};

// --- Blog API calls ---
export const getBlogPosts = async () => {
  try {
    const res = await api.get('/blogs');
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    return { success: true, count: mockStorage.blogs.length, blogs: mockStorage.blogs };
  }
};

export const getBlogPostById = async (id) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const blog = mockStorage.blogs.find(b => b.id === id);
    if (!blog) throw new Error('Blog article not found');
    return { success: true, blog };
  }
};

export const createBlogPost = async (blogData) => {
  try {
    const res = await api.post('/blogs', blogData);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const newBlog = {
      id: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      ...blogData,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: blogData.readTime || `${Math.max(1, Math.ceil(blogData.content.split(/\s+/).length / 200))} min read`
    };
    mockStorage.blogs.unshift(newBlog);
    saveMockStorage(mockStorage);
    return { success: true, blog: newBlog, message: 'Blog created successfully (Mock mode)' };
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    mockStorage.blogs = mockStorage.blogs.filter(b => b.id !== id);
    saveMockStorage(mockStorage);
    return { success: true, message: 'Blog deleted successfully (Mock mode)' };
  }
};

// --- Coupons/Promo API calls ---
export const getCoupons = async () => {
  try {
    const res = await api.get('/coupons');
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    return { success: true, count: mockStorage.coupons.length, coupons: mockStorage.coupons };
  }
};

export const createCoupon = async (couponData) => {
  try {
    const res = await api.post('/coupons', couponData);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    const newCoupon = { ...couponData, is_active: true };
    mockStorage.coupons.unshift(newCoupon);
    saveMockStorage(mockStorage);
    return { success: true, coupon: newCoupon, message: 'Coupon created successfully (Mock mode)' };
  }
};

export const deleteCoupon = async (code) => {
  try {
    const res = await api.delete(`/coupons/${code}`);
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    mockStorage.coupons = mockStorage.coupons.filter(c => c.code !== code);
    saveMockStorage(mockStorage);
    return { success: true, message: 'Coupon deleted successfully (Mock mode)' };
  }
};

export const getAdminStats = async () => {
  try {
    const res = await api.get('/admin/stats');
    return res.data;
  } catch (err) {
    const mockStorage = getMockStorage();
    return {
      success: true,
      stats: {
        totalUsers: 24,
        totalProducts: mockStorage.products.length,
        totalOrders: 42,
        totalRevenue: 345600,
        pendingPrescriptions: mockStorage.prescriptions.length,
        lowStockProducts: 2
      }
    };
  }
};

export default api;

