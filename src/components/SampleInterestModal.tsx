import React, { useState, useEffect } from 'react';
import { SoieOriginalLogo } from './BrandLogos';
import { Check, Sparkles, HeartHandshake, ArrowRight, Loader2, X } from 'lucide-react';

interface SampleInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedSamples: string[]) => void;
  isSubmitting: boolean;
  clientName: string;
}

const SAMPLE_OPTIONS = [
  {
    id: 'Bra',
    title: 'Bra Sample',
    desc: 'Fitting sample for bra size verification',
    col: 'Col P',
  },
  {
    id: 'Panty',
    title: 'Panty Sample',
    desc: 'Fitting sample for panty fit & comfort',
    col: 'Col O',
  },
  {
    id: 'Shapewear',
    title: 'Shapewear Sample',
    desc: 'Fitting sample for contour & compression fit',
    col: 'Col N',
  },
];

export const SampleInterestModal: React.FC<SampleInterestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  clientName,
}) => {
  // Start unselected by default as explicitly requested by user
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  // Reset to unselected every time modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSamples([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSample = (id: string) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== id));
    } else {
      setSelectedSamples([...selectedSamples, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedSamples.length === SAMPLE_OPTIONS.length) {
      setSelectedSamples([]);
    } else {
      setSelectedSamples(SAMPLE_OPTIONS.map((o) => o.id));
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedSamples);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-auto transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Soft Silent Rose / Wine Palette (Refined & understated) */}
        <div className="bg-gradient-to-r from-[#441722] via-[#541D2B] to-[#3B141E] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-1 rounded-lg shadow-sm">
              <SoieOriginalLogo size="sm" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8BDC7] block">
                SOIE by Ginza Industries Limited
              </span>
              <span className="text-xs text-white/90 font-medium">
                Fit Consultation Confirmation
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[#F2CBD4] text-[11px] font-semibold mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#E8BDC7]" />
              <span>Response Recorded</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Thank you for your response!
            </h3>
            <p className="text-xs sm:text-sm text-[#F0CBD4] font-normal leading-relaxed">
              Your response is very valuable to us.
            </p>
            {clientName && (
              <p className="text-[11px] text-[#D4A5B2] pt-0.5 font-normal">
                Client: <strong className="text-white font-semibold">{clientName}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleFinalSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Fitting Sample Question Prompt */}
          <div className="bg-[#FAF5F6] p-3.5 sm:p-4 rounded-2xl border border-[#ECDCE1] space-y-1">
            <div className="flex items-center gap-1.5 text-[#6E1C2F] font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#872338]" />
              <span>Fitting Sample Interest</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              Agar aap ko fit k liye koi sample chaiye hoga to konsa sample k liye aap interested ho?
            </p>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              You can select one, multiple, or keep all unselected before finalizing your submission:
            </p>
          </div>

          {/* Multiple Selection Options (Bra, Panty, Shapewear) - Unselected by default */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                Select Interested Sample(s):
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-semibold text-[#872338] hover:text-[#601625] cursor-pointer"
              >
                {selectedSamples.length === SAMPLE_OPTIONS.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SAMPLE_OPTIONS.map((opt) => {
                const isChecked = selectedSamples.includes(opt.id);

                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleSample(opt.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#FDF7F8] border-[#872338] shadow-2xs ring-1 ring-[#872338]'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isChecked
                            ? 'bg-[#872338] border-[#872338] text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <span className="text-xs sm:text-sm font-bold text-stone-900 block leading-tight">
                          {opt.title}
                        </span>
                        <span className="text-[11px] text-stone-500 block">
                          {opt.desc}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isChecked
                          ? 'bg-[#872338] text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {isChecked ? 'Interested ✓' : 'Tap to Select'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-100 transition-colors cursor-pointer order-2 sm:order-1 sm:w-1/3"
            >
              Back to Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#6E1C2F] via-[#85253C] to-[#5C1626] hover:from-[#5C1626] hover:to-[#46111D] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Google Sheet...</span>
                </>
              ) : (
                <>
                  <span>Final Submission &amp; Save</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
