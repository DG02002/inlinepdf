import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ToolDetailRoute, { loader as toolLoader } from '~/routes/tools.$toolSlug';

const readPdfDetailsMock = vi.hoisted(() => vi.fn());

vi.mock('~/features/pdf/service/read-pdf-details', () => ({
  readPdfDetails: readPdfDetailsMock,
}));

function renderRoute() {
  const router = createMemoryRouter(
    [
      {
        path: '/:toolSlug',
        loader: toolLoader,
        element: <ToolDetailRoute />,
      },
    ],
    { initialEntries: ['/split'] },
  );

  return render(<RouterProvider router={router} />);
}

function createFile() {
  return new File(['%PDF-1.4'], 'sample.pdf', { type: 'application/pdf' });
}

afterEach(() => {
  readPdfDetailsMock.mockReset();
});

describe('split PDF tool route', () => {
  it('renders split workspace with selected file preview and default mode', async () => {
    const user = userEvent.setup();

    readPdfDetailsMock.mockResolvedValue({
      pageCount: 12,
      previewDataUrl: null,
    });

    renderRoute();
    await screen.findByText('Drag and drop a PDF file', undefined, {
      timeout: 5000,
    });

    await user.upload(
      await screen.findByLabelText('Select PDF file'),
      createFile(),
    );

    expect(await screen.findByTestId('split-mode-title')).toHaveTextContent(
      'Extract by Page Range (Default)',
    );
    expect(screen.getByLabelText('Split mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Page ranges')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'This tool is planned and will be released in an upcoming milestone.',
      ),
    ).not.toBeInTheDocument();
  });

  it('switches mode-specific options and validates input states', async () => {
    const user = userEvent.setup();

    readPdfDetailsMock.mockResolvedValue({
      pageCount: 8,
      previewDataUrl: null,
    });

    renderRoute();
    await screen.findByText('Drag and drop a PDF file', undefined, {
      timeout: 5000,
    });

    await user.upload(
      await screen.findByLabelText('Select PDF file'),
      createFile(),
    );

    const pageRangeInput = await screen.findByLabelText('Page ranges');
    await user.clear(pageRangeInput);
    await user.type(pageRangeInput, '3-1');
    expect(
      await screen.findByText('Range "3-1" must start before it ends.'),
    ).toBeInTheDocument();

    await user.click(screen.getByTestId('split-mode-trigger'));
    await user.click(
      await screen.findByRole('option', { name: 'Split by Even/Odd Pages' }),
    );

    expect(await screen.findByTestId('split-mode-title')).toHaveTextContent(
      'Split by Even/Odd Pages',
    );
    expect(screen.getByLabelText('Choose page parity')).toBeInTheDocument();

    await user.click(screen.getByTestId('page-parity-trigger'));
    await user.click(await screen.findByRole('option', { name: 'Odd pages' }));
    expect(screen.getByTestId('page-parity-trigger')).toHaveTextContent('Odd pages');

    await user.click(screen.getByTestId('split-mode-trigger'));
    await user.click(await screen.findByRole('option', { name: 'Split N Times' }));

    expect(await screen.findByTestId('split-mode-title')).toHaveTextContent(
      'Split N Times',
    );
    const pagesPerFileInput = screen.getByLabelText('Pages per split file');
    await user.clear(pagesPerFileInput);
    await user.type(pagesPerFileInput, '0');
    expect(
      await screen.findByText('N must be a whole number greater than 0.'),
    ).toBeInTheDocument();
  });
});
