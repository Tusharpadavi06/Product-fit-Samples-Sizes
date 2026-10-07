import React from 'react';
import { SoieOriginalLogo } from './BrandLogos';
import { Table, Database, Sparkles } from 'lucide-react';
import { GOOGLE_SHEET_ID } from '../data/sizeCharts';

interface HeaderProps {
  onOpenSheetModal: () => void;
  onOpenSubmissions: () => void;
  submissionCount: number;
  hasWebhookConfigured: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSheetModal,
  onOpenSubmissions,
  submissionCount,
  hasWebhookConfigured,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-2xs">
      {/* Brand Top Bar */}
      <div className="bg-[#7C2136] text-white text-[11px] py-1 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-rose-300" />
        <span>SOIE Fit Master · Official Intimate Size Consultation & Precision Form</span>
        <span className="hidden sm:inline opacity-70">|</span>
        <span className="hidden sm:inline text-rose-200">Ginza Industries Limited</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Original SOIE Logo Badge */}
        <div className="flex items-center gap-3">
          <SoieOriginalLogo size="md" className="shadow-xs hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-stone-900 leading-tight">
                SOIE
              </span>
              <span className="text-[10px] font-bold text-rose-800 tracking-wider uppercase">
                SWA · स्वा
              </span>
            </div>
            <span className="text-[9.5px] tracking-wider text-stone-500 uppercase font-medium">
              Ginza Industries Limited · Fit Portal
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Submissions count button */}
          <button
            type="button"
            onClick={onOpenSubmissions}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title="View saved consultation responses"
          >
            <Database className="w-3.5 h-3.5 text-stone-500" />
            <span>Responses</span>
            {submissionCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
                {submissionCount}
              </span>
            )}
          </button>

          {/* Google Sheet Link & Config Button */}
          <button
            type="button"
            onClick={onOpenSheetModal}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900 shadow-2xs"
            title={`Connected to Google Sheet ${GOOGLE_SHEET_ID}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  hasWebhookConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  hasWebhookConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </span>
            <Table className="w-3.5 h-3.5 text-emerald-700" />
            <span>Google Sheet (B-O)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
