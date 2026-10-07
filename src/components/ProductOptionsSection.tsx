import React from 'react';
import {
  BRA_TYPES,
  PANTY_TYPES,
  PANTY_RISES,
  SHAPEWEAR_TYPES,
  BRA_WIRE_OPTIONS,
  BRA_PADDING_OPTIONS,
} from '../data/sizeCharts';
import { FormDataState, BraPadding, BraWire, PantyType, PantyRise, ShapewearType } from '../types';
import { Tag } from 'lucide-react';

interface SpecificationsProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

/**
 * Bra Specifications Card
 * Columns: Name (B), Product (C), Size (D), Brands you use (E), Styel number (F),
 * Type (G), Padding (H), Wire (I), Preference (J), Under bust (K), Over Bust (L),
 * Contact (M), Email (N), Soie Size (O)
 */
export const BraSpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
      <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-rose-600" />
            Bra Details &amp; Current Preferences
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Tell us about your current bra fit and styling preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Current Bra Size <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 34B or 36C"
            value={formData.braCurrentSize}
            onChange={(e) => onChange({ braCurrentSize: e.target.value, currentSize: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) - MANUAL TYPING REQUESTED BY USER */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Brands You Use <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Enamor, Triumph)..."
            value={formData.braBrandsYouUse}
            onChange={(e) => onChange({ braBrandsYouUse: e.target.value, brandsYouUse: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) - MANUAL TYPING */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SB1029 (Optional)"
            value={formData.braStyleNumber}
            onChange={(e) => onChange({ braStyleNumber: e.target.value, styleNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Type (Column G) */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Bra Type <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.braType}
            onChange={(e) => onChange({ braType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {BRA_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Padding (Column H) - Padded, Non Padded */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Padding <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.braPadding}
            onChange={(e) => onChange({ braPadding: e.target.value as BraPadding })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {BRA_PADDING_OPTIONS.map((pad) => (
              <option key={pad} value={pad}>
                {pad}
              </option>
            ))}
          </select>
        </div>

        {/* Wire (Column I) - Wired Non wired, Non Wired */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Wire <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.braWire}
            onChange={(e) => onChange({ braWire: e.target.value as BraWire })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {BRA_WIRE_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Preference if any (Column J) - MANUAL TYPING */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. cotton cups, full support, daily comfort)..."
            value={formData.braPreference}
            onChange={(e) => onChange({ braPreference: e.target.value, preference: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Panty Specifications Card
 * Columns: Name (B), Product (C), Size (D), Brands you use (E), Styel number (F),
 * Type (G), Rise (H), Preference (I), All round Hip (J), All round Waist (K),
 * Contact (L), Email (M), Soie Size (N)
 */
export const PantySpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
      <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-rose-600" />
            Panty Details &amp; Cut Preferences
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Specify your preferred panty silhouette, rise height, and brand history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Current Panty Size <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. S, M, L, XL"
            value={formData.pantyCurrentSize}
            onChange={(e) => onChange({ pantyCurrentSize: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) - MANUAL TYPING */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Brands You Use <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Jockey, Clovia)..."
            value={formData.pantyBrandsYouUse}
            onChange={(e) => onChange({ pantyBrandsYouUse: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) - MANUAL TYPING */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SP2011 (Optional)"
            value={formData.pantyStyleNumber}
            onChange={(e) => onChange({ pantyStyleNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Type (Column G) - Hipster, Brief, Boy shorts, Bikini, Thong */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Panty Type <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.pantyType}
            onChange={(e) => onChange({ pantyType: e.target.value as PantyType })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {PANTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Rise (Column H) - High, Mid, Low */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Rise <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.pantyRise}
            onChange={(e) => onChange({ pantyRise: e.target.value as PantyRise })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {PANTY_RISES.map((rise) => (
              <option key={rise} value={rise}>
                {rise}
              </option>
            ))}
          </select>
        </div>

        {/* Preference if any (Column I) - MANUAL TYPING */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. seamless edges, 100% cotton gusset, no muffin top)..."
            value={formData.pantyPreference}
            onChange={(e) => onChange({ pantyPreference: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Shapewear Specifications Card
 * Columns: Name (B), Product (C), Size (D), Brands you use (E), Styel number (F),
 * Type (G), Preference (H), All round Hip (I), All round Waist (J),
 * Contact (K), Email (L), Soie Size (M)
 */
export const ShapewearSpecifications: React.FC<SpecificationsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
      <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-rose-600" />
            Shapewear Details &amp; Compression Preferences
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Specify your contour silhouette and sculpting focus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Current Size (Column D) */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Current Shapewear Size <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. M, L, XL"
            value={formData.shapewearCurrentSize}
            onChange={(e) => onChange({ shapewearCurrentSize: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Brands You Use (Column E) - MANUAL TYPING */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Brands You Use <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Type brands you wear (e.g. SOIE, Spanx, Wacoal)..."
            value={formData.shapewearBrandsYouUse}
            onChange={(e) => onChange({ shapewearBrandsYouUse: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Style Number if Know (Column F) - MANUAL TYPING */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Style Number If Known
          </label>
          <input
            type="text"
            placeholder="e.g. SW301 (Optional)"
            value={formData.shapewearStyleNumber}
            onChange={(e) => onChange({ shapewearStyleNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Type (Column G) - Shaper shorts, Shaper Brief, Shaper Shaper dress */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Type <span className="text-rose-600">*</span>
          </label>
          <select
            value={formData.shapewearType}
            onChange={(e) => onChange({ shapewearType: e.target.value as ShapewearType })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all bg-white text-stone-800"
          >
            <option value="">Select the Option</option>
            {SHAPEWEAR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Preference if any (Column H) - MANUAL TYPING */}
        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Preference if any
          </label>
          <input
            type="text"
            placeholder="Type your preferences (e.g. saree silhouette, tummy cinch, breathable all day)..."
            value={formData.shapewearPreference}
            onChange={(e) => onChange({ shapewearPreference: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
};
