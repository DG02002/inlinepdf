import type {
  ToolModule,
  ToolModuleRunInput,
} from '~/features/tools/module-types';

import type { CropNewRunOptions } from './runner';
import { runCropNew } from './runner';
import { CropNewToolWorkspace } from './workspace';

const cropNewToolModule: ToolModule<
  CropNewRunOptions,
  Awaited<ReturnType<typeof runCropNew>>
> = {
  meta: {
    title: 'Crop PDF',
    description:
      'Enter page crop mode immediately and export the cropped current page.',
  },
  run: (input: ToolModuleRunInput, options?: CropNewRunOptions) =>
    runCropNew(input, options),
  renderWorkspaceContent: () => <CropNewToolWorkspace />,
};

export default cropNewToolModule;
