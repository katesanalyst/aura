'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './icon';

export interface UserMenuProps {
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  onLogout?: () => void;
  onSettings?: () => void;
}

export function UserMenu({ user, onLogout, onSettings }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          borderRadius: 'var(--aura-radius-full)',
          border: '1px solid var(--aura-border)',
          background: 'var(--aura-surface)',
          cursor: 'pointer',
        }}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} style={{ width: 28, height: 28, borderRadius: '50%' }} />
        ) : (
          <Icon name="user" size={16} color="var(--aura-fg-muted)" />
        )}
        <span style={{ fontSize: '14px', color: 'var(--aura-fg)' }}>{user?.name ?? 'User'}</span>
        <Icon name="chevronDown" size={12} color="var(--aura-fg-muted)" />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '120%',
          right: 0,
          background: 'var(--aura-surface)',
          border: '1px solid var(--aura-border)',
          borderRadius: 'var(--aura-radius-md)',
          boxShadow: 'var(--aura-shadow-lg)',
          minWidth: '200px',
          zIndex: 100,
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--aura-border)' }}>
            <div style={{ fontWeight: 600, color: 'var(--aura-fg)' }}>{user?.name ?? 'User'}</div>
            {user?.email && <div style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)' }}>{user.email}</div>}
          </div>
          <button onClick={onSettings} style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="settings" size={16} /> Settings
            </div>
          </button>
          <button onClick={() => { onLogout?.(); setOpen(false); }} style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--aura-danger)' }}>
              <Icon name="logout" size={16} /> Logout
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
