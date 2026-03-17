import ArrangeIcon from '@hugeicons/core-free-icons/ArrangeIcon';

import type { ToolDefinition } from '~/tools/catalog/definitions';

export const organizeToolDefinition = {
  id: 'organize',
  slug: 'organize',
  path: '/organize',
  title: 'Organize PDF',
  shortDescription: 'Reorder, rotate, and remove pages, then export a new PDF.',
  navGroup: 'Organize',
  icon: ArrangeIcon,
  availability: 'available',
} satisfies ToolDefinition;
