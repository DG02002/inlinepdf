import type { ToolModule } from '~/features/tools/module-types';

import { runPdfInfo } from './runner';
import { PdfInfoToolWorkspace } from './workspace';

const pdfInfoToolModule: ToolModule<
  undefined,
  Awaited<ReturnType<typeof runPdfInfo>>
> = {
  meta: {
    title: 'PDF Info',
    description:
      'Extract metadata, producer/writer fields, and font details from PDFs directly in your browser.',
  },
  run: runPdfInfo,
  renderWorkspaceContent: () => <PdfInfoToolWorkspace />,
};

export default pdfInfoToolModule;
