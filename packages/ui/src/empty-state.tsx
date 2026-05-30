import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      {icon && <div style={{ marginBottom: '16px', color: 'var(--aura-fg-muted-soft)' }}>{icon}</div>}
      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--aura-fg)' }}>{title}</h3>
      {description && (
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--aura-fg-muted)', maxWidth: '400px' }}>{description}</p>
      )}
      {action && <div style={{ marginTop: '20px' }}>{action}</div>}
    </div>
  );
}
