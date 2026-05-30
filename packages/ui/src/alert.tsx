import React from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const typeStyles: Record<AlertType, { bg: string; border: string; fg: string; icon: string }> = {
  info: { bg: 'var(--aura-info-light)', border: 'var(--aura-info)', fg: 'var(--aura-fg)', icon: 'ℹ' },
  success: { bg: 'var(--aura-success-light)', border: 'var(--aura-success)', fg: 'var(--aura-fg)', icon: '✓' },
  warning: { bg: 'var(--aura-warning-light)', border: 'var(--aura-warning)', fg: 'var(--aura-fg)', icon: '⚠' },
  danger: { bg: 'var(--aura-danger-light)', border: 'var(--aura-danger)', fg: 'var(--aura-fg)', icon: '✕' },
};

export function Alert({ type = 'info', title, children, dismissible, onDismiss, icon, action }: AlertProps) {
  const styles = typeStyles[type];

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: 'var(--aura-radius-md)',
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        color: styles.fg,
      }}
    >
      <div style={{ flexShrink: 0, fontSize: '16px', lineHeight: 1.4, opacity: 0.8 }}>
        {icon || styles.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{title}</div>}
        <div style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.9 }}>{children}</div>
        {action && <div style={{ marginTop: '8px' }}>{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '18px', padding: '0 4px', lineHeight: 1, flexShrink: 0 }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
