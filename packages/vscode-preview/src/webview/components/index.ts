/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { stories as accordionStories } from './AccordionStories';
import { stories as buttonStories } from './ButtonStories';
import { stories as textInputStories } from './TextInputStories';
import { stories as checkboxStories } from './CheckboxStories';
import { stories as codeSnippetStories } from './CodeSnippetStories';
import { stories as dropdownStories } from './DropdownStories';
import { stories as linkStories } from './LinkStories';
import { stories as radioButtonStories } from './RadioButtonStories';
import { stories as toggleStories } from './ToggleStories';
import { stories as tooltipStories } from './TooltipStories';
import type { ReactNode } from 'react';

export interface Story {
  name: string;
  render: () => ReactNode;
}

export interface ComponentGroup {
  title: string;
  stories: Story[];
}

/**
 * Registry of all component groups shown in the VS Code preview panel.
 * Add new components here to make them available in the sidebar.
 */
export const componentRegistry: ComponentGroup[] = [
  {
    title: 'Accordion',
    stories: accordionStories,
  },
  {
    title: 'Button',
    stories: buttonStories,
  },
  {
    title: 'Checkbox',
    stories: checkboxStories,
  },
  {
    title: 'CodeSnippet',
    stories: codeSnippetStories,
  },
  {
    title: 'Dropdown',
    stories: dropdownStories,
  },
  {
    title: 'Link',
    stories: linkStories,
  },
  {
    title: 'TextInput',
    stories: textInputStories,
  },
  { title: 'RadioButton', stories: radioButtonStories },
  {
    title: 'Toggle',
    stories: toggleStories,
  },
  {
    title: 'Tooltip',
    stories: tooltipStories,
  },
];

// Made with Bob
