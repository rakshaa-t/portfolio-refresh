/**
 * RESPONSIVE SCALE SYSTEM
 * 
 * This creates CONSISTENT scaling across all breakpoints.
 * Instead of guessing values, everything follows a mathematical ratio.
 * 
 * Based on industry standards from:
 * - Tailwind CSS spacing scale
 * - Material Design responsive layout grid
 * - Apple Human Interface Guidelines
 * - Marijana's responsive patterns
 */

// ============================================
// BREAKPOINT DEFINITIONS
// ============================================
export const breakpoints = {
  mobile: 0,       // 0-767px
  tablet: 768,     // 768px-1023px (iPad)
  desktop: 1024,   // 1024px+
} as const;

// ============================================
// SCALE RATIOS (The Magic Numbers)
// ============================================
/**
 * These ratios determine how values scale across breakpoints.
 * They're based on viewport width ratios:
 * 
 * Mobile (375px) → Tablet (768px) → Desktop (1440px)
 *   1.0x       →     2.05x        →     3.84x
 * 
 * For padding/spacing, we use these proven ratios:
 */
export const scaleRatios = {
  // Aggressive scaling (for large values like container padding)
  aggressive: {
    mobile: 1.0,    // 100% - base mobile value
    tablet: 1.5,    // 150% - 50% larger than mobile
    desktop: 2.0,   // 200% - double mobile value
  },
  
  // Standard scaling (for most padding/spacing)
  standard: {
    mobile: 1.0,    // 100%
    tablet: 1.375,  // 137.5% (between 1.25x and 1.5x)
    desktop: 1.75,  // 175%
  },
  
  // Conservative scaling (for small gaps and fine details)
  conservative: {
    mobile: 1.0,    // 100%
    tablet: 1.125,  // 112.5%
    desktop: 1.25,  // 125%
  },
  
  // Minimal scaling (for things that should barely change)
  minimal: {
    mobile: 1.0,    // 100%
    tablet: 1.0,    // No change
    desktop: 1.0,   // No change
  },
} as const;

// ============================================
// SCALING FUNCTIONS
// ============================================

/**
 * Scale a value across breakpoints using a specific ratio
 * 
 * @param baseValue - The mobile (base) value in pixels
 * @param ratio - Which scaling ratio to use ('aggressive' | 'standard' | 'conservative' | 'minimal')
 * @returns Object with mobile, tablet, desktop values
 * 
 * @example
 * const padding = scaleValue(16, 'standard');
 * // Returns: { mobile: '16px', tablet: '22px', desktop: '28px' }
 */
export function scaleValue(
  baseValue: number,
  ratio: keyof typeof scaleRatios = 'standard'
) {
  const scale = scaleRatios[ratio];
  
  return {
    mobile: `${Math.round(baseValue * scale.mobile)}px`,
    tablet: `${Math.round(baseValue * scale.tablet)}px`,
    desktop: `${Math.round(baseValue * scale.desktop)}px`,
  };
}

/**
 * Scale a value but keep tablet and desktop the same
 * Useful for elements that only need mobile adjustment
 */
export function scaleFromMobile(mobileValue: number, desktopValue: number) {
  return {
    mobile: `${mobileValue}px`,
    tablet: `${desktopValue}px`,
    desktop: `${desktopValue}px`,
  };
}

/**
 * Generate Tailwind classes for responsive values
 */
export function getTailwindClass(
  property: string,
  values: { mobile: string; tablet: string; desktop: string }
) {
  return `${property}-[${values.mobile}] md:${property}-[${values.tablet}] lg:${property}-[${values.desktop}]`;
}

// ============================================
// PRE-CALCULATED RESPONSIVE VALUES
// ============================================

/**
 * Padding values scaled consistently
 * Use these instead of arbitrary values!
 */
export const responsivePadding = {
  // Container horizontal padding
  containerX: scaleValue(16, 'standard'),      // 16px → 22px → 28px
  
  // Section vertical padding
  sectionY: scaleValue(20, 'aggressive'),      // 20px → 30px → 40px
  
  // Card internal padding
  cardInternal: scaleValue(16, 'standard'),    // 16px → 22px → 28px
  
  // Small element padding (buttons, inputs)
  small: scaleValue(12, 'conservative'),       // 12px → 14px → 15px
  
  // Chatbox specific
  chatboxInternal: scaleValue(16, 'standard'), // 16px → 22px → 28px
} as const;

/**
 * Gap/spacing between elements
 */
export const responsiveGap = {
  // Tiny gaps (between pills, small UI elements)
  xs: scaleValue(8, 'minimal'),         // 8px → 8px → 8px
  
  // Small gaps (between form elements)
  sm: scaleValue(12, 'minimal'),        // 12px → 12px → 12px
  
  // Medium gaps (between cards, sections)
  md: scaleValue(16, 'conservative'),   // 16px → 18px → 20px
  
  // Large gaps (between major sections)
  lg: scaleValue(24, 'standard'),       // 24px → 33px → 42px
  
  // Extra large gaps
  xl: scaleValue(40, 'standard'),       // 40px → 55px → 70px
} as const;

