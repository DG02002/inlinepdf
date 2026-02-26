import type { ToolDefinition } from './types';
import { toolsManifest } from './manifest';

export const toolsRegistry = toolsManifest.map((tool) => ({
  id: tool.id,
  slug: tool.slug,
  title: tool.title,
  path: tool.path,
  description: tool.description,
  status: tool.status,
  category: tool.category,
  localOnly: tool.localOnly,
  inputKinds: tool.inputKinds,
  outputKinds: tool.outputKinds,
  supportsBatch: tool.supportsBatch,
  estimatedComplexity: tool.estimatedComplexity,
  workspaceMode: tool.workspaceMode,
})) as readonly ToolDefinition[];

export type ToolSlug = (typeof toolsManifest)[number]['slug'];

export function getToolById(toolId: string): ToolDefinition | undefined {
  return toolsRegistry.find((tool) => tool.id === toolId);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolsRegistry.find((tool) => tool.slug === slug);
}
