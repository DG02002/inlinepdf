import type { ReactNode } from 'react';

import {
  AUTO_PAGE_SIZE_ID,
  getStandardPageSizeOption,
  type PageSizeSelectId,
  type StandardPageSizeOption,
} from '~/platform/pdf/page-size-options';

export function PageSizeOptionLabel({
  label,
  dimensionsLabel,
}: StandardPageSizeOption): ReactNode {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span>{label}</span>
      <span className="text-muted-foreground">{dimensionsLabel}</span>
    </span>
  );
}

export function PageSizeSelectLabel({
  value,
}: {
  value: PageSizeSelectId;
}): ReactNode {
  if (value === AUTO_PAGE_SIZE_ID) {
    return 'Auto';
  }

  return <PageSizeOptionLabel {...getStandardPageSizeOption(value)} />;
}
