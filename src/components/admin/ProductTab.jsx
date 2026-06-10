import React from 'react';
import { UploadCloud, CheckCircle, Plus } from 'lucide-react';

export default function ProductTab({ bulkFile, setBulkFile, uploadingBulk, bulkSuccess, handleBulkUpload }) {
  return (
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
  );
}
