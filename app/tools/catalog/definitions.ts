import ArrangeIcon from '@hugeicons/core-free-icons/ArrangeIcon';
import CropIcon from '@hugeicons/core-free-icons/CropIcon';
import File01Icon from '@hugeicons/core-free-icons/File01Icon';
import GitMergeIcon from '@hugeicons/core-free-icons/GitMergeIcon';
import ImageDownloadIcon from '@hugeicons/core-free-icons/ImageDownloadIcon';
import ImageUploadIcon from '@hugeicons/core-free-icons/ImageUploadIcon';
import InformationCircleIcon from '@hugeicons/core-free-icons/InformationCircleIcon';

import { cropToolDefinition } from '~/tools/crop/definition';
import { imageToPdfToolDefinition } from '~/tools/image-to-pdf/definition';
import { infoToolDefinition } from '~/tools/info/definition';
import { mergeToolDefinition } from '~/tools/merge/definition';
import { organizeToolDefinition } from '~/tools/organize/definition';
import { pdfToImagesToolDefinition } from '~/tools/pdf-to-images/definition';
import {
  amazonShippingLabelsToolDefinition,
  flipkartShippingLabelsToolDefinition,
  meeshoShippingLabelsToolDefinition,
} from '~/tools/shipping-labels/definitions';

export type ToolNavigationGroup =
  | 'Organize'
  | 'Convert'
  | 'Extract'
  | 'Inspect';

export interface ToolDefinition {
  id: string;
  slug: string;
  path: `/${string}`;
  title: string;
  shortDescription: string;
  navGroup: ToolNavigationGroup;
  icon: typeof GitMergeIcon;
  availability: 'available';
}

export const implementedToolDefinitions = [
  mergeToolDefinition,
  organizeToolDefinition,
  cropToolDefinition,
  imageToPdfToolDefinition,
  pdfToImagesToolDefinition,
  meeshoShippingLabelsToolDefinition,
  amazonShippingLabelsToolDefinition,
  flipkartShippingLabelsToolDefinition,
  infoToolDefinition,
] satisfies readonly ToolDefinition[];

export const toolNavigationGroups: readonly ToolNavigationGroup[] = [
  'Organize',
  'Convert',
  'Extract',
  'Inspect',
];

export const toolIconFallbacks = {
  organize: ArrangeIcon,
  crop: CropIcon,
  merge: GitMergeIcon,
  'image-to-pdf': ImageUploadIcon,
  'pdf-to-images': ImageDownloadIcon,
  'meesho-shipping-labels': File01Icon,
  'amazon-shipping-labels': File01Icon,
  'flipkart-shipping-labels': File01Icon,
  info: InformationCircleIcon,
} as const;

export function getToolsForNavigationGroup(group: ToolNavigationGroup) {
  return implementedToolDefinitions.filter((tool) => tool.navGroup === group);
}
