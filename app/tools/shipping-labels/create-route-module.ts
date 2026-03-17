import { getFile, getString } from '~/platform/files/read-form-data';
import { triggerFileDownload } from '~/platform/files/trigger-file-download';
import { createToolRouteModule } from '~/shared/tool-ui/create-tool-route-module';
import type { ToolDefinition } from '~/tools/catalog/definitions';

import type {
  ShippingLabelBrand,
  ShippingLabelExtractionResult,
  ShippingLabelExtractionSummary,
  ShippingLabelOutputPageSize,
  ShippingLabelSortDirection,
} from './models';
import {
  prepareShippingLabels,
} from './use-cases/extract-shipping-labels';

interface ShippingLabelsActionPayload {
  file: File;
  outputPageSize: ShippingLabelOutputPageSize;
  pickupPartnerDirection: ShippingLabelSortDirection | null;
  skuDirection: ShippingLabelSortDirection | null;
}

interface ShippingLabelActionInput {
  file: File | null;
  outputPageSize: string | null;
  pickupPartnerDirection: string | null;
  skuDirection: string | null;
}

export function createShippingLabelRouteModule(
  toolDefinition: ToolDefinition,
  brand: ShippingLabelBrand,
) {
  return createToolRouteModule<
    ShippingLabelsActionPayload,
    ShippingLabelActionInput,
    ShippingLabelExtractionResult,
    ShippingLabelExtractionSummary
  >({
    definition: toolDefinition,
    errorMessage: 'Failed to extract shipping labels.',
    parseInput({ formData, fallbackPayload }) {
      const file = getFile(formData, 'file') ?? fallbackPayload?.file;
      return {
        file: file ?? null,
        outputPageSize:
          getString(formData, 'outputPageSize') ??
          fallbackPayload?.outputPageSize ??
          null,
        pickupPartnerDirection:
          getString(formData, 'pickupPartnerDirection') ??
          fallbackPayload?.pickupPartnerDirection ??
          null,
        skuDirection:
          getString(formData, 'skuDirection') ??
          fallbackPayload?.skuDirection ??
          null,
      };
    },
    execute(input) {
      return prepareShippingLabels({
        file: input.file,
        brand,
        outputPageSize: input.outputPageSize,
        pickupPartnerDirection: input.pickupPartnerDirection,
        skuDirection: input.skuDirection,
      });
    },
    onSuccess(result) {
      triggerFileDownload(result.blob, result.fileName);
    },
    getSuccessMessage(result) {
      return `Prepared ${String(result.labelsExtracted)} label page${result.labelsExtracted === 1 ? '' : 's'}.`;
    },
    mapSuccessResult(result) {
      return {
        pagesProcessed: result.pagesProcessed,
        labelsExtracted: result.labelsExtracted,
        pagesSkipped: result.pagesSkipped,
        fileName: result.fileName,
      };
    },
  });
}
