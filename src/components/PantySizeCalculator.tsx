import React from 'react';
import { PANTY_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState, PantySizeRow } from '../types';
import { PantyMeasurementPhoto } from './BrandLogos';
import { Check, Sparkles, Lock, ArrowRight } from 'lucide-react';

interface PantySizeCalculatorProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const PantySizeCalculator: React.FC<PantySizeCalculatorProps> = ({
  formData,
  onChange,
}) => {
  const getHipStr = (row: PantySizeRow) => `${row.hipCmMin} - ${row.hipCmMax} cm`;
  const getWaistStr = (row: PantySizeRow) => `${row.waistCm} cm`;

  const selectedHipRow = PANTY_SIZE_CHART.find(
    (r) => formData.pantyHip === getHipStr(r)
  );
  const selectedWaistRow = PANTY_SIZE_CHART.find(
    (r) => formData.pantyWaist === getWaistStr(r)
  );

  const computeSize = (hipRow?: PantySizeRow, waistRow?: PantySizeRow): string => {
    if (hipRow && waistRow) {
      if (hipRow.size === waistRow.size) return hipRow.size;
      return `${hipRow.size} / ${waistRow.size}`;
    }
    if (hipRow) return hipRow.size;
    if (waistRow) return waistRow.size;
    return '';
  };

  // Step 1: User selects Hip
  const handleSelectHip = (row: PantySizeRow) => {
    const hipStr = getHipStr(row);
    // If waist was already selected from before, keep it; otherwise wait for Step 2
    const targetWaistRow = selectedWaistRow;
    const waistStr = targetWaistRow ? formData.pantyWaist : '';
    const newSize = computeSize(row, targetWaistRow);

    onChange({
      pantyHip: hipStr,
      pantyWaist: waistStr,
      selectedPantySize: newSize,
      pantySoieSize: newSize,
      soieSize: newSize,
    });
  };

  // Step 2: User selects Waist
  const handleSelectWaist = (row: PantySizeRow) => {
    const waistStr = getWaistStr(row);
    const targetHipRow = selectedHipRow;
    const newSize = computeSize(targetHipRow, row);

    onChange({
      pantyWaist: waistStr,
      selectedPantySize: newSize,
      pantySoieSize: newSize,
      soieSize: newSize,
    });
  };

  const isStep1Completed = !!formData.pantyHip;
  const isStep2Completed = !!formData.pantyWaist;
  const isBothCompleted = isStep1Completed && isStep2Completed;

  const calculatedSize =
    formData.pantySoieSize ||
    computeSize(selectedHipRow, selectedWaistRow) ||
    '';

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title & Step Progression Header */}
      <div className="border-b border-stone-100 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <h3 className="text-xs sm:text-[13px] font-semibold text-stone-800">
            Select Your Panty Size (Tap Any Option to Highlight &amp; Lock)
          </h3>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Step 1: Select To Fit Hip (Cm) · Step 2: Select To Fit Waist (Cm) to lock both values
          </p>
        </div>

        {/* Step Progress Badges */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-[11px]">
          <span
            className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
              isStep1Completed
                ? 'bg-stone-200 text-stone-900 border border-stone-300'
                : 'bg-stone-900 text-white'
            }`}
          >
            {isStep1Completed ? <Check className="w-3 h-3" /> : null}
            Step 1: Hip {isStep1Completed ? '✓' : ''}
          </span>

          <ArrowRight className="w-3 h-3 text-stone-400" />

          <span
            className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
              isStep2Completed
                ? 'bg-stone-200 text-stone-900 border border-stone-300'
                : isStep1Completed
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-400'
            }`}
          >
            {isStep2Completed ? <Check className="w-3 h-3" /> : null}
            Step 2: Waist {isStep2Completed ? '✓' : ''}
          </span>
        </div>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on Left, Step 1 & Step 2 Side-by-Side Boxes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Panty Measurement Photo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-1">
          <PantyMeasurementPhoto size="sm" />
          <p className="text-[10px] text-stone-500 text-center mt-1.5 px-2">
            Wrap tape around widest hip line for Step 1, then natural waist for Step 2.
          </p>
        </div>

        {/* Right: Step 1 Box and Step 2 Box */}
        <div className="lg:col-span-8 space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* ================= STEP 1: TO FIT HIP (CM) ================= */}
            <div
              className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                isStep1Completed
                  ? 'bg-stone-50/80 border-stone-200'
                  : 'bg-stone-50 border-stone-300 ring-1 ring-stone-300'
              }`}
            >
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wide">
                      Step 1 · To Fit Hip (Cm)
                    </span>
                    {isStep1Completed && (
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

              {/* Grid of Hip Options */}
              <div className="grid grid-cols-2 gap-1.5">
                {PANTY_SIZE_CHART.map((row) => {
                  const hipVal = getHipStr(row);
                  const isSelected = formData.pantyHip === hipVal;

                  return (
                    <button
                      type="button"
                      key={row.size}
                      onClick={() => handleSelectHip(row)}
                      className={`py-2 px-1.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs ring-1 ring-stone-700'
                          : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs sm:text-[13px] font-semibold tracking-tight">
                          {row.hipCmMin} - {row.hipCmMax}
                        </span>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />}
                      </div>
                      <span
                        className={`text-[10px] leading-none ${
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

            {/* ================= STEP 2: TO FIT WAIST (CM) ================= */}
            <div
              className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                !isStep1Completed
                  ? 'bg-stone-50/50 border-stone-200 opacity-60'
                  : isStep2Completed
                  ? 'bg-stone-50/80 border-stone-200'
                  : 'bg-stone-50 border-stone-800 ring-1 ring-stone-800 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wide">
                      Step 2 · To Fit Waist (Cm)
                    </span>
                    {isStep2Completed ? (
                      <span className="text-[9px] bg-stone-900 text-white font-bold px-1.5 py-0.2 rounded">
                        Done
                      </span>
                    ) : isStep1Completed ? (
                      <span className="text-[9px] bg-stone-900 text-white font-bold px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] text-stone-500 block">
                    (Tap to choose Waist measurement)
                  </span>
                </div>
              </div>

              {!isStep1Completed ? (
                <div className="py-7 text-center text-stone-500 text-xs flex flex-col items-center justify-center space-y-1">
                  <Lock className="w-4 h-4 text-stone-400" />
                  <p className="font-semibold text-stone-700 text-xs">Step 2 Locked</p>
                  <p className="text-[10px] text-stone-500">
                    Select your Hip measurement in Step 1 first to unlock Waist options.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5 animate-fadeIn">
                  {PANTY_SIZE_CHART.map((row) => {
                    const waistVal = getWaistStr(row);
                    const isSelected = formData.pantyWaist === waistVal;

                    return (
                      <button
                        type="button"
                        key={row.size}
                        onClick={() => handleSelectWaist(row)}
                        className={`py-2 px-1.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs ring-1 ring-stone-700'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-xs sm:text-[13px] font-semibold tracking-tight">
                            {row.waistCm}
                          </span>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />}
                        </div>
                        <span
                          className={`text-[10px] leading-none ${
                            isSelected ? 'text-stone-300 font-medium' : 'text-stone-500'
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
          <div className="bg-slate-700 text-white px-3.5 py-2.5 rounded-xl border border-slate-600 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
              <div className="text-xs sm:text-[13px] font-medium flex items-center gap-2">
                <span className="text-slate-200">Recommended SOIE Size:</span>
                <span className="text-sm sm:text-base text-white font-bold tracking-tight bg-slate-800 px-2 py-0.5 rounded border border-slate-600">
                  {calculatedSize || '—'}
                </span>
              </div>
              <div className="text-[11px] text-slate-200 font-normal">
                {isBothCompleted ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-stone-300 flex-shrink-0" />
                    Panty Size: {calculatedSize} (Step 1 Hip: {formData.pantyHip} · Step 2 Waist: {formData.pantyWaist})
                  </span>
                ) : isStep1Completed ? (
                  <span className="text-stone-200 font-medium">
                    Step 1 Hip ({formData.pantyHip}) selected · Now tap Step 2 Waist to lock size
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
