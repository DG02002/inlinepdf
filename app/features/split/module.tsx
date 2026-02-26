import type { ToolModule } from '~/features/tools/module-types';

import { runSplitPdf } from './runner';
import { SplitToolWorkspace } from './workspace';

const splitToolModule: ToolModule<undefined, Awaited<ReturnType<typeof runSplitPdf>>> =
  {
    meta: {
      title: 'Split PDF',
      description:
        'Extract selected pages and split by different page strategies in your browser.',
    },
    run: runSplitPdf,
    renderWorkspaceContent: () => <SplitToolWorkspace />,
  };

export default splitToolModule;