/**
 * Font sizes scaled consistently
 */
export const responsiveFontSize = {
  // Body text
  body: scaleFromMobile(14, 16),        // 14px mobile → 16px desktop
  
  // Small text (captions, labels)
  small: scaleFromMobile(12, 14),       // 12px → 14px
  
  // Large text (section headings)
  large: scaleValue(20, 'standard'),    // 20px → 28px → 35px
  
  // Display text (hero headings)
  display: scaleValue(32, 'aggressive'), // 32px → 48px → 64px
  
  // Pill/button text
  button: scaleFromMobile(13, 14),      // 13px → 14px
} as const;

/**
 * Element sizes (heights, widths)
 */
export const responsiveSize = {
  // Input/button heights
  inputHeight: scaleFromMobile(56, 63),    // 56px → 63px
  buttonHeight: scaleFromMobile(44, 50),   // 44px → 50px
  pillHeight: scaleFromMobile(37, 37),     // 37px (no change)
  
  // Icon sizes
  iconSmall: scaleFromMobile(20, 24),      // 20px → 24px
  iconMedium: scaleFromMobile(24, 28),     // 24px → 28px
  iconLarge: scaleFromMobile(32, 40),      // 32px → 40px
  
  // Avatar sizes
  avatar: scaleFromMobile(40, 48),         // 40px → 48px
} as const;

/**
 * Border radius scaled consistently
 */
export const responsiveBorderRadius = {
  // Small radius (cards, buttons)
  small: scaleFromMobile(12, 16),          // 12px → 16px
  
  // Medium radius (larger cards)
  medium: scaleFromMobile(20, 24),         // 20px → 24px
  
  // Large radius (containers, modals)
  large: scaleFromMobile(32, 44),          // 32px → 44px
  
  // Full radius (pills, fully rounded)
  full: { mobile: '9999px', tablet: '9999px', desktop: '9999px' },
} as const;

// ============================================
// HELPER: Generate CSS Variables
// ============================================

/**
 * Convert responsive values to CSS custom properties
 * Use this to inject into your app for dynamic theming
 */
export function generateCSSVariables() {
  return `
    /* Mobile (default) */
    --padding-container-x: ${responsivePadding.containerX.mobile};
    --padding-section-y: ${responsivePadding.sectionY.mobile};
    --gap-xs: ${responsiveGap.xs.mobile};
    --gap-sm: ${responsiveGap.sm.mobile};
    --gap-md: ${responsiveGap.md.mobile};
    
    /* Tablet */
    @media (min-width: ${breakpoints.tablet}px) {
      --padding-container-x: ${responsivePadding.containerX.tablet};
      --padding-section-y: ${responsivePadding.sectionY.tablet};
      --gap-xs: ${responsiveGap.xs.tablet};
      --gap-sm: ${responsiveGap.sm.tablet};
      --gap-md: ${responsiveGap.md.tablet};
    }
    
    /* Desktop */
    @media (min-width: ${breakpoints.desktop}px) {
      --padding-container-x: ${responsivePadding.containerX.desktop};
      --padding-section-y: ${responsivePadding.sectionY.desktop};
      --gap-xs: ${responsiveGap.xs.desktop};
      --gap-sm: ${responsiveGap.sm.desktop};
      --gap-md: ${responsiveGap.md.desktop};
    }
  `;
}

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * BEFORE (inconsistent):
 * <div className="px-4 md:px-6 lg:px-8">
 * <div className="gap-2 md:gap-3 lg:gap-4">
 * 
 * AFTER (systematic):
 * <div className="px-[16px] md:px-[22px] lg:px-[28px]">
 * <div className="gap-[12px] md:gap-[12px] lg:gap-[12px]">
 * 
 * OR (even better, using pre-calculated values):
 * import { responsivePadding, responsiveGap } from './responsive-scale'
 * 
 * <div style={{
 *   paddingLeft: responsivePadding.containerX.mobile,
 *   // OR use Tailwind with exact values
 * }}>
 * 
 * OR (using helper):
 * const paddingClass = getTailwindClass('px', responsivePadding.containerX);
 * <div className={paddingClass}>
 */

// ============================================
// QUICK REFERENCE TABLE
// ============================================

/**
 * Common Patterns:
 * 
 * Container Horizontal Padding:
 *   Mobile: 16px | Tablet: 22px | Desktop: 28px
 * 
 * Section Vertical Padding:
 *   Mobile: 20px | Tablet: 30px | Desktop: 40px
 * 
 * Element Gaps:
 *   Tiny: 8px (all breakpoints)
 *   Small: 12px (all breakpoints)
 *   Medium: 16px → 18px → 20px
 *   Large: 24px → 33px → 42px
 * 
 * Font Sizes:
 *   Body: 14px → 16px → 16px
 *   Button: 13px → 14px → 14px
 *   Heading: 20px → 28px → 35px
 * 
 * Border Radius:
 *   Small: 12px → 16px
 *   Large: 32px → 44px
 */

