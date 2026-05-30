'use client';

import React from 'react';
import { Avatar } from './avatar';

export interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  status?: 'online' | 'away' | 'offline';
}

export interface ChatListProps {
  contacts: ChatContact[];
  activeId?: string;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
}

export function ChatList({ contacts, activeId, onSelect, style }: ChatListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {contacts.map((contact) => {
        const isActive = contact.id === activeId;
        return (
          <button
            key={contact.id}
            onClick={() => onSelect?.(contact.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              border: 'none', background: isActive ? 'var(--aura-accent-light)' : 'transparent',
              cursor: 'pointer', textAlign: 'left', width: '100%',
              borderBottom: '1px solid var(--aura-border)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Avatar src={contact.avatar} alt={contact.name} size="md" />
              {contact.status === 'online' && (
                <span style={{
                  position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px',
                  borderRadius: '50%', background: 'var(--aura-success)', border: '2px solid var(--aura-surface)',
                }} />
              )}
              {contact.status === 'away' && (
                <span style={{
                  position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px',
                  borderRadius: '50%', background: 'var(--aura-warning)', border: '2px solid var(--aura-surface)',
                }} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '14px', fontWeight: contact.unread ? 600 : 500, color: 'var(--aura-fg)' }}>{contact.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', flexShrink: 0 }}>{contact.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '13px', color: contact.unread ? 'var(--aura-fg)' : 'var(--aura-fg-muted)',
                  fontWeight: contact.unread ? 500 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {contact.lastMessage}
                </span>
                {(contact.unread ?? 0) > 0 && (
                  <span style={{
                    minWidth: '18px', height: '18px', padding: '0 5px', borderRadius: '9px',
                    background: 'var(--aura-accent)', color: '#fff', fontSize: '11px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px',
                  }}>
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
