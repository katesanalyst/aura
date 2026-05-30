import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const paddings = { none: '0', sm: '12px', md: '20px', lg: '28px' };

export function Card({ children, padding = 'md', hoverable, onClick, style }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--aura-surface)',
        border: '1px solid var(--aura-border)',
        borderRadius: 'var(--aura-radius-xl)',
        padding: paddings[padding],
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        ...style,
      }}
      onMouseEnter={(e) => { if (hoverable || onClick) e.currentTarget.style.boxShadow = 'var(--aura-shadow-md)'; }}
      onMouseLeave={(e) => { if (hoverable || onClick) e.currentTarget.style.boxShadow = 'none'; }}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--aura-fg)' }}>{title}</h3>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--aura-fg-muted)' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--aura-border)', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      {children}
    </div>
  );
}
