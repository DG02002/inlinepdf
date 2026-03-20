import { describe, expect, it } from 'vitest';

import {
  buildOrganizeFileInfoEntry,
  getOrganizePagesToLoadForThumbnailPrefetch,
} from '~/tools/organize/use-organize-workspace';

describe('getOrganizePagesToLoadForThumbnailPrefetch', () => {
  it('loads idle pages from the current pagination window and neighbors', () => {
    const pageStates = Array.from({ length: 30 }, (_, index) => ({
      id: `page-${String(index + 1)}`,
      sourcePageNumber: index + 1,
      rotationQuarterTurns: 0,
      aspectRatio: 3 / 4,
      isDeleted: false,
      thumbnailDataUrl: null,
      thumbnailStatus:
        index === 0 || index === 13 ? ('ready' as const) : ('idle' as const),
    }));

    const pagesToLoad = getOrganizePagesToLoadForThumbnailPrefetch({
      pageStates,
      currentPaginationPage: 2,
      totalPaginationPages: 3,
      pagesPerView: 10,
    });

    expect(pagesToLoad.map((page) => page.id)).toEqual([
      'page-2',
      'page-3',
      'page-4',
      'page-5',
      'page-6',
      'page-7',
      'page-8',
      'page-9',
      'page-10',
      'page-11',
      'page-12',
      'page-13',
      'page-15',
      'page-16',
      'page-17',
      'page-18',
      'page-19',
      'page-20',
      'page-21',
      'page-22',
      'page-23',
      'page-24',
      'page-25',
      'page-26',
      'page-27',
      'page-28',
      'page-29',
      'page-30',
    ]);
  });
});

describe('buildOrganizeFileInfoEntry', () => {
  it('creates a fallback file info entry before metadata is loaded', () => {
    const file = new File(['pdf'], 'source.pdf', { type: 'application/pdf' });

    const entry = buildOrganizeFileInfoEntry({
      selectedFile: file,
      selectedFileEntry: null,
      pageStates: [],
      isReadingPdf: true,
    });

    expect(entry.id).toBe('organize-file-fallback');
    expect(entry.file).toBe(file);
    expect(entry.pageCount).toBeNull();
    expect(entry.previewStatus).toBe('loading');
  });
});
