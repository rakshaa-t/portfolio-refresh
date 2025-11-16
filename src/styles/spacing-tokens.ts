/**
 * HYBRID SPACING SYSTEM
 * 
 * Combines Marijana's simplicity with structured consistency.
 * 
 * PHILOSOPHY:
 * - Keep most values FIXED (like Marijana)
 * - Only scale what matters (container padding, section spacing)
 * - Use this as reference going forward
 * - DON'T refactor existing layouts (they work!)
 * 
 * Based on:
 * - Your Figma values: https://www.figma.com/design/ALGMQumxMv07s5sUYgx259
 * - Marijana's patterns: https://github.com/buka-studio/www-marijanapav
 */

// ============================================
// BREAKPOINTS (Your 3 breakpoints)
// ============================================
export const breakpoints = {
  mobile: 0,       // 0-767px
  tablet: 768,     // 768px-1023px (iPad)
  desktop: 1024,   // 1024px+
} as const;

// ============================================
// FIXED VALUES (Like Marijana - DON'T scale)
// ============================================

/**
 * Card/Element Internal Padding
 * Use these inside cards, buttons, small components
 * Keep FIXED across all breakpoints (Marijana's way)
 */
export const fixedPadding = {
  xs: '8px',       // Tiny padding (pills, small buttons)
  sm: '12px',      // Small padding (cards, buttons)
  md: '16px',      // Medium padding (larger cards)
  lg: '20px',      // Large padding (containers)
  xl: '24px',      // Extra large padding
} as const;

/**
 * Gaps Between Elements
 * Use for flexbox/grid gaps
 * Keep FIXED across all breakpoints (Marijana's way)
 */
export const fixedGap = {
  xs: '8px',       // Tight gaps (icon + text)
  sm: '12px',      // Small gaps (buttons in a group) - FROM FIGMA
  md: '16px',      // Medium gaps (cards in a row)
  lg: '20px',      // Large gaps (sections)
  xl: '32px',      // Extra large gaps
} as const;

/**
 * Border Radius
 * Keep FIXED across all breakpoints
 */
export const fixedRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '44px',   // FROM FIGMA: chatbox
  full: '9999px',
} as const;

// ============================================
// RESPONSIVE VALUES (Scale these!)
// ============================================

/**
 * Container Padding (Horizontal)
 * This is the main responsive value
 * Based on Figma (22px desktop) + Marijana pattern (20px)
 */
export const containerPaddingX = {
  mobile: '16px',   // Comfortable mobile padding
  tablet: '20px',   // Marijana uses px-5 (20px) everywhere
  desktop: '22px',  // FROM FIGMA: input px-[22px]
} as const;

/**
 * Section Padding (Vertical)
 * Spacing WITHIN sections (top/bottom internal padding)
 */
export const sectionPaddingY = {
  mobile: '20px',   // Marijana: py-5
  tablet: '32px',   // Between mobile and desktop
  desktop: '48px',  // Marijana: md:py-12
} as const;

/**
 * Section Spacing (Vertical)
 * Spacing BETWEEN sections (margin-top)
 */
export const sectionSpacingY = {
  mobile: '40px',   // Your current system
  tablet: '60px',   // Your current system
  desktop: '80px',  // Your current system
} as const;

// ============================================
// ELEMENT-SPECIFIC VALUES
// ============================================

/**
 * Chatbox (From your Figma)
 */
export const chatbox = {
  // Container
  width: {
    mobile: '100%',      // Full width
    tablet: '600px',     // 80% of desktop
    desktop: '748.93px', // FROM FIGMA
  },
  height: {
    mobile: '483px',
    tablet: '500px',
    desktop: '544px',    // FROM FIGMA
  },
  
  // Internal padding (use responsive)
  padding: containerPaddingX,
  
  // Border radius (fixed)
  radius: fixedRadius['4xl'],  // 44px FROM FIGMA
  
  // Elements
  inputHeight: {
    mobile: '56px',
    tablet: '56px',
    desktop: '63px',     // FROM FIGMA
  },
  pillHeight: '37px',    // FIXED (FROM FIGMA)
  pillGap: fixedGap.sm,  // FIXED 12px (FROM FIGMA)
  messageGap: fixedGap.sm, // FIXED 12px (FROM FIGMA)
} as const;

