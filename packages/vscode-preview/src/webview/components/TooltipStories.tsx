/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Stack } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import { CursorTooltip } from './CursorTooltip';

export const stories = [
  {
    name: 'Default',
    render: () => (
      <Stack gap={4}>
        <CursorTooltip label="This is a tooltip">
          <Button>Hover for tooltip</Button>
        </CursorTooltip>
        <CursorTooltip label="Another helpful tooltip">
          <Button kind="secondary">Secondary button</Button>
        </CursorTooltip>
      </Stack>
    ),
  },
  {
    name: 'With Icon',
    render: () => (
      <Stack gap={4}>
        <CursorTooltip label="Information tooltip">
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
            }}>
            <Information size={20} />
          </button>
        </CursorTooltip>
      </Stack>
    ),
  },
  {
    name: 'Alignment',
    render: () => (
      <Stack gap={6} style={{ padding: '2rem' }}>
        <CursorTooltip label="Tooltip aligned to top" align="top">
          <Button>Top</Button>
        </CursorTooltip>
        <CursorTooltip label="Tooltip aligned to bottom" align="bottom">
          <Button>Bottom</Button>
        </CursorTooltip>
        <CursorTooltip label="Tooltip aligned to left" align="left">
          <Button>Left</Button>
        </CursorTooltip>
        <CursorTooltip label="Tooltip aligned to right" align="right">
          <Button>Right</Button>
        </CursorTooltip>
      </Stack>
    ),
  },
  {
    name: 'Long Content',
    render: () => (
      <CursorTooltip label="This is a longer tooltip with more detailed information that helps users understand the context better">
        <Button>Hover for detailed info</Button>
      </CursorTooltip>
    ),
  },
  {
    name: 'Multiple Lines',
    render: () => (
      <Stack gap={4}>
        <CursorTooltip label={`Line 1: First piece of information\nLine 2: Second piece of information\nLine 3: Third piece of information`}>
          <Button>Multi-line tooltip</Button>
        </CursorTooltip>
      </Stack>
    ),
  },
];

// Made with Bob
