/**
 * RAKSHA'S DESIGN SYSTEM
 * 
 * This file ensures consistent spacing, padding, and sizing across ALL devices.
 * Use these values in your components instead of arbitrary numbers.
 * 
 * Based on Marijana's approach: https://github.com/buka-studio/www-marijanapav
 */

// ============================================
// SPACING SCALE (12px base system - from Figma)
// ============================================
// Use these for padding, margin, gaps
// Based on actual Figma values: https://www.figma.com/design/ALGMQumxMv07s5sUYgx259
export const spacing = {
  xs: '8px',      // 8px  - minimal spacing
  sm: '12px',     // 12px - base gap (FROM FIGMA: pill gaps, element spacing)
  md: '16px',     // 16px - mobile padding
  lg: '22px',     // 22px - desktop padding (FROM FIGMA: input horizontal padding)
  xl: '32px',     // 32px - section internal padding
  '2xl': '44px',  // 44px - large border radius (FROM FIGMA)
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
  '3xl': '44px',    // FROM FIGMA: chatbox container
  full: '9999px',
} as const;

// ============================================
// CHATBOX SPECIFIC VALUES (FROM FIGMA)
// ============================================
// Extracted from: https://www.figma.com/design/ALGMQumxMv07s5sUYgx259
export const chatbox = {
  // Container
  containerWidth: {
    mobile: '100%',      // Full width on mobile
    tablet: '600px',     // 80% of desktop
    desktop: '748.93px', // FROM FIGMA (exact value)
  },
  containerHeight: {
    mobile: '483px',     // Current mobile height
    tablet: '500px',     // Between mobile and desktop
    desktop: '544px',    // FROM FIGMA
  },
  containerRadius: '44px',       // FROM FIGMA
  containerBorder: '2px solid white',
  
  // Internal Padding (horizontal)
  internalPadding: {
    mobile: '16px',      // 73% of desktop (comfortable for mobile)
    tablet: '18px',      // 82% of desktop
    desktop: '22px',     // FROM FIGMA (input px-[22px])
  },
  
  // Messages
  messageFontSize: {
    mobile: '14px',      // Smaller for mobile
    tablet: '16px',      // FROM FIGMA
    desktop: '16px',     // FROM FIGMA
  },
  messageBubbleRadius: '30px',   // Current design (Figma uses 30px 30px 30px 0px)
  avatarSize: '48px',            // Current design
  messageGap: '12px',            // FROM FIGMA (gap-[12px])
  
  // Suggestion Pills
  pillHeight: '37px',            // FROM FIGMA
  pillRadius: '2222px',          // FROM FIGMA (fully rounded)
  pillGap: '12px',               // FROM FIGMA
  pillFontSize: '14px',          // FROM FIGMA
  pillBackground: 'rgba(255, 255, 255, 0.1)', // FROM FIGMA
  
  // Input Container
  inputHeight: {
    mobile: '56px',      // Slightly smaller for mobile
    tablet: '56px',      // Same as mobile
    desktop: '63px',     // FROM FIGMA
  },
  inputPaddingX: '22px',         // FROM FIGMA
  inputPaddingY: '6px',          // FROM FIGMA
  inputRadius: '100px',          // FROM FIGMA
  inputFontSize: '16px',         // FROM FIGMA
  
  // Send Button
  sendButtonSize: '50px',        // FROM FIGMA
  sendButtonPadding: '13px',     // FROM FIGMA (internal icon padding)
  sendButtonRadius: '3333px',    // FROM FIGMA (fully rounded)
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

