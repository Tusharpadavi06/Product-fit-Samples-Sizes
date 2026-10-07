import React from 'react';
import { ProductCategory } from '../types';
import { Sparkles } from 'lucide-react';

interface ProductSelectorProps {
  selected: ProductCategory;
  onSelect: (cat: ProductCategory) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const options: {
    id: ProductCategory;
    label: string;
    sublabel: string;
    icon: string;
    badge?: string;
  }[] = [
    {
      id: 'Bra',
      label: 'Bra Fit & Sizing',
      sublabel: '',
      icon: '👙',
      badge: '',
    },
    {
      id: 'Panty',
      label: 'Panty Sizing',
      sublabel: '',
      icon: '🩲',
      badge: '',
    },
    {
      id: 'Shapewear',
      label: 'Shapewear Contour',
      sublabel: '',
      icon: '👗',
      badge: '',
    },
  ];

  return (
    <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
      <div className="flex items-center justify-between px-3 pt-1 pb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
           Select Product 
        </span>
        <span className="text-[11px] text-stone-600 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-600" />
          Dynamically configures questions & sheet tab
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`relative flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-50/80 border-rose-600 shadow-sm ring-1 ring-rose-500'
                  : 'bg-stone-50/50 hover:bg-stone-100 border-stone-200 hover:border-rose-200'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-2xs ${
                  isSelected ? 'bg-rose-600 text-white' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                {opt.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-bold truncate ${
                      isSelected ? 'text-rose-950 font-serif text-base' : 'text-stone-800'
                    }`}
                  >
                    {opt.label}
                  </span>
                  {opt.badge && (
                    <span
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-rose-200/80 text-rose-900'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600 truncate mt-0.5">
                  {opt.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
