import { useState } from 'react';

import type {
  ShippingLabelBrand,
  ShippingLabelOutputPageSize,
  ShippingLabelSortDirection,
} from './models';
import { useSinglePdfActionWorkspace } from '~/shared/tool-ui/use-single-pdf-action-workspace';
import { submitClientAction } from '~/shared/tool-ui/submit-client-action';

const BRAND_LABELS: Record<ShippingLabelBrand, string> = {
  meesho: 'Meesho',
  amazon: 'Amazon',
  flipkart: 'Flipkart',
};

export function buildShippingLabelsViewModel(args: {
  brand: ShippingLabelBrand;
  selectedFile: boolean;
  isExtracting: boolean;
  localErrorMessage: string | null;
  actionErrorMessage: string | null;
  result: {
    pagesProcessed: number;
    labelsExtracted: number;
    pagesSkipped: number;
    fileName: string;
  } | null;
}) {
  const { brand, selectedFile, isExtracting, localErrorMessage, actionErrorMessage, result } = args;
  const isBrandAvailable = brand === 'meesho';

  return {
    errorMessage: localErrorMessage ?? actionErrorMessage,
    helperText: isExtracting
      ? 'Scanning pages and preparing label pages...'
      : undefined,
    isBrandAvailable,
    prepareButtonDisabled: !selectedFile || !isBrandAvailable || isExtracting,
    prepareButtonLabel: isExtracting ? 'Preparing...' : 'Prepare Labels',
    resultSummary: result
      ? {
          brandLabel: BRAND_LABELS[brand],
          fileName: result.fileName,
          labelsExtracted: result.labelsExtracted,
          pagesProcessed: result.pagesProcessed,
          pagesSkipped: result.pagesSkipped,
        }
      : null,
  };
}

export function useShippingLabelsWorkspace(brand: ShippingLabelBrand) {
  const workspace = useSinglePdfActionWorkspace<{
    pagesProcessed: number;
    labelsExtracted: number;
    pagesSkipped: number;
    fileName: string;
  }>();
  const [outputPageSize, setOutputPageSize] =
    useState<ShippingLabelOutputPageSize>('auto');
  const [pickupPartnerDirection, setPickupPartnerDirection] =
    useState<ShippingLabelSortDirection | null>(null);
  const [skuDirection, setSkuDirection] =
    useState<ShippingLabelSortDirection | null>(null);
  const viewModel = buildShippingLabelsViewModel({
    brand,
    selectedFile: !!workspace.selectedFileEntry,
    isExtracting: workspace.isBusy,
    localErrorMessage: workspace.localErrorMessage,
    actionErrorMessage: workspace.actionErrorMessage,
    result: workspace.result,
  });

  function handleExtract() {
    if (!workspace.selectedFileEntry) {
      workspace.setLocalErrorMessage(
        'Select a PDF file before preparing label pages.',
      );
      return;
    }

    const selectedFileEntry = workspace.selectedFileEntry;

    if (!viewModel.isBrandAvailable) {
      workspace.setLocalErrorMessage(
        `${BRAND_LABELS[brand]} labels are not available yet.`,
      );
      return;
    }

    workspace.setLocalErrorMessage(null);
    submitClientAction({
      fetcher: workspace.fetcher,
      payload: {
        file: selectedFileEntry.file,
        outputPageSize,
        pickupPartnerDirection,
        skuDirection,
      },
      writeFormData(formData) {
        formData.set('file', selectedFileEntry.file);
        formData.set('outputPageSize', outputPageSize);
        if (pickupPartnerDirection) {
          formData.set('pickupPartnerDirection', pickupPartnerDirection);
        }
        if (skuDirection) {
          formData.set('skuDirection', skuDirection);
        }
      },
    });
  }

  return {
    ...viewModel,
    handleClearSelection: workspace.handleClearSelection,
    handleExtract,
    handleFileSelection: workspace.handleFileSelection,
    isExtracting: workspace.isBusy,
    outputPageSize,
    pickupPartnerDirection,
    selectedFileEntry: workspace.selectedFileEntry,
    setOutputPageSize,
    setPickupPartnerDirection,
    setSkuDirection,
    skuDirection,
    successMessage: workspace.successMessage,
  };
}
