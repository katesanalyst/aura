'use client';

import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
}

export function Tabs({ tabs, activeId, onChange, variant = 'underline' }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const active = activeId ?? internalActive;
  const activeTab = tabs.find((t) => t.id === active);

  const handleChange = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  const tabStyles: Record<string, { list: React.CSSProperties; item: (isActive: boolean) => React.CSSProperties }> = {
    underline: {
      list: { display: 'flex', gap: '0', borderBottom: '1px solid var(--aura-border)' },
      item: (active) => ({
        padding: '10px 16px',
        border: 'none',
        borderBottom: active ? '2px solid var(--aura-accent)' : '2px solid transparent',
        background: 'transparent',
        color: active ? 'var(--aura-accent)' : 'var(--aura-fg-muted)',
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.15s ease',
      }),
    },
    pills: {
      list: { display: 'flex', gap: '4px', padding: '4px', background: 'var(--aura-bg-subtle)', borderRadius: 'var(--aura-radius-md)' },
      item: (active) => ({
        padding: '8px 16px',
        borderRadius: 'var(--aura-radius-sm)',
        border: 'none',
        background: active ? 'var(--aura-surface)' : 'transparent',
        color: active ? 'var(--aura-fg)' : 'var(--aura-fg-muted)',
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        fontSize: '14px',
        boxShadow: active ? 'var(--aura-shadow-sm)' : 'none',
        transition: 'all 0.15s ease',
      }),
    },
    enclosed: {
      list: { display: 'flex', gap: '0' },
      item: (active) => ({
        padding: '10px 16px',
        borderRadius: 'var(--aura-radius-md) var(--aura-radius-md) 0 0',
        border: active ? '1px solid var(--aura-border)' : '1px solid transparent',
        borderBottom: active ? '1px solid var(--aura-surface)' : '1px solid var(--aura-border)',
        background: active ? 'var(--aura-surface)' : 'transparent',
        color: active ? 'var(--aura-fg)' : 'var(--aura-fg-muted)',
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '-1px',
        transition: 'all 0.15s ease',
      }),
    },
  };

  const styles = tabStyles[variant];

  return (
    <div>
      <div role="tablist" style={styles.list}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            disabled={tab.disabled}
            onClick={() => handleChange(tab.id)}
            style={{
              ...styles.item(tab.id === active),
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: tab.disabled ? 0.5 : 1,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.badge && (
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: 'var(--aura-radius-full)',
                background: tab.id === active ? 'var(--aura-accent)' : 'var(--aura-border)',
                color: tab.id === active ? 'white' : 'var(--aura-fg-muted)',
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {activeTab && (
        <div role="tabpanel" style={{ padding: '16px 0' }}>
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
