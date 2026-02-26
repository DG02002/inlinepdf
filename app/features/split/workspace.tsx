import { useRef, useState } from 'react';

import { PdfFileSelector } from '~/components/pdf-file-selector';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { readPdfDetails } from '~/features/pdf/service/read-pdf-details';
import {
  FileQueueList,
  type QueuedFile,
} from '~/features/tools/components/file-queue-list';
import { ToolWorkspace } from '~/features/tools/components/tool-workspace';
import { createFileEntryId } from '~/features/tools/utils/create-file-entry-id';

type SplitMode = 'page-range' | 'even-odd' | 'all-pages' | 'n-times';
type PageParity = 'even' | 'odd';

interface SplitModeOption {
  value: SplitMode;
  label: string;
}

const SPLIT_MODE_OPTIONS: SplitModeOption[] = [
  {
    value: 'page-range',
    label: 'Extract by Page Range (Default)',
  },
  {
    value: 'even-odd',
    label: 'Split by Even/Odd Pages',
  },
  {
    value: 'all-pages',
    label: 'Split All Pages into Separate Files',
  },
  {
    value: 'n-times',
    label: 'Split N Times',
  },
];

const PAGE_PARITY_LABELS: Record<PageParity, string> = {
  even: 'Even pages',
  odd: 'Odd pages',
};

function isSplitMode(value: unknown): value is SplitMode {
  return (
    value === 'page-range' ||
    value === 'even-odd' ||
    value === 'all-pages' ||
    value === 'n-times'
  );
}

function isPageParity(value: unknown): value is PageParity {
  return value === 'even' || value === 'odd';
}

function validatePageRangeInput(
  value: string,
  totalPages: number | null,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Enter at least one page or range.';
  }

  const tokens = trimmed.split(',').map((token) => token.trim());
  if (tokens.some((token) => token.length === 0)) {
    return 'Use comma-separated values like 1-3, 7, 12-15.';
  }

  for (const token of tokens) {
    if (/^\d+$/.test(token)) {
      const pageNumber = Number.parseInt(token, 10);
      if (pageNumber < 1) {
        return 'Page numbers must be 1 or greater.';
      }

      if (totalPages !== null && pageNumber > totalPages) {
        return `Page ${String(pageNumber)} is outside this document.`;
      }

      continue;
    }

    const rangeMatch = /^(\d+)\s*-\s*(\d+)$/.exec(token);
    if (!rangeMatch) {
      return `Invalid range token "${token}".`;
    }

    const start = Number.parseInt(rangeMatch[1], 10);
    const end = Number.parseInt(rangeMatch[2], 10);
    if (start < 1 || end < 1) {
      return 'Page ranges must start at 1.';
    }

    if (start > end) {
      return `Range "${token}" must start before it ends.`;
    }

    if (totalPages !== null && end > totalPages) {
      return `Range "${token}" is outside this document.`;
    }
  }

  return null;
}

function validatePagesPerFile(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Enter how many pages should go in each split file.';
  }

  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 'N must be a whole number greater than 0.';
  }

  return null;
}

