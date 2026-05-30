import React from 'react';

export interface ButtonGroupOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  multiple?: boolean;
  values?: string[];
  onMultiChange?: (values: string[]) => void;
}

export function ButtonGroup({ options, value, onChange, label, multiple, values = [], onMultiChange }: ButtonGroupProps) {
  const isSelected = (optValue: string) => {
    if (multiple) return values.includes(optValue);
    return value === optValue;
  };

  const handleClick = (optValue: string) => {
    if (multiple && onMultiChange) {
      const next = values.includes(optValue) ? values.filter((v) => v !== optValue) : [...values, optValue];
      onMultiChange(next);
    } else if (onChange) {
      onChange(optValue);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--aura-fg-muted)',
          }}
        >
          {label}
        </span>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => {
          const selected = isSelected(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleClick(opt.value)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--aura-radius-md)',
                border: `1px solid ${selected ? 'var(--aura-accent)' : 'var(--aura-border)'}`,
                background: selected ? 'var(--aura-accent-light)' : 'var(--aura-surface)',
                color: selected ? 'var(--aura-accent)' : 'var(--aura-fg-muted)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selected ? 600 : 400,
                transition: 'all 0.15s ease',
              }}
            >
              {opt.icon}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
