'use client';

import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/utils';
import './HighlightedText.css';

type Props = {
  className?: string;
  children: ReactNode;
  onHighlightEnd?: () => void;
};

export type Controls = {
  start: () => void;
  reset: () => void;
};

const HighlightedText = forwardRef<Controls, Props>(function HighlightedText(
  { children, className = '', onHighlightEnd, ...props },
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
    <span
      className={cn('highlight-text pb-1', className, { highlighted })}
      onTransitionEnd={() => {
        onHighlightEnd?.();
      }}
      {...props}
    >
      {children}
    </span>
  );
});

export default HighlightedText;

