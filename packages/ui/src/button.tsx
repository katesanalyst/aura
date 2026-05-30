import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--aura-accent)',
    color: 'var(--aura-accent-fg)',
    border: 'none',
  },
  secondary: {
    background: 'var(--aura-bg-subtle)',
    color: 'var(--aura-fg)',
    border: '1px solid var(--aura-border)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--aura-fg)',
    border: '1px solid var(--aura-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--aura-fg-muted)',
    border: 'none',
  },
  danger: {
    background: 'var(--aura-danger)',
    color: 'var(--aura-danger-fg)',
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '13px', borderRadius: 'var(--aura-radius-sm)' },
  md: { padding: '8px 16px', fontSize: '14px', borderRadius: 'var(--aura-radius-md)' },
  lg: { padding: '12px 24px', fontSize: '16px', borderRadius: 'var(--aura-radius-md)' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        fontWeight: 500,
        transition: 'all 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        outline: 'none',
        ...style,
      }}
      {...props}
    >
      {loading && <span style={{ animation: 'spin 1s linear infinite' }}>&#8635;</span>}
      {children}
    </button>
  );
}
