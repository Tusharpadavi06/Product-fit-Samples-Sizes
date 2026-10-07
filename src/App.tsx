/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FormDataState,
  SubmissionRecord,
} from './types';
import {
  BRA_TYPES,
  PANTY_TYPES,
  PANTY_RISES,
  SHAPEWEAR_TYPES,
  GOOGLE_SHEET_ID,
} from './data/sizeCharts';
import { GoogleFormHeaderBanner } from './components/BrandLogos';
import { CustomerInfoSection } from './components/CustomerInfoSection';
import {
  BraSpecifications,
  PantySpecifications,
  ShapewearSpecifications,
} from './components/ProductOptionsSection';
import { BraSizeCalculator } from './components/BraSizeCalculator';
import { PantySizeCalculator } from './components/PantySizeCalculator';
import { ShapewearSizeCalculator } from './components/ShapewearSizeCalculator';
import { GoogleSheetModal } from './components/GoogleSheetModal';
import { SubmissionsDrawer } from './components/SubmissionsDrawer';
import { SuccessReceipt } from './components/SuccessReceipt';
import {
  getStoredSubmissions,
  getCustomWebhookUrl,
  submitConsultationToGoogleSheet,
} from './services/sheetService';
import {
  Send,
  Loader2,
  AlertCircle,
  CheckSquare,
  Square,
  Sparkles,
  Database,
  Table,
} from 'lucide-react';

const INITIAL_FORM_DATA: FormDataState = {
  name: '',
  contactNumber: '',
  emailId: '',

  // All 3 enabled by default so client fills all 3 in one form
  includeBra: true,
  includePanty: true,
  includeShapewear: true,

  // Bra Specific
  braCurrentSize: '',
  braBrandsYouUse: '',
  braStyleNumber: '',
  braType: '',
  braPadding: 'Padded',
  braWire: 'Non Wired',
  braPreference: '',
  underbustCm: '75',
  overbustCm: '92',
  selectedBraBand: 34,
  selectedBraCup: 'Cup C',
  braSoieSize: '34C',

  // Panty Specific
  pantyCurrentSize: '',
  pantyBrandsYouUse: '',
  pantyStyleNumber: '',
  pantyType: '',
  pantyRise: PANTY_RISES[1],
  pantyPreference: '',
  pantyHip: '36-38 in (89-97 cm)',
  pantyWaist: '71.12 cm (28")',
  selectedPantySize: 'M',
  pantySoieSize: 'M',

  // Shapewear Specific
  shapewearCurrentSize: '',
  shapewearBrandsYouUse: '',
  shapewearStyleNumber: '',
  shapewearType: '',
  shapewearPreference: '',
  shapewearHip: '38 in',
  shapewearWaist: '30 in',
  selectedShapewearSize: 'M',
  shapewearSoieSize: 'M',

  // Fallbacks
  product: 'Bra',
  soieSize: '34C',
};

