import React from 'react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  activeIndex: number;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({ steps, activeIndex, orientation = 'horizontal' }: StepperProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: isVertical ? 'flex-start' : 'center',
        gap: isVertical ? '0' : '8px',
      }}
    >
      {steps.map((step, i) => {
        const isCompleted = i < activeIndex;
        const isActive = i === activeIndex;
        const isLast = i === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div style={{ display: 'flex', alignItems: isVertical ? 'flex-start' : 'center', gap: '12px' }}>
              {/* Step indicator */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: `2px solid ${isCompleted ? 'var(--aura-success)' : isActive ? 'var(--aura-accent)' : 'var(--aura-border)'}`,
                  background: isCompleted ? 'var(--aura-success)' : isActive ? 'var(--aura-accent)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span style={{ fontSize: '13px', fontWeight: 600, color: isActive ? 'white' : 'var(--aura-fg-muted)' }}>{i + 1}</span>
                )}
              </div>
              {/* Label */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: isActive ? 600 : 400, color: isCompleted ? 'var(--aura-success)' : isActive ? 'var(--aura-accent)' : 'var(--aura-fg-muted)' }}>
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: '12px', color: 'var(--aura-fg-muted-soft)', marginTop: '2px' }}>{step.description}</div>
                )}
              </div>
            </div>
            {/* Connector */}
            {!isLast && (
              <div
                style={{
                  ...(isVertical
                    ? { width: '2px', height: '24px', marginLeft: '15px' }
                    : { flex: 1, height: '2px' }),
                  background: isCompleted ? 'var(--aura-success)' : 'var(--aura-border)',
                  transition: 'background 0.2s ease',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
