import { describe, expect, it, vi } from 'vitest';

import { createToolRouteModule } from './create-tool-route-module';

function createRequest(formData: FormData) {
  return {
    formData: vi.fn(() => Promise.resolve(formData)),
  } as unknown as Request;
}

describe('createToolRouteModule', () => {
  it('uses fallback payloads and maps successful results', async () => {
    const readFallbackPayload = vi.fn(() => ({ name: 'InlinePDF' }));
    const onSuccess = vi.fn();

    const routeModule = createToolRouteModule<
      { name: string },
      { name: string },
      { greeting: string },
      { greeting: string }
    >({
      definition: {
        title: 'Test Tool',
        shortDescription: 'Exercises the shared route helper.',
      },
      errorMessage: 'The helper should map non-Error failures to this.',
      readFallbackPayload,
      parseInput({ formData, fallbackPayload }) {
        const name =
          (formData.get('name') as string | null) ?? fallbackPayload?.name;

        if (!name) {
          throw new Error('Missing name.');
        }

        return { name };
      },
      execute({ name }) {
        return Promise.resolve({ greeting: `Hello, ${name}.` });
      },
      onSuccess,
      getSuccessMessage(result) {
        return result.greeting;
      },
      mapSuccessResult(result) {
        return result;
      },
    });

    const formData = new FormData();
    formData.set('submissionId', 'submission-1');

    const response = await routeModule.clientAction({
      request: createRequest(formData),
    });

    expect(readFallbackPayload).toHaveBeenCalledWith('submission-1');
    expect(onSuccess).toHaveBeenCalledWith({ greeting: 'Hello, InlinePDF.' });
    expect(response).toEqual({
      ok: true,
      message: 'Hello, InlinePDF.',
      result: { greeting: 'Hello, InlinePDF.' },
    });
  });

  it('maps thrown errors to a failure response', async () => {
    const routeModule = createToolRouteModule<never, never, never>({
      definition: {
        title: 'Broken Tool',
        shortDescription: 'Always fails to parse input.',
      },
      errorMessage: 'Fallback failure message.',
      parseInput() {
        throw new Error('Missing payload.');
      },
      execute() {
        return Promise.reject(new Error('This should never run.'));
      },
      getSuccessMessage() {
        return 'Unreachable';
      },
    });

    const response = await routeModule.clientAction({
      request: createRequest(new FormData()),
    });

    expect(response).toEqual({
      ok: false,
      message: 'Missing payload.',
    });
  });
});
