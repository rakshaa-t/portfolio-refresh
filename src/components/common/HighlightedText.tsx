'use client';

import { forwardRef, ReactNode, useImperativeHandle, useState, CSSProperties } from 'react';
import { cn } from '../../lib/utils';
import './HighlightedText.css';

type Props = {
  className?: string;
  children: ReactNode;
  onHighlightEnd?: () => void;
  style?: CSSProperties;
};

export type Controls = {
  start: () => void;
  reset: () => void;
};

const HighlightedText = forwardRef<Controls, Props>(function HighlightedText(
  { children, className = '', onHighlightEnd, style, ...props },
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

  return (
    <div
      className={cn('highlight-text', className, { highlighted })}
      style={style}
      onTransitionEnd={() => {
        onHighlightEnd?.();
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export default HighlightedText;

