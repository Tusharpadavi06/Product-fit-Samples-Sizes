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
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E85570', '#F68194', '#FCAEBA', '#B12543'],
      });
    } catch (e) {
      // Ignore if blocked
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!primaryRecord) return null;

  return (
    <div className="max-w-3xl mx-auto my-6 bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#441722] via-[#541D2B] to-[#3B141E] text-white p-5 sm:p-7 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center mb-2.5 ring-2 ring-white/20">
            <CheckCircle2 className="w-7 h-7 text-[#F5C2CE]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E8BDC7] mb-0.5">
            Fit Consultation Complete
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Consultation Successfully Recorded!
          </h2>
          <p className="text-xs text-[#F0CBD4] max-w-lg mt-1 leading-relaxed">
            Client: <strong>{primaryRecord.name}</strong> · Category:{' '}
            <strong>{allRecords.map((r) => r.product).join(', ')}</strong>
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Clean Consultation Confirmation Banner (Zero Google Sheet mentions/warnings) */}
        <div className="bg-rose-50/80 border border-rose-200/90 rounded-2xl p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 text-stone-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Your consultation record has been confirmed and saved.</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-200/70 px-2.5 py-0.5 rounded-full">
            Confirmed
          </span>
        </div>

        {primaryRecord.rawFormData?.samplesInterested &&
          primaryRecord.rawFormData.samplesInterested.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-800">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Sample Trial Requested:{' '}
                  <strong className="text-stone-900 font-semibold">
                    {primaryRecord.rawFormData.samplesInterested.join(', ')}
                  </strong>
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                Sample Noted
              </span>
            </div>
          )}

        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <SoieOriginalLogo size="md" />
            <div>
              <span className="font-serif text-lg font-bold text-stone-900 block leading-none">
                SOIE
              </span>
              <span className="text-[10px] text-rose-800 font-semibold tracking-wider uppercase">
                SWA · स्वा · Official Consultation Pass
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-stone-600 block uppercase font-mono">
              Timestamp
            </span>
            <span className="text-xs font-mono font-bold text-stone-800">
              {primaryRecord.timestamp}
            </span>
          </div>
        </div>

        {/* Display Size Cards for each submitted product */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {allRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-stone-900 text-white rounded-2xl p-5 text-center shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-rose-300 font-bold block mb-1">
                  {rec.product} Fit Size
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-rose-200 my-2 tracking-tight">
                  {rec.soieSize}
                </div>
                <p className="text-xs text-stone-300 truncate">
                  Type: {rec.type}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] text-stone-400 font-mono">
                {rec.product} · Recommended Size
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown for each product */}
        {allRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 text-xs space-y-2"
          >
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                {rec.product} Fit Details
              </h4>
              <span className="font-mono text-[10px] text-stone-500">{rec.id}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-stone-500 block">Current Size:</span>
                <span className="font-semibold text-stone-800">{rec.currentSize}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Brand:</span>
                <span className="font-semibold text-stone-800">{rec.brandsYouUse}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Type:</span>
                <span className="font-semibold text-stone-800">{rec.type}</span>
              </div>
              <div>
                <span className="text-stone-500 block">SOIE Size:</span>
                <span className="font-bold text-rose-700">{rec.soieSize}</span>
              </div>

              {rec.product === 'Bra' && (
                <>
                  <div>
                    <span className="text-stone-500 block">Padding:</span>
                    <span className="font-medium text-stone-800">{rec.paddingOrRiseOrPref}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Wire:</span>
                    <span className="font-medium text-stone-800">{rec.wireOrPrefOrHip}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Underbust:</span>
                    <span className="font-medium text-stone-800">{rec.underbustOrWaistOrPhone} cms</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Overbust:</span>
                    <span className="font-medium text-stone-800">{rec.overbustOrPhoneOrEmail} cms</span>
                  </div>
                </>
              )}

              {rec.product === 'Panty' && (
                <>
                  <div>
                    <span className="text-stone-500 block">Rise:</span>
                    <span className="font-medium text-stone-800">{rec.paddingOrRiseOrPref}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Hip:</span>
                    <span className="font-medium text-stone-800">{rec.prefOrHipOrWaist}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Waist:</span>
                    <span className="font-medium text-stone-800">{rec.underbustOrWaistOrPhone}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Submit Another Consultation</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Consultation Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
