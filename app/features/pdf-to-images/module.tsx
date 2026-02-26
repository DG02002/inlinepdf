import type {
  ToolModule,
  ToolModuleRunInput,
} from '~/features/tools/module-types';

import type { PdfToImagesRunOptions } from './runner';
import { runPdfToImages } from './runner';
import { PdfToImagesToolWorkspace } from './workspace';

const pdfToImagesToolModule: ToolModule<
  PdfToImagesRunOptions,
  Awaited<ReturnType<typeof runPdfToImages>>
> = {
  meta: {
    title: 'PDF to Images',
    description:
      'Convert PDF pages into PNG, JPEG, or WEBP images and download as an uncompressed ZIP archive.',
  },
  run: (input: ToolModuleRunInput, options?: PdfToImagesRunOptions) =>
    runPdfToImages(input, options),
  renderWorkspaceContent: () => <PdfToImagesToolWorkspace />,
};

export default pdfToImagesToolModule;
