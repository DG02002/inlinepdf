import type {
  ToolModule,
  ToolModuleRunInput,
} from '~/features/tools/module-types';

import type { OrganizeRunOptions } from './types';
import { runOrganize } from './runner';
import { OrganizeToolWorkspace } from './workspace';

const organizeToolModule: ToolModule<
  OrganizeRunOptions,
  Awaited<ReturnType<typeof runOrganize>>
> = {
  meta: {
    title: 'Organize PDF',
    description: 'Reorder, rotate, and remove pages before saving.',
  },
  run: (input: ToolModuleRunInput, options?: OrganizeRunOptions) =>
    runOrganize(input, options),
  renderWorkspaceContent: () => <OrganizeToolWorkspace />,
};

export default organizeToolModule;
