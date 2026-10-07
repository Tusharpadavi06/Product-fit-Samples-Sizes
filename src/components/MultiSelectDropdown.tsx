import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: readonly string[] | string[];
  value: string; // Comma-separated selected values
  onChange: (value: string) => void;
  helperText?: string;
}

// Distinct Google Sheet-style soft pastel badge colors for multiple selection
const CHIP_COLOR_PALETTES = [
  'bg-rose-100 text-rose-900 border-rose-300',
  'bg-sky-100 text-sky-900 border-sky-300',
  'bg-emerald-100 text-emerald-900 border-emerald-300',
  'bg-amber-100 text-amber-900 border-amber-300',
  'bg-purple-100 text-purple-900 border-purple-300',
  'bg-teal-100 text-teal-900 border-teal-300',
  'bg-indigo-100 text-indigo-900 border-indigo-300',
  'bg-orange-100 text-orange-900 border-orange-300',
];

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  required = false,
  placeholder = 'Select the Option',
  options,
  value,
  onChange,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse comma-separated value into array
  const selectedValues = value
    ? value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (option: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    let updated: string[];
    if (selectedValues.includes(option)) {
      updated = selectedValues.filter((v) => v !== option);
    } else {
      updated = [...selectedValues, option];
    }
    onChange(updated.join(', '));
  };

  const handleRemoveChip = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = selectedValues.filter((v) => v !== option);
    onChange(updated.join(', '));
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
        <span>
          {label} {required && <span className="text-rose-600">*</span>}
        </span>
        {selectedValues.length > 0 && (
          <span className="text-[10px] text-stone-500 font-normal lowercase tracking-normal">
            ({selectedValues.length} selected)
          </span>
        )}
      </label>

      {/* Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-sm outline-none transition-all bg-white cursor-pointer flex items-center justify-between gap-2 ${
          isOpen
            ? 'border-rose-500 ring-2 ring-rose-200'
            : 'border-stone-300 hover:border-stone-400'
        }`}
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1">
          {selectedValues.length === 0 ? (
            <span className="text-stone-400 select-none text-sm">{placeholder}</span>
          ) : (
            selectedValues.map((val, idx) => {
              const colorClass =
                CHIP_COLOR_PALETTES[idx % CHIP_COLOR_PALETTES.length];
              return (
                <span
                  key={val}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-xs font-medium shadow-2xs ${colorClass}`}
                >
                  <span>{val}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveChip(val, e)}
                    className="hover:opacity-75 focus:outline-none cursor-pointer"
                    title={`Remove ${val}`}
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </span>
              );
            })
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-stone-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {helperText && (
        <p className="text-[11px] text-stone-500 mt-1">{helperText}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg p-2 space-y-1 max-h-60 overflow-y-auto animate-fadeIn">
          <div className="px-2 py-1 text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-between border-b border-stone-100 pb-1 mb-1">
            <span>Select one or more:</span>
            {selectedValues.length > 0 && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {options.map((opt, idx) => {
            const isSelected = selectedValues.includes(opt);
            const colorClass =
              CHIP_COLOR_PALETTES[idx % CHIP_COLOR_PALETTES.length];

            return (
              <div
                key={opt}
                onClick={(e) => handleToggleOption(opt, e)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-rose-50/90 text-rose-950 font-semibold'
                    : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{opt}</span>
                </div>

                {isSelected && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-medium ${colorClass}`}
                  >
                    Selected
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
