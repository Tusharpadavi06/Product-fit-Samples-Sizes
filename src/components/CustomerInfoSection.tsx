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
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
      <div className="border-b border-stone-100 pb-3">
        <h3 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <User className="w-4 h-4 text-rose-600" />
          Client Information
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">
          Enter your details so your customized SOIE fit recommendation and consultation record can be issued.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Full Name (Column B) */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Full Name  <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-stone-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              required
              placeholder="e.g. Priya Sharma"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Contact Number <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-stone-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={formData.contactNumber}
              onChange={(e) => onChange({ contactNumber: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Email ID */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Email ID <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-stone-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              required
              placeholder="e.g. priya@example.com"
              value={formData.emailId}
              onChange={(e) => onChange({ emailId: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm outline-none transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
