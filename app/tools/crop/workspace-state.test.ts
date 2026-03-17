import { describe, expect, it } from 'vitest';

import {
  DEFAULT_CROP_RECT,
  cropWorkspaceReducer,
  initialCropWorkspaceState,
} from '~/tools/crop/workspace-state';

describe('cropWorkspaceReducer', () => {
  it('initializes the first page crop when a file is loaded', () => {
    const state = cropWorkspaceReducer(initialCropWorkspaceState, {
      type: 'fileSelectionSucceeded',
      preview: { pageCount: 3, pages: [] },
    });

    expect(state.documentPreview).toEqual({ pageCount: 3, pages: [] });
    expect(state.activePageNumber).toBe(1);
    expect(state.pageCrops[1]).toEqual(DEFAULT_CROP_RECT);
    expect(state.isReadingPdf).toBe(false);
  });

  it('clamps selected pages and creates a default crop for new pages', () => {
    const loadedState = cropWorkspaceReducer(initialCropWorkspaceState, {
      type: 'fileSelectionSucceeded',
      preview: { pageCount: 3, pages: [] },
    });

    const state = cropWorkspaceReducer(loadedState, {
      type: 'pageSelected',
      pageNumber: 9,
    });

    expect(state.activePageNumber).toBe(3);
    expect(state.pageInputValue).toBe('3');
    expect(state.pageCrops[3]).toEqual(DEFAULT_CROP_RECT);
  });
});
