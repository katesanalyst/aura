import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizes = { xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '64px' };
const fontSizes = { xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '20px' };
const statusColors = { online: 'var(--aura-success)', offline: 'var(--aura-fg-muted-soft)', away: 'var(--aura-warning)', busy: 'var(--aura-danger)' };
const statusSizes = { xs: '6px', sm: '8px', md: '10px', lg: '12px', xl: '14px' };

export function Avatar({ src, alt, name, size = 'md', shape = 'circle', status }: AvatarProps) {
  const s = sizes[size];
  const fs = fontSizes[size];
  const initials = name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
  const bgColor = name ? colors[name.charCodeAt(0) % colors.length] : 'var(--aura-border)';

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={{
            width: s,
            height: s,
            borderRadius: shape === 'circle' ? '50%' : 'var(--aura-radius-md)',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          style={{
            width: s,
            height: s,
            borderRadius: shape === 'circle' ? '50%' : 'var(--aura-radius-md)',
            background: bgColor,
            color: 'white',
            fontSize: fs,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {initials}
        </div>
      )}
      {status && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: statusSizes[size],
            height: statusSizes[size],
            borderRadius: '50%',
            background: statusColors[status],
            border: '2px solid var(--aura-surface)',
          }}
        />
      )}
    </div>
  );
}

export interface AvatarGroupProps {
  avatars: (AvatarProps & { id: string })[];
  max?: number;
  size?: AvatarProps['size'];
}

export function AvatarGroup({ avatars, max = 4, size = 'md' }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const overlap = { xs: '-6px', sm: '-8px', md: '-10px', lg: '-12px', xl: '-14px' };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {visible.map((a, i) => (
        <div key={a.id} style={{ marginLeft: i > 0 ? overlap[size] : 0, position: 'relative', zIndex: visible.length - i }}>
          <Avatar {...a} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            marginLeft: overlap[size],
            width: sizes[size],
            height: sizes[size],
            borderRadius: '50%',
            background: 'var(--aura-bg-subtle)',
            border: '2px solid var(--aura-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: fontSizes[size],
            fontWeight: 600,
            color: 'var(--aura-fg-muted)',
            position: 'relative',
            zIndex: 0,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
