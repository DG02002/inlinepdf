import type { ToolDefinition } from './types';

export interface ToolModuleRenderProps {
  tool: ToolDefinition;
}

export interface ToolModuleRunInput {
  files: File[];
}

export interface ToolModule<
  TRunOptions = undefined,
  TResult = unknown,
> {
  meta: {
    title: string;
    description: string;
  };
  renderWorkspaceContent: (props: ToolModuleRenderProps) => React.ReactElement;
  run: (input: ToolModuleRunInput, options?: TRunOptions) => Promise<TResult>;
}

export interface AnyToolModule {
  meta: {
    title: string;
    description: string;
  };
  renderWorkspaceContent: (props: ToolModuleRenderProps) => React.ReactElement;
  run: (input: ToolModuleRunInput, options?: unknown) => Promise<unknown>;
}

export type ToolModuleLoader = () => Promise<{ default: unknown }>;
export type ToolRenderer = (props: ToolModuleRenderProps) => React.ReactElement;
