import React from 'react';

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ListProps {
  items: ListItem[];
  divided?: boolean;
  hoverable?: boolean;
}

export function List({ items, divided = true, hoverable = true }: ListProps) {
  return (
    <div
      role="list"
      style={{
        background: 'var(--aura-surface)',
        borderRadius: 'var(--aura-radius-lg)',
        border: '1px solid var(--aura-border)',
        overflow: 'hidden',
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          role="listitem"
          onClick={!item.disabled ? item.onClick : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderBottom: divided && i < items.length - 1 ? '1px solid var(--aura-border)' : 'none',
            cursor: item.onClick && !item.disabled ? 'pointer' : 'default',
            opacity: item.disabled ? 0.5 : 1,
            transition: 'background 0.1s ease',
          }}
          onMouseEnter={(e) => { if (hoverable && !item.disabled) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {item.avatar || (item.icon && <div style={{ color: 'var(--aura-fg-muted)', flexShrink: 0 }}>{item.icon}</div>)}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>{item.title}</div>
            {item.description && (
              <div style={{ fontSize: '13px', color: 'var(--aura-fg-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.description}
              </div>
            )}
          </div>
          {item.action && <div style={{ flexShrink: 0 }}>{item.action}</div>}
        </div>
      ))}
    </div>
  );
}
