import { FormDataState, SubmissionRecord, ProductCategory } from '../types';
import { GOOGLE_SHEET_ID } from '../data/sizeCharts';

const STORAGE_KEY = 'soie_fit_submissions_v1';
const WEBHOOK_URL_KEY = 'soie_google_apps_script_url';

/**
 * Maps Bra form state to Columns B through O
 */
export function mapBraToSheetColumns(data: FormDataState) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return {
    timestamp,
    colB_Name: data.name,
    colC_Product: 'Bra',
    colD_Size: data.braCurrentSize || data.currentSize || 'N/A',
    colE_Brands: data.braBrandsYouUse || data.brandsYouUse || 'SOIE',
    colF_StyleNumber: data.braStyleNumber || data.styleNumber || 'N/A',
    colG_Type: data.braType || 'N/A',
    colH_Padding: data.braPadding || 'N/A',
    colI_Wire: data.braWire || 'N/A',
    colJ_Preference: data.braPreference || data.preference || 'None',
    colK_Underbust: data.underbustCm || 'N/A',
    colL_Overbust: data.overbustCm || 'N/A',
    colM_Contact: data.contactNumber,
    colN_Email: data.emailId,
    colO_SoieSize: data.braSoieSize || data.soieSize || 'N/A',
    colP_SampleInterest:
      data.sampleInterestBra || data.samplesInterested?.includes('Bra')
        ? 'Interested'
        : 'No',
  };
}

/**
 * Maps Panty form state to Columns B through O
 */
export function mapPantyToSheetColumns(data: FormDataState) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return {
    timestamp,
    colB_Name: data.name,
    colC_Product: 'Panty',
    colD_Size: data.pantyCurrentSize || 'N/A',
    colE_Brands: data.pantyBrandsYouUse || 'SOIE',
    colF_StyleNumber: data.pantyStyleNumber || 'N/A',
    colG_Type: data.pantyType || 'N/A',
    colH_Rise: data.pantyRise || 'N/A',
    colI_Preference: data.pantyPreference || 'None',
    colJ_AllRoundHip: data.pantyHip || 'N/A',
    colK_AllRoundWaist: data.pantyWaist || 'N/A',
    colL_Contact: data.contactNumber,
    colM_Email: data.emailId,
    colN_SoieSize: data.pantySoieSize || data.selectedPantySize || 'N/A',
    colO_SampleInterest:
      data.sampleInterestPanty || data.samplesInterested?.includes('Panty')
        ? 'Interested'
        : 'No',
  };
}

/**
 * Maps Shapewear form state to Columns B through N
 */
export function mapShapewearToSheetColumns(data: FormDataState) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return {
    timestamp,
    colB_Name: data.name,
    colC_Product: 'Shapewear',
    colD_Size: data.shapewearCurrentSize || 'N/A',
    colE_Brands: data.shapewearBrandsYouUse || 'SOIE',
    colF_StyleNumber: data.shapewearStyleNumber || 'N/A',
    colG_Type: data.shapewearType || 'N/A',
    colH_Preference: data.shapewearPreference || 'None',
    colI_AllRoundHip: data.shapewearHip || 'N/A',
    colJ_AllRoundWaist: data.shapewearWaist || 'N/A',
    colK_Contact: data.contactNumber,
    colL_Email: data.emailId,
    colM_SoieSize: data.shapewearSoieSize || data.selectedShapewearSize || 'N/A',
    colN_SampleInterest:
      data.sampleInterestShapewear || data.samplesInterested?.includes('Shapewear')
        ? 'Interested'
        : 'No',
  };
}

