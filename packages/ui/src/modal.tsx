import React, { useEffect, useCallback } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, description, children, maxWidth = '600px' }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--aura-surface)',
          borderRadius: 'var(--aura-radius-xl)',
          border: '1px solid var(--aura-border)',
          boxShadow: 'var(--aura-shadow-xl)',
          width: '90%',
          maxWidth,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {(title || description) && (
          <div style={{ padding: '24px 24px 0', borderBottom: title ? '1px solid var(--aura-border)' : undefined, paddingBottom: title ? '16px' : 0 }}>
            {title && <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{title}</h2>}
            {description && <p style={{ margin: title ? '4px 0 0' : 0, fontSize: '14px', color: 'var(--aura-fg-muted)' }}>{description}</p>}
          </div>
        )}
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}
