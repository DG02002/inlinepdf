import {
  convertImagesToPdf,
  type ConvertImagesToPdfInput,
} from '~/features/image-to-pdf/service/convert-images-to-pdf';
import type {
  ImageToPdfQuality,
  ImageToPdfResult,
  ImageToPdfRunOptions,
} from '~/features/image-to-pdf/types';
import type { ToolModuleRunInput } from '~/features/tools/module-types';

export function isImageToPdfQuality(value: unknown): value is ImageToPdfQuality {
  return value === 'high' || value === 'medium' || value === 'low';
}

function isImageToPdfRunOptions(value: unknown): value is ImageToPdfRunOptions {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const options = value as Partial<ImageToPdfRunOptions>;
  return (
    isImageToPdfQuality(options.quality) &&
    (options.onProgress === undefined || typeof options.onProgress === 'function')
  );
}

export async function runImageToPdf(
  { files }: ToolModuleRunInput,
  options?: ImageToPdfRunOptions,
): Promise<ImageToPdfResult> {
  if (!isImageToPdfRunOptions(options)) {
    throw new Error('Select an output quality before converting.');
  }

  const input: ConvertImagesToPdfInput = {
    files,
    quality: options.quality,
    onProgress: options.onProgress,
  };
  return convertImagesToPdf(input);
}
