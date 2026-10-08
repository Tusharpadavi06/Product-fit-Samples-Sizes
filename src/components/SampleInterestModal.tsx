import React, { useState } from 'react';
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
    desc: 'Fitting trial sample for cup & band check',
    col: 'Col P',
  },
  {
    id: 'Panty',
    title: 'Panty Sample',
    desc: 'Comfort & silhouette trial piece',
    col: 'Col O',
  },
  {
    id: 'Shapewear',
    title: 'Shapewear Sample',
    desc: 'Contour & compression trial sample',
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
  const [selectedSamples, setSelectedSamples] = useState<string[]>(['Bra', 'Panty', 'Shapewear']);

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
        {/* Top Header Banner with Silk Rose Gradient */}
        <div className="bg-gradient-to-r from-[#7C2136] via-[#B12543] to-[#E85570] text-white p-5 sm:p-6 relative">
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
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-200 block">
                SOIE by Ginza Industries Limited
              </span>
              <span className="text-xs text-white/90 font-medium">
                Fit Consultation Confirmation
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 text-[11px] font-semibold mb-1">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Response Recorded</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Thank you for your response!
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 font-medium leading-relaxed">
              Your response is very valuable to us.
            </p>
            {clientName && (
              <p className="text-[11px] text-rose-200/90 pt-0.5">
                Client: <strong>{clientName}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleFinalSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Last Question Prompt */}
          <div className="bg-rose-50/70 p-3.5 sm:p-4 rounded-2xl border border-rose-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Final Question · Fitting Sample Interest</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              If you would like a fitting sample, which product sample(s) are you interested in?
            </p>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              You can select one, multiple, or all options below before finalizing your submission:
            </p>
          </div>

          {/* Multiple Selection Options (Bra, Panty, Shapewear) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                Select Interested Sample(s):
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 cursor-pointer"
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
                        ? 'bg-rose-50 border-rose-600 shadow-2xs ring-1 ring-rose-500'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isChecked
                            ? 'bg-rose-600 border-rose-600 text-white'
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
                          ? 'bg-rose-600 text-white'
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

          {/* Destination Columns Info */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
            <span>Google Sheet Routing:</span>
            <span className="font-mono text-[10px] text-rose-800 font-semibold">
              Bra (Col P) · Panty (Col O) · Shapewear (Col N)
            </span>
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
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-[#7C2136] hover:from-rose-800 hover:to-rose-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 disabled:opacity-70"
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