/**
 * Typography (Responsive)
 */
export const fontSize = {
  // Body text
  body: {
    mobile: '14px',      // Marijana uses 14px mobile
    tablet: '16px',
    desktop: '16px',     // FROM FIGMA
  },
  
  // Button/pill text
  button: {
    mobile: '13px',
    tablet: '14px',
    desktop: '14px',     // FROM FIGMA
  },
  
  // Small text
  small: {
    mobile: '12px',
    tablet: '13px',
    desktop: '14px',
  },
  
  // Headings (scale more aggressively)
  h1: {
    mobile: '32px',
    tablet: '40px',
    desktop: '48px',
  },
  
  h2: {
    mobile: '24px',
    tablet: '30px',
    desktop: '36px',
  },
} as const;

// ============================================
// TAILWIND CLASS GENERATORS
// ============================================

/**
 * Generate Tailwind classes for common patterns
 */
export const tw = {
  /**
   * Container horizontal padding
   * @example tw.containerX() → "px-[16px] md:px-[20px] lg:px-[22px]"
   */
  containerX: () =>
    `px-[${containerPaddingX.mobile}] md:px-[${containerPaddingX.tablet}] lg:px-[${containerPaddingX.desktop}]`,
  
  /**
   * Section vertical padding (internal)
   * @example tw.sectionY() → "py-[20px] md:py-[32px] lg:py-[48px]"
   */
  sectionY: () =>
    `py-[${sectionPaddingY.mobile}] md:py-[${sectionPaddingY.tablet}] lg:py-[${sectionPaddingY.desktop}]`,
  
  /**
   * Section vertical spacing (between sections)
   * @example tw.spacingY() → "mt-[40px] md:mt-[60px] lg:mt-[80px]"
   */
  spacingY: () =>
    `mt-[${sectionSpacingY.mobile}] md:mt-[${sectionSpacingY.tablet}] lg:mt-[${sectionSpacingY.desktop}]`,
  
  /**
   * Fixed gap (no responsive)
   * @example tw.gap('sm') → "gap-[12px]"
   */
  gap: (size: keyof typeof fixedGap) => `gap-[${fixedGap[size]}]`,
  
  /**
   * Fixed padding (no responsive)
   * @example tw.p('sm') → "p-[12px]"
   */
  p: (size: keyof typeof fixedPadding) => `p-[${fixedPadding[size]}]`,
} as const;

// ============================================
// QUICK REFERENCE GUIDE
// ============================================

/**
 * WHEN TO USE WHAT:
 * 
 * ✅ FIXED VALUES (Marijana's way):
 * - Card internal padding: fixedPadding.sm (12px)
 * - Gaps between elements: fixedGap.sm (12px) or fixedGap.md (16px)
 * - Border radius: fixedRadius.lg (16px)
 * - Pill height: chatbox.pillHeight (37px)
 * 
 * ✅ RESPONSIVE VALUES (Scale these):
 * - Container horizontal padding: containerPaddingX
 * - Section vertical padding: sectionPaddingY
 * - Section spacing: sectionSpacingY
 * - Font sizes: fontSize.body, fontSize.button
 * 
 * EXAMPLES:
 * 
 * // Card with fixed padding (Marijana's way)
 * <div className="p-[12px] gap-[16px]">
 * 
 * // Container with responsive padding
 * <div className={tw.containerX()}>
 * 
 * // Section with responsive spacing
 * <section className={`${tw.sectionY()} ${tw.spacingY()}`}>
 */

// ============================================
// EXPORT EVERYTHING
// ============================================

export default {
  breakpoints,
  fixed: {
    padding: fixedPadding,
    gap: fixedGap,
    radius: fixedRadius,
  },
  responsive: {
    containerPaddingX,
    sectionPaddingY,
    sectionSpacingY,
    fontSize,
  },
  chatbox,
  tw,
};

