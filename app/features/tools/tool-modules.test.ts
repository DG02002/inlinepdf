import { describe, expect, it } from 'vitest';

import {
  loadToolModule,
  toolModuleLoaders,
} from '~/features/tools/tool-modules';

describe('tool modules', () => {
  it('registers loaders for currently ready tools', () => {
    expect(Object.keys(toolModuleLoaders).sort()).toEqual([
      'crop',
      'image-to-pdf',
      'info',
      'merge',
      'organize',
      'pdf-to-images',
      'split',
    ]);
  });

  it('loads modules for ready tools', async () => {
    const module = await loadToolModule('split');

    expect(module).not.toBeNull();
  });
});
