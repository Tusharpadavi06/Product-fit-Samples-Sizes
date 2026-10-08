import React from 'react';

/**
 * Official SOIE Company Logo matching user's uploaded logo (https://ibb.co/fYGZBgg1)
 * Cached locally at /images/soie-logo.jpg with direct CDN fallback.
 */
export const SoieOriginalLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-9 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto',
  }[size];

  return (
    <div className={`inline-flex items-center justify-center p-1 bg-white rounded-xl shadow-xs border border-rose-200/80 flex-shrink-0 ${className}`}>
      <img
        src="/images/soie-logo.jpg"
        alt="SOIE Official Logo"
        className={`${sizeClasses} object-contain rounded-lg`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://i.ibb.co/DDgmsJJV/SOIE-New-original-logo.jpg';
        }}
      />
    </div>
  );
};

export const SoieBrandLockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <SoieOriginalLogo size="md" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-stone-800 tracking-wider uppercase">
          Ginza Industries Limited
        </span>
        <span className="text-[11px] text-stone-500">
          Official Fit Consultation &amp; Sizing Portal
        </span>
      </div>
    </div>
  );
};

/**
 * Step 1 Illustration: "Verify the bra size as per this chart · Measure the Underbust (cms) for band size"
 * Matches uploaded step-1-bra.png (https://ibb.co/7NYDC2tT)
 */
export const BraStep1Illustration: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const containerClass = {
    sm: 'w-32 h-32 sm:w-36 sm:h-36',
    md: 'w-40 h-40 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div
        className={`relative ${containerClass} rounded-2xl bg-white shadow-xs border border-stone-200/90 flex items-center justify-center overflow-hidden p-1.5`}
      >
        <img
          src="/images/step-1-bra.png"
          alt="Step 1 · Underbust Tape Measurement"
          className="w-full h-full object-contain rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://i.ibb.co/jZ6Yfgkx/step-1-bra.png';
          }}
        />
      </div>
      <span className="text-xs font-semibold text-stone-700 mt-1.5 tracking-wide">
        Step 1 · Underbust Tape
      </span>
    </div>
  );
};

/**
 * Step 2 Illustration: "Measure the fullest part of the breast (cms) for cup size"
 * Matches uploaded step-2-bra.png (https://ibb.co/B2d7bnjm)
 */
export const BraStep2Illustration: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const containerClass = {
    sm: 'w-32 h-32 sm:w-36 sm:h-36',
    md: 'w-40 h-40 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div
        className={`relative ${containerClass} rounded-2xl bg-white shadow-xs border border-stone-200/90 flex items-center justify-center overflow-hidden p-1.5`}
      >
        <img
          src="/images/step-2-bra.png"
          alt="Step 2 · Overbust Tape Measurement"
          className="w-full h-full object-contain rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://i.ibb.co/3mG82RWw/step-2-bra.png';
          }}
        />
      </div>
      <span className="text-xs font-semibold text-stone-700 mt-1.5 tracking-wide">
        Step 2 · Overbust Tape
      </span>
    </div>
  );
};

/**
 * Panty Measurement Illustration matching user uploaded panty.png (https://ibb.co/KjZWKss5)
 */
export const PantyMeasurementPhoto: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const containerClass = {
    sm: 'w-32 h-32 sm:w-36 sm:h-36',
    md: 'w-40 h-40 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div
        className={`relative ${containerClass} rounded-2xl bg-white shadow-xs border border-stone-200/90 flex items-center justify-center overflow-hidden p-1.5`}
      >
        <img
          src="/images/panty.png"
          alt="Panty · Hip & Waist Measuring Guide"
          className="w-full h-full object-contain rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://i.ibb.co/jvKDJww8/panty.png';
          }}
        />
      </div>
      <span className="text-xs font-semibold text-stone-700 mt-1.5 tracking-wide">
        Hip &amp; Waist Measuring Guide
      </span>
    </div>
  );
};

/**
 * Shapewear Measurement Illustration matching user uploaded shapewear.png (https://ibb.co/FLSnn9MM)
 */
export const ShapewearMeasurementPhoto: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const containerClass = {
    sm: 'w-32 h-32 sm:w-36 sm:h-36',
    md: 'w-40 h-40 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div
        className={`relative ${containerClass} rounded-2xl bg-white shadow-xs border border-stone-200/90 flex items-center justify-center overflow-hidden p-1.5`}
      >
        <img
          src="/images/shapewear.png"
          alt="Shapewear · Rear & Hip Compression Guide"
          className="w-full h-full object-contain rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://i.ibb.co/YFzbb6MM/shapewear.png';
          }}
        />
      </div>
      <span className="text-xs font-semibold text-stone-700 mt-1.5 tracking-wide">
        Rear &amp; Hip Compression Guide
      </span>
    </div>
  );
};

/**
 * Professional SOIE Header Banner
 * Features official SOIE company logo, Ginza Industries branding, and elegant styling.
 * As requested by user: removed tummy control, body shaping, seamless comfort, stretchable fabric text pills!
 */
export const SoieProductSizeFormBanner: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-t-2xl border-b border-[#301018] select-none bg-gradient-to-r from-[#441722] via-[#541D2B] to-[#3B141E] text-white relative shadow-xs ${className}`}
    >
      {/* Subtle luxury ambient pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 py-3.5 sm:py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Official SOIE Company Logo & Corporate Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-xs border border-rose-200/40 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/soie-logo.jpg"
                alt="SOIE Official Logo"
                className="h-10 sm:h-11 w-auto object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/DDgmsJJV/SOIE-New-original-logo.jpg';
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider uppercase text-[#F2CBD4]">
                  SOIE
                </span>
                <span className="text-stone-400 text-xs">|</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#D8A6B2]">
                  Ginza Industries Limited
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#D8A6B2]/90 font-normal mt-0.5">
                Intimate Wear Fit Consultation &amp; Size Finder Form
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleFormHeaderBanner = SoieProductSizeFormBanner;
