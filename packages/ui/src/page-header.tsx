import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: string[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)', marginBottom: '4px' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: '0 6px' }}>/</span>}
                {crumb}
              </span>
            ))}
          </div>
        )}
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--aura-fg)' }}>{title}</h1>
        {subtitle && (
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--aura-fg-muted)', maxWidth: '600px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}
