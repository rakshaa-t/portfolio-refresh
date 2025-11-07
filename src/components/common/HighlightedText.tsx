'use client';

import React, { forwardRef, ReactNode, useImperativeHandle, useState, CSSProperties, useMemo } from 'react';
import { cn } from '../../lib/utils';
import './HighlightedText.css';

type Props = {
  className?: string;
  children: ReactNode;
  onHighlightEnd?: () => void;
  style?: CSSProperties;
  triggerOnHover?: boolean;
  speed?: 'normal' | 'fast';
};

export type Controls = {
  start: () => void;
  reset: () => void;
};

const HighlightedText = forwardRef<Controls, Props>(function HighlightedText(
  { children, className = '', onHighlightEnd, style, triggerOnHover = false, speed = 'normal', ...props },
  ref,
) {
  const [highlighted, setHighlighted] = useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const duration = speed === 'fast' ? '1.2s' : '2.3s';

  useImperativeHandle(ref, () => ({
    start: () => {
      setHighlighted(true);
    },
    reset: () => {
      // Ensure transition plays by setting inline style first
      if (elementRef.current) {
        elementRef.current.style.transition = `background-position ${duration} cubic-bezier(0.06, 0.56, 0.24, 0.96) 0s`;
        // Force reflow
        void elementRef.current.offsetHeight;
      }
      setHighlighted(false);
    },
  }));

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setHighlighted(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover) {
      // Ensure transition plays by setting inline style first
      if (elementRef.current) {
        const beforeElement = elementRef.current;
        if (beforeElement) {
          beforeElement.style.setProperty('transition', `background-position ${duration} cubic-bezier(0.06, 0.56, 0.24, 0.96) 0s`);
          // Force reflow
          void beforeElement.offsetHeight;
        }
      }
      setHighlighted(false);
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn('highlight-text', className, { highlighted, 'highlight-text-fast': speed === 'fast' })}
      style={style}
      onTransitionEnd={() => {
        onHighlightEnd?.();
      }}
      onMouseEnter={triggerOnHover ? handleMouseEnter : undefined}
      onMouseLeave={triggerOnHover ? handleMouseLeave : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

export default HighlightedText;

