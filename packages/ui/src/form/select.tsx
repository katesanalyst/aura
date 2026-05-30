'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export function Select({ options, value, onChange, label, placeholder = 'Select...', error, disabled, clearable }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
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

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

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
          height: '44px',
          padding: '0 14px',
          borderRadius: 'var(--aura-radius-md)',
          border: `1px solid ${error ? 'var(--aura-danger)' : open ? 'var(--aura-accent)' : 'var(--aura-border)'}`,
          background: 'var(--aura-surface)',
          color: selected ? 'var(--aura-fg)' : 'var(--aura-fg-muted-soft)',
          fontSize: '14px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 0.15s ease',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected?.icon}
          {selected?.label || placeholder}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {clearable && value && (
            <span
              onClick={(e) => { e.stopPropagation(); onChange?.(''); }}
              style={{ fontSize: '16px', color: 'var(--aura-fg-muted-soft)', cursor: 'pointer', padding: '2px' }}
            >
              &times;
            </span>
          )}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
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
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
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
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => { onChange?.(opt.value); setOpen(false); setSearch(''); }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--aura-radius-sm)',
                    border: 'none',
                    background: opt.value === value ? 'var(--aura-accent-light)' : 'transparent',
                    color: opt.value === value ? 'var(--aura-accent)' : opt.disabled ? 'var(--aura-fg-muted-soft)' : 'var(--aura-fg)',
                    fontSize: '14px',
                    fontWeight: opt.value === value ? 600 : 400,
                    cursor: opt.disabled ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: opt.disabled ? 0.5 : 1,
                    transition: 'background 0.1s ease',
                  }}
                  onMouseEnter={(e) => { if (!opt.disabled && opt.value !== value) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }}
                  onMouseLeave={(e) => { if (opt.value !== value) e.currentTarget.style.background = 'transparent'; }}
                >
                  {opt.icon}
                  {opt.label}
                  {opt.value === value && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 'auto' }}>
                      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
