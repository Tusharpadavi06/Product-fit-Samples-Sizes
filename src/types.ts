export type ProductCategory = 'Bra' | 'Panty' | 'Shapewear';

export type PantyType = 'Hipster' | 'Brief' | 'Boy shorts' | 'Bikini' | 'Thong';
export type PantyRise = 'High' | 'Mid' | 'Low';

export type ShapewearType = 'Shaper shorts' | 'Shaper Brief' | 'Shaper Shaper dress';

export type BraPadding = 'Padded' | 'Non Padded';
export type BraWire = 'Wired Non wired' | 'Non Wired' | 'Wired';

export type BraCup = 'Cup B' | 'Cup C' | 'Cup D' | 'Cup DD' | 'Cup E' | 'Cup F';

export interface BraSizeMatrixRow {
  band: number; // 30, 32, 34, 36, 38, 40, 42, 44
  underbustMin: number;
  underbustMax: number;
  cups: {
    [key in BraCup]: {
      min: number;
      max: number;
    };
  };
}

export interface PantySizeRow {
  size: string; // XS, S, M, L, XL, 2XL, 3XL, 4XL
  hipInMin: number;
  hipInMax: number;
  hipCmMin: number;
  hipCmMax: number;
  waistIn: number;
  waistCm: number;
}

export interface FormDataState {
  // Client Contact Information
  name: string;
  contactNumber: string;
  emailId: string;

  // Toggle products to include (all 3 enabled by default)
  includeBra: boolean;
  includePanty: boolean;
  includeShapewear: boolean;

  // Bra Specific (Columns B-O in Tab "Bra")
  braCurrentSize: string;
  braBrandsYouUse: string; // Manual typing
  braStyleNumber: string;  // Manual typing
  braType: string;
  braPadding: BraPadding;
  braWire: BraWire;
  braPreference: string;   // Manual typing
  underbustCm: string;
  overbustCm: string;
  selectedBraBand: number | null;
  selectedBraCup: BraCup | null;
  braSoieSize: string;

  // Panty Specific (Columns B-N in Tab "Panty")
  pantyCurrentSize: string;
  pantyBrandsYouUse: string; // Manual typing
  pantyStyleNumber: string;  // Manual typing
  pantyType: PantyType | '';
  pantyRise: PantyRise;
  pantyPreference: string;   // Manual typing
  pantyHip: string;
  pantyWaist: string;
  selectedPantySize: string | null;
  pantySoieSize: string;

  // Shapewear Specific (Columns B-M in Tab "Shapewear")
  shapewearCurrentSize: string;
  shapewearBrandsYouUse: string; // Manual typing
  shapewearStyleNumber: string;  // Manual typing
  shapewearType: ShapewearType | '';
  shapewearPreference: string;   // Manual typing
  shapewearHip: string;
  shapewearWaist: string;
  selectedShapewearSize: string | null;
  shapewearSoieSize: string;

  // Aliases for active product view
  product?: ProductCategory;
  currentSize?: string;
  brandsYouUse?: string;
  styleNumber?: string;
  preference?: string;
  soieSize?: string;
}

export interface SubmissionRecord {
  id: string;
  timestamp: string;
  product: ProductCategory;
  name: string;
  currentSize: string;
  brandsYouUse: string;
  styleNumber: string;
  type: string;
  paddingOrRiseOrPref: string; // Col H
  wireOrPrefOrHip: string;     // Col I
  prefOrHipOrWaist: string;    // Col J
  underbustOrWaistOrPhone: string; // Col K
  overbustOrPhoneOrEmail: string;  // Col L
  phoneOrEmailOrSize: string;      // Col M
  emailOrSize: string;             // Col N
  soieSize: string;                // Col O
  rawFormData: FormDataState;
  syncedToGoogleSheet: boolean;
}
