import { describe, expect, it } from 'vitest';

import { getMergeWorkspaceViewModel } from '~/tools/merge/use-merge-workspace';

describe('getMergeWorkspaceViewModel', () => {
  it('enables merging when at least two files are ready and the action is idle', () => {
    const viewModel = getMergeWorkspaceViewModel({
      fileCount: 2,
      isMerging: false,
    });

    expect(viewModel.canMerge).toBe(true);
    expect(viewModel.mergeButtonLabel).toBe('Merge PDF');
  });

  it('blocks merging while busy or when fewer than two files are queued', () => {
    expect(
      getMergeWorkspaceViewModel({
        fileCount: 1,
        isMerging: false,
      }).canMerge,
    ).toBe(false);

    expect(
      getMergeWorkspaceViewModel({
        fileCount: 3,
        isMerging: true,
      }),
    ).toEqual({
      canMerge: false,
      mergeButtonLabel: 'Merging...',
    });
  });
});
