import { describe, expect, it, vi } from 'vitest';

import { takeClientActionFallback } from '~/platform/files/client-action-fallback';

import { submitClientAction } from './submit-client-action';

describe('submitClientAction', () => {
  it('stores the fallback payload, writes form data, and submits with POST', () => {
    const submit = vi.fn();

    submitClientAction({
      fetcher: { submit },
      payload: { fileName: 'sample.pdf', pageCount: 3 },
      writeFormData(formData) {
        formData.set('fileName', 'sample.pdf');
      },
    });

    expect(submit).toHaveBeenCalledTimes(1);
    const [formData, options] = submit.mock.calls[0] as [
      FormData,
      { method: 'post' },
    ];

    expect(options).toEqual({ method: 'post' });
    expect(formData.get('fileName')).toBe('sample.pdf');

    const submissionId = formData.get('submissionId');
    expect(typeof submissionId).toBe('string');
    expect(takeClientActionFallback(submissionId as string)).toEqual({
      fileName: 'sample.pdf',
      pageCount: 3,
    });
  });
});
