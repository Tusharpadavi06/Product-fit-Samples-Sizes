import React from 'react';
import { SHAPEWEAR_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState } from '../types';
import { ShapewearMeasurementPhoto } from './BrandLogos';
import { Check } from 'lucide-react';

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

  // 1. User clicks Hip cell: selects Hip, and syncs Waist if not set yet
  const handleSelectHip = (item: ShapewearRow, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const hipStr = getHipStr(item);
    const targetWaistRow = selectedWaistRow || item;
    const waistStr = selectedWaistRow ? formData.shapewearWaist : getWaistStr(item);
    const newSize = computeSize(item, targetWaistRow);

    onChange({
      shapewearHip: hipStr,
      shapewearWaist: waistStr,
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  // 2. User clicks Waist cell: selects Waist independently (or syncs Hip if not set)
  const handleSelectWaist = (item: ShapewearRow, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const waistStr = getWaistStr(item);
    const targetHipRow = selectedHipRow || item;
    const hipStr = selectedHipRow ? formData.shapewearHip : getHipStr(item);
    const newSize = computeSize(targetHipRow, item);

    onChange({
      shapewearHip: hipStr,
      shapewearWaist: waistStr,
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  // 3. User clicks entire row: selects BOTH Hip and Waist from this row
  const handleSelectFullRow = (item: ShapewearRow) => {
    const hipStr = getHipStr(item);
    const waistStr = getWaistStr(item);
    const newSize = item.size;

    onChange({
      shapewearHip: hipStr,
      shapewearWaist: waistStr,
      selectedShapewearSize: newSize,
      shapewearSoieSize: newSize,
      soieSize: newSize,
    });
  };

  const calculatedSize =
    formData.shapewearSoieSize ||
    computeSize(selectedHipRow, selectedWaistRow) ||
    '';

  const hasAnySelection = !!(formData.shapewearHip || formData.shapewearWaist);

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title */}
      <div className="border-b border-stone-100 pb-2">
        <h3 className="text-sm sm:text-base font-semibold text-stone-900">
          Select Your Compression Fit Size
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">
          Tap Hip or Waist to select both together, or tap different options from each column for customized fit.
        </p>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on the left, Compression Table on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Shapewear Measurement Image from shapewear.png */}
        <div className="lg:col-span-4 flex justify-center py-1">
          <ShapewearMeasurementPhoto size="sm" />
        </div>

        {/* Right: Dual Selectable Columns: To Fit Hip (cm) & To Fit Waist (cm) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-rose-100/90 text-stone-900 border-b border-rose-200 text-xs font-semibold">
                  <th className="py-2.5 px-3 border-r border-rose-200">
                    To Fit Hip (cm)
                    <span className="block text-[10px] font-normal text-rose-800">
                      (Tap to choose Hip)
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    To Fit Waist (cm)
                    <span className="block text-[10px] font-normal text-rose-800">
                      (Tap to choose Waist)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {SHAPEWEAR_SIZE_CHART.map((item) => {
                  const hipVal = getHipStr(item);
                  const waistVal = getWaistStr(item);
                  const isHipSelected = formData.shapewearHip === hipVal;
                  const isWaistSelected = formData.shapewearWaist === waistVal;
                  const isBothSelected = isHipSelected && isWaistSelected;

                  return (
                    <tr
                      key={item.size}
                      onClick={() => handleSelectFullRow(item)}
                      className={`transition-all cursor-pointer ${
                        isBothSelected
                          ? 'bg-rose-50/80'
                          : 'hover:bg-stone-50 bg-white'
                      }`}
                    >
                      {/* 1. To Fit Hip (cm) Cell */}
                      <td
                        onClick={(e) => handleSelectHip(item, e)}
                        className={`py-2 px-3 border-r border-stone-200 text-xs sm:text-sm font-medium transition-all ${
                          isHipSelected
                            ? 'bg-rose-600 text-white font-bold ring-2 ring-inset ring-rose-700 shadow-2xs'
                            : 'hover:bg-rose-100/60 text-stone-800'
                        }`}
                        title="Click to select this Hip measurement"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{item.hipCm} cm</span>
                          {isHipSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3] flex-shrink-0" />}
                        </div>
                      </td>

                      {/* 2. To Fit Waist (cm) Cell */}
                      <td
                        onClick={(e) => handleSelectWaist(item, e)}
                        className={`py-2 px-3 text-xs sm:text-sm font-medium transition-all ${
                          isWaistSelected
                            ? 'bg-rose-600 text-white font-bold ring-2 ring-inset ring-rose-700 shadow-2xs'
                            : 'hover:bg-rose-100/60 text-stone-800'
                        }`}
                        title="Click to select this Waist measurement"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{item.waistCm} cm</span>
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
                    Shapewear Size: {calculatedSize} (Hip: {formData.shapewearHip || 'Pending'} · Waist: {formData.shapewearWaist || 'Pending'})
                  </span>
                ) : (
                  <span>Tap any Hip or Waist option above to lock recommended shapewear size</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
