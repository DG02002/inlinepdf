import { hasValidRect } from '~/features/crop/service/coordinate-math';
import { exportCroppedPdf } from '~/features/crop/service/export-cropped-pdf';
import type { CropResult, NormalizedRect } from '~/features/crop/types';
import type { ToolModuleRunInput } from '~/features/tools/module-types';

export interface CropNewRunOptions {
  pageNumber: number;
  cropRect: NormalizedRect | null;
}

function isCropNewRunOptions(value: unknown): value is CropNewRunOptions {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const options = value as Partial<CropNewRunOptions>;
  return (
    Number.isInteger(options.pageNumber) &&
    typeof options.cropRect === 'object' &&
    options.cropRect !== null
  );
}

export async function runCropNew(
  { files }: ToolModuleRunInput,
  options?: CropNewRunOptions,
): Promise<CropResult> {
  const sourceFile = files.at(0);
  if (!sourceFile) {
    throw new Error('Select a PDF file before cropping.');
  }

  if (!isCropNewRunOptions(options) || !hasValidRect(options.cropRect)) {
    throw new Error('Set a valid crop area before downloading.');
  }

  const pageNumber = Math.max(1, options.pageNumber);

  return exportCroppedPdf({
    file: sourceFile,
    selectedPages: [pageNumber],
    pageCrops: {
      [pageNumber]: options.cropRect,
    },
  });
}
