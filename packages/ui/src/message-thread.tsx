'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from './avatar';

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  content: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  onSend?: (message: string) => void;
  style?: React.CSSProperties;
}

export function MessageThread({ messages, currentUserId, onSend, style }: MessageThreadProps) {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !onSend) return;
    onSend(text);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div key={msg.id} style={{ display: 'flex', gap: '8px', flexDirection: isMine ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
              {!isMine && (
                <Avatar src={msg.senderAvatar} alt={msg.senderName || ''} size="sm" />
              )}
              <div style={{ maxWidth: '75%' }}>
                {!isMine && msg.senderName && (
                  <div style={{ fontSize: '11px', color: 'var(--aura-fg-muted-soft)', marginBottom: '2px', paddingLeft: '4px' }}>
                    {msg.senderName}
                  </div>
                )}
                <div style={{
                  padding: '10px 14px', fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word',
                  borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isMine ? 'var(--aura-accent)' : 'var(--aura-bg-subtle)',
                  color: isMine ? '#fff' : 'var(--aura-fg)',
                }}>
                  {msg.content}
                </div>
                <div style={{
                  fontSize: '10px', color: 'var(--aura-fg-muted-soft)', marginTop: '2px',
                  textAlign: isMine ? 'right' : 'left', padding: '0 4px',
                }}>
                  {msg.time}
                  {isMine && msg.status === 'read' && ' \u2713\u2713'}
                  {isMine && msg.status === 'delivered' && ' \u2713\u2713'}
                  {isMine && msg.status === 'sent' && ' \u2713'}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {onSend && (
        <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderTop: '1px solid var(--aura-border)', background: 'var(--aura-surface)' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Type a message..."
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 'var(--aura-radius-full)',
              border: '1px solid var(--aura-border)', background: 'var(--aura-bg-subtle)',
              color: 'var(--aura-fg)', fontSize: '14px', outline: 'none',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              width: '40px', height: '40px', borderRadius: '50%', border: 'none',
              background: input.trim() ? 'var(--aura-accent)' : 'var(--aura-bg-subtle)',
              color: input.trim() ? '#fff' : 'var(--aura-fg-muted)',
              cursor: input.trim() ? 'pointer' : 'default', fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            &#9654;
          </button>
        </div>
      )}
    </div>
  );
}
