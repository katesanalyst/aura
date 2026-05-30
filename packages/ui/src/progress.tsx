import React from 'react';

export interface ProgressBarProps {
  value?: number; // 0-100
  max?: number;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value = 0, max = 100, indeterminate, size = 'md', color = 'var(--aura-accent)', label, showValue }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const heights = { sm: '4px', md: '6px', lg: '10px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>{label}</span>}
          {showValue && !indeterminate && <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--aura-fg-muted)' }}>{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        style={{
          width: '100%',
          height: heights[size],
          borderRadius: heights[size],
          background: 'var(--aura-border)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: indeterminate ? '40%' : `${percent}%`,
            height: '100%',
            borderRadius: heights[size],
            background: color,
            transition: indeterminate ? 'none' : 'width 0.3s ease',
            animation: indeterminate ? 'progress-indeterminate 1.5s ease-in-out infinite' : undefined,
          }}
        />
      </div>
      <style>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
