'use client';

import React, { useEffect, useCallback } from 'react';

export type DrawerPosition = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export function Drawer({ open, onClose, position = 'left', title, children, width = '300px', height = '80vh' }: DrawerProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const isHorizontal = position === 'left' || position === 'right';
  const positionStyles: Record<DrawerPosition, React.CSSProperties> = {
    left: { left: 0, top: 0, bottom: 0, width, transform: 'translateX(0)' },
    right: { right: 0, top: 0, bottom: 0, width, transform: 'translateX(0)' },
    bottom: { left: 0, right: 0, bottom: 0, height, transform: 'translateY(0)' },
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
      {/* Panel */}
      <div
        style={{
          position: 'absolute',
          ...positionStyles[position],
          background: 'var(--aura-surface)',
          border: position === 'right' ? '1px solid var(--aura-border)' : position === 'left' ? '1px solid var(--aura-border)' : '1px solid var(--aura-border)',
          borderRadius: position === 'bottom' ? 'var(--aura-radius-xl) var(--aura-radius-xl) 0 0' : position === 'right' ? 'var(--aura-radius-xl) 0 0 var(--aura-radius-xl)' : '0 var(--aura-radius-xl) var(--aura-radius-xl) 0',
          boxShadow: 'var(--aura-shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {title && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--aura-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{title}</h3>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '20px', padding: '4px' }}
            >
              &times;
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>{children}</div>
      </div>
    </div>
  );
}
