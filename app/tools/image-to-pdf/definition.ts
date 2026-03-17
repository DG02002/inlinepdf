import ImageUploadIcon from '@hugeicons/core-free-icons/ImageUploadIcon';

import type { ToolDefinition } from '~/tools/catalog/definitions';

export const imageToPdfToolDefinition = {
  id: 'image-to-pdf',
  slug: 'image-to-pdf',
  path: '/image-to-pdf',
  title: 'Image to PDF',
  shortDescription: 'Combine JPG and PNG images into one PDF.',
  navGroup: 'Convert',
  icon: ImageUploadIcon,
  availability: 'available',
} satisfies ToolDefinition;
