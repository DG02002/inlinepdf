import { themedBrandingAssets } from '~/lib/branding';
import { useThemeState } from '~/hooks/use-theme-state';

type BrandImageVariant = 'header' | 'hero';

export function ThemedBrandImage({
  alt,
  className,
  fetchPriority,
  loading,
  variant,
}: {
  alt: string;
  className?: string;
  fetchPriority?: 'auto' | 'high' | 'low';
  loading?: 'eager' | 'lazy';
  variant: BrandImageVariant;
}) {
  const { resolvedTheme } = useThemeState();

  const assets = themedBrandingAssets[resolvedTheme][variant];

  return (
    <picture>
      <source
        srcSet={assets.webpSrcSet}
        sizes={assets.sizes}
        type="image/webp"
      />
      <img
        src={assets.fallbackSrc}
        srcSet={assets.fallbackSrcSet}
        sizes={assets.sizes}
        width={assets.width}
        height={assets.height}
        alt={alt}
        className={className}
        decoding="async"
        fetchPriority={fetchPriority}
        loading={loading}
      />
    </picture>
  );
}
