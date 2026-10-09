import React from 'react';
import { SHAPEWEAR_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState } from '../types';
import { ShapewearMeasurementPhoto } from './BrandLogos';
import { Check, Sparkles } from 'lucide-react';

interface ShapewearSizeCalculatorProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

type ShapewearRow = (typeof SHAPEWEAR_SIZE_CHART)[number];

export const ShapewearSizeCalculator: React.FC<ShapewearSizeCalculatorProps> = ({
  formData,
  onChange,
}) => {
  const getHipStr = (item: ShapewearRow) => `${item.hipCm} cm`;

  const selectedHipRow = SHAPEWEAR_SIZE_CHART.find(
    (item) => formData.shapewearHip === getHipStr(item)
  );

  // User selects Hip measurement to lock Shapewear size
  const handleSelectHip = (item: ShapewearRow) => {
    const hipStr = getHipStr(item);
    const newSize = item.size;

    onChange({
      shapewearHip: hipStr,
      shapewearWaist: '',
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  const isHipCompleted = !!formData.shapewearHip;
  const calculatedSize = formData.shapewearSoieSize || selectedHipRow?.size || '';

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title Header */}
      <div className="border-b border-stone-100 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <h3 className="text-xs sm:text-[13px] font-semibold text-stone-800">
            Select Your Compression Fit Size (Tap Any Option to Highlight &amp; Lock)
          </h3>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Select To Fit Hip (cm) to lock your ideal SOIE shapewear size
          </p>
        </div>

        {/* Step Badge */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-[11px]">
          <span
            className={`px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1 ${
              isHipCompleted
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 border border-stone-200'
            }`}
          >
            {isHipCompleted ? <Check className="w-3 h-3" /> : null}
            To Fit Hip {isHipCompleted ? '✓' : ''}
          </span>
        </div>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on Left, Hip Selection Box on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Shapewear Measurement Photo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-1">
          <ShapewearMeasurementPhoto size="sm" />
          <p className="text-[10px] text-stone-500 text-center mt-1.5 px-2">
            Wrap tape snugly around widest hip line to determine your sculpting size.
          </p>
        </div>

        {/* Right: Hip Measurement Box */}
        <div className="lg:col-span-8 space-y-3.5">
          <div
            className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
              isHipCompleted
                ? 'bg-stone-50/80 border-stone-200'
                : 'bg-stone-50 border-stone-300 ring-1 ring-stone-300'
            }`}
          >
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wide">
                    To Fit Hip (cm)
                  </span>
                  {isHipCompleted && (
                    <span className="text-[9px] bg-stone-900 text-white font-bold px-1.5 py-0.2 rounded">
                      Done
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-stone-500 block">
                  (Tap to choose Hip measurement)
                </span>
              </div>
            </div>

            {/* Grid of Hip Options (2 cols on mobile, 3 cols on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SHAPEWEAR_SIZE_CHART.map((item) => {
                const hipVal = getHipStr(item);
                const isSelected = formData.shapewearHip === hipVal;

                return (
                  <button
                    type="button"
                    key={item.size}
                    onClick={() => handleSelectHip(item)}
                    className={`py-2.5 px-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs ring-1 ring-stone-700'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs sm:text-[13px] font-semibold tracking-tight">
                        {item.hipCm}
                      </span>
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />}
                    </div>
                    <span
                      className={`text-[10px] leading-none mt-0.5 ${
                        isSelected ? 'text-stone-300 font-medium' : 'text-stone-500'
                      }`}
                    >
                      cm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Recommended SOIE Size Box in #676765 */}
          <div className="bg-[#676765] text-white px-3.5 py-2.5 rounded-xl border border-[#555553] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
              <div className="text-xs sm:text-[13px] font-bold flex items-center gap-2 text-white">
                <span>Recommended SOIE Size:</span>
                <span className="text-sm sm:text-base text-stone-900 font-bold tracking-normal bg-white px-2.5 py-0.5 rounded-md shadow-xs border border-stone-200 font-sans">
                  {calculatedSize || '—'}
                </span>
              </div>
              <div className="text-[11px] text-stone-200 font-medium">
                {isHipCompleted ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-stone-200 flex-shrink-0" />
                    Shapewear Size: {calculatedSize} (To Fit Hip: {formData.shapewearHip})
                  </span>
                ) : (
                  <span>Please select your Hip measurement to lock recommended size</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
