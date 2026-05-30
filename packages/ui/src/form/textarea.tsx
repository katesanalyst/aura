import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

export function Textarea({ label, error, hint, maxLength, showCount, style, id, value, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const charCount = typeof value === 'string' ? value.length : 0;

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
      <textarea
        id={inputId}
        value={value}
        maxLength={maxLength}
        style={{
          minHeight: '120px',
          padding: '12px 14px',
          borderRadius: 'var(--aura-radius-md)',
          border: `1px solid ${error ? 'var(--aura-danger)' : 'var(--aura-border)'}`,
          background: 'var(--aura-surface)',
          color: 'var(--aura-fg)',
          fontSize: '14px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s ease',
          ...style,
        }}
        {...props}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {hint && !error && <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{hint}</span>}
        {showCount && maxLength && (
          <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>
            {charCount.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        )}
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
