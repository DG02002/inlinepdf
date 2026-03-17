import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  useDeferredDispatch,
  useLatestAsyncId,
  useLatestAsyncToken,
} from './use-latest-async';

describe('useLatestAsyncId', () => {
  it('tracks the latest active id', () => {
    const { result } = renderHook(() => useLatestAsyncId<string>());

    act(() => {
      result.current.activate('first');
    });
    expect(result.current.isActive('first')).toBe(true);

    act(() => {
      result.current.activate('second');
    });
    expect(result.current.isActive('first')).toBe(false);
    expect(result.current.isActive('second')).toBe(true);

    act(() => {
      result.current.clear();
    });
    expect(result.current.isActive('second')).toBe(false);
  });
});

describe('useLatestAsyncToken', () => {
  it('invalidates older tokens when a new one begins', () => {
    const { result } = renderHook(() => useLatestAsyncToken());

    const first = result.current.begin();
    const second = result.current.begin();

    expect(result.current.isCurrent(first)).toBe(false);
    expect(result.current.isCurrent(second)).toBe(true);

    act(() => {
      result.current.invalidate();
    });
    expect(result.current.isCurrent(second)).toBe(false);
  });
});

describe('useDeferredDispatch', () => {
  it('forwards actions to the reducer dispatch', () => {
    const actions: string[] = [];
    const { result } = renderHook(() =>
      useDeferredDispatch<string>((action) => {
        actions.push(action);
      }),
    );

    act(() => {
      result.current('loaded');
    });

    expect(actions).toEqual(['loaded']);
  });
});
