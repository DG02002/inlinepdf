import { saveClientActionFallback } from '~/platform/files/client-action-fallback';

interface ClientActionSubmitter {
  submit: (formData: FormData, options: { method: 'post' }) => unknown;
}

interface SubmitClientActionOptions<TPayload> {
  fetcher: ClientActionSubmitter;
  payload: TPayload;
  writeFormData: (formData: FormData) => void;
}

export function submitClientAction<TPayload>({
  fetcher,
  payload,
  writeFormData,
}: SubmitClientActionOptions<TPayload>): void {
  const submissionId = saveClientActionFallback(payload);
  const formData = new FormData();

  writeFormData(formData);
  formData.set('submissionId', submissionId);

  void fetcher.submit(formData, { method: 'post' });
}
