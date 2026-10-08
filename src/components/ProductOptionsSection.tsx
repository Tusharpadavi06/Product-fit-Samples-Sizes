import React from 'react';
import {
  BRA_TYPES,
  PANTY_TYPES,
  PANTY_RISES,
  SHAPEWEAR_TYPES,
  BRA_WIRE_OPTIONS,
  BRA_PADDING_OPTIONS,
} from '../data/sizeCharts';
import { FormDataState, BraPadding, BraWire } from '../types';
import { Tag } from 'lucide-react';
import { MultiSelectDropdown } from './MultiSelectDropdown';

interface SpecificationsProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

/**
 * Bra Specifications Card
 */
export const BraSpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
      <div className="border-b border-stone-100 pb-2.5 flex items-center justify-between">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-stone-700" />
            Bra Details &amp; Current Preferences
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
            Tell us about your current bra fit and styling preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Current Bra Size <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 34B or 36C"
            value={formData.braCurrentSize}
            onChange={(e) => onChange({ braCurrentSize: e.target.value, currentSize: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Brands You Use <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Enamor, Triumph)..."
            value={formData.braBrandsYouUse}
            onChange={(e) => onChange({ braBrandsYouUse: e.target.value, brandsYouUse: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SB1029 (Optional)"
            value={formData.braStyleNumber}
            onChange={(e) => onChange({ braStyleNumber: e.target.value, styleNumber: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Bra Type (Column G) - Multiple selection */}
        <div>
          <MultiSelectDropdown
            label="Bra Type"
            required
            placeholder="Select the Option"
            options={BRA_TYPES}
            value={formData.braType}
            onChange={(val) => onChange({ braType: val })}
          />
        </div>

        {/* Padding (Column H) - Padded, Non Padded, Padded and Non Padded */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Padding <span className="text-stone-900">*</span>
          </label>
          <select
            value={formData.braPadding}
            onChange={(e) => onChange({ braPadding: e.target.value as BraPadding })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {BRA_PADDING_OPTIONS.map((pad) => (
              <option key={pad} value={pad}>
                {pad}
              </option>
            ))}
          </select>
        </div>

        {/* Wire (Column I) - Wired, Non Wired, Wired and Non Wired */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Wire <span className="text-stone-900">*</span>
          </label>
          <select
            value={formData.braWire}
            onChange={(e) => onChange({ braWire: e.target.value as BraWire })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {BRA_WIRE_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Preference if any (Column J) */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. cotton cups, full support, daily comfort)..."
            value={formData.braPreference}
            onChange={(e) => onChange({ braPreference: e.target.value, preference: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Panty Specifications Card
 */
export const PantySpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
      <div className="border-b border-stone-100 pb-2.5 flex items-center justify-between">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-stone-700" />
            Panty Details &amp; Cut Preferences
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
            Specify your preferred panty silhouette, rise height, and brand history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Current Panty Size <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. S, M, L, XL"
            value={formData.pantyCurrentSize}
            onChange={(e) => onChange({ pantyCurrentSize: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Brands You Use <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Jockey, Clovia)..."
            value={formData.pantyBrandsYouUse}
            onChange={(e) => onChange({ pantyBrandsYouUse: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SP2011 (Optional)"
            value={formData.pantyStyleNumber}
            onChange={(e) => onChange({ pantyStyleNumber: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Panty Type (Column G) - Multiple selection */}
        <div>
          <MultiSelectDropdown
            label="Panty Type"
            required
            placeholder="Select the Option"
            options={PANTY_TYPES}
            value={formData.pantyType}
            onChange={(val) => onChange({ pantyType: val })}
          />
        </div>

        {/* Rise (Column H) - Multiple selection */}
        <div>
          <MultiSelectDropdown
            label="Rise"
            required
            placeholder="Select the Option"
            options={PANTY_RISES}
            value={formData.pantyRise}
            onChange={(val) => onChange({ pantyRise: val })}
          />
        </div>

        {/* Preference if any (Column I) */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. seamless edges, 100% cotton gusset, no muffin top)..."
            value={formData.pantyPreference}
            onChange={(e) => onChange({ pantyPreference: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Shapewear Specifications Card
 */
export const ShapewearSpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
      <div className="border-b border-stone-100 pb-2.5 flex items-center justify-between">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-stone-700" />
            Shapewear Details &amp; Compression Preferences
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
            Specify your contour silhouette and sculpting focus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Current Shapewear Size <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. M, L, XL"
            value={formData.shapewearCurrentSize}
            onChange={(e) => onChange({ shapewearCurrentSize: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Brands You Use <span className="text-stone-900">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Spanx, Wacoal)..."
            value={formData.shapewearBrandsYouUse}
            onChange={(e) => onChange({ shapewearBrandsYouUse: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SW301 (Optional)"
            value={formData.shapewearStyleNumber}
            onChange={(e) => onChange({ shapewearStyleNumber: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Type (Column G) - Multiple selection */}
        <div className="sm:col-span-2 md:col-span-3">
          <MultiSelectDropdown
            label="Type"
            required
            placeholder="Select the Option"
            options={SHAPEWEAR_TYPES}
            value={formData.shapewearType}
            onChange={(val) => onChange({ shapewearType: val })}
          />
        </div>

        {/* Preference if any (Column H) */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. saree silhouette, tummy cinch, breathable all day)..."
            value={formData.shapewearPreference}
            onChange={(e) => onChange({ shapewearPreference: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};
