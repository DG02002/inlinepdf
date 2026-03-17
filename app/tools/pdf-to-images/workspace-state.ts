import type { QueuedFile } from '~/shared/tool-ui/file-queue-list';
import { markPdfQueuedFileUnavailable } from '~/shared/tool-ui/pdf-queued-file';
import type {
  ImageOutputFormat,
  MaxDimensionCap,
  PdfImageBaseResolution,
} from '~/tools/pdf-to-images/models';

type PageRangeMode = 'all' | 'custom';

export interface PdfToImagesState {
  selectedFileEntry: QueuedFile | null;
  format: ImageOutputFormat;
  maxDimensionCap: MaxDimensionCap;
  pageRangeMode: PageRangeMode;
  pageRangeInput: string;
  baseResolution: PdfImageBaseResolution | null;
  isReadingResolution: boolean;
  localErrorMessage: string | null;
}

export type PdfToImagesAction =
  | { type: 'fileSelected'; entry: QueuedFile }
  | { type: 'fileDetailsLoaded'; entryId: string; details: QueuedFile }
  | { type: 'fileDetailsFailed'; entryId: string }
  | {
      type: 'baseResolutionLoaded';
      entryId: string;
      baseResolution: PdfImageBaseResolution;
    }
  | { type: 'baseResolutionFailed'; message: string }
  | { type: 'readingFinished' }
  | { type: 'selectionCleared' }
  | { type: 'formatChanged'; format: ImageOutputFormat }
  | { type: 'maxDimensionCapChanged'; maxDimensionCap: MaxDimensionCap }
  | { type: 'pageRangeModeChanged'; pageRangeMode: PageRangeMode }
  | { type: 'pageRangeInputChanged'; value: string }
  | { type: 'localErrorCleared' };

export const initialPdfToImagesState: PdfToImagesState = {
  selectedFileEntry: null,
  format: 'png',
  maxDimensionCap: 5000,
  pageRangeMode: 'all',
  pageRangeInput: '1',
  baseResolution: null,
  isReadingResolution: false,
  localErrorMessage: null,
};

export function pdfToImagesReducer(
  state: PdfToImagesState,
  action: PdfToImagesAction,
): PdfToImagesState {
  switch (action.type) {
    case 'fileSelected':
      return {
        ...state,
        selectedFileEntry: action.entry,
        baseResolution: null,
        pageRangeMode: 'all',
        pageRangeInput: '1',
        isReadingResolution: true,
        localErrorMessage: null,
      };
    case 'fileDetailsLoaded':
      return {
        ...state,
        selectedFileEntry:
          state.selectedFileEntry?.id === action.entryId
            ? action.details
            : state.selectedFileEntry,
      };
    case 'fileDetailsFailed':
      return {
        ...state,
        selectedFileEntry:
          state.selectedFileEntry?.id === action.entryId
            ? markPdfQueuedFileUnavailable(state.selectedFileEntry)
            : state.selectedFileEntry,
      };
    case 'baseResolutionLoaded':
      return {
        ...state,
        baseResolution: action.baseResolution,
        selectedFileEntry:
          state.selectedFileEntry?.id === action.entryId
            ? {
                ...state.selectedFileEntry,
                pageCount:
                  state.selectedFileEntry.pageCount ??
                  action.baseResolution.pageCount,
              }
            : state.selectedFileEntry,
      };
    case 'baseResolutionFailed':
      return {
        ...state,
        localErrorMessage: action.message,
      };
    case 'readingFinished':
      return {
        ...state,
        isReadingResolution: false,
      };
    case 'selectionCleared':
      return {
        ...state,
        selectedFileEntry: null,
        baseResolution: null,
        isReadingResolution: false,
        localErrorMessage: null,
      };
    case 'formatChanged':
      return {
        ...state,
        format: action.format,
      };
    case 'maxDimensionCapChanged':
      return {
        ...state,
        maxDimensionCap: action.maxDimensionCap,
      };
    case 'pageRangeModeChanged':
      return {
        ...state,
        pageRangeMode: action.pageRangeMode,
      };
    case 'pageRangeInputChanged':
      return {
        ...state,
        pageRangeInput: action.value,
      };
    case 'localErrorCleared':
      return {
        ...state,
        localErrorMessage: null,
      };
    default:
      return state;
  }
}

export type { PageRangeMode };
