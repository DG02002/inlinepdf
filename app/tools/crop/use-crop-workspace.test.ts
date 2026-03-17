import { describe, expect, it } from 'vitest';

import { getCropWorkspaceViewModel } from '~/tools/crop/use-crop-workspace';
import { DEFAULT_CROP_RECT } from '~/tools/crop/workspace-state';

describe('getCropWorkspaceViewModel', () => {
  it('enables export when the active crop is valid', () => {
    const viewModel = getCropWorkspaceViewModel({
      state: {
        selectedFile: new File(['pdf'], 'source.pdf', {
          type: 'application/pdf',
        }),
        documentPreview: { pageCount: 3, pages: [] },
        activePageNumber: 1,
        pageInputValue: '1',
        pageCrops: { 1: DEFAULT_CROP_RECT },
        preset: 'free',
        isReadingPdf: false,
        isExportDialogOpen: false,
        localErrorMessage: null,
      },
      isExporting: false,
      actionErrorMessage: null,
      successMessage: null,
    });

    expect(viewModel.totalPages).toBe(3);
    expect(viewModel.canExport).toBe(true);
    expect(viewModel.canGoPrevious).toBe(false);
    expect(viewModel.canGoNext).toBe(true);
  });

  it('prefers the local error message and blocks export while busy', () => {
    const viewModel = getCropWorkspaceViewModel({
      state: {
        selectedFile: new File(['pdf'], 'source.pdf', {
          type: 'application/pdf',
        }),
        documentPreview: { pageCount: 2, pages: [] },
        activePageNumber: 1,
        pageInputValue: '1',
        pageCrops: { 1: null },
        preset: 'free',
        isReadingPdf: true,
        isExportDialogOpen: false,
        localErrorMessage: 'bad crop',
      },
      isExporting: false,
      actionErrorMessage: 'route error',
      successMessage: null,
    });

    expect(viewModel.errorMessage).toBe('bad crop');
    expect(viewModel.canExport).toBe(false);
    expect(viewModel.isBusy).toBe(true);
  });
});
