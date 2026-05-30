import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  lines?: number;
  animate?: boolean;
}

export function Skeleton({ width, height, variant = 'text', lines = 1, animate = true }: SkeletonProps) {
  const baseStyle: React.CSSProperties = {
    background: 'var(--aura-border)',
    borderRadius: variant === 'circular' ? '50%' : variant === 'text' ? '4px' : 'var(--aura-radius-md)',
    animation: animate ? 'skeleton-pulse 1.5s ease-in-out infinite' : undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              width: i === lines - 1 ? '60%' : (width || '100%'),
              height: height || '14px',
            }}
          />
        ))}
        <style>{`@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          ...baseStyle,
          width: width || (variant === 'circular' ? '40px' : '100%'),
          height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '14px' : '100px'),
        }}
      />
      <style>{`@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ padding: '20px', background: 'var(--aura-surface)', borderRadius: 'var(--aura-radius-lg)', border: '1px solid var(--aura-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Skeleton width="100px" height="12px" />
        <Skeleton width="60px" height="12px" />
      </div>
      <Skeleton width="80px" height="28px" />
      <div style={{ marginTop: '12px' }}>
        <Skeleton width="120px" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div style={{ background: 'var(--aura-surface)', borderRadius: 'var(--aura-radius-lg)', border: '1px solid var(--aura-border)', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', background: 'var(--aura-bg-subtle)', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px' }}>
        {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} width="60px" height="10px" />)}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} style={{ padding: '14px 16px', borderBottom: row < rows - 1 ? '1px solid var(--aura-border)' : 'none', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px' }}>
          {Array.from({ length: cols }).map((_, col) => <Skeleton key={col} width={col === 0 ? '120px' : '80px'} height="12px" />)}
        </div>
      ))}
    </div>
  );
}
