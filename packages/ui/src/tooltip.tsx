'use client';

import React, { useState, useRef, useEffect } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
}

export function Tooltip({ content, children, position = 'top', delay = 300, disabled }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        if (!triggerRef.current || !tooltipRef.current) return;
        const trigger = triggerRef.current.getBoundingClientRect();
        const tooltip = tooltipRef.current.getBoundingClientRect();
        const gap = 8;

        let top = 0;
        let left = 0;

        switch (position) {
          case 'top':
            top = trigger.top - tooltip.height - gap;
            left = trigger.left + trigger.width / 2 - tooltip.width / 2;
            break;
          case 'bottom':
            top = trigger.bottom + gap;
            left = trigger.left + trigger.width / 2 - tooltip.width / 2;
            break;
          case 'left':
            top = trigger.top + trigger.height / 2 - tooltip.height / 2;
            left = trigger.left - tooltip.width - gap;
            break;
          case 'right':
            top = trigger.top + trigger.height / 2 - tooltip.height / 2;
            left = trigger.right + gap;
            break;
        }

        setCoords({ top, left });
      });
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} style={{ display: 'inline-flex' }}>
        {children}
      </div>
      {visible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            zIndex: 100,
            padding: '6px 10px',
            borderRadius: 'var(--aura-radius-sm)',
            background: 'var(--aura-fg)',
            color: 'var(--aura-bg)',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: '240px',
            boxShadow: 'var(--aura-shadow-lg)',
            pointerEvents: 'none',
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}