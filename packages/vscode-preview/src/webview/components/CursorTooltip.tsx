/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

type TooltipAlign = 'top' | 'bottom' | 'left' | 'right';

interface CursorTooltipProps {
  label: string;
  align?: TooltipAlign;
  children: React.ReactElement;
}

const CARET = '6px solid var(--cds-layer-03, #393939)';
const TRANSPARENT = '6px solid transparent';
const GAP = 4; // px gap between trigger edge and caret tip

function buildCaretStyle(align: TooltipAlign): React.CSSProperties {
  switch (align) {
    case 'top':
      // triangle points downward toward the trigger
      return { width: 0, height: 0, borderLeft: TRANSPARENT, borderRight: TRANSPARENT, borderTop: CARET, alignSelf: 'center', flexShrink: 0 };
    case 'left':
      // triangle points rightward toward the trigger
      return { width: 0, height: 0, borderTop: TRANSPARENT, borderBottom: TRANSPARENT, borderLeft: CARET, alignSelf: 'center', flexShrink: 0 };
    case 'right':
      // triangle points leftward toward the trigger
      return { width: 0, height: 0, borderTop: TRANSPARENT, borderBottom: TRANSPARENT, borderRight: CARET, alignSelf: 'center', flexShrink: 0 };
    case 'bottom':
    default:
      // triangle points upward toward the trigger
      return { width: 0, height: 0, borderLeft: TRANSPARENT, borderRight: TRANSPARENT, borderBottom: CARET, alignSelf: 'center', flexShrink: 0 };
  }
}

/**
 * A compact tooltip that appears near the trigger element on hover.
 * Positioning is computed once on mouseenter and does not follow the cursor.
 * Supports top, bottom, left, and right alignment via the `align` prop.
 */
export function CursorTooltip({ label, align = 'bottom', children }: CursorTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // Snapshot of trigger rect taken at mouseenter, stable for the layout effect
  const triggerRectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (!triggerRef.current) return;
    triggerRectRef.current = triggerRef.current.getBoundingClientRect();
    setPosition(null); // hidden first pass
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    setPosition(null);
  };

  // After the tooltip renders (hidden), measure it and set the final position.
  // useLayoutEffect runs synchronously after DOM mutation — tooltipRef.current
  // is guaranteed to be populated here, unlike requestAnimationFrame.
  useLayoutEffect(() => {
    if (!isVisible || !tooltipRef.current || !triggerRectRef.current) return;
    const rect = triggerRectRef.current;
    const el = tooltipRef.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;

    let x: number;
    let y: number;

    switch (align) {
      case 'top':
        x = rect.left + rect.width / 2 - tw / 2;
        y = rect.top - th - GAP;
        break;
      case 'left':
        x = rect.left - tw - GAP;
        y = rect.top + rect.height / 2 - th / 2;
        break;
      case 'right':
        x = rect.right + GAP;
        y = rect.top + rect.height / 2 - th / 2;
        break;
      case 'bottom':
      default:
        x = rect.left + rect.width / 2 - tw / 2;
        y = rect.bottom + GAP;
        break;
    }

    setPosition({ x, y });
  }, [isVisible, align]);

  const caretStyle = buildCaretStyle(align);

  const isVertical = align === 'top' || align === 'bottom';

  const caretFirst = align === 'bottom' || align === 'right';

  const contentBox = (
    <div
      style={{
        backgroundColor: 'var(--cds-layer-03, #393939)',
        color: 'var(--cds-text-primary, #f4f4f4)',
        padding: '0.5rem 0.75rem',
        borderRadius: '2px',
        fontSize: '0.75rem',
        lineHeight: '1.33333',
        maxWidth: '18rem',
        whiteSpace: 'pre-wrap',
      }}>
      {label.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );

  const caret = <div style={caretStyle} />;

  const tooltip = isVisible
    ? ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            visibility: position ? 'visible' : 'hidden',
            left: position ? `${position.x}px` : '0px',
            top: position ? `${position.y}px` : '0px',
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: 'center',
          }}>
          {caretFirst ? caret : contentBox}
          {caretFirst ? contentBox : caret}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block', width: 'fit-content' }}>
        {children}
      </div>
      {tooltip}
    </>
  );
}

// Made with Bob
