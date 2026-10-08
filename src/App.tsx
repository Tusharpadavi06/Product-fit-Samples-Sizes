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
import { SampleInterestModal } from './components/SampleInterestModal';
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
  braPadding: '',
  braWire: '',
  braPreference: '',
  underbustCm: '',
  overbustCm: '',
  selectedBraBand: null,
  selectedBraCup: null,
  braSoieSize: '',

  // Panty Specific
  pantyCurrentSize: '',
  pantyBrandsYouUse: '',
  pantyStyleNumber: '',
  pantyType: '',
  pantyRise: '',
  pantyPreference: '',
  pantyHip: '',
  pantyWaist: '',
  selectedPantySize: null,
  pantySoieSize: '',

  // Shapewear Specific
  shapewearCurrentSize: '',
  shapewearBrandsYouUse: '',
  shapewearStyleNumber: '',
  shapewearType: '',
  shapewearPreference: '',
  shapewearHip: '',
  shapewearWaist: '',
  selectedShapewearSize: null,
  shapewearSoieSize: '',

  // Fallbacks
  product: 'Bra',
  soieSize: '',
};

export default function App() {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecords, setSubmittedRecords] = useState<SubmissionRecord[] | null>(null);
  const [showSheetModal, setShowSheetModal] = useState(false);
  const [showSubmissionsDrawer, setShowSubmissionsDrawer] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [submissionsList, setSubmissionsList] = useState<SubmissionRecord[]>([]);
  const [hasWebhook, setHasWebhook] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    if (formData.includeBra) {
      if (!formData.braType) {
        setFormError('Please select Bra Type (Select the Option).');
        return false;
      }
      if (!formData.braPadding) {
        setFormError('Please select Padding (Select the Option).');
        return false;
      }
      if (!formData.braWire) {
        setFormError('Please select Wire (Select the Option).');
        return false;
      }
      if (!formData.selectedBraBand) {
        setFormError('Please select Step 1 · Underbust Measurement.');
        return false;
      }
      if (!formData.selectedBraCup) {
        setFormError('Please select Step 2 · Overbust Measurement.');
        return false;
      }
    }
    if (formData.includePanty) {
      if (!formData.pantyType) {
        setFormError('Please select Panty Type (Select the Option).');
        return false;
      }
      if (!formData.pantyRise) {
        setFormError('Please select Rise (Select the Option).');
        return false;
      }
      if (!formData.pantyHip) {
        setFormError('Please complete Step 1: Select To Fit Hip (Cm) for Panty.');
        return false;
      }
      if (!formData.pantyWaist) {
        setFormError('Please complete Step 2: Select To Fit Waist (Cm) for Panty.');
        return false;
      }
    }
    if (formData.includeShapewear) {
      if (!formData.shapewearType) {
        setFormError('Please select Shapewear Type (Select the Option).');
        return false;
      }
      if (!formData.shapewearHip) {
        setFormError('Please complete Step 1: Select To Fit Hip (cm) for Shapewear.');
        return false;
      }
      if (!formData.shapewearWaist) {
        setFormError('Please complete Step 2: Select To Fit Waist (cm) for Shapewear.');
        return false;
      }
    }
    return true;
  };

  // Step 1: User clicks "Submit Fit Consultation" -> validate & open Sample Preference Modal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowSampleModal(true);
  };

  // Step 2: User answers sample question in new window -> Final submit to Google Sheet
  const handleConfirmSampleSubmission = async (selectedSamples: string[]) => {
    setIsSubmitting(true);
    setFormError(null);

    const sampleInterestBra = selectedSamples.includes('Bra');
    const sampleInterestPanty = selectedSamples.includes('Panty');
    const sampleInterestShapewear = selectedSamples.includes('Shapewear');

    const finalFormData: FormDataState = {
      ...formData,
      samplesInterested: selectedSamples,
      sampleInterestBra,
      sampleInterestPanty,
      sampleInterestShapewear,
    };

    setFormData(finalFormData);

    try {
      const result = await submitConsultationToGoogleSheet(finalFormData);
      setShowSampleModal(false);
      setSubmittedRecords(result.records);
      setSubmissionsList(getStoredSubmissions());
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
    <div className="min-h-screen flex flex-col bg-[#F6F2F0] text-stone-900 selection:bg-slate-700 selection:text-white">
      {/* Main Google Form-Style Container (Top header removed per user request, starts directly with Google Form card and professional header banner) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {submittedRecords ? (
          <SuccessReceipt
            records={submittedRecords}
            onReset={handleResetForm}
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
                      Fit Consultation Form
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      Experience precision intimate wear sizing tailored by <strong>SOIE</strong>.
                    </p>
                  </div>

                  {/* Included Products Selection Pills (All 3 selected by default) */}
                  <div className="bg-stone-50 p-3.5 sm:p-4 rounded-2xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-stone-700" />
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
                        className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includeBra
                            ? 'bg-white border-stone-800 shadow-2xs text-stone-900 font-semibold ring-1 ring-stone-800'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includeBra ? (
                          <CheckSquare className="w-4 h-4 text-stone-900 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-[13px]">1. Bra Fit &amp; Sizing</span>
                      </button>

                      {/* Panty Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleUpdateFormData({ includePanty: !formData.includePanty })}
                        className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includePanty
                            ? 'bg-white border-stone-800 shadow-2xs text-stone-900 font-semibold ring-1 ring-stone-800'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includePanty ? (
                          <CheckSquare className="w-4 h-4 text-stone-900 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-[13px]">2. Panty Sizing</span>
                      </button>

                      {/* Shapewear Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleUpdateFormData({ includeShapewear: !formData.includeShapewear })}
                        className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.includeShapewear
                            ? 'bg-white border-stone-800 shadow-2xs text-stone-900 font-semibold ring-1 ring-stone-800'
                            : 'bg-white/60 border-stone-200 text-stone-500 hover:bg-white'
                        }`}
                      >
                        {formData.includeShapewear ? (
                          <CheckSquare className="w-4 h-4 text-stone-900 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                        <span className="text-xs sm:text-[13px]">3. Shapewear Contour</span>
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
                <div className="space-y-3">
                  <div className="bg-[#676765] text-white px-4 py-2.5 rounded-xl shadow-xs border border-[#555553]">
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Section 1 · Bra Fit Consultation &amp; Sizing
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
                <div className="space-y-3">
                  <div className="bg-[#676765] text-white px-4 py-2.5 rounded-xl shadow-xs border border-[#555553]">
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Section 2 · Panty Fit Consultation &amp; Sizing
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
                <div className="space-y-3">
                  <div className="bg-[#676765] text-white px-4 py-2.5 rounded-xl shadow-xs border border-[#555553]">
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Section 3 · Shapewear Fit Consultation &amp; Sizing
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
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 flex items-start gap-2.5 text-xs shadow-2xs">
                  <AlertCircle className="w-4 h-4 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Please check required fields:</strong>
                    <p className="mt-0.5">{formError}</p>
                  </div>
                </div>
              )}

              {/* 6. SUBMISSION CARD WITH SINGLE PROMINENT SUBMIT BUTTON IN #efa4a9 */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#efa4a9] hover:bg-[#e79298] text-stone-900 border border-[#e59298] font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                      <span>Saving Records to Google Sheet Tabs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-stone-900" />
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
        </div>
      </footer>

      {/* New Window Modal: Thank you message & Final Sample Interest Question */}
      <SampleInterestModal
        isOpen={showSampleModal}
        onClose={() => setShowSampleModal(false)}
        onConfirm={handleConfirmSampleSubmission}
        isSubmitting={isSubmitting}
        clientName={formData.name}
      />

      {/* Background Modals & Drawers (hidden by default) */}
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
