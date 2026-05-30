import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  style?: React.CSSProperties;
}

export function Stack({ children, direction = 'vertical', gap = '8px', align, justify, wrap, style }: StackProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface GridProps {
  children: React.ReactNode;
  columns?: string;
  rows?: string;
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Grid({ children, columns = '1fr', rows, gap = '16px', className, style }: GridProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap,
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  centered?: boolean;
  style?: React.CSSProperties;
}

export function Container({ children, maxWidth = '1200px', padding = '0 24px', centered = true, style }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth,
        margin: centered ? '0 auto' : undefined,
        padding,
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface SpacerProps {
  size?: string;
  horizontal?: boolean;
}

export function Spacer({ size = '16px', horizontal }: SpacerProps) {
  return <div style={horizontal ? { width: size } : { height: size }} />;
}