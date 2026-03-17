import type { PdfInfoResult } from './models';
import { useSinglePdfActionWorkspace } from '~/shared/tool-ui/use-single-pdf-action-workspace';

const genericFontFamilies = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'emoji',
  'math',
  'fangsong',
]);

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${String(bytes)} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }

  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export function buildPdfInfoViewModel(result: PdfInfoResult | null) {
  if (!result) {
    return {
      additionalInfoEntries: [] as [string, string][],
      metadataRows: [] as [string, string][],
      visibleFontFamilies: [] as string[],
    };
  }

  const additionalInfoEntries = Object.entries(result.infoDictionary).sort(
    ([a], [b]) => a.localeCompare(b),
  );
  const visibleFontFamilies = [...new Set(result.fonts.fontFamilies)]
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .filter((value) => !genericFontFamilies.has(value.toLowerCase()));
  const metadataRows: [string, string][] = [
    ['File name', result.document.fileName],
    ['File size', formatBytes(result.document.fileSizeBytes)],
    ['Pages', String(result.document.pageCount)],
    ['Encrypted', result.document.isEncrypted ? 'Yes' : 'No'],
    ['Title', result.core.title ?? 'Not set'],
    ['Author', result.core.author ?? 'Not set'],
    ['Subject', result.core.subject ?? 'Not set'],
    [
      'Keywords',
      result.core.keywords.length > 0
        ? result.core.keywords.join(', ')
        : 'Not set',
    ],
    ['Creator', result.core.creator ?? 'Not set'],
    ['Producer', result.core.producer ?? 'Not set'],
    ['Creation date', result.core.creationDate ?? 'Not set'],
    ['Modification date', result.core.modificationDate ?? 'Not set'],
    [
      'Font families',
      visibleFontFamilies.length > 0
        ? visibleFontFamilies.join(', ')
        : 'Not identified',
    ],
    [
      'Font identifiers detected',
      `${String(result.fonts.internalNames.length)} technical IDs`,
    ],
  ];

  return {
    additionalInfoEntries,
    metadataRows,
    visibleFontFamilies,
  };
}

export function usePdfInfoWorkspace() {
  const workspace = useSinglePdfActionWorkspace<PdfInfoResult, { file: File }>({
    submitOnSelect: {
      buildPayload(file) {
        return { file };
      },
      writeFormData(formData, file) {
        formData.set('file', file);
      },
    },
  });
  const viewModel = buildPdfInfoViewModel(workspace.result);

  return {
    ...viewModel,
    errorMessage: workspace.errorMessage,
    handleClearSelection: workspace.handleClearSelection,
    handleFileSelection: workspace.handleFileSelection,
    isLoading: workspace.isBusy,
    rawXmpMetadata: workspace.result?.rawXmpMetadata ?? null,
    result: workspace.result,
    selectedFileEntry: workspace.selectedFileEntry,
    successMessage: workspace.successMessage,
  };
}
