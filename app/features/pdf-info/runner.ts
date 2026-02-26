import { extractPdfInfo } from '~/features/pdf-info/service/extract-pdf-info';
import type { PdfInfoResult } from '~/features/pdf-info/types';
import type { ToolModuleRunInput } from '~/features/tools/module-types';

export async function runPdfInfo({ files }: ToolModuleRunInput): Promise<PdfInfoResult> {
  const firstFile = files.at(0);
  if (!firstFile) {
    throw new Error('Select a PDF file before extracting details.');
  }

  return extractPdfInfo(firstFile);
}
