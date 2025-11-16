/**
 * Responsive Container Component
 * 
 * Handles horizontal padding and max-width consistently.
 * Use this for content that should be centered and have horizontal breathing room.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width of container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Centers the container (default: true) */
  centered?: boolean
  /** Adds horizontal padding (default: true) */
  padded?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className,
    maxWidth = 'xl',
    centered = true,
    padded = true,
    children,
    ...props 
  }, ref) => {
    
    // Max width classes
    const maxWidthClasses = {
      'sm': 'max-w-[640px]',
      'md': 'max-w-[768px]',
      'lg': 'max-w-[1024px]',
      'xl': 'max-w-[1280px]',
      '2xl': 'max-w-[1536px]',
      'full': 'max-w-full',
    }[maxWidth];
    
    // Horizontal padding (responsive)
    const paddingClasses = padded
      ? 'px-4 md:px-6 lg:px-8'
      : '';
    
    // Centering
    const centerClasses = centered
      ? 'mx-auto'
      : '';
    
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          maxWidthClasses,
          paddingClasses,
          centerClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };

/**
 * USAGE EXAMPLES:
 * 
 * // Default container (1280px max-width, centered, padded)
 * <Container>
 *   <h1>My Content</h1>
 * </Container>
 * 
 * // Smaller container for blog posts
 * <Container maxWidth="md">
 *   <article>Blog content</article>
 * </Container>
 * 
 * // Full width container
 * <Container maxWidth="full">
 *   <div>Spans entire width</div>
 * </Container>
 * 
 * // No padding (edge-to-edge on mobile)
 * <Container padded={false}>
 *   <img src="..." className="w-full" />
 * </Container>
 * 
 * // Combine with Section component:
 * <Section padded spaced>
 *   <Container maxWidth="lg">
 *     <h1>Section Title</h1>
 *     <p>Perfectly spaced content</p>
 *   </Container>
 * </Section>
 */

