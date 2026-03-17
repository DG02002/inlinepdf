import type {
  CropDocumentPreview,
  CropPreset,
  NormalizedRect,
  PageCropState,
} from '~/tools/crop/models';

export interface CropWorkspaceState {
  selectedFile: File | null;
  documentPreview: CropDocumentPreview | null;
  activePageNumber: number | null;
  pageInputValue: string;
  pageCrops: PageCropState;
  preset: CropPreset;
  isReadingPdf: boolean;
  isExportDialogOpen: boolean;
  localErrorMessage: string | null;
}

export type CropWorkspaceAction =
  | { type: 'fileSelectionStarted'; file: File }
  | { type: 'fileSelectionSucceeded'; preview: CropDocumentPreview }
  | { type: 'fileSelectionFailed'; message: string }
  | { type: 'pageSelected'; pageNumber: number }
  | { type: 'pageOffsetRequested'; offset: number }
  | { type: 'pageInputChanged'; value: string }
  | { type: 'cropChanged'; pageNumber: number; cropRect: NormalizedRect | null }
  | { type: 'cropReset' }
  | { type: 'presetChanged'; preset: CropPreset }
  | { type: 'exportDialogChanged'; open: boolean }
  | { type: 'localErrorSet'; message: string }
  | { type: 'localErrorCleared' };

export const DEFAULT_CROP_RECT: NormalizedRect = {
  x: 0.002,
  y: 0.002,
  width: 0.996,
  height: 0.996,
};

export const initialCropWorkspaceState: CropWorkspaceState = {
  selectedFile: null,
  documentPreview: null,
  activePageNumber: null,
  pageInputValue: '1',
  pageCrops: {},
  preset: 'free',
  isReadingPdf: false,
  isExportDialogOpen: false,
  localErrorMessage: null,
};

function ensurePageCrop(
  pageCrops: PageCropState,
  pageNumber: number,
): PageCropState {
  return pageNumber in pageCrops
    ? pageCrops
    : { ...pageCrops, [pageNumber]: { ...DEFAULT_CROP_RECT } };
}

function applySelectedPage(
  state: CropWorkspaceState,
  pageNumber: number,
): CropWorkspaceState {
  if (!state.documentPreview) {
    return state;
  }

  const clamped = Math.min(
    Math.max(pageNumber, 1),
    state.documentPreview.pageCount,
  );

  return {
    ...state,
    activePageNumber: clamped,
    pageInputValue: String(clamped),
    pageCrops: ensurePageCrop(state.pageCrops, clamped),
    localErrorMessage: null,
  };
}

export function cropWorkspaceReducer(
  state: CropWorkspaceState,
  action: CropWorkspaceAction,
): CropWorkspaceState {
  switch (action.type) {
    case 'fileSelectionStarted':
      return {
        selectedFile: action.file,
        documentPreview: null,
        activePageNumber: null,
        pageInputValue: '1',
        pageCrops: {},
        preset: 'free',
        isReadingPdf: true,
        isExportDialogOpen: false,
        localErrorMessage: null,
      };
    case 'fileSelectionSucceeded':
      return {
        ...state,
        documentPreview: action.preview,
        activePageNumber: 1,
        pageInputValue: '1',
        pageCrops: { 1: { ...DEFAULT_CROP_RECT } },
        isReadingPdf: false,
        localErrorMessage: null,
      };
    case 'fileSelectionFailed':
      return {
        ...initialCropWorkspaceState,
        localErrorMessage: action.message,
      };
    case 'pageSelected':
      return applySelectedPage(state, action.pageNumber);
    case 'pageOffsetRequested':
      return state.activePageNumber === null
        ? state
        : applySelectedPage(state, state.activePageNumber + action.offset);
    case 'pageInputChanged':
      return {
        ...state,
        pageInputValue: action.value,
      };
    case 'cropChanged':
      return {
        ...state,
        pageCrops: {
          ...state.pageCrops,
          [action.pageNumber]: action.cropRect,
        },
        localErrorMessage: null,
      };
    case 'cropReset':
      return state.activePageNumber === null
        ? state
        : {
            ...state,
            pageCrops: {
              ...state.pageCrops,
              [state.activePageNumber]: { ...DEFAULT_CROP_RECT },
            },
            localErrorMessage: null,
          };
    case 'presetChanged':
      return {
        ...state,
        preset: action.preset,
      };
    case 'exportDialogChanged':
      return {
        ...state,
        isExportDialogOpen: action.open,
      };
    case 'localErrorSet':
      return {
        ...state,
        localErrorMessage: action.message,
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
