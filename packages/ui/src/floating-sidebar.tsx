'use client';

import React, { useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface FloatingSidebarProps {
  items: NavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
}

export function FloatingSidebar({ items, activeId, onNavigate, logo, footer, collapsed: collapsedProp }: FloatingSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const collapsed = collapsedProp ?? internalCollapsed;

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCollapsed = () => {
    setInternalCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger button - visible when sidebar collapsed */}
      {collapsed && collapsedProp === undefined && (
        <button
          onClick={toggleCollapsed}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 52,
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid var(--aura-border)',
            background: 'var(--aura-surface)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          ☰
        </button>
      )}

      
      <aside
        style={{
          position: 'fixed',
          left: '12px',
          top: '12px',
          bottom: '12px',
          width: collapsed ? '64px' : '248px',
          background: 'var(--aura-surface)',
          border: '1px solid var(--aura-border)',
          borderRadius: 'var(--aura-radius-xl)',
          boxShadow: 'var(--aura-shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.2s ease',
          zIndex: 40,
        }}
      >
        {/* Close button - top-right corner inside sidebar */}
        {!collapsed && collapsedProp === undefined && (
          <button
            onClick={toggleCollapsed}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid var(--aura-border)',
              background: 'var(--aura-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'var(--aura-fg-muted)',
            }}
          >
            ×
          </button>
        )}

        {/* Logo */}
        {logo && (
          <div
            style={{
              padding: collapsed ? '16px 12px' : '56px 20px 16px',
              borderBottom: '1px solid var(--aura-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
          >
            {logo}
          </div>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          {items.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children?.length) {
                    toggleExpand(item.id);
                  } else if (onNavigate) {
                    onNavigate(item.id);
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: collapsed ? '10px' : '10px 12px',
                  borderRadius: 'var(--aura-radius-md)',
                  border: 'none',
                  background: activeId === item.id ? 'var(--aura-accent-light)' : 'transparent',
                  color: activeId === item.id ? 'var(--aura-accent)' : 'var(--aura-fg-muted)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeId === item.id ? 600 : 400,
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          background: 'var(--aura-accent)',
                          color: 'var(--aura-accent-fg)',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 'var(--aura-radius-full)',
                          minWidth: '18px',
                          textAlign: 'center',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.children?.length && (
                      <span style={{ fontSize: '8px', transform: expanded[item.id] ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', opacity: 0.5 }}>
                        ▶
                      </span>
                    )}
                  </>
                )}
              </button>
              {/* Sub-items */}
              {!collapsed && item.children && expanded[item.id] && (
                <div style={{ marginLeft: '22px', borderLeft: '1px solid var(--aura-border)', paddingLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate?.(child.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '7px 12px',
                        borderRadius: 'var(--aura-radius-sm)',
                        border: 'none',
                        background: activeId === child.id ? 'var(--aura-accent-light)' : 'transparent',
                        color: activeId === child.id ? 'var(--aura-accent)' : 'var(--aura-fg-muted)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: activeId === child.id ? 600 : 400,
                        textAlign: 'left',
                      }}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: collapsed ? '12px 8px' : '12px 16px',
              borderTop: '1px solid var(--aura-border)',
            }}
          >
            {footer}
          </div>
        )}
      </aside>
    </>
  );
}