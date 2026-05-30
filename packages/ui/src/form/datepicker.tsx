'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DatePickerProps {
  value?: string; // ISO date string YYYY-MM-DD
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export function DatePicker({ value, onChange, label, placeholder = 'Select date...', error, disabled, min, max }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = value ? new Date(value) : null;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const formatDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    const dateStr = formatDate(d);
    if (min && dateStr < min) return;
    if (max && dateStr > max) return;
    onChange?.(dateStr);
    setOpen(false);
  };

  const isDisabled = (day: number) => {
    const d = formatDate(new Date(year, month, day));
    if (min && d < min) return true;
    if (max && d > max) return true;
    return false;
  };

  const display = selected ? selected.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

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
          color: display ? 'var(--aura-fg)' : 'var(--aura-fg-muted-soft)',
          fontSize: '14px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 0.15s ease',
        }}
      >
        {display || placeholder}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            width: '280px',
            background: 'var(--aura-surface)',
            border: '1px solid var(--aura-border)',
            borderRadius: 'var(--aura-radius-lg)',
            boxShadow: 'var(--aura-shadow-lg)',
            zIndex: 50,
            padding: '16px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <button type="button" onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '18px', padding: '4px' }}>&lt;</button>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{months[month]} {year}</span>
            <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '18px', padding: '4px' }}>&gt;</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
            {days.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--aura-fg-muted-soft)', padding: '4px' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDate(new Date(year, month, day));
              const isSelected = value === dateStr;
              const isToday = formatDate(new Date()) === dateStr;
              const disabled = isDisabled(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(day)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--aura-radius-sm)',
                    border: isToday ? '1px solid var(--aura-accent)' : 'none',
                    background: isSelected ? 'var(--aura-accent)' : 'transparent',
                    color: isSelected ? 'white' : disabled ? 'var(--aura-fg-muted-soft)' : 'var(--aura-fg)',
                    fontSize: '13px',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.3 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                  onMouseEnter={(e) => { if (!disabled && !isSelected) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today button */}
          <button
            type="button"
            onClick={() => { onChange?.(formatDate(new Date())); setOpen(false); }}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '8px',
              borderRadius: 'var(--aura-radius-sm)',
              border: 'none',
              background: 'var(--aura-bg-subtle)',
              color: 'var(--aura-accent)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Today
          </button>
        </div>
      )}

      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
