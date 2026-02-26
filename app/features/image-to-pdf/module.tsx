import type {
  ToolModule,
  ToolModuleRunInput,
} from '~/features/tools/module-types';

import type { ImageToPdfRunOptions } from './types';
import { runImageToPdf } from './runner';
import { ImageToPdfToolWorkspace } from './workspace';

const imageToPdfToolModule: ToolModule<
  ImageToPdfRunOptions,
  Awaited<ReturnType<typeof runImageToPdf>>
> = {
  meta: {
    title: 'Image to PDF',
    description:
      'Convert JPG and PNG images into a single PDF directly in your browser.',
  },
  run: (input: ToolModuleRunInput, options?: ImageToPdfRunOptions) =>
    runImageToPdf(input, options),
  renderWorkspaceContent: () => <ImageToPdfToolWorkspace />,
};

export default imageToPdfToolModule;
