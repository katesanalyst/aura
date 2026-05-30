import React from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

export function Pagination({ page, totalPages, onChange, siblingCount = 1, showFirstLast = true }: PaginationProps) {
  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const generatePages = (): (number | 'ellipsis')[] => {
    const totalSlots = siblingCount * 2 + 3; // siblings + first + last + current
    if (totalPages <= totalSlots + 2) return range(1, totalPages);

    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, totalPages);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftCount = 3 + 2 * siblingCount;
      return [...range(1, leftCount), 'ellipsis', totalPages];
    }
    if (showLeftEllipsis && !showRightEllipsis) {
      const rightCount = 3 + 2 * siblingCount;
      return [1, 'ellipsis', ...range(totalPages - rightCount + 1, totalPages)];
    }
    return [1, 'ellipsis', ...range(leftSibling, rightSibling), 'ellipsis', totalPages];
  };

  const pages = generatePages();

  const btnStyle = (isActive: boolean, disabled?: boolean): React.CSSProperties => ({
    minWidth: '36px',
    height: '36px',
    padding: '0 8px',
    borderRadius: 'var(--aura-radius-md)',
    border: 'none',
    background: isActive ? 'var(--aura-accent)' : 'transparent',
    color: isActive ? 'white' : disabled ? 'var(--aura-fg-muted-soft)' : 'var(--aura-fg-muted)',
    fontSize: '14px',
    fontWeight: isActive ? 600 : 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    opacity: disabled ? 0.4 : 1,
  });

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {showFirstLast && (
        <button disabled={page === 1} onClick={() => onChange(1)} style={btnStyle(false, page === 1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 10L4 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 10L6 7L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
      <button disabled={page === 1} onClick={() => onChange(page - 1)} style={btnStyle(false, page === 1)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 10L5 7L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} style={{ padding: '0 4px', color: 'var(--aura-fg-muted-soft)' }}>...</span>
        ) : (
          <button key={p} onClick={() => onChange(p)} style={btnStyle(p === page)}>
            {p}
          </button>
        ),
      )}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} style={btnStyle(false, page === totalPages)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 4L9 7L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {showFirstLast && (
        <button disabled={page === totalPages} onClick={() => onChange(totalPages)} style={btnStyle(false, page === totalPages)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 4L10 7L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 4L8 7L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
    </nav>
  );
}
