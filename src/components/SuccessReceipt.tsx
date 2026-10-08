import React, { useEffect } from 'react';
import { SubmissionRecord } from '../types';
import { SoieOriginalLogo } from './BrandLogos';
import { CheckCircle2, RotateCcw, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessReceiptProps {
  records?: SubmissionRecord[];
  record?: SubmissionRecord;
  onReset: () => void;
}

export const SuccessReceipt: React.FC<SuccessReceiptProps> = ({
  records,
  record,
  onReset,
}) => {
  const allRecords = records && records.length > 0 ? records : record ? [record] : [];
  const primaryRecord = allRecords[0];

  useEffect(() => {
    // Scroll window immediately to top so user sees the top of the completion page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#475569', '#64748B', '#94A3B8', '#CBD5E1', '#334155'],
      });
    } catch (e) {
      // Ignore if blocked
    }

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!primaryRecord) return null;

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Banner - Sleek Professional Grey Palette (Not black, not maroon) */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white p-5 sm:p-7 text-center relative overflow-hidden border-b border-slate-500">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center mb-2.5 ring-2 ring-white/25 shadow-xs">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-200 mb-0.5">
            Fit Consultation Complete
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Consultation Successfully Recorded!
          </h2>
          <p className="text-xs text-slate-200 max-w-lg mt-1 leading-relaxed">
            Client: <strong>{primaryRecord.name}</strong> · Category:{' '}
            <strong>{allRecords.map((r) => r.product).join(', ')}</strong>
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* Clean Consultation Confirmation Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-slate-700 flex-shrink-0" />
            <span>Your consultation record has been confirmed and saved.</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-700 px-2.5 py-0.5 rounded-full">
            Confirmed
          </span>
        </div>

        {primaryRecord.rawFormData?.samplesInterested &&
          primaryRecord.rawFormData.samplesInterested.length > 0 && (
            <div className="bg-slate-100/90 border border-slate-300 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-slate-700 flex-shrink-0" />
                <span>
                  Sample Trial Requested:{' '}
                  <strong className="text-slate-900 font-semibold">
                    {primaryRecord.rawFormData.samplesInterested.join(', ')}
                  </strong>
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md font-mono">
                Sample Noted
              </span>
            </div>
          )}

        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <SoieOriginalLogo size="md" />
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-slate-900 block leading-none">
                SOIE
              </span>
              <span className="text-[10px] text-slate-600 font-semibold tracking-wider uppercase">
                SWA · स्वा · Official Consultation Pass
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-mono">
              Timestamp
            </span>
            <span className="text-xs font-mono font-bold text-slate-800">
              {primaryRecord.timestamp}
            </span>
          </div>
        </div>

        {/* Fit Size Recommendations Section Header (as requested by user) */}
        <div className="space-y-0.5 pt-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Your Fit Size Recommendations
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Here are your recommended <strong>Bra, Panty, and Shapewear sizes</strong> based on the details you provided.
          </p>
        </div>

        {/* Medium-Sized Size Cards for each submitted product (Medium size and sleek grey palette as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {allRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-gradient-to-b from-slate-700 to-slate-800 text-white rounded-xl p-3 sm:p-3.5 text-center shadow-xs relative overflow-hidden flex flex-col justify-between border border-slate-600"
            >
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-semibold block mb-0.5">
                  {rec.product} Fit Size
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-white my-1 tracking-tight">
                  {rec.soieSize}
                </div>
                <p className="text-[11px] text-slate-200 truncate mt-0.5" title={`Type: ${rec.type}`}>
                  Type: {rec.type}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-600/80 text-[10px] text-slate-300 font-medium font-mono">
                {rec.product} · Recommended Size
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown for each product */}
        {allRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-slate-50 rounded-xl p-3 sm:p-3.5 border border-slate-200 text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                {rec.product} Fit Details
              </h4>
              <span className="font-mono text-[10px] text-slate-500">{rec.id}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-slate-500 block">Current Size:</span>
                <span className="font-semibold text-slate-800">{rec.currentSize}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Brand:</span>
                <span className="font-semibold text-slate-800">{rec.brandsYouUse}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Type:</span>
                <span className="font-semibold text-slate-800">{rec.type}</span>
              </div>
              <div>
                <span className="text-slate-500 block">SOIE Size:</span>
                <span className="font-bold text-slate-900">{rec.soieSize}</span>
              </div>

              {rec.product === 'Bra' && (
                <>
                  <div>
                    <span className="text-slate-500 block">Padding:</span>
                    <span className="font-medium text-slate-800">{rec.paddingOrRiseOrPref}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Wire:</span>
                    <span className="font-medium text-slate-800">{rec.wireOrPrefOrHip}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Underbust:</span>
                    <span className="font-medium text-slate-800">{rec.underbustOrWaistOrPhone} cms</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Overbust:</span>
                    <span className="font-medium text-slate-800">{rec.overbustOrPhoneOrEmail} cms</span>
                  </div>
                </>
              )}

              {rec.product === 'Panty' && (
                <>
                  <div>
                    <span className="text-slate-500 block">Rise:</span>
                    <span className="font-medium text-slate-800">{rec.paddingOrRiseOrPref}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hip:</span>
                    <span className="font-medium text-slate-800">{rec.prefOrHipOrWaist}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Waist:</span>
                    <span className="font-medium text-slate-800">{rec.underbustOrWaistOrPhone}</span>
                  </div>
                </>
              )}

              {rec.product === 'Shapewear' && (
                <>
                  <div>
                    <span className="text-slate-500 block">Preference:</span>
                    <span className="font-medium text-slate-800">{rec.paddingOrRiseOrPref}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hip:</span>
                    <span className="font-medium text-slate-800">{rec.prefOrHipOrWaist}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Waist:</span>
                    <span className="font-medium text-slate-800">{rec.underbustOrWaistOrPhone}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Consultation</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-slate-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Consultation Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
