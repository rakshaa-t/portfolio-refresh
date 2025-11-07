'use client';

import { forwardRef, ReactNode, useImperativeHandle, useState, CSSProperties } from 'react';
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

  useImperativeHandle(ref, () => ({
    start: () => {
      setHighlighted(true);
    },
    reset: () => {
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
      setHighlighted(false);
    }
  };

  return (
    <div
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

