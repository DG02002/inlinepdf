import { lazy } from 'react';

import { toolsManifest } from './manifest';
import type {
  AnyToolModule,
  ToolModuleLoader,
  ToolRenderer,
} from './module-types';
import type { ToolSlug } from './registry';

export type {
  AnyToolModule,
  ToolModule,
  ToolModuleRenderProps,
  ToolModuleRunInput,
} from './module-types';

type ManifestEntry = (typeof toolsManifest)[number];

function hasModuleLoader(
  entry: ManifestEntry,
): entry is ManifestEntry & { moduleLoader: ToolModuleLoader } {
  return 'moduleLoader' in entry && typeof entry.moduleLoader === 'function';
}

const manifestWithLoaders = toolsManifest.filter(hasModuleLoader);

export const toolModuleLoaders: Partial<Record<ToolSlug, ToolModuleLoader>> =
  Object.fromEntries(
    manifestWithLoaders.map((entry) => [entry.slug, entry.moduleLoader]),
  );

export const lazyToolRenderers: Partial<
  Record<ToolSlug, React.LazyExoticComponent<ToolRenderer>>
> = Object.fromEntries(
  manifestWithLoaders.map((entry) => [
    entry.slug,
    lazy(async () => {
      const module = await entry.moduleLoader();
      return {
        default: (props) =>
          (module.default as AnyToolModule).renderWorkspaceContent(props),
      };
    }),
  ]),
);

export async function loadToolModule(
  slug: string,
): Promise<AnyToolModule | null> {
  if (!(slug in toolModuleLoaders)) {
    return null;
  }

  const loader = toolModuleLoaders[slug as ToolSlug];
  if (!loader) {
    return null;
  }

  const module = await loader();
  return module.default as AnyToolModule;
}

export function getLazyToolRenderer(
  slug: string,
): React.LazyExoticComponent<ToolRenderer> | null {
  if (!(slug in lazyToolRenderers)) {
    return null;
  }

  return lazyToolRenderers[slug as ToolSlug] ?? null;
}
