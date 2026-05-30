import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendLabel?: string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, trend, trendLabel, icon }: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--aura-surface)',
        border: '1px solid var(--aura-border)',
        borderRadius: 'var(--aura-radius-xl)',
        padding: '20px',
        boxShadow: 'var(--aura-shadow-sm)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--aura-fg-muted-soft)',
              marginBottom: '8px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--aura-fg)',
              lineHeight: 1.1,
            }}
          >
            {value}
          </div>
        </div>
        {icon && (
          <div style={{ marginLeft: '12px', flexShrink: 0 }}>
            {icon}
          </div>
        )}
      </div>
      {(trend || trendLabel) && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--aura-fg-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend && (
            <span style={{
              fontWeight: 600,
              color: trend.startsWith('+') ? 'var(--aura-success)' : trend.startsWith('-') ? 'var(--aura-danger)' : 'var(--aura-fg-muted)',
            }}>
              {trend}
            </span>
          )}
          {trendLabel && <span style={{ color: 'var(--aura-fg-muted-soft)' }}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
