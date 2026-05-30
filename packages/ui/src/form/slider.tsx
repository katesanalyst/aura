'use client';

import React, { useState, useRef, useCallback } from 'react';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  marks?: { value: number; label?: string }[];
}

export function Slider({ min = 0, max = 100, step = 1, value, onChange, label, showValue = true, formatValue, disabled, marks }: SliderProps) {
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentValue = value ?? min;
  const percent = ((currentValue - min) / (max - min)) * 100;

  const calcValue = useCallback((clientX: number) => {
    if (!trackRef.current) return currentValue;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    return Math.round(raw / step) * step;
  }, [min, max, step, currentValue]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setDragging(true);
    onChange?.(calcValue(e.clientX));
    const handleMouseMove = (e: MouseEvent) => onChange?.(calcValue(e.clientX));
    const handleMouseUp = () => { setDragging(false); document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const display = formatValue ? formatValue(currentValue) : currentValue.toLocaleString();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>{label}</span>}
          {showValue && <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--aura-accent)' }}>{display}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'relative',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Track background */}
        <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--aura-border)', position: 'relative' }}>
          {/* Filled track */}
          <div style={{ width: `${percent}%`, height: '100%', borderRadius: '2px', background: 'var(--aura-accent)', position: 'absolute', top: 0, left: 0 }} />
        </div>
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `${percent}%`,
            transform: 'translateX(-50%)',
            width: dragging ? '20px' : '16px',
            height: dragging ? '20px' : '16px',
            borderRadius: '50%',
            background: 'white',
            border: '2px solid var(--aura-accent)',
            boxShadow: dragging ? 'var(--aura-shadow-md)' : 'var(--aura-shadow-sm)',
            transition: dragging ? 'none' : 'all 0.15s ease',
          }}
        />
        {/* Marks */}
        {marks && marks.map((mark) => {
          const markPercent = ((mark.value - min) / (max - min)) * 100;
          return (
            <div key={mark.value} style={{ position: 'absolute', left: `${markPercent}%`, top: '16px', transform: 'translateX(-50%)', textAlign: 'center' }}>
              <div style={{ width: '2px', height: '6px', background: 'var(--aura-border)', margin: '0 auto' }} />
              {mark.label && <span style={{ fontSize: '10px', color: 'var(--aura-fg-muted-soft)', marginTop: '2px', display: 'block' }}>{mark.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
