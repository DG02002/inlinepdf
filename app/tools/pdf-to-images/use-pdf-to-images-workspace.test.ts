import { describe, expect, it } from 'vitest';

import { getPdfToImagesViewModel } from '~/tools/pdf-to-images/use-pdf-to-images-workspace';
import { initialPdfToImagesState } from '~/tools/pdf-to-images/workspace-state';

describe('getPdfToImagesViewModel', () => {
  it('derives selected page count and conversion readiness for custom ranges', () => {
    const viewModel = getPdfToImagesViewModel({
      state: {
        ...initialPdfToImagesState,
        selectedFileEntry: {
          id: 'file-1',
          file: new File(['pdf'], 'source.pdf', { type: 'application/pdf' }),
          pageCount: 12,
          previewDataUrl: null,
          previewStatus: 'ready',
        },
        baseResolution: {
          pageCount: 12,
          baseWidthPx: 800,
          baseHeightPx: 1200,
        },
        pageRangeMode: 'custom',
        pageRangeInput: '1-3,6',
      },
      isConverting: false,
      actionErrorMessage: null,
      successMessage: null,
    });

    expect(viewModel.selectedPageCount).toBe(4);
    expect(viewModel.canConvert).toBe(true);
    expect(viewModel.resolutionInfo?.pageCount).toBe(12);
  });

  it('blocks conversion when the custom range is invalid', () => {
    const viewModel = getPdfToImagesViewModel({
      state: {
        ...initialPdfToImagesState,
        selectedFileEntry: {
          id: 'file-1',
          file: new File(['pdf'], 'source.pdf', { type: 'application/pdf' }),
          pageCount: 5,
          previewDataUrl: null,
          previewStatus: 'ready',
        },
        baseResolution: {
          pageCount: 5,
          baseWidthPx: 800,
          baseHeightPx: 1200,
        },
        pageRangeMode: 'custom',
        pageRangeInput: '8-10',
      },
      isConverting: false,
      actionErrorMessage: 'route error',
      successMessage: null,
    });

    expect(viewModel.selectedPageCount).toBeNull();
    expect(viewModel.canConvert).toBe(false);
    expect(viewModel.errorMessage).toBe('route error');
  });
});
