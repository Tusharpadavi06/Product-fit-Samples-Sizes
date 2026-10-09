import React, { useState } from 'react';
import { GOOGLE_SHEET_ID } from '../data/sizeCharts';
import {
  generateGoogleAppsScriptCode,
  getCustomWebhookUrl,
  setCustomWebhookUrl,
  exportSubmissionsToCSV,
} from '../services/sheetService';
import {
  Table,
  Check,
  Copy,
  ExternalLink,
  Download,
  AlertCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWebhookUpdated: () => void;
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  onWebhookUpdated,
}) => {
  const [webhookInput, setWebhookInput] = useState(getCustomWebhookUrl());
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'columns' | 'appsscript'>('overview');
  const [testStatus, setTestStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveWebhook = () => {
    setCustomWebhookUrl(webhookInput.trim());
    onWebhookUpdated();
    setTestStatus('Webhook URL saved successfully!');
    setTimeout(() => setTestStatus(null), 3000);
  };

  const handleCopyScript = () => {
    const code = generateGoogleAppsScriptCode();
    navigator.clipboard.writeText(code);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Table className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Google Sheets Integration & Vercel Sync
              </h3>
            </div>
            <p className="text-xs text-stone-600">
              Configured for Google Sheet ID:{' '}
              <code className="px-1.5 py-0.5 bg-stone-100 text-stone-800 rounded font-mono font-semibold">
                {GOOGLE_SHEET_ID}
              </code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-2 my-4 border-b border-stone-100 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Connection & Live Sync
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('columns')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'columns'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Column B to O Mapping
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('appsscript')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'appsscript'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Google Apps Script Code
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-5 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-emerald-950 text-sm block">
                  Target Google Spreadsheet
                </span>
                <span className="text-emerald-800 text-xs">
                  Submissions are separated into 3 tabs:{' '}
                  <strong>Bra</strong>, <strong>Panty</strong>, and <strong>Shapewear</strong>.
                </span>
              </div>
              <a
                href={sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-2xs cursor-pointer flex-shrink-0"
              >
                <span>Open Sheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Webhook Configuration for Vercel */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Google Apps Script Webhook URL (For Vercel Deployment)
                  </h4>
                  <p className="text-stone-600 text-[11px] mt-0.5">
                    Deploy your Google Apps Script as a Web App (Access: Anyone) and paste the URL below for instant real-time sync from Vercel!
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookInput}
                  onChange={(e) => setWebhookInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-white rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleSaveWebhook}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold cursor-pointer shadow-2xs"
                >
                  Save URL
                </button>
              </div>

              {testStatus && (
                <div className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {testStatus}
                </div>
              )}
            </div>

            {/* Offline/Instant CSV backup */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4">
              <h4 className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-stone-600" />
                Export Responses Ready for Google Sheets
              </h4>
              <p className="text-stone-600 text-[11px] mb-3">
                Download formatted CSVs with exact Column B to O headers anytime:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => exportSubmissionsToCSV('Bra')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 font-semibold cursor-pointer"
                >
                  📥 Export Bra Sheet CSV
                </button>
                <button
                  type="button"
                  onClick={() => exportSubmissionsToCSV('Panty')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 font-semibold cursor-pointer"
                >
                  📥 Export Panty Sheet CSV
                </button>
                <button
                  type="button"
                  onClick={() => exportSubmissionsToCSV('Shapewear')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 font-semibold cursor-pointer"
                >
                  📥 Export Shapewear Sheet CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Column Mapping */}
        {activeTab === 'columns' && (
          <div className="space-y-4 text-xs">
            <p className="text-stone-600">
              The table below outlines how user inputs strictly map into Google Sheet Columns B through O:
            </p>
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead className="bg-stone-100 text-stone-800 font-bold">
                  <tr>
                    <th className="p-2 border-b">Column</th>
                    <th className="p-2 border-b">Product: Bra</th>
                    <th className="p-2 border-b">Product: Panty</th>
                    <th className="p-2 border-b">Product: Shapewear</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col B</td>
                    <td className="p-2">Name</td>
                    <td className="p-2">Name</td>
                    <td className="p-2">Name</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col C</td>
                    <td className="p-2 font-semibold text-rose-700">Product ("Bra")</td>
                    <td className="p-2 font-semibold text-rose-700">Product ("Panty")</td>
                    <td className="p-2 font-semibold text-rose-700">Product ("Shapewear")</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col D</td>
                    <td className="p-2">Size (Current)</td>
                    <td className="p-2">Size (Current)</td>
                    <td className="p-2">Size (Current)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col E</td>
                    <td className="p-2">Brands you use</td>
                    <td className="p-2">Brands you use</td>
                    <td className="p-2">Brands you use</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col F</td>
                    <td className="p-2">Style number if know</td>
                    <td className="p-2">Style number if know</td>
                    <td className="p-2">Style number if know</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col G</td>
                    <td className="p-2">Type</td>
                    <td className="p-2">Type (Hipster/Brief/Boy shorts/Bikini/Thong)</td>
                    <td className="p-2">Type (Shaper shorts/Brief/Dress)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col H</td>
                    <td className="p-2 font-medium">Padding</td>
                    <td className="p-2 font-medium">Rise (High/Mid/Low)</td>
                    <td className="p-2 font-medium">Preference if any</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col I</td>
                    <td className="p-2">Wire (Wired Non wired / Non Wired)</td>
                    <td className="p-2">Preference if any</td>
                    <td className="p-2 font-semibold">All round Hip</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col J</td>
                    <td className="p-2">Preference if any</td>
                    <td className="p-2 font-semibold">All round Hip</td>
                    <td className="p-2">Contact Number</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col K</td>
                    <td className="p-2 font-medium">Under bust</td>
                    <td className="p-2 font-medium">Contact Number</td>
                    <td className="p-2 font-medium">Email id</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col L</td>
                    <td className="p-2 font-medium">Over Bust</td>
                    <td className="p-2 font-medium">Email id</td>
                    <td className="p-2 font-bold text-rose-700">Soie Size</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col M</td>
                    <td className="p-2">Contact Number</td>
                    <td className="p-2 font-bold text-rose-700">Soie Size</td>
                    <td className="p-2 font-semibold text-emerald-700">Interested Status</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col N</td>
                    <td className="p-2">Email id</td>
                    <td className="p-2 font-semibold text-emerald-700">Interested Status</td>
                    <td className="p-2 text-stone-400">-</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold bg-stone-50">Col O</td>
                    <td className="p-2 text-rose-900 font-bold">Soie Size</td>
                    <td className="p-2 text-stone-400">-</td>
                    <td className="p-2 text-stone-400">-</td>
                  </tr>
                  <tr className="bg-rose-50/70 font-semibold">
                    <td className="p-2 font-mono font-bold bg-rose-100 text-rose-900">Col P</td>
                    <td className="p-2 text-emerald-700 font-semibold">Sample Interested</td>
                    <td className="p-2 text-stone-400">-</td>
                    <td className="p-2 text-stone-400">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Google Apps Script */}
        {activeTab === 'appsscript' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <p className="text-stone-700">
                Paste this into your Google Spreadsheet under <strong>Extensions &gt; Apps Script</strong>:
              </p>
              <button
                type="button"
                onClick={handleCopyScript}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold cursor-pointer shadow-2xs"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-[300px]">
              {generateGoogleAppsScriptCode()}
            </pre>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] space-y-1">
              <strong>Quick 2-Minute Setup for Vercel:</strong>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Open your sheet: <code>{GOOGLE_SHEET_ID}</code></li>
                <li>Click <strong>Extensions &gt; Apps Script</strong> and paste the code above.</li>
                <li>Click <strong>Deploy &gt; New deployment &gt; Web app</strong>.</li>
                <li>Select <strong>Execute as: Me</strong> and <strong>Who has access: Anyone</strong>.</li>
                <li>Copy the resulting Web App URL and paste it in the Connection tab!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
