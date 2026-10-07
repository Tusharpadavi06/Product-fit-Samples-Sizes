import { BraSizeMatrixRow, PantySizeRow, BraCup } from '../types';

export const GOOGLE_SHEET_ID = '12htwm8HnCSrEwz99fyn2-szVqnIiNCyxIiOTMpKifQQ';

// Exact data from Final_size_chart_BRA_01_1_eae42eae-c0ed-4f97-8410-a36de0a6f759.webp
export const BRA_SIZE_MATRIX: BraSizeMatrixRow[] = [
  {
    band: 30,
    underbustMin: 63,
    underbustMax: 67,
    cups: {
      'Cup B': { min: 79, max: 81 },
      'Cup C': { min: 81, max: 83 },
      'Cup D': { min: 83, max: 85 },
      'Cup DD': { min: 85, max: 87 },
      'Cup E': { min: 87, max: 89 },
      'Cup F': { min: 89, max: 91 },
    },
  },
  {
    band: 32,
    underbustMin: 68,
    underbustMax: 72,
    cups: {
      'Cup B': { min: 84, max: 86 },
      'Cup C': { min: 86, max: 88 },
      'Cup D': { min: 88, max: 90 },
      'Cup DD': { min: 90, max: 92 },
      'Cup E': { min: 92, max: 94 },
      'Cup F': { min: 94, max: 96 },
    },
  },
  {
    band: 34,
    underbustMin: 73,
    underbustMax: 77,
    cups: {
      'Cup B': { min: 89, max: 91 },
      'Cup C': { min: 91, max: 93 },
      'Cup D': { min: 93, max: 95 },
      'Cup DD': { min: 95, max: 97 },
      'Cup E': { min: 97, max: 99 },
      'Cup F': { min: 99, max: 101 },
    },
  },
  {
    band: 36,
    underbustMin: 78,
    underbustMax: 82,
    cups: {
      'Cup B': { min: 94, max: 96 },
      'Cup C': { min: 96, max: 98 },
      'Cup D': { min: 98, max: 100 },
      'Cup DD': { min: 100, max: 102 },
      'Cup E': { min: 102, max: 104 },
      'Cup F': { min: 104, max: 106 },
    },
  },
  {
    band: 38,
    underbustMin: 83,
    underbustMax: 87,
    cups: {
      'Cup B': { min: 99, max: 101 },
      'Cup C': { min: 101, max: 103 },
      'Cup D': { min: 103, max: 105 },
      'Cup DD': { min: 105, max: 107 },
      'Cup E': { min: 107, max: 109 },
      'Cup F': { min: 109, max: 111 },
    },
  },
  {
    band: 40,
    underbustMin: 88,
    underbustMax: 92,
    cups: {
      'Cup B': { min: 104, max: 106 },
      'Cup C': { min: 106, max: 108 },
      'Cup D': { min: 108, max: 110 },
      'Cup DD': { min: 110, max: 112 },
      'Cup E': { min: 112, max: 114 },
      'Cup F': { min: 114, max: 116 },
    },
  },
  {
    band: 42,
    underbustMin: 93,
    underbustMax: 97,
    cups: {
      'Cup B': { min: 109, max: 111 },
      'Cup C': { min: 111, max: 113 },
      'Cup D': { min: 113, max: 115 },
      'Cup DD': { min: 115, max: 117 },
      'Cup E': { min: 117, max: 119 },
      'Cup F': { min: 119, max: 121 },
    },
  },
  {
    band: 44,
    underbustMin: 98,
    underbustMax: 102,
    cups: {
      'Cup B': { min: 114, max: 116 },
      'Cup C': { min: 116, max: 118 },
      'Cup D': { min: 118, max: 120 },
      'Cup DD': { min: 120, max: 122 },
      'Cup E': { min: 122, max: 124 },
      'Cup F': { min: 121, max: 126 },
    },
  },
];

export const CUP_LIST: BraCup[] = ['Cup B', 'Cup C', 'Cup D', 'Cup DD', 'Cup E', 'Cup F'];

