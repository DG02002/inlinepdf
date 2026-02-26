import { mergeWithPdfLib } from '~/features/merge/service/merge-with-pdf-lib';
import type { MergeResult } from '~/features/merge/types';
import type { ToolModuleRunInput } from '~/features/tools/module-types';

export async function runMerge({ files }: ToolModuleRunInput): Promise<MergeResult> {
  return mergeWithPdfLib(files);
}
