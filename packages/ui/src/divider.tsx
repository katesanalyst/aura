import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  style?: React.CSSProperties;
}

export function Divider({ orientation = 'horizontal', label, style }: DividerProps) {
  if (label) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          ...style,
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'var(--aura-border)' }} />
        <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--aura-fg-muted-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--aura-border)' }} />
      </div>
    );
  }

  return (
    <div
      style={{
        ...(orientation === 'horizontal'
          ? { width: '100%', height: '1px', background: 'var(--aura-border)' }
          : { height: '100%', width: '1px', background: 'var(--aura-border)' }),
        ...style,
      }}
    />
  );
}