// Exact data from OK_PANTY_SIZE_CHART_2000x2000_4e504772-a72c-40d7-a3fe-af38ef305297.webp
export const PANTY_SIZE_CHART: PantySizeRow[] = [
  {
    size: 'XS',
    hipInMin: 29.9,
    hipInMax: 32.6,
    hipCmMin: 76,
    hipCmMax: 82,
    waistIn: 24,
    waistCm: 60.96,
  },
  {
    size: 'S',
    hipInMin: 32.7,
    hipInMax: 35.5,
    hipCmMin: 82,
    hipCmMax: 89,
    waistIn: 26,
    waistCm: 66.04,
  },
  {
    size: 'M',
    hipInMin: 35.5,
    hipInMax: 38.2,
    hipCmMin: 89,
    hipCmMax: 97,
    waistIn: 28,
    waistCm: 71.12,
  },
  {
    size: 'L',
    hipInMin: 38.2,
    hipInMax: 40.9,
    hipCmMin: 97,
    hipCmMax: 104,
    waistIn: 30,
    waistCm: 76.2,
  },
  {
    size: 'XL',
    hipInMin: 40.9,
    hipInMax: 44.1,
    hipCmMin: 104,
    hipCmMax: 112,
    waistIn: 32,
    waistCm: 81.28,
  },
  {
    size: '2XL',
    hipInMin: 44.1,
    hipInMax: 46.9,
    hipCmMin: 112,
    hipCmMax: 119,
    waistIn: 34,
    waistCm: 86.36,
  },
  {
    size: '3XL',
    hipInMin: 46.9,
    hipInMax: 50.0,
    hipCmMin: 119,
    hipCmMax: 127,
    waistIn: 36,
    waistCm: 91.44,
  },
  {
    size: '4XL',
    hipInMin: 50.0,
    hipInMax: 52.8,
    hipCmMin: 127,
    hipCmMax: 134,
    waistIn: 38,
    waistCm: 96.52,
  },
];

// Exact Shapewear data from SHW-8.webp (Brand Size, To Fit Hip, To Fit Waist, Garment Length)
export const SHAPEWEAR_SIZE_CHART = [
  {
    size: 'S',
    hipCm: '83-89',
    hipIn: '32.6-35',
    waistCm: '61-67',
    waistIn: '24-26',
    lengthCm: '45',
    lengthIn: '17.7',
  },
  {
    size: 'M',
    hipCm: '90-97',
    hipIn: '34.4-38',
    waistCm: '65-72',
    waistIn: '26-28',
    lengthCm: '45',
    lengthIn: '17.7',
  },
  {
    size: 'L',
    hipCm: '98-104',
    hipIn: '38.5-40.9',
    waistCm: '72-77',
    waistIn: '28-30',
    lengthCm: '46',
    lengthIn: '18.1',
  },
  {
    size: 'XL',
    hipCm: '105-112',
    hipIn: '41.3-44',
    waistCm: '77-82',
    waistIn: '30-32',
    lengthCm: '46',
    lengthIn: '18.1',
  },
  {
    size: '2XL',
    hipCm: '112-119',
    hipIn: '44-47',
    waistCm: '82-88',
    waistIn: '32-35',
    lengthCm: '47',
    lengthIn: '18.5',
  },
  {
    size: '3XL',
    hipCm: '119-127',
    hipIn: '47-50',
    waistCm: '88-95',
    waistIn: '35-37',
    lengthCm: '47',
    lengthIn: '18.5',
  },
];

export const BRA_TYPES = [
  'T-Shirt Bra',
  'Push Up Bra',
  'Minimizer Bra',
  'Sports Bra',
  'Multiway/Strapless Bra',
];

export const PANTY_TYPES = [
  'Hipster',
  'Brief',
  'Boy shorts',
  'Bikini',
  'Thong',
] as const;

export const PANTY_RISES = [
  'High',
  'Mid',
  'Low',
] as const;

export const SHAPEWEAR_TYPES = [
  'Shaper shorts',
  'Shaper Brief',
  'Shaper Shaper dress',
] as const;

export const BRA_WIRE_OPTIONS = [
  'Wired',
  'Non Wired',
  'Wired and Non Wired',
] as const;

export const BRA_PADDING_OPTIONS = [
  'Padded',
  'Non Padded',
  'Padded and Non Padded',
] as const;

export const POPULAR_BRANDS = [
  'SOIE',
  'Enamor',
  'Zivame',
  'Triumph',
  'Jockey',
  'Wacoal',
  'Marks & Spencer',
  'Clovia',
  'Amante',
  'Calvin Klein',
  'Other',
];

export const BRA_PREFERENCES = [
  'Everyday Soft Comfort',
  'Deep Neck / Plunge Necklines',
  'Seamless Under Fitted Clothes',
  'Maximum Lift & Push-up',
  'Side & Back Smoothing',
  'Pure Cotton / High Breathability',
  'Heavy Bust Lift & Anti-Sagging',
  'Lace & Luxury Style',
];

export const PANTY_PREFERENCES = [
  'Zero Panty Lines (Laser Cut / Seamless)',
  '100% Breathable Cotton Gusset',
  'High-Waist Tummy Tucking',
  'Activewear / Anti-Chafing',
  'Pretty Lace & Sheer Accents',
];

export const SHAPEWEAR_PREFERENCES = [
  'Tummy & Waist Cinching',
  'Thigh & Hip Smoothing',
  'Saree & Lehenga Silhouette Fit',
  'Bodycon Dress Perfection',
  'Post-Partum / Daily Comfort Support',
];
