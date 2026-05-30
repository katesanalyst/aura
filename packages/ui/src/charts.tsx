'use client';

import React from 'react';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
}

export function Sparkline({ data, width = 120, height = 40, color = 'var(--aura-accent)', fill = true }: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * step,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const fillPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {fill && (
        <path d={fillPath} fill={color} opacity={0.1} />
      )}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={3} fill={color} />
    </svg>
  );
}

export interface AreaChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  showLabels?: boolean;
  showGrid?: boolean;
}

export function AreaChart({ data, width = 400, height = 200, color = 'var(--aura-accent)', showLabels = true, showGrid = true }: AreaChartProps) {
  if (data.length < 2) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const step = chartW / (data.length - 1);

  const points = data.map((d, i) => ({
    x: padding.left + i * step,
    y: padding.top + chartH - ((d.value - min) / range) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  const gridLines = 5;
  const gridValues = Array.from({ length: gridLines }, (_, i) => min + (range / (gridLines - 1)) * i);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {showGrid && gridValues.map((v, i) => {
        const y = padding.top + chartH - ((v - min) / range) * chartH;
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--aura-border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
            {showLabels && (
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="var(--aura-fg-muted-soft)" fontSize={11}>
                {v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)}
              </text>
            )}
          </g>
        );
      })}

      <defs>
        <linearGradient id={`gradient-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#gradient-${color.replace(/[^a-z0-9]/gi, '')})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} opacity={0.6} />
      ))}
      {showLabels && data.map((d, i) => {
        if (i % Math.ceil(data.length / 6) !== 0 && i !== data.length - 1) return null;
        return (
          <text key={i} x={points[i].x} y={height - 8} textAnchor="middle" fill="var(--aura-fg-muted-soft)" fontSize={11}>
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
  showLabels?: boolean;
}

export function BarChart({ data, width = 400, height = 200, showLabels = true }: BarChartProps) {
  if (data.length === 0) return null;

  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barWidth = (chartW / data.length) * 0.6;
  const gap = (chartW / data.length) * 0.4;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = padding.left + i * (barWidth + gap) + gap / 2;
        const y = padding.top + chartH - barH;
        const barColor = d.color || 'var(--aura-accent)';

        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barH} fill={barColor} rx={4} opacity={0.85} />
            {showLabels && (
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" fill="var(--aura-fg-muted-soft)" fontSize={11}>
                {d.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Stock Market Technical Charts
export interface StockDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

function calculateSMA(data: StockDataPoint[], period: number): (number | null)[] {
  const sma: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, d) => acc + d.close, 0);
      sma.push(sum / period);
    }
  }
  return sma;
}

export interface StockChartProps {
  data: StockDataPoint[];
  width?: number;
  height?: number;
  showVolume?: boolean;
  smaPeriods?: number[];
}

export function StockChart({ 
  data, 
  width = 800, 
  height = 400,
  showVolume = true,
  smaPeriods = [50, 100, 200]
}: StockChartProps) {
  if (data.length === 0) return null;

  const prices = data.flatMap(d => [d.high, d.low, d.open, d.close]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const padding = { top: 20, right: 80, bottom: 60, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - (showVolume ? 150 : padding.bottom);

  const smaLines = smaPeriods.map(period => ({
    period,
    values: calculateSMA(data, period)
  }));

  const step = chartW / (data.length - 1);
  const getX = (i: number) => padding.left + i * step;
  const getY = (v: number) => padding.top + chartH - ((v - minPrice) / priceRange) * chartH;

  const smaColors = ['#60a5fa', '#a78bfa', '#fbbf24'];

  return (
    <div style={{ width, height }}>
      <svg width={width} height={height - (showVolume ? 150 : 0)} style={{ overflow: 'visible' }}>
        {/* Grid */}
        {Array.from({ length: 5 }, (_, i) => {
          const v = minPrice + (priceRange / 4) * i;
          const y = getY(v);
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--aura-border)" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill="var(--aura-fg-muted)">
                {v >= 10000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* SMA lines */}
        {smaLines.map((sma, idx) => {
          const validPoints = sma.values
            .map((v, i) => v !== null ? `${getX(i)},${getY(v)}` : null)
            .filter((p): p is string => p !== null);
          if (validPoints.length === 0) return null;
          
          return (
            <polyline
              key={sma.period}
              points={validPoints.join(' ')}
              fill="none"
              stroke={smaColors[idx] || '#fbbf24'}
              strokeWidth={1.5}
              opacity={0.8}
            />
          );
        })}

        {/* Candlesticks */}
        {data.map((d, i) => {
          const x = getX(i);
          const openY = getY(d.open);
          const closeY = getY(d.close);
          const highY = getY(d.high);
          const lowY = getY(d.low);
          const isGreen = d.close >= d.open;

          return (
            <g key={i}>
              <line x1={x} y1={highY} x2={x} y2={lowY} stroke={isGreen ? '#10b981' : '#ef4444'} strokeWidth={1} />
              <rect
                x={x - 4} y={Math.min(openY, closeY)} width={8} height={Math.abs(openY - closeY) || 1}
                fill={isGreen ? '#10b981' : '#ef4444'}
              />
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${width - padding.right + 10}, 20)`}>
          {smaLines.map((sma, idx) => (
            <g key={sma.period}>
              <rect x={0} y={idx * 16} width={6} height={6} fill={smaColors[idx] || '#fbbf24'} />
              <text x={10} y={idx * 16 + 5} fontSize={10} fill="var(--aura-fg)">SMA {sma.period}</text>
            </g>
          ))}
        </g>
      </svg>

      {/* Volume */}
      {showVolume && (
        <svg width={width} height={120} style={{ marginTop: '10px' }}>
          <text x={padding.left} y={15} fontSize={11} fill="var(--aura-fg-muted)" fontWeight={600}>Volume</text>
          {data.map((d, i) => {
            if (!d.volume) return null;
            const maxVol = Math.max(...data.map(x => x.volume || 0));
            const barH = (d.volume / maxVol) * 80;
            return (
              <rect key={i} x={getX(i) - 2} y={100 - barH} width={5} height={barH} fill="var(--aura-accent)" opacity={0.3} />
            );
          })}
        </svg>
      )}
    </div>
  );
}