import { describe, expect, it } from 'vitest';

import type { QueuedFile } from '~/shared/tool-ui/file-queue-list';
import {
  initialPdfToImagesState,
  pdfToImagesReducer,
} from '~/tools/pdf-to-images/workspace-state';

function createQueuedFile(overrides: Partial<QueuedFile> = {}): QueuedFile {
  return {
    id: 'file-1',
    file: new File(['pdf'], 'source.pdf', { type: 'application/pdf' }),
    pageCount: null,
    previewDataUrl: null,
    previewStatus: 'loading',
    ...overrides,
  };
}

describe('pdfToImagesReducer', () => {
  it('resets page-range state when a new file is selected', () => {
    const previousState = {
      ...initialPdfToImagesState,
      pageRangeMode: 'custom' as const,
      pageRangeInput: '3-5',
      localErrorMessage: 'oops',
    };

    const state = pdfToImagesReducer(previousState, {
      type: 'fileSelected',
      entry: createQueuedFile(),
    });

    expect(state.pageRangeMode).toBe('all');
    expect(state.pageRangeInput).toBe('1');
    expect(state.isReadingResolution).toBe(true);
    expect(state.localErrorMessage).toBeNull();
  });

  it('fills in page count from the base resolution when needed', () => {
    const selectedState = pdfToImagesReducer(initialPdfToImagesState, {
      type: 'fileSelected',
      entry: createQueuedFile(),
    });

    const state = pdfToImagesReducer(selectedState, {
      type: 'baseResolutionLoaded',
      entryId: 'file-1',
      baseResolution: {
        pageCount: 8,
        baseWidthPx: 1200,
        baseHeightPx: 1800,
      },
    });

    expect(state.baseResolution?.pageCount).toBe(8);
    expect(state.selectedFileEntry?.pageCount).toBe(8);
  });
});
