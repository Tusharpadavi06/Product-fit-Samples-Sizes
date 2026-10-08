import React from 'react';
import { FormDataState } from '../types';
import { User, Phone, Mail } from 'lucide-react';

interface CustomerInfoSectionProps {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
      <div className="border-b border-stone-100 pb-2.5">
        <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <User className="w-4 h-4 text-stone-700" />
          Client Information
        </h3>
        <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
          Enter details to issue customized SOIE fit recommendation and consultation record.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Full Name (Column B) */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Full Name <span className="text-stone-900">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-stone-400">
              <User className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              required
              placeholder="e.g. Priya Sharma"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full pl-8.5 pr-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Contact Number <span className="text-stone-900">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-stone-400">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={formData.contactNumber}
              onChange={(e) => onChange({ contactNumber: e.target.value })}
              className="w-full pl-8.5 pr-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Email ID */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            Email ID <span className="text-stone-900">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-stone-400">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              required
              placeholder="e.g. priya@example.com"
              value={formData.emailId}
              onChange={(e) => onChange({ emailId: e.target.value })}
              className="w-full pl-8.5 pr-3 py-2 rounded-xl border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-400/40 text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
