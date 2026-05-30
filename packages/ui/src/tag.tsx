import React from 'react';

export type TagVariant = 'filled' | 'outline' | 'subtle';
export type TagColor = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  color?: TagColor;
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

const colorMap: Record<TagColor, { bg: string; border: string; fg: string }> = {
  default: { bg: 'var(--aura-bg-subtle)', border: 'var(--aura-border)', fg: 'var(--aura-fg-muted)' },
  accent: { bg: 'var(--aura-accent-light)', border: 'var(--aura-accent)', fg: 'var(--aura-accent)' },
  success: { bg: 'var(--aura-success-light)', border: 'var(--aura-success)', fg: 'var(--aura-success)' },
  warning: { bg: 'var(--aura-warning-light)', border: 'var(--aura-warning)', fg: 'var(--aura-warning)' },
  danger: { bg: 'var(--aura-danger-light)', border: 'var(--aura-danger)', fg: 'var(--aura-danger)' },
  info: { bg: 'var(--aura-info-light)', border: 'var(--aura-info)', fg: 'var(--aura-info)' },
};

export function Tag({ children, variant = 'subtle', color = 'default', size = 'md', removable, onRemove, icon }: TagProps) {
  const c = colorMap[color];
  const styles: Record<TagVariant, React.CSSProperties> = {
    filled: { background: c.fg, color: 'white', border: '1px solid transparent' },
    outline: { background: 'transparent', color: c.fg, border: `1px solid ${c.border}` },
    subtle: { background: c.bg, color: c.fg, border: '1px solid transparent' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--aura-radius-full)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        lineHeight: 1.4,
        ...styles[variant],
      }}
    >
      {icon}
      {children}
      {removable && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, marginLeft: '2px', fontSize: '14px', lineHeight: 1, opacity: 0.7 }}
        >
          &times;
        </button>
      )}
    </span>
  );
}
