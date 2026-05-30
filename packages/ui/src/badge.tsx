import React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  count?: number;
  max?: number;
  dot?: boolean;
  show?: boolean;
  color?: string;
  size?: 'sm' | 'md';
}

export function Badge({ children, count, max = 99, dot, show = true, color = 'var(--aura-danger)', size = 'md' }: BadgeProps) {
  if (!show) return <>{children}</>;

  const display = count !== undefined ? (count > max ? `${max}+` : count.toString()) : null;
  const s = size === 'sm' ? '16px' : '20px';
  const fontSize = size === 'sm' ? '10px' : '11px';

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      {dot ? (
        <span
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
            border: '2px solid var(--aura-surface)',
          }}
        />
      ) : display ? (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            minWidth: s,
            height: s,
            padding: '0 4px',
            borderRadius: s,
            background: color,
            color: 'white',
            fontSize,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            border: '2px solid var(--aura-surface)',
          }}
        >
          {display}
        </span>
      ) : null}
    </div>
  );
}
