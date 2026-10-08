import React, { useState } from 'react';
import { SubmissionRecord, ProductCategory } from '../types';
import { exportSubmissionsToCSV } from '../services/sheetService';
import { Database, Search, Download, Trash2, X, CheckCircle, Clock } from 'lucide-react';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: SubmissionRecord[];
  onClearAll: () => void;
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  isOpen,
  onClose,
  submissions,
  onClearAll,
}) => {
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  if (!isOpen) return null;

  const filtered = submissions.filter((s) => {
    const matchesCat = filter === 'All' || s.product === filter;
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.soieSize.toLowerCase().includes(search.toLowerCase()) ||
      s.phoneOrEmailOrSize.includes(search) ||
      s.overbustOrPhoneOrEmail.includes(search);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Form Submissions Log ({submissions.length})
              </h3>
              <p className="text-xs text-stone-600">
                Data saved ready for Google Sheet tabs (Bra / Panty / Shapewear)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
            {(['All', 'Bra', 'Panty', 'Shapewear'] as (ProductCategory | 'All')[]).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === tab
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search name/size..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* List of submissions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone-500 text-xs">
              <Database className="w-8 h-8 mx-auto text-stone-300 mb-2" />
              <p className="font-semibold text-stone-700">No submissions recorded yet</p>
              <p className="text-stone-400 mt-1">Submit the form to see records logged here.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSubmission(item)}
                className="p-4 rounded-xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/20 transition-all cursor-pointer bg-white shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 font-semibold text-stone-700">
                      {item.product}
                    </span>
                  </div>
                  <span className="text-base font-sans font-bold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded-lg border border-stone-200">
                    Col O: {item.soieSize}
                  </span>
                </div>

                <div className="grid grid-cols-2 text-[11px] text-stone-600 gap-1 mt-2">
                  <div>
                    <span className="text-stone-400">Current Size:</span> {item.currentSize}
                  </div>
                  <div>
                    <span className="text-stone-400">Brand:</span> {item.brandsYouUse}
                  </div>
                  <div>
                    <span className="text-stone-400">Type:</span> {item.type}
                  </div>
                  <div>
                    <span className="text-stone-400">Time:</span> {item.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => exportSubmissionsToCSV(filter === 'All' ? undefined : filter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export {filter} CSV
          </button>

          {submissions.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-stone-500 hover:text-rose-700 text-xs hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h4 className="font-serif font-bold text-base text-stone-900">
                Submission Detail · {selectedSubmission.id}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col B: Name</span>
                <span className="font-semibold text-stone-900">{selectedSubmission.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col C: Product</span>
                <span className="font-semibold text-rose-700">{selectedSubmission.product}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col D: Current Size</span>
                <span className="font-medium text-stone-900">{selectedSubmission.currentSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col E: Brands You Use</span>
                <span className="font-medium text-stone-900">{selectedSubmission.brandsYouUse}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col F: Style Number</span>
                <span className="font-medium text-stone-900">{selectedSubmission.styleNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col G: Type</span>
                <span className="font-medium text-stone-900">{selectedSubmission.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col H: Padding / Rise / Pref</span>
                <span className="font-medium text-stone-900">{selectedSubmission.paddingOrRiseOrPref}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col I: Wire / Pref / Hip</span>
                <span className="font-medium text-stone-900">{selectedSubmission.wireOrPrefOrHip}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col J: Pref / Hip / Waist</span>
                <span className="font-medium text-stone-900">{selectedSubmission.prefOrHipOrWaist}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col K: Underbust / Waist / Phone</span>
                <span className="font-medium text-stone-900">{selectedSubmission.underbustOrWaistOrPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col L: Overbust / Phone / Email</span>
                <span className="font-medium text-stone-900">{selectedSubmission.overbustOrPhoneOrEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col M: Phone / Email / Size</span>
                <span className="font-medium text-stone-900">{selectedSubmission.phoneOrEmailOrSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Col N: Email / Size</span>
                <span className="font-medium text-stone-900">{selectedSubmission.emailOrSize}</span>
              </div>
              <div className="flex justify-between py-2 bg-rose-50 px-2 rounded-lg">
                <span className="font-bold text-rose-900">Col O: Official Soie Size</span>
                <span className="font-bold text-rose-950 text-sm">{selectedSubmission.soieSize}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-stone-800 text-white rounded-lg font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
