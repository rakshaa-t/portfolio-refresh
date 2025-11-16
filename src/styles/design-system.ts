/**
 * RAKSHA'S DESIGN SYSTEM
 * 
 * This file ensures consistent spacing, padding, and sizing across ALL devices.
 * Use these values in your components instead of arbitrary numbers.
 * 
 * Based on Marijana's approach: https://github.com/buka-studio/www-marijanapav
 */

// ============================================
// SPACING SCALE (8px base system)
// ============================================
// Use these for padding, margin, gaps
export const spacing = {
  xs: '8px',      // 8px  - tight spacing
  sm: '16px',     // 16px - small spacing
  md: '24px',     // 24px - medium spacing
  lg: '32px',     // 32px - large spacing
  xl: '48px',     // 48px - extra large
  '2xl': '64px',  // 64px - section spacing
  '3xl': '80px',  // 80px - between sections
  '4xl': '120px', // 120px - hero spacing
} as const;

// ============================================
// RESPONSIVE SECTION SPACING
// ============================================
// Distance BETWEEN sections (like we tried to standardize)
export const sectionSpacing = {
  mobile: '40px',   // 40px on mobile
  tablet: '60px',   // 60px on iPad
  desktop: '80px',  // 80px on desktop
} as const;

// Internal PADDING within sections
export const sectionPadding = {
  mobile: '20px',   // 20px on mobile
  tablet: '40px',   // 40px on iPad  
  desktop: '60px',  // 60px on desktop
} as const;

// ============================================
// CONTAINER WIDTHS
// ============================================
export const containerWidth = {
  sm: '640px',   // Small content (forms, cards)
  md: '768px',   // Medium content (blog posts)
  lg: '1024px',  // Large content (most sections)
  xl: '1280px',  // Extra large (full-width sections)
  '2xl': '1536px', // Maximum width
} as const;

// ============================================
// BREAKPOINTS (matches Tailwind)
// ============================================
export const breakpoints = {
  mobile: '0px',      // 0-767px
  tablet: '768px',    // 768px-1023px (iPad)
  desktop: '1024px',  // 1024px+ (Desktop)
} as const;

// ============================================
// TYPOGRAPHY SCALE
// ============================================
export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
} as const;

// ============================================
// RESPONSIVE FONT SIZES
// ============================================
// For headings that need to scale across devices
export const responsiveFontSize = {
  hero: {
    mobile: fontSize['4xl'],   // 36px
    tablet: fontSize['5xl'],   // 48px
    desktop: fontSize['6xl'],  // 60px
  },
  h1: {
    mobile: fontSize['3xl'],   // 30px
    tablet: fontSize['4xl'],   // 36px
    desktop: fontSize['5xl'],  // 48px
  },
  h2: {
    mobile: fontSize['2xl'],   // 24px
    tablet: fontSize['3xl'],   // 30px
    desktop: fontSize['4xl'],  // 36px
  },
  body: {
    mobile: fontSize.sm,       // 14px
    tablet: fontSize.base,     // 16px
    desktop: fontSize.base,    // 16px
  },
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

// ============================================
// HELPER: Get Tailwind classes for responsive spacing
// ============================================
/**
 * Generates responsive Tailwind classes for section spacing
 * 
 * @example
 * <div className={getResponsiveSectionSpacing()}>
 *   // Automatically applies correct spacing for each breakpoint
 * </div>
 */
export function getResponsiveSectionSpacing() {
  return `mt-[${sectionSpacing.mobile}] md:mt-[${sectionSpacing.tablet}] lg:mt-[${sectionSpacing.desktop}]`;
}

/**
 * Generates responsive Tailwind classes for section padding
 */
export function getResponsiveSectionPadding() {
  return `py-[${sectionPadding.mobile}] md:py-[${sectionPadding.tablet}] lg:py-[${sectionPadding.desktop}]`;
}

/**
 * Generates responsive Tailwind classes for horizontal padding
 */
export function getResponsiveHorizontalPadding() {
  return `px-[${spacing.sm}] md:px-[${spacing.lg}] lg:px-[${spacing.xl}]`;
}

// ============================================
// USAGE EXAMPLES
// ============================================
/**
 * BEFORE (inconsistent):
 * <div className="p-4 md:p-6 lg:p-8 mt-10 md:mt-14 lg:mt-20">
 * 
 * AFTER (consistent):
 * <div className={`${getResponsiveSectionPadding()} ${getResponsiveSectionSpacing()}`}>
 * 
 * OR with inline values:
 * <div style={{ padding: spacing.md, marginTop: sectionSpacing.desktop }}>
 */

