import ArrangeIcon from '@hugeicons/core-free-icons/ArrangeIcon';

import type { ToolDefinition } from '~/tools/catalog/definitions';

export const organizeToolDefinition = {
  id: 'organize',
  slug: 'extract-pages',
  path: '/extract-pages',
  title: 'Extract Pages',
  shortDescription: 'Choose pages, then export a new PDF.',
  navGroup: 'Organize',
  icon: ArrangeIcon,
  availability: 'available',
} satisfies ToolDefinition;
