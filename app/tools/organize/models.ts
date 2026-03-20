export type ThumbnailStatus = 'idle' | 'loading' | 'ready' | 'unavailable';

export interface OrganizePageState {
  id: string;
  sourcePageNumber: number;
  rotationQuarterTurns: number;
  aspectRatio: number;
  isDeleted: boolean;
  thumbnailDataUrl: string | null;
  thumbnailStatus: ThumbnailStatus;
}

export interface OrganizeRunOptions {
  pages: OrganizePageState[];
}

export interface OrganizeResult {
  blob: Blob;
  fileName: string;
  pagesExported: number;
}

export interface OrganizePreviewSession {
  pageCount: number;
  getPageThumbnail: (pageNumber: number) => Promise<string | null>;
  getPageAspectRatio: (pageNumber: number) => Promise<number>;
  destroy: () => Promise<void>;
}

export function normalizeQuarterTurns(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const rounded = Math.round(value);
  let normalized = rounded;

  while (normalized > 3) {
    normalized -= 4;
  }

  while (normalized < -3) {
    normalized += 4;
  }

  return normalized;
}

export function quarterTurnsToDegrees(quarterTurns: number): number {
  return normalizeQuarterTurns(quarterTurns) * 90;
}

export function normalizeAspectRatio(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 3 / 4;
  }

  return value;
}

export function getDisplayedPageAspectRatio(
  aspectRatio: number,
  quarterTurns: number,
): number {
  const normalizedAspectRatio = normalizeAspectRatio(aspectRatio);
  const normalizedQuarterTurns = Math.abs(normalizeQuarterTurns(quarterTurns));

  return normalizedQuarterTurns % 2 === 1
    ? 1 / normalizedAspectRatio
    : normalizedAspectRatio;
}
