"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Users, DollarSign, FileText, CheckCircle, AlertCircle, RefreshCw, UploadCloud, TrendingUp, ShieldCheck, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAdminStats } from '../../lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, prescriptions, inventory
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bulk Upload state
  const [bulkFile, setBulkFile] = useState(null);
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [bulkSuccess, setBulkSuccess] = useState('');

  // Prescription Approval state
  const [prescriptions, setPrescriptions] = useState([
    { id: 101, patient_name: 'Rajesh Kumar', doctor_name: 'Dr. S.K. Sharma', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Monthly Amoxicillin Refill', status: 'pending', date: '2026-05-16' },
    { id: 102, patient_name: 'Priya Sharma', doctor_name: 'Dr. R. Mehta', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Metformin verification', status: 'approved', date: '2026-05-15' }
  ]);

  // Inventory state
  const [inventory, setInventory] = useState([
    { id: 9, name: 'Omron HEM-7120 Automatic BP Monitor', brand: 'Omron', category: 'devices', stock: 5, price: 1499.25, sku: 'PP-DEV-001' },
    { id: 5, name: 'Amoxicillin 500mg (Strip of 10)', brand: 'Cipla', category: 'prescription', stock: 12, price: 68.00, sku: 'PP-RX-001' },
    { id: 1, name: 'Crocin Advance 500mg', brand: 'GSK', category: 'otc', stock: 250, price: 35.70, sku: 'PP-OTC-001' },
    { id: 2, name: 'Vicks VapoRub 50ml', brand: 'P&G', category: 'otc', stock: 300, price: 130.50, sku: 'PP-OTC-002' },
    { id: 12, name: 'Himalaya Liv.52 Tablets', brand: 'Himalaya', category: 'wellness', stock: 400, price: 148.75, sku: 'PP-WEL-001' }
  ]);

  // Orders state
  const [orders, setOrders] = useState([
    { id: 'ORD-20260516-0001', customer: 'Rajesh Kumar', items: 'Crocin Advance (x2), Digene (x1)', total: 157.50, status: 'confirmed', payment: 'COD', date: 'Today' },
    { id: 'ORD-20260515-0042', customer: 'City Hospital Pharmacy', items: 'Omron BP Monitor (x2), Amoxicillin (x5)', total: 3338.50, status: 'shipped', payment: 'UPI', date: 'Yesterday' }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    } else {
      const fetchStats = async () => {
        try {
          const res = await getAdminStats();
          if (res.stats) setStats(res.stats);
        } catch (err) {
          console.error('Error fetching admin stats:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [user]);

  if (!user || user.role !== 'admin') return null;

  const handleBulkUpload = (e) => {
    e.preventDefault();
    if (!bulkFile) {
      alert('Please select an Excel or CSV file to upload.');
      return;
    }
    setUploadingBulk(true);
    setTimeout(() => {
      setUploadingBulk(false);
      setBulkSuccess('Successfully bulk uploaded and synchronized 24 products from Excel/CSV.');
      // Add mock products to inventory
      setInventory([...inventory, { id: Date.now(), name: 'Strepsils Lozenges (Bulk Add)', brand: 'Reckitt', category: 'otc', stock: 500, price: 51.52, sku: 'PP-OTC-BULK' }]);
      setTimeout(() => setBulkSuccess(''), 4000);
    }, 2000);
  };

  const handleApproveRx = (id, status) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleUpdateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      {/* Admin Header */}
      <div className="bg-medical-dark text-white rounded-3xl p-8 shadow-premium mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-medical-blue flex items-center justify-center text-white font-bold text-2xl shadow-md">
            <ShieldCheck size={36} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-1 border border-blue-500/30">
              ● Pharmacist Admin Panel
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Paridhi Pharma Management</h1>
            <p className="text-xs text-slate-300 mt-0.5">Drug License: HR-GUR-2026-98765 | Gurgaon, NCR Operations</p>
          </div>
        </div>

        {/* Goal Tracker Badge */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 font-bold">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Sales Goal</span>
            <span className="font-black text-lg text-white">₹3.45 Lakh / ₹4.0 Lakh</span>
            <div className="w-36 h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 mb-8 pb-4">
        {[
          { id: 'overview', label: 'Overview Stats', icon: <TrendingUp size={16} /> },
          { id: 'products', label: 'Product Management', icon: <Package size={16} /> },
          { id: 'orders', label: 'Order Management', icon: <DollarSign size={16} /> },
          { id: 'prescriptions', label: 'Prescription Approval', icon: <FileText size={16} /> },
          { id: 'inventory', label: 'Inventory Tracking', icon: <AlertCircle size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition ${activeTab === tab.id ? 'bg-medical-blue text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
        {/* 1. Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Business Dashboard Overview</h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(n => <div key={n} className="h-32 bg-slate-100 animate-pulse rounded-2xl"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold">Total Revenue (Monthly)</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '3,45,600'}</h3>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-1"><TrendingUp size={12} /> +18.4% this month</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-medical-blue flex items-center justify-center"><DollarSign size={24} /></div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold">Total Orders</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalOrders || 42}</h3>
                    <span className="text-[10px] text-slate-400 mt-1 block">Gurgaon & Delhi NCR</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><Package size={24} /></div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold">Pending Prescriptions</span>
                    <h3 className="text-2xl font-black text-amber-600 mt-1">{stats?.pendingPrescriptions || 3}</h3>
                    <span className="text-[10px] text-amber-600 font-bold mt-1 block">Verification Required</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><FileText size={24} /></div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold">Registered Users</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalUsers || 24}</h3>
                    <span className="text-[10px] text-slate-400 mt-1 block">B2C Retail + B2B Buyers</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"><Users size={24} /></div>
                </div>
              </div>
            )}

            {/* Quick Actions & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-medical-blue flex items-center gap-2 mb-2"><UploadCloud size={18} /> Bulk Product Management</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">Need to update inventory or add new medicines? Upload your Excel or CSV catalog to instantly synchronize products, prices, and stock.</p>
                </div>
                <button onClick={() => setActiveTab('products')} className="bg-medical-blue text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md hover:bg-blue-600 transition self-start">
                  Go to Bulk Upload Panel
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2 mb-2"><AlertCircle size={18} /> Low Stock Alerts</h4>
                  <p className="text-xs text-amber-800 leading-relaxed mb-6">Certain fast-moving medicines and medical devices are running below the minimum threshold of 20 units. Restock to avoid losing sales.</p>
                </div>
                <button onClick={() => setActiveTab('inventory')} className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md hover:bg-amber-700 transition self-start">
                  Review Low Stock Inventory
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Product Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Product Catalog Management</h2>
              <button onClick={() => alert('Mock add single product modal opened')} className="bg-medical-blue text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:bg-blue-600 transition flex items-center gap-1.5">
                <Plus size={16} /> Add Single Product
              </button>
            </div>

            {/* Bulk Upload Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-2xl">
              <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2"><UploadCloud size={18} className="text-medical-blue" /> Bulk Upload via Excel / CSV</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Select your inventory spreadsheet. The system will match columns for Name, Brand, Category, MRP, Price, Stock, and SKU.</p>

              {bulkSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-4 rounded-2xl mb-6 font-bold flex items-center gap-2">
                  <CheckCircle size={18} /> {bulkSuccess}
                </div>
              )}

              <form onSubmit={handleBulkUpload} className="space-y-4">
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  required
                  onChange={(e) => setBulkFile(e.target.files[0])}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue"
                />

                <div className="flex items-center gap-4 pt-2">
                  <button type="submit" disabled={uploadingBulk} className="bg-medical-blue hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl text-xs transition shadow-md flex items-center gap-2">
                    {uploadingBulk ? 'Uploading & Syncing...' : 'Upload & Synchronize Catalog'}
                  </button>
                  <a href="#sample" onClick={() => alert('Sample Excel template downloaded')} className="text-xs text-medical-blue hover:underline font-semibold">Download Sample Template</a>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. Orders Management Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Customer Order Management</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items Summary</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-900">{o.id}</td>
                      <td className="p-4 text-slate-700">{o.customer}</td>
                      <td className="p-4 text-slate-600 max-w-xs truncate">{o.items}</td>
                      <td className="p-4 font-black text-medical-blue">₹{o.total.toFixed(2)}</td>
                      <td className="p-4"><span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">{o.payment}</span></td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                          o.status === 'delivered' ? 'bg-green-100 text-green-800' : o.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {o.status === 'confirmed' && (
                          <button onClick={() => handleUpdateOrderStatus(o.id, 'shipped')} className="bg-blue-100 hover:bg-blue-200 text-medical-blue font-bold px-3 py-1 rounded-lg text-[10px] transition">Mark Shipped</button>
                        )}
                        {o.status === 'shipped' && (
                          <button onClick={() => handleUpdateOrderStatus(o.id, 'delivered')} className="bg-green-100 hover:bg-green-200 text-green-700 font-bold px-3 py-1 rounded-lg text-[10px] transition">Mark Delivered</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Prescription Approval Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Pharmacist Prescription Approval Panel</h2>

            <div className="space-y-6">
              {prescriptions.map(rx => (
                <div key={rx.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={rx.file_url} alt="Rx" className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">Prescription #{rx.id}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${rx.status === 'approved' ? 'bg-green-100 text-green-800' : rx.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{rx.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Patient: {rx.patient_name} | Doctor: {rx.doctor_name}</p>
                      <p className="text-xs text-slate-600 italic mt-1 max-w-sm">Notes: "{rx.notes}"</p>
                    </div>
                  </div>

                  {rx.status === 'pending' && (
                    <div className="flex items-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200 w-full sm:w-auto justify-end">
                      <button onClick={() => handleApproveRx(rx.id, 'rejected')} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs transition border border-red-200">Reject</button>
                      <button onClick={() => handleApproveRx(rx.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-1"><CheckCircle size={14} /> Verify & Approve</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Inventory Tracking Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Inventory & Stock Tracking</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-4">SKU</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Quick Restock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-mono text-slate-500">{item.sku}</td>
                      <td className="p-4 font-bold text-slate-900">{item.name}</td>
                      <td className="p-4 text-slate-700">{item.brand}</td>
                      <td className="p-4 text-slate-500 uppercase">{item.category}</td>
                      <td className="p-4 font-black text-slate-900">₹{item.price.toFixed(2)}</td>
                      <td className="p-4">
                        {item.stock < 20 ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            <AlertCircle size={12} /> Low Stock ({item.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            <CheckCircle size={12} /> Healthy ({item.stock})
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => {
                          setInventory(inventory.map(i => i.id === item.id ? { ...i, stock: i.stock + 100 } : i));
                          alert(`Restocked +100 units for ${item.name}`);
                        }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-[10px] transition">
                          +100 Units
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
