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
  const currentBand = formData.selectedBraBand || 34;
  const currentBandRow =
    BRA_SIZE_MATRIX.find((r) => r.band === currentBand) || BRA_SIZE_MATRIX[2];

  // Step 1: Click band box
  const handleSelectBand = (band: number) => {
    const row = BRA_SIZE_MATRIX.find((r) => r.band === band);
    const underRange = row ? `${row.underbustMin}-${row.underbustMax}` : '';
    const currentCup = formData.selectedBraCup || 'Cup C';
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
  };

  // Step 2: Click cup box
  const handleSelectCup = (cup: BraCup) => {
    const band = currentBand;
    const row = BRA_SIZE_MATRIX.find((r) => r.band === band);
    const cupLetter = cup.replace('Cup ', '');
    const newSoieSize = `${band}${cupLetter}`;

    const cupRange = row?.cups[cup];
    const overRange = cupRange ? `${cupRange.min}-${cupRange.max}` : '';

    onChange({
      selectedBraBand: band,
      selectedBraCup: cup,
      overbustCm: overRange,
      braSoieSize: newSoieSize,
      soieSize: newSoieSize,
    });
  };

  const currentCup = formData.selectedBraCup || 'Cup C';

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-rose-300 rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Band {currentBand} Selected</span>
          </div>
        </div>

        {/* SIDE-BY-SIDE LAYOUT: Step 1 Bra Image on left, Chart Boxes on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left: Step 1 Bra Image */}
          <div className="md:col-span-4 lg:col-span-3.5 flex justify-center">
            <BraStep1Illustration size="sm" />
          </div>

          {/* Right: Interactive Chart Boxes */}
          <div className="md:col-span-8 lg:col-span-8.5 space-y-2.5">
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Wrap measuring tape directly under the bust band tissue comfortably snug. Select your underbust measurement below:
            </p>

            {/* Horizontal Band Selection Boxes */}
            <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {BRA_SIZE_MATRIX.map((row) => {
                const isSelected = formData.selectedBraBand === row.band;
                return (
                  <button
                    type="button"
                    key={row.band}
                    onClick={() => handleSelectBand(row.band)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-400'
                        : 'bg-stone-50 hover:bg-rose-50/70 border-stone-200 text-stone-800 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      <span className="text-sm font-semibold">
                        {row.band}
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected ? 'text-rose-100' : 'text-stone-500'
                      }`}
                    >
                      {row.underbustMin}-{row.underbustMax} cm
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-rose-300 rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>{currentCup} Selected</span>
          </div>
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
              Wrap measuring tape around fullest apex of the breast. Select your Overbust measurement for Band {currentBand}:
            </p>

            {/* Horizontal Cup Boxes for Selected Band */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {CUP_LIST.map((cup) => {
                const range = currentBandRow.cups[cup];
                const isSelected = currentCup === cup;
                const cupLetter = cup.replace('Cup ', '');

                return (
                  <button
                    type="button"
                    key={cup}
                    onClick={() => handleSelectCup(cup)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-400'
                        : 'bg-stone-50 hover:bg-rose-50/70 border-stone-200 text-stone-800 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      <span className="text-xs sm:text-sm font-semibold">
                        {cup} ({currentBand}{cupLetter})
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected ? 'text-rose-100' : 'text-stone-600'
                      }`}
                    >
                      {range.min}-{range.max} cms
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
            <span className="text-lg sm:text-xl text-rose-300 font-bold tracking-tight bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">
              {formData.braSoieSize || formData.soieSize || `${currentBand}${currentCup.replace('Cup ', '')}`}
            </span>
          </div>
          <div className="text-xs text-stone-300 font-normal">
            Band {currentBand} (Underbust: {formData.underbustCm || `${currentBandRow.underbustMin}-${currentBandRow.underbustMax}`} cms) + {currentCup} (Overbust: {formData.overbustCm || `${currentBandRow.cups[currentCup].min}-${currentBandRow.cups[currentCup].max}`} cms)
          </div>
        </div>
      </div>
    </div>
  );
};
