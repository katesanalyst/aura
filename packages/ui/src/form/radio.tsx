import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  name?: string;
}

export function RadioGroup({ options, value, onChange, label, error, direction = 'vertical', name }: RadioGroupProps) {
  const groupName = name || label?.toLowerCase().replace(/\s+/g, '-') || 'radio';

  return (
    <div role="radiogroup" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: '12px', flexWrap: 'wrap' }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${groupName}-${opt.value}`}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: opt.disabled ? 'not-allowed' : 'pointer',
              opacity: opt.disabled ? 0.5 : 1,
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
              <input
                id={`${groupName}-${opt.value}`}
                type="radio"
                name={groupName}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange?.(opt.value)}
                disabled={opt.disabled}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: `2px solid ${error ? 'var(--aura-danger)' : value === opt.value ? 'var(--aura-accent)' : 'var(--aura-border-strong)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {value === opt.value && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--aura-accent)',
                    }}
                  />
                )}
              </div>
            </div>
            {(opt.label || opt.description) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>{opt.label}</span>
                {opt.description && <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{opt.description}</span>}
              </div>
            )}
          </label>
        ))}
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
