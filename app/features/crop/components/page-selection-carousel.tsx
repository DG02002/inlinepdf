import { useMemo } from 'react';

import { cn } from '~/lib/utils';
import type { CropPagePreview } from '~/features/crop/types';

interface PageSelectionCarouselProps {
  pages: CropPagePreview[];
  selectedPages: number[];
  disabled?: boolean;
  onTogglePage: (pageNumber: number) => void;
}

export function PageSelectionCarousel({
  pages,
  selectedPages,
  disabled = false,
  onTogglePage,
}: PageSelectionCarouselProps) {
  const selectedSet = new Set(selectedPages);
  const hasPages = pages.length > 0;

  const selectedCountLabel = useMemo(() => {
    if (selectedPages.length === 0) {
      return 'No pages selected.';
    }

    return `${String(selectedPages.length)} page${selectedPages.length === 1 ? '' : 's'} selected.`;
  }, [selectedPages.length]);

  return (
    <section className="space-y-4">
      <p className="text-base font-medium">Select pages to crop</p>
      {!hasPages ? (
        <p className="text-sm text-muted-foreground">No pages available.</p>
      ) : null}

      {hasPages ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pages.map((page) => {
            const isSelected = selectedSet.has(page.pageNumber);

            return (
              <li key={String(page.pageNumber)}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? 'Selected' : 'Select'} page ${String(page.pageNumber)}`}
                  onClick={() => {
                    onTogglePage(page.pageNumber);
                  }}
                  className={cn(
                    'group w-full rounded-xl border bg-card text-left transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70',
                    isSelected
                      ? 'border-primary ring-1 ring-primary/40'
                      : 'border-border hover:border-primary/40',
                  )}
                >
                  <div className="relative m-3 overflow-hidden rounded-lg border border-border bg-white">
                    {page.thumbnailDataUrl ? (
                      <img
                        src={page.thumbnailDataUrl}
                        alt={`Preview for page ${String(page.pageNumber)}`}
                        className="h-[300px] w-full object-contain object-top"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-[300px] w-full items-center justify-center text-sm text-muted-foreground">
                        Preview unavailable
                      </div>
                    )}
                    {isSelected ? (
                      <span className="absolute right-2 top-2 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between px-3 pb-3">
                    <p className="text-base font-medium">{`Page ${String(page.pageNumber)}`}</p>
                    <span
                      className={cn(
                        'inline-flex h-8 items-center rounded-md px-2.5 text-sm font-medium',
                        isSelected
                          ? 'border border-input bg-background'
                          : 'text-muted-foreground',
                      )}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <p className="text-sm text-muted-foreground">{selectedCountLabel}</p>
    </section>
  );
}
