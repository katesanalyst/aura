import React from 'react';

type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const toneStyles: Record<StatusTone, React.CSSProperties> = {
  success: {
    background: 'var(--aura-success-light)',
    color: 'var(--aura-success)',
    borderColor: 'var(--aura-success)',
  },
  warning: {
    background: 'var(--aura-warning-light)',
    color: 'var(--aura-warning)',
    borderColor: 'var(--aura-warning)',
  },
  danger: {
    background: 'var(--aura-danger-light)',
    color: 'var(--aura-danger)',
    borderColor: 'var(--aura-danger)',
  },
  info: {
    background: 'var(--aura-info-light)',
    color: 'var(--aura-info)',
    borderColor: 'var(--aura-info)',
  },
  neutral: {
    background: 'var(--aura-bg-subtle)',
    color: 'var(--aura-fg-muted)',
    borderColor: 'var(--aura-border)',
  },
};

export interface StatusBadgeProps {
  status: string;
  tone?: StatusTone;
  label?: string;
}

const toneMap: Record<string, StatusTone> = {
  active: 'success',
  approved: 'success',
  paid: 'success',
  completed: 'success',
  live: 'success',
  pending: 'warning',
  processing: 'warning',
  draft: 'warning',
  inactive: 'neutral',
  disabled: 'neutral',
  rejected: 'danger',
  failed: 'danger',
  error: 'danger',
  info: 'info',
};

export function StatusBadge({ status, tone, label }: StatusBadgeProps) {
  const resolvedTone = tone ?? toneMap[status.toLowerCase()] ?? 'neutral';

  return (
    <span
      style={{
        ...toneStyles[resolvedTone],
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 'var(--aura-radius-full)',
        fontSize: '12px',
        fontWeight: 600,
        border: '1px solid',
        textTransform: 'capitalize',
        letterSpacing: '0.02em',
      }}
    >
      {label ?? status}
    </span>
  );
}
