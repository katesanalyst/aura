'use client';

import React, { useState, useRef, useCallback } from 'react';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

export function FileUpload({ accept, multiple = false, maxSize, maxFiles, value = [], onChange, label, hint, error, disabled }: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles || !onChange) return;
    const files = Array.from(newFiles);
    const valid = files.filter((f) => {
      if (maxSize && f.size > maxSize) return false;
      return true;
    });
    const next = multiple ? [...value, ...valid].slice(0, maxFiles || undefined) : valid.slice(0, 1);
    onChange(next);
  }, [onChange, value, multiple, maxSize, maxFiles]);

  const remove = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aura-fg-muted)' }}>
          {label}
        </span>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => !disabled && inputRef.current?.click()}
        style={{
          border: `2px dashed ${error ? 'var(--aura-danger)' : dragging ? 'var(--aura-accent)' : 'var(--aura-border)'}`,
          borderRadius: 'var(--aura-radius-lg)',
          padding: '32px',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: dragging ? 'var(--aura-accent-light)' : 'transparent',
          transition: 'all 0.15s ease',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto' }}>
            <path d="M20 12V28M12 20H28" stroke="var(--aura-fg-muted-soft)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>
          Drop files here or <span style={{ color: 'var(--aura-accent)', textDecoration: 'underline' }}>browse</span>
        </div>
        {hint && <div style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>{hint}</div>}
      </div>

      {value.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
          {value.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--aura-radius-sm)',
                background: 'var(--aura-bg-subtle)',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--aura-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ color: 'var(--aura-fg-muted-soft)' }}>{formatSize(file.size)}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(i); }}
                  style={{ background: 'none', border: 'none', color: 'var(--aura-fg-muted-soft)', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <span style={{ fontSize: '12px', color: 'var(--aura-danger)' }}>{error}</span>}
    </div>
  );
}
