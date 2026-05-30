import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

export function Checkbox({ label, description, error, indeterminate, style, id, checked, onChange, ...props }: CheckboxProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
        <input
          ref={checkboxRef}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
          }}
          {...props}
        />
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            border: `2px solid ${error ? 'var(--aura-danger)' : checked || indeterminate ? 'var(--aura-accent)' : 'var(--aura-border-strong)'}`,
            background: checked || indeterminate ? 'var(--aura-accent)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {indeterminate && !checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5H8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {label && <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>{label}</span>}
          {description && <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{description}</span>}
          {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
        </div>
      )}
    </label>
  );
}

export interface CheckboxGroupProps {
  options: { value: string; label: string; description?: string; disabled?: boolean }[];
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

export function CheckboxGroup({ options, value = [], onChange, label, error, direction = 'vertical' }: CheckboxGroupProps) {
  const handleChange = (optValue: string) => {
    const next = value.includes(optValue) ? value.filter((v) => v !== optValue) : [...value, optValue];
    onChange?.(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: '12px', flexWrap: 'wrap' }}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            description={opt.description}
            disabled={opt.disabled}
            checked={value.includes(opt.value)}
            onChange={() => handleChange(opt.value)}
          />
        ))}
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
