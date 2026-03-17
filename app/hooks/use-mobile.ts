import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_MEDIA_QUERY = `(max-width: ${String(MOBILE_BREAKPOINT - 1)}px)`;

function getIsMobile() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getIsMobile, () => false);
}
