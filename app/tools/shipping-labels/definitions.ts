import File01Icon from '@hugeicons/core-free-icons/File01Icon';

import type { ToolDefinition } from '~/tools/catalog/definitions';

export const meeshoShippingLabelsToolDefinition = {
  id: 'meesho-shipping-labels',
  slug: 'meesho-shipping-labels',
  path: '/meesho-labels',
  title: 'Meesho Labels',
  shortDescription: 'Prepare Meesho shipping labels for printing.',
  navGroup: 'Prepare',
  icon: File01Icon,
  availability: 'available',
} satisfies ToolDefinition;

export const amazonShippingLabelsToolDefinition = {
  id: 'amazon-shipping-labels',
  slug: 'amazon-shipping-labels',
  path: '/amazon-labels',
  title: 'Amazon Labels',
  shortDescription: 'Prepare Amazon shipping labels for printing.',
  navGroup: 'Prepare',
  icon: File01Icon,
  availability: 'available',
} satisfies ToolDefinition;

export const flipkartShippingLabelsToolDefinition = {
  id: 'flipkart-shipping-labels',
  slug: 'flipkart-shipping-labels',
  path: '/flipkart-labels',
  title: 'Flipkart Labels',
  shortDescription: 'Prepare Flipkart shipping labels for printing.',
  navGroup: 'Prepare',
  icon: File01Icon,
  availability: 'available',
} satisfies ToolDefinition;
