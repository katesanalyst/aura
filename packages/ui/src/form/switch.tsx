import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { track: '32px', trackH: '18px', thumb: '14px', translate: '14px' },
  md: { track: '40px', trackH: '22px', thumb: '18px', translate: '18px' },
  lg: { track: '48px', trackH: '26px', thumb: '22px', translate: '22px' },
};

export function Switch({ checked = false, onChange, label, description, disabled, size = 'md' }: SwitchProps) {
  const s = sizes[size];

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width: s.track,
          height: s.trackH,
          borderRadius: s.trackH,
          border: 'none',
          background: checked ? 'var(--aura-accent)' : 'var(--aura-border-strong)',
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease',
          flexShrink: 0,
          marginTop: label ? '2px' : 0,
          padding: 0,
        }}
      >
        <div
          style={{
            width: s.thumb,
            height: s.thumb,
            borderRadius: '50%',
            background: 'white',
            position: 'absolute',
            top: '50%',
            left: '2px',
            transform: `translateY(-50%) translateX(${checked ? s.translate : '0'})`,
            transition: 'transform 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </button>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {label && <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>{label}</span>}
          {description && <span style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{description}</span>}
        </div>
      )}
    </label>
  );
}
