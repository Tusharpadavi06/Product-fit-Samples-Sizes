import React from 'react';
import { SHAPEWEAR_SIZE_CHART } from '../data/sizeCharts';
import { FormDataState } from '../types';
import { ShapewearMeasurementPhoto } from './BrandLogos';
import { Check } from 'lucide-react';

interface ShapewearSizeCalculatorProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const ShapewearSizeCalculator: React.FC<ShapewearSizeCalculatorProps> = ({
  formData,
  onChange,
}) => {
  const selectedSize = formData.shapewearSoieSize || formData.selectedShapewearSize || 'M';

  const handleSelectRow = (item: (typeof SHAPEWEAR_SIZE_CHART)[number]) => {
    onChange({
      selectedShapewearSize: item.size,
      shapewearSoieSize: item.size,
      shapewearHip: `${item.hipCm} cm`,
      shapewearWaist: `${item.waistCm} cm`,
      soieSize: item.size,
    });
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Title */}
      <div className="border-b border-stone-100 pb-2">
        <h3 className="text-sm sm:text-base font-semibold text-stone-900">
          Select Your Compression Fit Size
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">
          Select based on To Fit Hip (cm) &amp; To Fit Waist (cm) to highlight and lock your recommended shapewear size
        </p>
      </div>

      {/* SIDE-BY-SIDE LAYOUT: Image on the left, Compression Table on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Shapewear Measurement Image from shapewear.png */}
        <div className="lg:col-span-4 flex justify-center py-1">
          <ShapewearMeasurementPhoto size="sm" />
        </div>

        {/* Right: Only To Fit Hip (cm) & To Fit Waist (cm) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-rose-100/90 text-stone-900 border-b border-rose-200 text-xs font-semibold">
                  <th className="py-2.5 px-4 border-r border-rose-200">To Fit Hip (cm)</th>
                  <th className="py-2.5 px-4">To Fit Waist (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {SHAPEWEAR_SIZE_CHART.map((item) => {
                  const isSelected = selectedSize === item.size;

                  return (
                    <tr
                      key={item.size}
                      onClick={() => handleSelectRow(item)}
                      className={`transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white font-semibold ring-2 ring-inset ring-rose-700'
                          : 'hover:bg-rose-50/50 text-stone-700 bg-white'
                      }`}
                    >
                      <td className="py-2.5 px-4 border-r border-stone-200 text-xs sm:text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <span>{item.hipCm} cm</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-xs sm:text-sm font-medium">
                        {item.waistCm} cm
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
                Shapewear Size: {selectedSize} (Hip: {formData.shapewearHip || '90-97 cm'} · Waist: {formData.shapewearWaist || '65-72 cm'})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
