import React, { useEffect } from 'react';
import { SubmissionRecord } from '../types';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
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

  if (!primaryRecord) return null;

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Banner - #efa4a9 Pink Palette as requested */}
      <div className="bg-[#efa4a9] text-stone-900 p-5 sm:p-7 text-center relative overflow-hidden border-b border-[#e59298]">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-white/20 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-xs flex items-center justify-center mb-2.5 ring-2 ring-white/60 shadow-xs">
            <CheckCircle2 className="w-7 h-7 text-stone-950" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-800 mb-0.5">
            Fit Consultation Complete
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-stone-950">
            Consultation Successfully Recorded!
          </h2>
          <p className="text-xs text-stone-800 max-w-lg mt-1 leading-relaxed">
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

        {/* Brand Header - SOIE Official Logo from https://ibb.co/pj3g7N1P for receipt page only */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center">
            <img
              src="/images/soie-receipt-logo.png"
              alt="SOIE Official Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://i.ibb.co/LdCMFB0P/Whats-App-Image-2026-10-08-at-2-09-01-PM.jpg';
              }}
            />
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
            Based on your input, we provide your ideal sizes as follows.
          </p>
        </div>

        {/* Highlighted Recommendation Boxes in #676765 - Only shows Product & Size with clean font */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {allRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-[#676765] text-white rounded-xl p-3 sm:p-4 text-center shadow-xs border border-[#555553] flex flex-col items-center justify-center min-h-[90px]"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-200 block">
                {rec.product}
              </span>
              <div className="font-sans text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                {rec.soieSize}
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
                    <span className="font-medium text-slate-800">
                      {rec.rawFormData?.braPadding || rec.paddingOrRiseOrPref}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Wire:</span>
                    <span className="font-medium text-slate-800">
                      {rec.rawFormData?.braWire || rec.wireOrPrefOrHip}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Underbust:</span>
                    <span className="font-medium text-slate-800">
                      {rec.rawFormData?.underbustCm ? `${rec.rawFormData.underbustCm} cms` : `${rec.underbustOrWaistOrPhone} cms`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Overbust:</span>
                    <span className="font-medium text-slate-800">
                      {rec.rawFormData?.overbustCm ? `${rec.rawFormData.overbustCm} cms` : `${rec.overbustOrPhoneOrEmail} cms`}
                    </span>
                  </div>
                </>
              )}

              {rec.product === 'Panty' && (
                <>
                  <div>
                    <span className="text-slate-500 block">Rise:</span>
                    <span className="font-medium text-slate-800">
                      {rec.rawFormData?.pantyRise || rec.paddingOrRiseOrPref}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hip:</span>
                    <span className="font-medium text-slate-800">
                      {rec.hipValue || rec.rawFormData?.pantyHip || rec.prefOrHipOrWaist}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Waist:</span>
                    <span className="font-medium text-slate-800">
                      {rec.waistValue || rec.rawFormData?.pantyWaist || rec.underbustOrWaistOrPhone}
                    </span>
                  </div>
                </>
              )}

              {rec.product === 'Shapewear' && (
                <>
                  <div>
                    <span className="text-slate-500 block">Preference:</span>
                    <span className="font-medium text-slate-800">
                      {rec.preferenceValue || rec.rawFormData?.shapewearPreference || rec.paddingOrRiseOrPref || 'None'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hip:</span>
                    <span className="font-medium text-slate-800">
                      {rec.hipValue || rec.rawFormData?.shapewearHip || rec.wireOrPrefOrHip}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Waist:</span>
                    <span className="font-medium text-slate-800">
                      {rec.waistValue || rec.rawFormData?.shapewearWaist || rec.prefOrHipOrWaist}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#676765] hover:bg-[#575755] text-white rounded-xl text-sm font-semibold cursor-pointer shadow-md transition-all border border-[#555553]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Submit Another Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
