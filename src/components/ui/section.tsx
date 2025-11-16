/**
 * Responsive Section Component
 * 
 * Use this instead of manual divs to ensure consistent spacing across ALL sections.
 * Automatically handles responsive padding, margins, and max-width.
 */

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Centers content and applies max-width */
  contained?: boolean
  /** Max width of container (default: 1280px) */
  maxWidth?: '640px' | '768px' | '1024px' | '1280px' | '1536px' | 'none'
  /** Internal padding (default: true) */
  padded?: boolean
  /** Top margin spacing between sections (default: true) */
  spaced?: boolean
  /** Adds subtle scroll animation (default: false) */
  animated?: boolean
  /** Custom animation props (if animated: true) */
  animationProps?: MotionProps
  /** Background color/gradient */
  background?: 'transparent' | 'white' | 'gradient' | 'dark'
  /** HTML element type */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className,
    contained = false,
    maxWidth = '1280px',
    padded = true,
    spaced = true,
    animated = false,
    animationProps,
    background = 'transparent',
    as: Component = 'section',
    children,
    ...props 
  }, ref) => {
    
    // Responsive padding (matches design system)
    const paddingClasses = padded
      ? 'py-[20px] md:py-[40px] lg:py-[60px]'
      : '';
    
    // Responsive spacing between sections
    const spacingClasses = spaced
      ? 'mt-[40px] md:mt-[60px] lg:mt-[80px]'
      : '';
    
    // Container width and centering
    const containerClasses = contained
      ? `mx-auto w-full ${maxWidth !== 'none' ? `max-w-[${maxWidth}]` : ''} px-4 md:px-6 lg:px-8`
      : 'w-full';
    
    // Background styles
    const backgroundClasses = {
      transparent: '',
      white: 'bg-white',
      gradient: 'bg-gradient-to-b from-white to-gray-50',
      dark: 'bg-gray-900 text-white',
    }[background];
    
    // Default animation for sections
    const defaultAnimation: MotionProps = {
      initial: { opacity: 0, y: 80 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2, margin: "100px" },
      transition: { duration: 0.7, ease: 'easeOut' },
    };
    
    const finalAnimationProps = animationProps || defaultAnimation;
    
    const classes = cn(
      paddingClasses,
      spacingClasses,
      containerClasses,
      backgroundClasses,
      'relative',
      className
    );
    
    if (animated) {
      const MotionComponent = motion[Component as keyof typeof motion] as any;
      return (
        <MotionComponent
          ref={ref}
          className={classes}
          {...finalAnimationProps}
          {...props}
        >
          {children}
        </MotionComponent>
      );
    }
    
    return (
      <Component
        ref={ref as any}
        className={classes}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

export { Section };

/**
 * USAGE EXAMPLES:
 * 
 * // Basic section with all defaults
 * <Section>
 *   <h1>My Content</h1>
 * </Section>
 * 
 * // Contained section with max-width and centering
 * <Section contained maxWidth="1024px">
 *   <h1>My Content</h1>
 * </Section>
 * 
 * // Animated section
 * <Section animated>
 *   <h1>Fades in on scroll</h1>
 * </Section>
 * 
 * // Full customization
 * <Section
 *   contained
 *   maxWidth="768px"
 *   padded={true}
 *   spaced={true}
 *   animated={true}
 *   background="gradient"
 *   className="custom-class"
 * >
 *   <h1>Fully customized section</h1>
 * </Section>
 * 
 * // Remove spacing/padding for special cases
 * <Section padded={false} spaced={false}>
 *   <h1>No padding or spacing</h1>
 * </Section>
 */

