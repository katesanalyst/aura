'use client';

import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
}

export function Accordion({ items, multiple = false, defaultOpen = [] }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{ border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius-lg)', overflow: 'hidden' }}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--aura-border)' : 'none' }}>
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                border: 'none',
                background: isOpen ? 'var(--aura-bg-subtle)' : 'transparent',
                color: item.disabled ? 'var(--aura-fg-muted-soft)' : 'var(--aura-fg)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'background 0.15s ease',
              }}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.title}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', color: 'var(--aura-fg-muted-soft)' }}
              >
                <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div style={{ padding: '0 16px 16px', fontSize: '14px', color: 'var(--aura-fg-muted)', lineHeight: 1.6 }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
