'use client';
import React from 'react';
import { Icon } from './icon';
import { Badge } from './badge';

export interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export function NotificationBell({ count = 0, onClick }: NotificationBellProps) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <Icon name="bell" size={20} color="var(--aura-fg-muted)" />
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          background: 'var(--aura-danger)',
          color: 'var(--aura-danger-fg)',
          fontSize: '10px',
          fontWeight: 600,
          minWidth: '18px',
          height: '18px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px',
        }}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}
