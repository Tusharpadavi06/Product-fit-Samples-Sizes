import React from 'react';
import { SHAPEWEAR_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState } from '../types';
import { ShapewearMeasurementPhoto } from './BrandLogos';
import { Check, Sparkles, Lock, ArrowRight } from 'lucide-react';

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
  const getWaistStr = (item: ShapewearRow) => `${item.waistCm} cm`;

  const selectedHipRow = SHAPEWEAR_SIZE_CHART.find(
    (item) => formData.shapewearHip === getHipStr(item)
  );
  const selectedWaistRow = SHAPEWEAR_SIZE_CHART.find(
    (item) => formData.shapewearWaist === getWaistStr(item)
  );

  const computeSize = (hipRow?: ShapewearRow, waistRow?: ShapewearRow): string => {
    if (hipRow && waistRow) {
      if (hipRow.size === waistRow.size) return hipRow.size;
      return `${hipRow.size} / ${waistRow.size}`;
    }
    if (hipRow) return hipRow.size;
    if (waistRow) return waistRow.size;
    return '';
  };

  // Step 1: User selects Hip
  const handleSelectHip = (item: ShapewearRow) => {
    const hipStr = getHipStr(item);
    const targetWaistRow = selectedWaistRow;
    const waistStr = targetWaistRow ? formData.shapewearWaist : '';
    const newSize = computeSize(item, targetWaistRow);

    onChange({
      shapewearHip: hipStr,
      shapewearWaist: waistStr,
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  // Step 2: User selects Waist
  const handleSelectWaist = (item: ShapewearRow) => {
    const waistStr = getWaistStr(item);
    const targetHipRow = selectedHipRow;
    const newSize = computeSize(targetHipRow, item);

    onChange({
      shapewearWaist: waistStr,
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  const isStep1Completed = !!formData.shapewearHip;
  const isStep2Completed = !!formData.shapewearWaist;
  const isBothCompleted = isStep1Completed && isStep2Completed;

  const calculatedSize =
    formData.shapewearSoieSize ||
    computeSize(selectedHipRow, selectedWaistRow) ||
    '';

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
      {/* Title & Step Progression Header */}
      <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-stone-900">
            Select Your Compression Fit Size
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Step 1: Select To Fit Hip (cm) · Step 2: Select To Fit Waist (cm) to lock both values
          </p>
        </div>

        {/* Step Progress Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 ${
              isStep1Completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100 text-rose-800 ring-1 ring-rose-300 animate-pulse'
            }`}
          >
            {isStep1Completed ? <Check className="w-3.5 h-3.5" /> : null}
            Step 1: Hip {isStep1Completed ? '✓' : ''}
          </span>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />

          <span
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 ${
              isStep2Completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : isStep1Completed
                ? 'bg-rose-100 text-rose-800 ring-2 ring-rose-400 animate-pulse'
                : 'bg-stone-100 text-stone-400'
            }`}
          >
            {isStep2Completed ? <Check className="w-3.5 h-3.5" /> : null}
            Step 2: Waist {isStep2Completed ? '✓' : ''}
          </span>
        </div>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on Left, Step 1 & Step 2 Side-by-Side Boxes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Shapewear Measurement Photo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-1">
          <ShapewearMeasurementPhoto size="sm" />
          <p className="text-[11px] text-stone-500 text-center mt-2 px-2">
            Wrap tape snugly around widest hip line for Step 1, then waist curve for Step 2.
          </p>
        </div>

        {/* Right: Step 1 Box and Step 2 Box */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ================= STEP 1: TO FIT HIP (CM) ================= */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                isStep1Completed
                  ? 'bg-stone-50/80 border-emerald-300'
                  : 'bg-rose-50/30 border-rose-300 ring-1 ring-rose-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                      Step 1 · To Fit Hip (cm)
                    </span>
                    {isStep1Completed && (
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                        Done
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    (Tap to choose Hip measurement)
                  </span>
                </div>
              </div>

              {/* Grid of Hip Options */}
              <div className="grid grid-cols-2 gap-2">
                {SHAPEWEAR_SIZE_CHART.map((item) => {
                  const hipVal = getHipStr(item);
                  const isSelected = formData.shapewearHip === hipVal;

                  return (
                    <button
                      type="button"
                      key={item.size}
                      onClick={() => handleSelectHip(item)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-700 font-bold shadow-xs ring-2 ring-rose-400'
                          : 'bg-white hover:bg-rose-50/70 border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-xs sm:text-sm font-bold tracking-tight">
                          {item.hipCm}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                      <span
                        className={`text-[10px] ${
                          isSelected ? 'text-rose-100 font-semibold' : 'text-stone-500'
                        }`}
                      >
                        cm
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 2: TO FIT WAIST (CM) ================= */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                !isStep1Completed
                  ? 'bg-stone-50/50 border-stone-200 opacity-60'
                  : isStep2Completed
                  ? 'bg-stone-50/80 border-emerald-300'
                  : 'bg-rose-50/40 border-rose-400 ring-2 ring-rose-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                      Step 2 · To Fit Waist (cm)
                    </span>
                    {isStep2Completed ? (
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                        Done
                      </span>
                    ) : isStep1Completed ? (
                      <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded animate-pulse">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    (Tap to choose Waist measurement)
                  </span>
                </div>
              </div>

              {!isStep1Completed ? (
                <div className="py-8 text-center text-stone-500 text-xs flex flex-col items-center justify-center space-y-1.5">
                  <Lock className="w-5 h-5 text-stone-400" />
                  <p className="font-semibold text-stone-700">Step 2 Locked</p>
                  <p className="text-[11px] text-stone-500">
                    Select your Hip measurement in Step 1 first to unlock Waist options.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                  {SHAPEWEAR_SIZE_CHART.map((item) => {
                    const waistVal = getWaistStr(item);
                    const isSelected = formData.shapewearWaist === waistVal;

                    return (
                      <button
                        type="button"
                        key={item.size}
                        onClick={() => handleSelectWaist(item)}
                        className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-700 font-bold shadow-xs ring-2 ring-rose-400'
                            : 'bg-white hover:bg-rose-50/70 border-stone-200 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xs sm:text-sm font-bold tracking-tight">
                            {item.waistCm}
                          </span>
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span
                          className={`text-[10px] ${
                            isSelected ? 'text-rose-100 font-semibold' : 'text-stone-500'
                          }`}
                        >
                          cm
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Compact Recommended SOIE Size Box */}
          <div className="bg-stone-900 text-white px-4 py-3 rounded-xl border border-stone-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
                <span className="text-stone-300">Recommended SOIE Size:</span>
                <span className="text-lg sm:text-xl text-rose-300 font-bold tracking-tight bg-stone-800 px-2.5 py-0.5 rounded-md border border-stone-700">
                  {calculatedSize || '—'}
                </span>
              </div>
              <div className="text-xs text-stone-300 font-normal">
                {isBothCompleted ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    Shapewear Size: {calculatedSize} (Step 1 Hip: {formData.shapewearHip} · Step 2 Waist: {formData.shapewearWaist})
                  </span>
                ) : isStep1Completed ? (
                  <span className="text-rose-300 font-medium">
                    Step 1 Hip ({formData.shapewearHip}) selected · Now tap Step 2 Waist to lock size
                  </span>
                ) : (
                  <span>Please complete Step 1 (Hip) and Step 2 (Waist) to lock recommended size</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
