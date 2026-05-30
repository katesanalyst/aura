'use client';

import React, { useState, useEffect } from 'react';
import { Drawer } from './drawer';
import { UserMenu } from './user-menu';
import { Icon } from './icon';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  disabled?: boolean;
}

export interface MenuBarProps {
  items: MenuItem[];
  activeId?: string;
  user?: { name: string; email?: string; avatar?: string };
  notificationCount?: number;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  onThemeToggle?: () => void;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}

export function MenuBar({
  items,
  activeId,
  user,
  notificationCount = 0,
  onNotificationClick,
  onLogout,
  onThemeToggle,
  theme,
  style,
}: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [openMenu]);

  const renderDesktopNav = () => (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMenu === item.id;
        const isActive = activeId === item.id;
        return (
          <div key={item.id} style={{ position: 'relative' }}>
            <a
              href={item.href || '#'}
              onClick={(e) => {
                if (hasChildren) {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(isOpen ? null : item.id);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--aura-radius-sm)',
                textDecoration: 'none',
                color: isActive ? 'var(--aura-accent)' : item.disabled ? 'var(--aura-fg-muted)' : 'var(--aura-fg)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                background: isActive ? 'var(--aura-accent-light)' : isOpen ? 'var(--aura-bg-subtle)' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {item.icon}
              {item.label}
              {hasChildren && (
                <span style={{ fontSize: '8px', opacity: 0.5, marginLeft: '2px', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                  &#9660;
                </span>
              )}
            </a>
            {hasChildren && isOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', minWidth: '200px', background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius-md)', boxShadow: 'var(--aura-shadow-lg)', zIndex: 100, padding: '4px' }}>
                {item.children!.map((child) => (
                  <a key={child.id} href={child.href || '#'} onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: 'var(--aura-radius-sm)', textDecoration: 'none', color: activeId === child.id ? 'var(--aura-accent)' : 'var(--aura-fg)', fontSize: '14px', background: activeId === child.id ? 'var(--aura-accent-light)' : 'transparent', fontWeight: activeId === child.id ? 600 : 400, transition: 'background 0.15s' }} onMouseEnter={(e) => { if (activeId !== child.id) e.currentTarget.style.background = 'var(--aura-bg-subtle)'; }} onMouseLeave={(e) => { if (activeId !== child.id) e.currentTarget.style.background = 'transparent'; }}>
                    {child.icon}
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  const renderMobileDrawer = () => (
    <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} position="left" title="Menu">
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isActive = activeId === item.id;
          return (
            <div key={item.id}>
              <a href={item.href || '#'} onClick={(e) => { if (!hasChildren) { setMobileOpen(false); } else { e.preventDefault(); } }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--aura-radius-md)', textDecoration: 'none', color: isActive ? 'var(--aura-accent)' : 'var(--aura-fg)', fontSize: '15px', fontWeight: isActive ? 600 : 400, background: isActive ? 'var(--aura-accent-light)' : 'transparent' }}>
                {item.icon && <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>}
                {item.label}
              </a>
              {hasChildren && item.children!.map((child) => (
                <a key={child.id} href={child.href || '#'} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px 10px 48px', textDecoration: 'none', color: activeId === child.id ? 'var(--aura-accent)' : 'var(--aura-fg-muted)', fontSize: '14px', fontWeight: activeId === child.id ? 600 : 400, background: activeId === child.id ? 'var(--aura-accent-light)' : 'transparent', borderRadius: 'var(--aura-radius-sm)' }}>
                  {child.label}
                </a>
              ))}
            </div>
          );
        })}
      </nav>
    </Drawer>
  );

  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '56px', background: 'var(--aura-surface)', borderBottom: '1px solid var(--aura-border)', position: 'sticky', top: 0, zIndex: 45, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', ...style }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isMobile && (
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: 'var(--aura-radius-sm)', border: '1px solid var(--aura-border)', background: 'transparent', cursor: 'pointer', color: 'var(--aura-fg)', fontSize: '18px' }}>
              <Icon name="menu" size={18} />
            </button>
          )}
          {!isMobile && renderDesktopNav()}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onThemeToggle && (
            <button onClick={onThemeToggle} aria-label="Toggle theme" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: 'var(--aura-radius-sm)', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '16px', transition: 'color 0.15s' }}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
          )}

          {onNotificationClick && (
            <button onClick={onNotificationClick} aria-label="Notifications" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: 'var(--aura-radius-sm)', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--aura-fg-muted)', fontSize: '16px' }}>
              <Icon name="bell" size={18} />
              {notificationCount > 0 && (
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--aura-danger)', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, lineHeight: 1 }}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <UserMenu user={user} onLogout={onLogout} />
          )}
        </div>
      </header>

      {isMobile && renderMobileDrawer()}
    </>
  );
}
