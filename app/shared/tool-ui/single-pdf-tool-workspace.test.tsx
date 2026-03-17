import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SinglePdfToolWorkspace } from '~/shared/tool-ui/single-pdf-tool-workspace';

describe('SinglePdfToolWorkspace', () => {
  it('renders the selector when no file is selected', () => {
    render(
      <SinglePdfToolWorkspace
        title="PDF Info"
        description="Inspect metadata."
        selectorAriaLabel="Select PDF file"
        selectedFileEntry={null}
        isBusy={false}
        onSelectFile={vi.fn()}
        onClearSelection={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Select PDF file')).toBeInTheDocument();
  });

  it('renders the selected file queue entry when a file is present', () => {
    render(
      <SinglePdfToolWorkspace
        title="PDF Info"
        description="Inspect metadata."
        selectorAriaLabel="Select PDF file"
        selectedFileEntry={{
          id: 'file-1',
          file: new File(['pdf'], 'source.pdf', { type: 'application/pdf' }),
          pageCount: 3,
          previewDataUrl: null,
          previewStatus: 'ready',
        }}
        isBusy={false}
        onSelectFile={vi.fn()}
        onClearSelection={vi.fn()}
      />,
    );

    expect(screen.getByText('source.pdf')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove source.pdf')).toBeInTheDocument();
  });
});