export default function App() {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecords, setSubmittedRecords] = useState<SubmissionRecord[] | null>(null);
  const [showSheetModal, setShowSheetModal] = useState(false);
  const [showSubmissionsDrawer, setShowSubmissionsDrawer] = useState(false);
  const [submissionsList, setSubmissionsList] = useState<SubmissionRecord[]>([]);
  const [hasWebhook, setHasWebhook] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Check if admin mode is requested via URL query param (?admin=true)
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');

  useEffect(() => {
    setSubmissionsList(getStoredSubmissions());
    setHasWebhook(!!getCustomWebhookUrl());
  }, []);

  const handleUpdateFormData = (updates: Partial<FormDataState>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
    if (formError) setFormError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError('Please enter client Full Name.');
      return false;
    }
    if (!formData.contactNumber.trim()) {
      setFormError('Please enter client Contact Number.');
      return false;
    }
    if (!formData.emailId.trim() || !formData.emailId.includes('@')) {
      setFormError('Please enter a valid Email ID.');
      return false;
    }
    if (!formData.includeBra && !formData.includePanty && !formData.includeShapewear) {
      setFormError('Please select at least one product category (Bra, Panty, or Shapewear) to include.');
      return false;
    }
    if (formData.includeBra && !formData.braType) {
      setFormError('Please select Bra Type (Select the Option).');
      return false;
    }
    if (formData.includePanty && !formData.pantyType) {
      setFormError('Please select Panty Type (Select the Option).');
      return false;
    }
    if (formData.includeShapewear && !formData.shapewearType) {
      setFormError('Please select Shapewear Type (Select the Option).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const result = await submitConsultationToGoogleSheet(formData);
      setSubmittedRecords(result.records);
      setSubmissionsList(getStoredSubmissions());
    } catch (err: any) {
      setFormError(err?.message || 'Submission failed. Please check network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedRecords(null);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleClearAllSubmissions = () => {
    if (confirm('Are you sure you want to clear all locally saved submissions?')) {
      localStorage.removeItem('soie_fit_submissions_v1');
      setSubmissionsList([]);
    }
  };

  // Build active product label for submit button
  const activeProducts = [
    formData.includeBra ? 'Bra' : null,
    formData.includePanty ? 'Panty' : null,
    formData.includeShapewear ? 'Shapewear' : null,
  ].filter(Boolean);

  const buttonProductLabel = activeProducts.length > 0 ? activeProducts.join(' · ') : 'Consultation';

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2F0] text-stone-900 selection:bg-rose-500 selection:text-white">
      {/* Main Google Form-Style Container (Top header removed per user request, starts directly with Google Form card and professional header banner) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {submittedRecords ? (
          <SuccessReceipt
            records={submittedRecords}
            hasWebhook={hasWebhook}
            isAdmin={isAdmin}
            onReset={handleResetForm}
            onOpenSheetSetup={() => setShowSheetModal(true)}
          />
        ) : (
          <div className="space-y-4">
            {/* Form Wrapper */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. GOOGLE FORM TOP BANNER & HEADER CARD */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
                {/* Compact High-Fashion Silk Rose Header Banner */}
                <GoogleFormHeaderBanner />

                {/* Form Title & Info */}
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="border-b border-stone-100 pb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                      Intimate Wear Fit Consultation &amp; Sizing Form
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      Experience precision intimate wear sizing tailored by <strong>SOIE by Ginza Industries Limited</strong>. Complete this form to calculate official sizes and save records directly into your Google Sheet tabs (<strong>Bra</strong>, <strong>Panty</strong>, and <strong>Shapewear</strong>).
                    </p>
                  </div>

                  {/* Included Products Selection Pills (All 3 selected by default) */}
                  <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                        Products Included in this Consultation:
                      </span>
                      <span className="text-[11px] text-stone-500 hidden sm:inline">
                        Each product data routes to its own sheet tab
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {/* Bra Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleUpdateFormData({ includeBra: !formData.includeBra })}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includeBra
                            ? 'bg-white border-rose-500 shadow-2xs text-rose-950 font-bold ring-1 ring-rose-400'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includeBra ? (
                          <CheckSquare className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm">1. Bra Fit &amp; Sizing</span>
                      </button>

                      {/* Panty Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleUpdateFormData({ includePanty: !formData.includePanty })}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includePanty
                            ? 'bg-white border-rose-500 shadow-2xs text-rose-950 font-bold ring-1 ring-rose-400'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includePanty ? (
                          <CheckSquare className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm">2. Panty Sizing</span>
                      </button>

                      {/* Shapewear Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleUpdateFormData({ includeShapewear: !formData.includeShapewear })}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includeShapewear
                            ? 'bg-white border-rose-500 shadow-2xs text-rose-950 font-bold ring-1 ring-rose-400'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includeShapewear ? (
                          <CheckSquare className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm">3. Shapewear Contour</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CLIENT INFORMATION CARD (Google Form Card Style) */}
              <CustomerInfoSection
                formData={formData}
                onChange={handleUpdateFormData}
              />

              {/* 3. BRA SECTION: Specifications + Step 1 & Step 2 Fit Finder */}
              {formData.includeBra && (
                <div className="space-y-3.5">
                  <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-[#7C2136] text-white px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs">
                    <span className="text-sm sm:text-base font-semibold tracking-wide">
                      Section 1 · Bra Fit Consultation &amp; Sizing
                    </span>
                    <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                      Bra
                    </span>
                  </div>

                  {/* Bra Specifications */}
                  <BraSpecifications
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />

                  {/* Bra Interactive Step 1 & Step 2 Fit Finder */}
                  <BraSizeCalculator
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />
                </div>
              )}

              {/* 4. PANTY SECTION: Specifications + Interactive Sizing Table */}
              {formData.includePanty && (
                <div className="space-y-3.5">
                  <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-[#7C2136] text-white px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs">
                    <span className="text-sm sm:text-base font-semibold tracking-wide">
                      Section 2 · Panty Fit Consultation &amp; Sizing
                    </span>
                    <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                      Panty
                    </span>
                  </div>

                  {/* Panty Specifications */}
                  <PantySpecifications
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />

                  {/* Panty Interactive Sizing Table */}
                  <PantySizeCalculator
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />
                </div>
              )}

              {/* 5. SHAPEWEAR SECTION: Specifications + Interactive Sizing Table */}
              {formData.includeShapewear && (
                <div className="space-y-3.5">
                  <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-[#7C2136] text-white px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs">
                    <span className="text-sm sm:text-base font-semibold tracking-wide">
                      Section 3 · Shapewear Fit Consultation &amp; Sizing
                    </span>
                    <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                      Shapewear
                    </span>
                  </div>

                  {/* Shapewear Specifications */}
                  <ShapewearSpecifications
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />

                  {/* Shapewear Sizing Table */}
                  <ShapewearSizeCalculator
                    formData={formData}
                    onChange={handleUpdateFormData}
                  />
                </div>
              )}

              {/* Form Error Alert if validation fails */}
              {formError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3 text-xs shadow-2xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Please check required fields:</strong>
                    <p className="mt-0.5">{formError}</p>
                  </div>
                </div>
              )}

              {/* 6. SUBMISSION CARD WITH SINGLE PROMINENT SUBMIT BUTTON */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving Records to Google Sheet Tabs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Fit Consultation ({buttonProductLabel})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Clean Google Form Footer (Public Models Form - No sheet sync or scripts exposed) */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-center text-xs text-stone-600">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-stone-800 tracking-wide text-sm">
            SOIE · GINZA INDUSTRIES LIMITED
          </p>
          <p className="text-xs text-stone-500">
            Official Intimate Wear Fit &amp; Size Consultation
          </p>
          <p className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} SOIE · All rights reserved
          </p>

          {/* Admin Only Controls: hidden from models, only enabled if URL has ?admin=true */}
          {isAdmin && (
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-dashed border-stone-200 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Admin Mode
              </span>
              <button
                type="button"
                onClick={() => setShowSubmissionsDrawer(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-stone-500" />
                <span>Saved Responses ({submissionsList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSheetModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
              >
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sheet Setup &amp; Script</span>
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* Floating admin pill: Only visible if ?admin=true */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 bg-stone-900/90 hover:bg-stone-900 text-white px-3 py-1.5 rounded-full shadow-lg border border-stone-700/60 backdrop-blur-md transition-all text-xs">
          <button
            type="button"
            onClick={() => setShowSubmissionsDrawer(true)}
            className="inline-flex items-center gap-1 text-stone-300 hover:text-white cursor-pointer"
            title="View saved responses"
          >
            <Database className="w-3.5 h-3.5 text-rose-400" />
            <span>Responses</span>
            {submissionsList.length > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
                {submissionsList.length}
              </span>
            )}
          </button>

          <span className="w-px h-3 bg-stone-700" />

          <button
            type="button"
            onClick={() => setShowSheetModal(true)}
            className="inline-flex items-center gap-1 text-emerald-300 hover:text-white cursor-pointer"
            title="Google Sheet Integration"
          >
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sheet Setup</span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <GoogleSheetModal
        isOpen={showSheetModal}
        onClose={() => setShowSheetModal(false)}
        onWebhookUpdated={() => setHasWebhook(!!getCustomWebhookUrl())}
      />

      <SubmissionsDrawer
        isOpen={showSubmissionsDrawer}
        onClose={() => setShowSubmissionsDrawer(false)}
        submissions={submissionsList}
        onClearAll={handleClearAllSubmissions}
      />
    </div>
  );
}