export function SplitToolWorkspace() {
  const activeEntryIdRef = useRef<string | null>(null);
  const [selectedFileEntry, setSelectedFileEntry] = useState<QueuedFile | null>(null);
  const [splitMode, setSplitMode] = useState<SplitMode>('page-range');
  const [pageRangeInput, setPageRangeInput] = useState('1-3, 7, 12-15');
  const [pageParity, setPageParity] = useState<PageParity>('even');
  const [pagesPerFile, setPagesPerFile] = useState('2');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pageRangeValidationMessage =
    splitMode === 'page-range' && selectedFileEntry
      ? validatePageRangeInput(pageRangeInput, selectedFileEntry.pageCount)
      : null;
  const pagesPerFileValidationMessage =
    splitMode === 'n-times' && selectedFileEntry
      ? validatePagesPerFile(pagesPerFile)
      : null;

  function handleFileSelection(file: File) {
    const entryId = createFileEntryId(file);
    activeEntryIdRef.current = entryId;

    setSelectedFileEntry({
      id: entryId,
      file,
      pageCount: null,
      previewDataUrl: null,
      previewStatus: 'loading',
    });
    setErrorMessage(null);

    void readPdfDetails(file)
      .then((details) => {
        if (activeEntryIdRef.current !== entryId) {
          return;
        }

        setSelectedFileEntry((current) =>
          current?.id === entryId
            ? {
                ...current,
                pageCount: details.pageCount,
                previewDataUrl: details.previewDataUrl,
                previewStatus: details.previewDataUrl ? 'ready' : 'unavailable',
              }
            : current,
        );
      })
      .catch((error: unknown) => {
        if (activeEntryIdRef.current !== entryId) {
          return;
        }

        setSelectedFileEntry((current) =>
          current?.id === entryId
            ? {
                ...current,
                previewStatus: 'unavailable',
              }
            : current,
        );

        const fallback = 'Failed to read PDF preview details.';
        setErrorMessage(error instanceof Error ? error.message : fallback);
      });
  }

  function handleClearSelection() {
    activeEntryIdRef.current = null;
    setSelectedFileEntry(null);
    setErrorMessage(null);
  }

  function renderModeOptions() {
    if (splitMode === 'page-range') {
      return (
        <div className="space-y-3 rounded-xl border border-border p-4">
          <p className="text-sm font-semibold" data-testid="split-mode-title">
            Extract by Page Range (Default)
          </p>
          <label className="space-y-2 text-sm font-medium">
            <span>Page ranges</span>
            <Input
              aria-label="Page ranges"
              value={pageRangeInput}
              onChange={(event) => {
                setPageRangeInput(event.currentTarget.value);
              }}
              placeholder="e.g. 1-3, 7, 12-15"
            />
          </label>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">How it works:</p>
            <p>Enter page numbers separated by commas (e.g., 2, 8, 14).</p>
            <p>Enter page ranges using a hyphen (e.g., 5-10).</p>
            <p>Combine them for complex selections (e.g., 1-3, 7, 12-15).</p>
          </div>
          {pageRangeValidationMessage ? (
            <p className="text-xs text-destructive">{pageRangeValidationMessage}</p>
          ) : null}
        </div>
      );
    }

    if (splitMode === 'even-odd') {
      return (
        <div className="space-y-3 rounded-xl border border-border p-4">
          <p className="text-sm font-semibold" data-testid="split-mode-title">
            Split by Even/Odd Pages
          </p>
          <label className="space-y-2 text-sm font-medium">
            <span>Choose page parity</span>
            <Select
              value={pageParity}
              onValueChange={(value) => {
                if (isPageParity(value)) {
                  setPageParity(value);
                }
              }}
            >
              <SelectTrigger
                aria-label="Choose page parity"
                data-testid="page-parity-trigger"
                className="w-full rounded-lg"
              >
                <SelectValue placeholder="Select parity">
                  {(value: unknown) =>
                    isPageParity(value) ? PAGE_PARITY_LABELS[value] : null
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="even" data-testid="page-parity-even">
                  Even pages
                </SelectItem>
                <SelectItem value="odd" data-testid="page-parity-odd">
                  Odd pages
                </SelectItem>
              </SelectContent>
            </Select>
          </label>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">How it works:</p>
            <p>
              Extract all even pages (2, 4, 6...) or all odd pages (1, 3, 5...)
              into a new PDF.
            </p>
          </div>
        </div>
      );
    }

    if (splitMode === 'all-pages') {
      return (
        <div className="space-y-3 rounded-xl border border-border p-4">
          <p className="text-sm font-semibold" data-testid="split-mode-title">
            Split All Pages into Separate Files
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">How it works:</p>
            <p>
              Every single page of the PDF will be saved as a separate PDF file.
            </p>
            <p>
              The result will be downloaded as a ZIP file containing all the pages.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3 rounded-xl border border-border p-4">
        <p className="text-sm font-semibold" data-testid="split-mode-title">
          Split N Times
        </p>
        <label className="space-y-2 text-sm font-medium">
          <span>Pages per split file (N)</span>
          <Input
            aria-label="Pages per split file"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            value={pagesPerFile}
            onChange={(event) => {
              setPagesPerFile(event.currentTarget.value);
            }}
            placeholder="e.g. 2"
          />
        </label>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">How it works:</p>
          <p>Split the PDF into multiple files, each containing N pages.</p>
        </div>
        {pagesPerFileValidationMessage ? (
          <p className="text-xs text-destructive">{pagesPerFileValidationMessage}</p>
        ) : null}
      </div>
    );
  }

  return (
    <ToolWorkspace
      title="Split PDF"
      description="Extract page ranges or split by rules while keeping processing local."
      inputPanel={
        selectedFileEntry ? (
          <FileQueueList
            files={[selectedFileEntry]}
            showIndexBadge={false}
            onRemove={() => {
              handleClearSelection();
            }}
          />
        ) : (
          <PdfFileSelector
            ariaLabel="Select PDF file"
            onSelect={(files) => {
              handleFileSelection(files[0]);
            }}
            title="Drag and drop a PDF file"
          />
        )
      }
      optionsPanel={
        selectedFileEntry ? (
          <div className="max-w-xl space-y-3">
            <label className="space-y-2 text-sm font-medium">
              <span>Split mode</span>
              <Select
                value={splitMode}
                onValueChange={(value) => {
                  if (isSplitMode(value)) {
                    setSplitMode(value);
                  }
                }}
              >
                <SelectTrigger
                  aria-label="Split mode"
                  data-testid="split-mode-trigger"
                  className="w-full rounded-lg"
                >
                  <SelectValue placeholder="Select split mode">
                    {(value: unknown) =>
                      isSplitMode(value)
                        ? SPLIT_MODE_OPTIONS.find((option) => option.value === value)?.label
                        : null
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {SPLIT_MODE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      data-testid={`split-mode-${option.value}`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            {renderModeOptions()}
          </div>
        ) : null
      }
      errorMessage={errorMessage}
    />
  );
}
