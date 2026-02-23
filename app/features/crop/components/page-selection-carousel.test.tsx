import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { PageSelectionCarousel } from '~/features/crop/components/page-selection-carousel';

const pages = [
  {
    pageNumber: 1,
    width: 200,
    height: 300,
    rotation: 0,
    thumbnailDataUrl: null,
  },
  {
    pageNumber: 2,
    width: 200,
    height: 300,
    rotation: 0,
    thumbnailDataUrl: null,
  },
];

describe('PageSelectionCarousel', () => {
  it('renders pages and current selection count', () => {
    render(
      <PageSelectionCarousel
        pages={pages}
        selectedPages={[1]}
        onTogglePage={() => undefined}
      />,
    );

    expect(screen.getByText('Select pages to crop')).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Selected page 1' }),
    ).toBeInTheDocument();
    expect(screen.getByText('1 page selected.')).toBeInTheDocument();
  });

  it('calls onTogglePage for the active page', async () => {
    const user = userEvent.setup();
    const onTogglePage = vi.fn();

    render(
      <PageSelectionCarousel
        pages={pages}
        selectedPages={[]}
        onTogglePage={onTogglePage}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Select page 1' }));

    expect(onTogglePage).toHaveBeenCalledWith(1);
  });
});
