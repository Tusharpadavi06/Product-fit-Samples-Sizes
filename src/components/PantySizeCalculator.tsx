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
  // Helper to match Hip string
  const getHipStr = (row: PantySizeRow) => `${row.hipCmMin} - ${row.hipCmMax} cm`;
  const getWaistStr = (row: PantySizeRow) => `${row.waistCm} cm`;

  // Find currently selected hip row and waist row
  const selectedHipRow = PANTY_SIZE_CHART.find(
    (r) => formData.pantyHip === getHipStr(r)
  );
  const selectedWaistRow = PANTY_SIZE_CHART.find(
    (r) => formData.pantyWaist === getWaistStr(r)
  );

  // Compute recommended size
  const computeSize = (hipRow?: PantySizeRow, waistRow?: PantySizeRow): string => {
    if (hipRow && waistRow) {
      if (hipRow.size === waistRow.size) return hipRow.size;
      return `${hipRow.size} / ${waistRow.size}`;
    }
    if (hipRow) return hipRow.size;
    if (waistRow) return waistRow.size;
    return '';
  };

  // 1. User clicks Hip cell: selects Hip, and if Waist not set (or user clicking Hip to select matched set), syncs Waist too
  const handleSelectHip = (row: PantySizeRow, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const hipStr = getHipStr(row);
    // If waist not set yet, or user wants matched pair, set waist to row's waist
    const targetWaistRow = selectedWaistRow || row;
    const waistStr = selectedWaistRow ? formData.pantyWaist : getWaistStr(row);
    const newSize = computeSize(row, targetWaistRow);

    onChange({
      pantyHip: hipStr,
      pantyWaist: waistStr,
      selectedPantySize: newSize,
      pantySoieSize: newSize,
      soieSize: newSize,
    });
  };

  // 2. User clicks Waist cell: selects Waist independently (or syncs Hip if not set)
  const handleSelectWaist = (row: PantySizeRow, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const waistStr = getWaistStr(row);
    const targetHipRow = selectedHipRow || row;
    const hipStr = selectedHipRow ? formData.pantyHip : getHipStr(row);
    const newSize = computeSize(targetHipRow, row);

    onChange({
      pantyHip: hipStr,
      pantyWaist: waistStr,
      selectedPantySize: newSize,
      pantySoieSize: newSize,
      soieSize: newSize,
    });
  };

  // 3. User clicks entire row: selects BOTH Hip and Waist from this row
  const handleSelectFullRow = (row: PantySizeRow) => {
    const hipStr = getHipStr(row);
    const waistStr = getWaistStr(row);
    const newSize = row.size;

    onChange({
      pantyHip: hipStr,
      pantyWaist: waistStr,
      selectedPantySize: newSize,
      pantySoieSize: newSize,
      soieSize: newSize,
    });
  };

  const calculatedSize =
    formData.pantySoieSize ||
    computeSize(selectedHipRow, selectedWaistRow) ||
    '';

  const hasAnySelection = !!(formData.pantyHip || formData.pantyWaist);

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title */}
      <div className="border-b border-stone-100 pb-2">
        <h3 className="text-sm sm:text-base font-semibold text-stone-900">
          Select Your Panty Size (Tap Any Option to Highlight &amp; Lock)
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">
          Tap Hip or Waist to select both together, or tap different options from each column for customized fit.
        </p>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on the left, Measurement Table on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Panty Measurement Image from panty.png */}
        <div className="lg:col-span-4 flex justify-center py-1">
          <PantyMeasurementPhoto size="sm" />
        </div>

        {/* Right: Dual Selectable Columns: To Fit Hip (Cm) & To Fit Waist (Cm) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-rose-100/90 text-stone-900 border-b border-rose-200 text-xs font-semibold">
                  <th className="py-2.5 px-3 border-r border-rose-200">
                    To Fit Hip (Cm)
                    <span className="block text-[10px] font-normal text-rose-800">
                      (Tap to choose Hip)
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    To Fit Waist (Cm)
                    <span className="block text-[10px] font-normal text-rose-800">
                      (Tap to choose Waist)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {PANTY_SIZE_CHART.map((row) => {
                  const hipVal = getHipStr(row);
                  const waistVal = getWaistStr(row);
                  const isHipSelected = formData.pantyHip === hipVal;
                  const isWaistSelected = formData.pantyWaist === waistVal;
                  const isBothSelected = isHipSelected && isWaistSelected;

                  return (
                    <tr
                      key={row.size}
                      onClick={() => handleSelectFullRow(row)}
                      className={`transition-all cursor-pointer ${
                        isBothSelected
                          ? 'bg-rose-50/80'
                          : 'hover:bg-stone-50 bg-white'
                      }`}
                    >
                      {/* 1. To Fit Hip (Cm) Cell */}
                      <td
                        onClick={(e) => handleSelectHip(row, e)}
                        className={`py-2 px-3 border-r border-stone-200 text-xs sm:text-sm font-medium transition-all ${
                          isHipSelected
                            ? 'bg-rose-600 text-white font-bold ring-2 ring-inset ring-rose-700 shadow-2xs'
                            : 'hover:bg-rose-100/60 text-stone-800'
                        }`}
                        title="Click to select this Hip measurement"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{row.hipCmMin} - {row.hipCmMax} cm</span>
                          {isHipSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3] flex-shrink-0" />}
                        </div>
                      </td>

                      {/* 2. To Fit Waist (Cm) Cell */}
                      <td
                        onClick={(e) => handleSelectWaist(row, e)}
                        className={`py-2 px-3 text-xs sm:text-sm font-medium transition-all ${
                          isWaistSelected
                            ? 'bg-rose-600 text-white font-bold ring-2 ring-inset ring-rose-700 shadow-2xs'
                            : 'hover:bg-rose-100/60 text-stone-800'
                        }`}
                        title="Click to select this Waist measurement"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{row.waistCm} cm</span>
                          {isWaistSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3] flex-shrink-0" />}
                        </div>
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
                <span className="text-lg sm:text-xl text-rose-300 font-bold tracking-tight bg-stone-800 px-2.5 py-0.5 rounded-md border border-stone-700">
                  {calculatedSize || '—'}
                </span>
              </div>
              <div className="text-xs text-stone-300 font-normal">
                {hasAnySelection ? (
                  <span>
                    Panty Size: {calculatedSize} (Hip: {formData.pantyHip || 'Pending'} · Waist: {formData.pantyWaist || 'Pending'})
                  </span>
                ) : (
                  <span>Tap any Hip or Waist option above to lock recommended size</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
