import React from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const dotColor = item.color || 'var(--aura-accent)';

        return (
          <div key={item.id} style={{ display: 'flex', gap: '16px', paddingBottom: isLast ? 0 : '24px' }}>
            {/* Dot + Line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: dotColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                {item.icon || <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
              </div>
              {!isLast && (
                <div style={{ width: '2px', flex: 1, background: 'var(--aura-border)', marginTop: '8px' }} />
              )}
            </div>
            {/* Content */}
            <div style={{ flex: 1, paddingBottom: '4px' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--aura-fg)' }}>{item.title}</div>
              {item.description && (
                <div style={{ fontSize: '13px', color: 'var(--aura-fg-muted)', marginTop: '4px', lineHeight: 1.5 }}>{item.description}</div>
              )}
              {item.time && (
                <div style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)', marginTop: '4px' }}>{item.time}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
