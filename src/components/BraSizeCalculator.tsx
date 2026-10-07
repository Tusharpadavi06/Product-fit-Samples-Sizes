import React from 'react';
import { BRA_SIZE_MATRIX, CUP_LIST } from '../data/sizeCharts';
import { BraCup, FormDataState } from '../types';
import { BraStep1Illustration, BraStep2Illustration } from './BrandLogos';
import { Check, Sparkles } from 'lucide-react';

interface BraSizeCalculatorProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const BraSizeCalculator: React.FC<BraSizeCalculatorProps> = ({
  formData,
  onChange,
}) => {
  const currentBand = formData.selectedBraBand;
  const currentBandRow = currentBand
    ? BRA_SIZE_MATRIX.find((r) => r.band === currentBand) || BRA_SIZE_MATRIX[2]
    : BRA_SIZE_MATRIX[2]; // fallback to 34 matrix for cup cm reference before band chosen

  // Step 1: Click band box (Underbust cm range)
  const handleSelectBand = (band: number) => {
    const row = BRA_SIZE_MATRIX.find((r) => r.band === band);
    const underRange = row ? `${row.underbustMin}-${row.underbustMax}` : '';
    const currentCup = formData.selectedBraCup;

    if (currentCup) {
      const cupLetter = currentCup.replace('Cup ', '');
      const newSoieSize = `${band}${cupLetter}`;
      const cupRange = row?.cups[currentCup];
      const overRange = cupRange ? `${cupRange.min}-${cupRange.max}` : formData.overbustCm;

      onChange({
        selectedBraBand: band,
        underbustCm: underRange,
        selectedBraCup: currentCup,
        overbustCm: overRange,
        braSoieSize: newSoieSize,
        soieSize: newSoieSize,
      });
    } else {
      onChange({
        selectedBraBand: band,
        underbustCm: underRange,
        braSoieSize: '',
        soieSize: '',
      });
    }
  };

  // Step 2: Click cup box (Overbust cm range)
  const handleSelectCup = (cup: BraCup) => {
    const band = formData.selectedBraBand;
    const row = band ? BRA_SIZE_MATRIX.find((r) => r.band === band) : currentBandRow;
    const cupRange = row?.cups[cup];
    const overRange = cupRange ? `${cupRange.min}-${cupRange.max}` : '';

    if (band) {
      const cupLetter = cup.replace('Cup ', '');
      const newSoieSize = `${band}${cupLetter}`;
      onChange({
        selectedBraBand: band,
        selectedBraCup: cup,
        overbustCm: overRange,
        braSoieSize: newSoieSize,
        soieSize: newSoieSize,
      });
    } else {
      onChange({
        selectedBraCup: cup,
        overbustCm: overRange,
        braSoieSize: '',
        soieSize: '',
      });
    }
  };

  const currentCup = formData.selectedBraCup;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
      {/* ================= STEP 1: UNDERBUST MEASUREMENT ================= */}
      <div className="space-y-3">
        {/* Step 1 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              Step 1 · Underbust Measurement
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-stone-900 mt-1">
              Verify the bra size as per this chart · Measure the Underbust (cms) for band size
            </h3>
          </div>
          {currentBand ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-rose-300 rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Band {currentBand} Selected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium self-start sm:self-auto flex-shrink-0">
              <span>Tap your Underbust (cms) below</span>
            </div>
          )}
        </div>

        {/* SIDE-BY-SIDE LAYOUT: Step 1 Bra Image on left, Chart Boxes on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left: Step 1 Bra Image */}
          <div className="md:col-span-4 lg:col-span-3.5 flex justify-center">
            <BraStep1Illustration size="sm" />
          </div>

          {/* Right: Interactive Chart Boxes (4 on top, 4 below; NO band label inside box) */}
          <div className="md:col-span-8 lg:col-span-8.5 space-y-2.5">
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Wrap measuring tape directly under the bust band tissue comfortably snug. Select your underbust measurement below:
            </p>

            {/* Horizontal Band Selection Boxes: 4 boxes on top, 4 boxes below */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {BRA_SIZE_MATRIX.map((row) => {
                const isSelected = formData.selectedBraBand === row.band;
                return (
                  <button
                    type="button"
                    key={row.band}
                    onClick={() => handleSelectBand(row.band)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-400'
                        : 'bg-stone-50 hover:bg-rose-50/70 border-stone-200 text-stone-800 hover:border-rose-300'
                    }`}
                  >
                    {/* 1. Large cm Range Number */}
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm sm:text-base font-bold tracking-tight">
                        {row.underbustMin}-{row.underbustMax}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </div>

                    {/* 2. cm unit - (Band 30/32/etc removed as requested, only cm displayed) */}
                    <span
                      className={`text-xs font-semibold leading-tight mt-0.5 ${
                        isSelected ? 'text-rose-100' : 'text-stone-500'
                      }`}
                    >
                      cm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= STEP 2: OVERBUST MEASUREMENT ================= */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        {/* Step 2 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              Step 2 · Overbust Measurement
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-stone-900 mt-1">
              Measure the fullest part of the breast (cms) for cup size
            </h3>
          </div>
          {currentCup ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-rose-300 rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentCup} Selected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium self-start sm:self-auto flex-shrink-0">
              <span>Tap your Overbust Cup below</span>
            </div>
          )}
        </div>

        {/* SIDE-BY-SIDE LAYOUT: Step 2 Bra Image on left, Cup Boxes on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left: Step 2 Bra Image */}
          <div className="md:col-span-4 lg:col-span-3.5 flex justify-center">
            <BraStep2Illustration size="sm" />
          </div>

          {/* Right: Cup Boxes */}
          <div className="md:col-span-8 lg:col-span-8.5 space-y-2.5">
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Wrap measuring tape around fullest apex of the breast. Select your Overbust measurement below:
            </p>

            {/* Horizontal Cup Boxes: CM in large font, Cup in medium font, NO band repeated */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {CUP_LIST.map((cup) => {
                const range = currentBandRow.cups[cup];
                const isSelected = currentCup === cup;

                return (
                  <button
                    type="button"
                    key={cup}
                    onClick={() => handleSelectCup(cup)}
                    className={`py-3 px-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-400'
                        : 'bg-stone-50 hover:bg-rose-50/70 border-stone-200 text-stone-800 hover:border-rose-300'
                    }`}
                  >
                    {/* 1. Large cm Range Number */}
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs sm:text-sm font-bold tracking-tight">
                        {range.min}-{range.max}
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>

                    {/* 2. cm unit */}
                    <span
                      className={`text-[11px] font-semibold leading-tight ${
                        isSelected ? 'text-rose-100' : 'text-stone-500'
                      }`}
                    >
                      cm
                    </span>

                    {/* 3. Cup Name in Medium Font */}
                    <span
                      className={`text-xs mt-1.5 font-semibold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-rose-800/80 text-white'
                          : 'bg-white text-stone-700 border border-stone-200/90 shadow-2xs'
                      }`}
                    >
                      {cup}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPACT EXACT RESULT BOX ================= */}
      <div className="bg-stone-900 text-white px-4 py-3 rounded-xl border border-stone-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <span className="text-stone-300">Recommended SOIE Size:</span>
            <span className="text-lg sm:text-xl text-rose-300 font-bold tracking-tight bg-stone-800 px-2.5 py-0.5 rounded-md border border-stone-700">
              {formData.braSoieSize || (formData.selectedBraBand && formData.selectedBraCup ? `${formData.selectedBraBand}${formData.selectedBraCup.replace('Cup ', '')}` : '—')}
            </span>
          </div>
          <div className="text-xs text-stone-300 font-normal">
            {formData.selectedBraBand && formData.selectedBraCup ? (
              <span>
                Band {formData.selectedBraBand} (Underbust: {formData.underbustCm} cms) + {formData.selectedBraCup} (Overbust: {formData.overbustCm} cms)
              </span>
            ) : formData.selectedBraBand ? (
              <span>Band {formData.selectedBraBand} (Underbust: {formData.underbustCm} cms) selected · Please select Step 2 Overbust Cup</span>
            ) : formData.selectedBraCup ? (
              <span>{formData.selectedBraCup} selected · Please select Step 1 Underbust Band</span>
            ) : (
              <span>Please select Step 1 Underbust and Step 2 Overbust to calculate Recommended SOIE Size</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