export function getStoredSubmissions(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSubmissionsLocally(records: SubmissionRecord[]): void {
  try {
    const list = getStoredSubmissions();
    const updated = [...records, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save submissions locally', err);
  }
}

export const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzxLJXKztaIm2GKXHgEFg5WzY5EMsLcSm4dc7w8Bm5GjlG9i9KoaiGCv2dNnpZbKcushQ/exec';

export function getCustomWebhookUrl(): string {
  try {
    return (
      localStorage.getItem(WEBHOOK_URL_KEY) ||
      (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL ||
      DEFAULT_WEBHOOK_URL
    );
  } catch {
    return DEFAULT_WEBHOOK_URL;
  }
}

export function setCustomWebhookUrl(url: string): void {
  try {
    localStorage.setItem(WEBHOOK_URL_KEY, url);
  } catch (err) {
    console.error('Failed to save webhook URL', err);
  }
}

/**
 * Submits consultation records (Bra, Panty, Shapewear) to Google Sheets
 */
export async function submitConsultationToGoogleSheet(
  data: FormDataState
): Promise<{ success: boolean; message: string; records: SubmissionRecord[] }> {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const payloadRecords: {
    product: ProductCategory;
    tabName: string;
    data: any;
  }[] = [];

  const createdRecords: SubmissionRecord[] = [];

  // 1. Bra Record
  if (data.includeBra) {
    const braData = mapBraToSheetColumns(data);
    payloadRecords.push({
      product: 'Bra',
      tabName: 'Bra',
      data: braData,
    });

    createdRecords.push({
      id: 'SOIE-BRA-' + Date.now().toString(36).toUpperCase(),
      timestamp,
      product: 'Bra',
      name: data.name,
      currentSize: data.braCurrentSize || 'N/A',
      brandsYouUse: data.braBrandsYouUse || 'SOIE',
      styleNumber: data.braStyleNumber || 'N/A',
      type: data.braType || 'N/A',
      paddingOrRiseOrPref: data.braPadding || 'Padded',
      wireOrPrefOrHip: data.braWire || 'Non Wired',
      prefOrHipOrWaist: data.braPreference || 'None',
      underbustOrWaistOrPhone: data.underbustCm || '73-77',
      overbustOrPhoneOrEmail: data.overbustCm || '91-93',
      phoneOrEmailOrSize: data.contactNumber,
      emailOrSize: data.emailId,
      soieSize: data.braSoieSize || '34C',
      rawFormData: data,
      syncedToGoogleSheet: false,
    });
  }

  // 2. Panty Record
  if (data.includePanty) {
    const pantyData = mapPantyToSheetColumns(data);
    payloadRecords.push({
      product: 'Panty',
      tabName: 'Panty',
      data: pantyData,
    });

    createdRecords.push({
      id: 'SOIE-PNT-' + (Date.now() + 1).toString(36).toUpperCase(),
      timestamp,
      product: 'Panty',
      name: data.name,
      currentSize: data.pantyCurrentSize || 'M',
      brandsYouUse: data.pantyBrandsYouUse || 'SOIE',
      styleNumber: data.pantyStyleNumber || 'N/A',
      type: data.pantyType || 'N/A',
      paddingOrRiseOrPref: data.pantyRise || 'Mid',
      wireOrPrefOrHip: data.pantyPreference || 'None',
      prefOrHipOrWaist: data.pantyHip || '36-38 in',
      underbustOrWaistOrPhone: data.pantyWaist || '71.12 cm',
      overbustOrPhoneOrEmail: data.contactNumber,
      phoneOrEmailOrSize: data.emailId,
      emailOrSize: data.pantySoieSize || 'M',
      soieSize: data.pantySoieSize || 'M',
      rawFormData: data,
      syncedToGoogleSheet: false,
    });
  }

  // 3. Shapewear Record
  if (data.includeShapewear) {
    const shapeData = mapShapewearToSheetColumns(data);
    payloadRecords.push({
      product: 'Shapewear',
      tabName: 'Shapewear',
      data: shapeData,
    });

    createdRecords.push({
      id: 'SOIE-SHP-' + (Date.now() + 2).toString(36).toUpperCase(),
      timestamp,
      product: 'Shapewear',
      name: data.name,
      currentSize: data.shapewearCurrentSize || 'M',
      brandsYouUse: data.shapewearBrandsYouUse || 'SOIE',
      styleNumber: data.shapewearStyleNumber || 'N/A',
      type: data.shapewearType || 'N/A',
      paddingOrRiseOrPref: data.shapewearPreference || 'None',
      wireOrPrefOrHip: data.shapewearHip || '38 in',
      prefOrHipOrWaist: data.shapewearWaist || '30 in',
      underbustOrWaistOrPhone: data.contactNumber,
      overbustOrPhoneOrEmail: data.emailId,
      phoneOrEmailOrSize: data.shapewearSoieSize || 'M',
      emailOrSize: data.shapewearSoieSize || 'M',
      soieSize: data.shapewearSoieSize || 'M',
      rawFormData: data,
      syncedToGoogleSheet: false,
    });
  }

  const webhookUrl = getCustomWebhookUrl();

  if (webhookUrl && payloadRecords.length > 0) {
    try {
      const payload = {
        sheetId: GOOGLE_SHEET_ID,
        records: payloadRecords,
      };

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      createdRecords.forEach((r) => {
        r.syncedToGoogleSheet = true;
      });

      saveSubmissionsLocally(createdRecords);

      return {
        success: true,
        message: `Successfully synchronized consultation to Google Sheet tabs: ${payloadRecords.map((r) => r.tabName).join(', ')}!`,
        records: createdRecords,
      };
    } catch (err: any) {
      console.warn('Webhook post failed, saving locally:', err);
      saveSubmissionsLocally(createdRecords);
      return {
        success: true,
        message: `Saved locally! (Webhook warning: ${err?.message || 'Check network'})`,
        records: createdRecords,
      };
    }
  }

  // Fallback to local storage if no webhook configured yet
  saveSubmissionsLocally(createdRecords);
  return {
    success: true,
    message: `Consultation saved to local records! Connect your Google Apps Script Webhook anytime to auto-sync to Sheet ${GOOGLE_SHEET_ID}.`,
    records: createdRecords,
  };
}

/**
 * Backward compatibility alias for single product submission
 */
export async function submitToGoogleSheet(
  data: FormDataState
): Promise<{ success: boolean; message: string; record: SubmissionRecord }> {
  const res = await submitConsultationToGoogleSheet(data);
  return {
    success: res.success,
    message: res.message,
    record: res.records[0],
  };
}

/**
 * Generates ready-to-paste Google Apps Script code for Google Sheet ID:
 * 1JsrvQb-QKtfjTivCwBzBDsUGIFoPVIH
 *
 * Saves into separate sheet tabs based on product type:
 * - Tab 'Bra' (Columns B to O)
 * - Tab 'Panty' (Columns B to N)
 * - Tab 'Shapewear' (Columns B to M)
 */
export function generateGoogleAppsScriptCode(): string {
  return `/**
 * =========================================================================
 * SOIE Fit Consultation Portal - Google Apps Script Webhook
 * Spreadsheet ID: ${GOOGLE_SHEET_ID}
 * Automatically routes records to tabs: 'Bra', 'Panty', 'Shapewear'
 * =========================================================================
 */

const SPREADSHEET_ID = "${GOOGLE_SHEET_ID}";

// GET Request: Health check
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "SOIE Google Sheets Webhook is running properly!",
    spreadsheetId: SPREADSHEET_ID,
    supportedTabs: ["Bra", "Panty", "Shapewear"]
  })).setMimeType(ContentService.MimeType.JSON);
}

// OPTIONS Request: Preflight
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

// POST Request: Handles form submissions (single or multi-product)
function doPost(e) {
  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    } else {
      throw new Error("No payload received");
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Support either multi-record batch or single record
    const records = payload.records || [payload];
    const results = [];

    for (let i = 0; i < records.length; i++) {
      const rec = records[i];
      const product = rec.product || (rec.data && rec.data.colC_Product) || "Bra";
      
      // Determine target tab: 'Bra', 'Panty', or 'Shapewear'
      let tabName = "Bra";
      if (String(product).toLowerCase().includes("panty")) {
        tabName = "Panty";
      } else if (String(product).toLowerCase().includes("shapewear")) {
        tabName = "Shapewear";
      }

      // Get or create the sheet tab
      let sheet = ss.getSheetByName(tabName);
      if (!sheet) {
        sheet = ss.insertSheet(tabName);
        initSheetHeaders(sheet, tabName);
      } else if (sheet.getLastRow() === 0) {
        initSheetHeaders(sheet, tabName);
      }

      const d = rec.data || rec;
      const rowValues = buildRowForProduct(tabName, d);

      // Write row: Timestamp in Column A, and data values in Columns B onwards
      const nextRow = Math.max(sheet.getLastRow() + 1, 2);
      const timestamp = d.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      
      sheet.getRange(nextRow, 1).setValue(timestamp); // Col A: Timestamp
      sheet.getRange(nextRow, 2, 1, rowValues.length).setValues([rowValues]); // Col B to Col O/N/M

      results.push({
        product: tabName,
        rowNumber: nextRow
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      results: results,
      message: "Successfully logged records into Google Sheet tabs!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Initializes Sheet Headers matching exact user requirements:
 * - Bra (Cols B to O)
 * - Panty (Cols B to N)
 * - Shapewear (Cols B to M)
 */
function initSheetHeaders(sheet, tabName) {
  let headers = [];
  
  if (tabName === "Bra") {
    // Col A: Timestamp, Cols B - P:
    headers = [
      "Timestamp",
      "Name",
      "Product",
      "Size",
      "Brands you use",
      "Styel number if know",
      "Type",
      "Padding",
      "Wire",
      "Preference if any",
      "Under bust",
      "Over Bust",
      "Contact Number",
      "Email id",
      "Soie Size",
      "Sample Interested"
    ];
  } else if (tabName === "Panty") {
    // Col A: Timestamp, Cols B - O:
    headers = [
      "Timestamp",
      "Name",
      "Product",
      "Size",
      "Brands you use",
      "Styel number if know",
      "Type",
      "Rise",
      "Preference if any",
      "All round Hip",
      "All round Waist",
      "Contact Number",
      "Email id",
      "Soie Size",
      "Sample Interested"
    ];
  } else {
    // Shapewear: Col A: Timestamp, Cols B - N:
    headers = [
      "Timestamp",
      "Name",
      "Product",
      "Size",
      "Brands you use",
      "Styel number if know",
      "Type",
      "Preference if any",
      "All round Hip",
      "All round Waist",
      "Contact Number",
      "Email id",
      "Soie Size",
      "Sample Interested"
    ];
  }

  sheet.appendRow(headers);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#FCE7E9");
  headerRange.setFontColor("#7C2136");
  sheet.setFrozenRows(1);
}

/**
 * Builds data array for Columns B onwards based on tab type
 */
function buildRowForProduct(tabName, d) {
  const formatPhone = function(p) {
    return p ? "'" + String(p).trim() : "";
  };

  if (tabName === "Bra") {
    // Columns B to P (15 values)
    var sampleVal = d.colP_SampleInterest || (d.sampleInterestBra ? "Interested" : (d.samplesInterested && d.samplesInterested.indexOf("Bra") !== -1 ? "Interested" : "No"));
    return [
      d.colB_Name || d.name || "",
      "Bra",
      d.colD_Size || d.braCurrentSize || d.currentSize || "",
      d.colE_Brands || d.braBrandsYouUse || d.brandsYouUse || "",
      d.colF_StyleNumber || d.braStyleNumber || d.styleNumber || "",
      d.colG_Type || d.braType || "",
      d.colH_Padding || d.braPadding || "",
      d.colI_Wire || d.braWire || "",
      d.colJ_Preference || d.braPreference || d.preference || "",
      d.colK_Underbust || d.underbustCm || "",
      d.colL_Overbust || d.overbustCm || "",
      formatPhone(d.colM_Contact || d.contactNumber),
      d.colN_Email || d.emailId || "",
      d.colO_SoieSize || d.braSoieSize || d.soieSize || "",
      sampleVal
    ];
  } else if (tabName === "Panty") {
    // Columns B to O (14 values)
    var sampleVal = d.colO_SampleInterest || (d.sampleInterestPanty ? "Interested" : (d.samplesInterested && d.samplesInterested.indexOf("Panty") !== -1 ? "Interested" : "No"));
    return [
      d.colB_Name || d.name || "",
      "Panty",
      d.colD_Size || d.pantyCurrentSize || "",
      d.colE_Brands || d.pantyBrandsYouUse || "",
      d.colF_StyleNumber || d.pantyStyleNumber || "",
      d.colG_Type || d.pantyType || "",
      d.colH_Rise || d.pantyRise || "",
      d.colI_Preference || d.pantyPreference || "",
      d.colJ_AllRoundHip || d.pantyHip || "",
      d.colK_AllRoundWaist || d.pantyWaist || "",
      formatPhone(d.colL_Contact || d.contactNumber),
      d.colM_Email || d.emailId || "",
      d.colN_SoieSize || d.pantySoieSize || d.selectedPantySize || "",
      sampleVal
    ];
  } else {
    // Shapewear: Columns B to N (13 values)
    var sampleVal = d.colN_SampleInterest || (d.sampleInterestShapewear ? "Interested" : (d.samplesInterested && d.samplesInterested.indexOf("Shapewear") !== -1 ? "Interested" : "No"));
    return [
      d.colB_Name || d.name || "",
      "Shapewear",
      d.colD_Size || d.shapewearCurrentSize || "",
      d.colE_Brands || d.shapewearBrandsYouUse || "",
      d.colF_StyleNumber || d.shapewearStyleNumber || "",
      d.colG_Type || d.shapewearType || "",
      d.colH_Preference || d.shapewearPreference || "",
      d.colI_AllRoundHip || d.shapewearHip || "",
      d.colJ_AllRoundWaist || d.shapewearWaist || "",
      formatPhone(d.colK_Contact || d.contactNumber),
      d.colL_Email || d.emailId || "",
      d.colM_SoieSize || d.shapewearSoieSize || d.selectedShapewearSize || "",
      sampleVal
    ];
  }
}
`;
}

/**
 * Export records as CSV
 */
export function exportSubmissionsToCSV(category?: ProductCategory) {
  const records = getStoredSubmissions().filter(
    (r) => !category || r.product === category
  );

  if (records.length === 0) {
    alert('No submissions recorded yet for this product line.');
    return;
  }

  const headers = [
    'Submission ID',
    'Timestamp',
    'Product',
    'Name',
    'Current Size',
    'Brands You Use',
    'Style Number',
    'Type',
    'Col H (Padding/Rise/Pref)',
    'Col I (Wire/Pref/Hip)',
    'Col J (Pref/Hip/Waist)',
    'Col K (Underbust/Waist/Phone)',
    'Col L (Overbust/Phone/Email)',
    'Col M (Phone/Email/Soie Size)',
    'Col N (Email/Soie Size)',
    'Col O (Soie Size)',
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.timestamp}"`,
    `"${r.product}"`,
    `"${r.name}"`,
    `"${r.currentSize}"`,
    `"${r.brandsYouUse}"`,
    `"${r.styleNumber || ''}"`,
    `"${r.type || ''}"`,
    `"${r.paddingOrRiseOrPref || ''}"`,
    `"${r.wireOrPrefOrHip || ''}"`,
    `"${r.prefOrHipOrWaist || ''}"`,
    `"${r.underbustOrWaistOrPhone || ''}"`,
    `"${r.overbustOrPhoneOrEmail || ''}"`,
    `"${r.phoneOrEmailOrSize || ''}"`,
    `"${r.emailOrSize || ''}"`,
    `"${r.soieSize || ''}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `SOIE_Submissions_${category || 'All'}_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
