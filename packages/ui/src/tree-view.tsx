'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (id: string) => void;
  multiSelect?: boolean;
  showCheckboxes?: boolean;
  defaultExpanded?: boolean | string[];
  searchable?: boolean;
  searchPlaceholder?: string;
  style?: React.CSSProperties;
}

export function TreeView({
  data,
  onSelect,
  multiSelect = false,
  showCheckboxes = false,
  defaultExpanded = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  style,
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Initialize expanded state
  useEffect(() => {
    if (defaultExpanded === true) {
      const allIds: Record<string, boolean> = {};
      const collectIds = (nodes: TreeNode[]) => {
        nodes.forEach(node => {
          if (node.children?.length) allIds[node.id] = true;
          collectIds(node.children || []);
        });
      };
      collectIds(data);
      setExpanded(allIds);
    } else if (Array.isArray(defaultExpanded)) {
      const exp: Record<string, boolean> = {};
      defaultExpanded.forEach(id => (exp[id] = true));
      setExpanded(exp);
    }
  }, [data, defaultExpanded]);

  // Filter nodes based on search
  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    if (!searchQuery) return nodes;
    return nodes
      .map(node => ({
        ...node,
        children: node.children ? filterNodes(node.children) : undefined,
      }))
      .filter(node => 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (node.children && node.children.length > 0)
      );
  };

  const toggleNode = (id: string, hasChildren: boolean) => {
    if (hasChildren) {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    }
    if (!showCheckboxes) {
      setSelected(id);
      onSelect?.(id);
    }
  };

  const toggleCheck = (id: string) => {
    if (!showCheckboxes) return;
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // Propagate to children
      const findAllDescendants = (nodes: TreeNode[]): string[] => {
        const result: string[] = [];
        nodes.forEach((node) => {
          // Check if this node is the one being toggled
          if (node.id === id && node.children) {
            node.children.forEach((c) => {
              result.push(c.id);
              if (c.children) result.push(...findAllDescendants(c.children));
            });
          }
          // Recursively search children
          if (node.children) {
            result.push(...findAllDescendants(node.children));
          }
        });
        return result;
      };
      const descendantIds = findAllDescendants(data);
      descendantIds.forEach((cid) => (next[cid] = next[id]));
      return next;
    });
  };

  const isChecked = (id: string) => checked[id] ?? false;
  const isIndeterminate = (node: TreeNode) => {
    if (!node.children?.length || !showCheckboxes) return false;
    const childChecked = node.children.filter((c) => isChecked(c.id)).length;
    return childChecked > 0 && childChecked < node.children.length;
  };

  const renderNode = (node: TreeNode, level: number = 0, parentId: string | null = null) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id];
    const isSelected = selected === node.id;
    const isFocused = focusedId === node.id;

    return (
      <div key={node.id}>
        <div
          role="treeitem"
          aria-selected={showCheckboxes ? undefined : isSelected}
          aria-expanded={hasChildren ? isExpanded : undefined}
          tabIndex={isFocused ? 0 : -1}
          onClick={() => !node.disabled && toggleNode(node.id, !!hasChildren)}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              !node.disabled && toggleNode(node.id, !!hasChildren);
            }
            if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
              setExpanded((prev) => ({ ...prev, [node.id]: true }));
            }
            if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
              setExpanded((prev) => ({ ...prev, [node.id]: false }));
            }
          }}
          onMouseEnter={() => setFocusedId(node.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 8px',
            paddingLeft: `${level * 20 + 8}px`,
            cursor: node.disabled ? 'not-allowed' : 'pointer',
            borderRadius: 'var(--aura-radius-sm)',
            background: isSelected ? 'var(--aura-accent-light)' : isFocused ? 'var(--aura-bg-hover)' : 'transparent',
            color: isSelected ? 'var(--aura-accent)' : node.disabled ? 'var(--aura-fg-muted)' : 'var(--aura-fg)',
            fontSize: '14px',
            opacity: node.disabled ? 0.5 : 1,
          }}
        >
          {showCheckboxes && (
            <span style={{ display: 'flex', alignItems: 'center', width: '16px' }}>
              <input
                type="checkbox"
                checked={isChecked(node.id)}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate(node);
                }}
                onChange={() => toggleCheck(node.id)}
              />
            </span>
          )}
          {!showCheckboxes && hasChildren && (
            <span
              style={{
                display: 'inline-block',
                transform: isExpanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.15s',
                opacity: 0.5,
                width: '16px',
              }}
            >
              ▶
            </span>
          )}
          {!showCheckboxes && !hasChildren && <span style={{ width: '16px' }} />}
          {node.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{node.icon}</span>}
          <span style={{ flex: 1 }}>{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div style={{ marginLeft: `${(level + 1) * 20}px` }}>
            {node.children!.map((child) => renderNode(child, level + 1, node.id))}
          </div>
        )}
      </div>
    );
  };

  const filteredData = searchable ? filterNodes(data) : data;

  return (
    <div style={{ ...style, minWidth: '200px' }} role="tree">
      {searchable && (
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 10px',
            marginBottom: '8px',
            borderRadius: 'var(--aura-radius-sm)',
            border: '1px solid var(--aura-border)',
            background: 'var(--aura-surface)',
            color: 'var(--aura-fg)',
            fontSize: '13px',
          }}
        />
      )}
      {filteredData.map((node) => renderNode(node))}
    </div>
  );
}