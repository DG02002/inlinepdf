import { describe, expect, it } from 'vitest';

import { buildPdfInfoViewModel } from '~/tools/info/use-pdf-info-workspace';

describe('buildPdfInfoViewModel', () => {
  it('filters generic font families and builds metadata rows', () => {
    const viewModel = buildPdfInfoViewModel({
      core: {
        title: null,
        author: 'Author',
        subject: null,
        keywords: ['alpha', 'beta'],
        creator: null,
        producer: 'Producer',
        creationDate: null,
        modificationDate: null,
      },
      document: {
        fileName: 'sample.pdf',
        fileSizeBytes: 2048,
        pageCount: 4,
        isEncrypted: false,
      },
      fonts: {
        internalNames: ['F1', 'F2'],
        fontFamilies: ['serif', 'Inter', 'Inter', 'system-ui'],
      },
      infoDictionary: { Company: 'OpenAI' },
      rawXmpMetadata: null,
    });

    expect(viewModel.visibleFontFamilies).toEqual(['Inter']);
    expect(viewModel.metadataRows).toContainEqual(['File size', '2.00 KB']);
    expect(viewModel.additionalInfoEntries).toEqual([['Company', 'OpenAI']]);
  });
});
