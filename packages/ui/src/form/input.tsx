import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, style, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--aura-fg-muted)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          height: '44px',
          padding: '0 14px',
          borderRadius: 'var(--aura-radius-md)',
          border: `1px solid ${error ? 'var(--aura-danger)' : 'var(--aura-border)'}`,
          background: 'var(--aura-surface)',
          color: 'var(--aura-fg)',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.15s ease',
          ...style,
        }}
        {...props}
      />
      {hint && !error && <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{hint}</span>}
      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
