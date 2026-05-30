'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  max?: number;
}

export function MultiSelect({ options, value = [], onChange, label, placeholder = 'Select...', error, disabled, max }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((o) => value.includes(o.value));
  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange?.(value.filter((v) => v !== optValue));
    } else if (!max || value.length < max) {
      onChange?.([...value, optValue]);
    }
  };

  const remove = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optValue));
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
      {label && (
        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        style={{
          minHeight: '44px',
          padding: '6px 10px',
          borderRadius: 'var(--aura-radius-md)',
          border: `1px solid ${error ? 'var(--aura-danger)' : open ? 'var(--aura-accent)' : 'var(--aura-border)'}`,
          background: 'var(--aura-surface)',
          fontSize: '14px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 0.15s ease',
        }}
      >
        {selectedOptions.length === 0 && (
          <span style={{ color: 'var(--aura-fg-muted-soft)', padding: '0 4px' }}>{placeholder}</span>
        )}
        {selectedOptions.map((opt) => (
          <span
            key={opt.value}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: 'var(--aura-radius-full)',
              background: 'var(--aura-accent-light)',
              color: 'var(--aura-accent)',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {opt.label}
            <span onClick={(e) => remove(opt.value, e)} style={{ cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}>&times;</span>
          </span>
        ))}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'var(--aura-surface)',
            border: '1px solid var(--aura-border)',
            borderRadius: 'var(--aura-radius-md)',
            boxShadow: 'var(--aura-shadow-lg)',
            zIndex: 50,
            maxHeight: '280px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {options.length > 5 && (
            <div style={{ padding: '8px', borderBottom: '1px solid var(--aura-border)' }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
                style={{
                  width: '100%',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: 'var(--aura-radius-sm)',
                  border: '1px solid var(--aura-border)',
                  background: 'var(--aura-bg-subtle)',
                  color: 'var(--aura-fg)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          )}
          <div style={{ overflow: 'auto', maxHeight: '220px', padding: '4px' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px', textAlign: 'center', fontSize: '13px', color: 'var(--aura-fg-muted-soft)' }}>No options</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = value.includes(opt.value);
                const isDisabled = opt.disabled || (!!max && !isSelected && value.length >= max);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggle(opt.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--aura-radius-sm)',
                      border: 'none',
                      background: isSelected ? 'var(--aura-accent-light)' : 'transparent',
                      color: isSelected ? 'var(--aura-accent)' : isDisabled ? 'var(--aura-fg-muted-soft)' : 'var(--aura-fg)',
                      fontSize: '14px',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: isDisabled ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => { if (!isDisabled && !isSelected) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: `2px solid ${isSelected ? 'var(--aura-accent)' : 'var(--aura-border-strong)'}`,
                        background: isSelected ? 'var(--aura-accent)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {opt.label}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
