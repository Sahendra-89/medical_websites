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

// Mock Fallback Database for Standalone Frontend Operation
let mockStorage = {
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
    const product = mockStorage.products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return { success: true, product };
  }
};

export const getCategories = async () => {
  try {
    const res = await api.get('/categories');
    return res.data;
  } catch (err) {
    return { success: true, count: mockStorage.categories.length, categories: mockStorage.categories };
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await api.post('/orders', orderData);
    return res.data;
  } catch (err) {
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-8),
      ...orderData,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    mockStorage.orders.push(newOrder);
    return { success: true, order: newOrder, message: 'Order placed successfully (Mock mode)' };
  }
};

export const getUserOrders = async () => {
  try {
    const res = await api.get('/orders/myorders');
    return res.data;
  } catch (err) {
    return { success: true, count: mockStorage.orders.length, orders: mockStorage.orders };
  }
};

export const uploadPrescription = async (data) => {
  try {
    const res = await api.post('/prescriptions/upload', data);
    return res.data;
  } catch (err) {
    const newRx = { id: Date.now(), ...data, approval_status: 'pending', created_at: new Date().toISOString() };
    mockStorage.prescriptions.push(newRx);
    return { success: true, prescription: newRx, message: 'Prescription uploaded successfully (Mock mode)' };
  }
};

export const getAdminStats = async () => {
  try {
    const res = await api.get('/admin/stats');
    return res.data;
  } catch (err) {
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
