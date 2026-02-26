import type { ToolModule } from '~/features/tools/module-types';

import { runMerge } from './runner';
import { MergeToolWorkspace } from './workspace';

const mergeToolModule: ToolModule<undefined, Awaited<ReturnType<typeof runMerge>>> =
  {
    meta: {
      title: 'Merge PDF',
      description: 'Combine PDFs in the order you choose directly in your browser.',
    },
    run: runMerge,
    renderWorkspaceContent: () => <MergeToolWorkspace />,
  };

export default mergeToolModule;
