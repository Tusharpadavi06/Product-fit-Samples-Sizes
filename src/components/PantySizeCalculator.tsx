import React from 'react';
import { PANTY_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState, PantySizeRow } from '../types';
import { PantyMeasurementPhoto } from './BrandLogos';
import { Check } from 'lucide-react';

interface PantySizeCalculatorProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const PantySizeCalculator: React.FC<PantySizeCalculatorProps> = ({
  formData,
  onChange,
}) => {
  const selectedSize = formData.pantySoieSize || formData.selectedPantySize || 'M';

  const handleSelectPantyRow = (row: PantySizeRow) => {
    const hipStr = `${row.hipCmMin}-${row.hipCmMax} cm`;
    const waistStr = `${row.waistCm} cm`;

    onChange({
      selectedPantySize: row.size,
      pantySoieSize: row.size,
      pantyHip: hipStr,
      pantyWaist: waistStr,
      soieSize: row.size,
    });
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title */}
      <div className="border-b border-stone-100 pb-2">
        <h3 className="text-sm sm:text-base font-semibold text-stone-900">
          Select Your Panty Size (Tap Any Option to Highlight &amp; Lock)
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">
          Select based on To Fit Hip (Cm) and To Fit Waist (Cm) to lock your recommended SOIE panty size
        </p>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on the left, Measurement Table on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Panty Measurement Image from panty.png */}
        <div className="lg:col-span-4 flex justify-center py-1">
          <PantyMeasurementPhoto size="sm" />
        </div>

        {/* Right: Only To Fit Hip (Cm) & To Fit Waist (Cm) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-rose-100/90 text-stone-900 border-b border-rose-200 text-xs font-semibold">
                  <th className="py-2.5 px-4 border-r border-rose-200">To Fit Hip (Cm)</th>
                  <th className="py-2.5 px-4">To Fit Waist (Cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {PANTY_SIZE_CHART.map((row) => {
                  const isSelected = selectedSize === row.size;

                  return (
                    <tr
                      key={row.size}
                      onClick={() => handleSelectPantyRow(row)}
                      className={`transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white font-semibold ring-2 ring-inset ring-rose-700'
                          : 'hover:bg-rose-50/50 text-stone-700 bg-white'
                      }`}
                    >
                      <td className="py-2.5 px-4 border-r border-stone-200 text-xs sm:text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <span>{row.hipCmMin} - {row.hipCmMax} cm</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-xs sm:text-sm font-medium">
                        {row.waistCm} cm
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Compact Recommended SOIE Size Box */}
          <div className="bg-stone-900 text-white px-4 py-3 rounded-xl border border-stone-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
                <span className="text-stone-300">Recommended SOIE Size:</span>
                <span className="text-lg sm:text-xl text-rose-300 font-bold tracking-tight bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">
                  {selectedSize}
                </span>
              </div>
              <div className="text-xs text-stone-300 font-normal">
                Panty Size: {selectedSize} (Hip: {formData.pantyHip || '89-97 cm'} · Waist: {formData.pantyWaist || '71.12 cm'})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
