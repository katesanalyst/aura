'use client';
import React from 'react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const icons: Record<string, React.ReactNode> = {
  bell: <>&#128276;</>,
  user: <>&#128100;</>,
  settings: <>&#9881;</>,
  logout: <>&#8599;</>,
  moon: <>&#9790;</>,
  sun: <>&#9728;</>,
  menu: <>&#9776;</>,
  x: <>&#215;</>,
  chevronDown: <>&#8595;</>,
  chevronUp: <>&#8593;</>,
};

export function Icon({ name, size = 16, color, onClick }: IconProps) {
  return (
    <span
      onClick={onClick}
      style={{ fontSize: size, color, cursor: onClick ? 'pointer' : 'default', display: 'inline-flex' }}
    >
      {icons[name] ?? name}
    </span>
  );
}
