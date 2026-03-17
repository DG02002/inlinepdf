import type { EntryContext, HandleErrorFunction } from 'react-router';
import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

export const handleError: HandleErrorFunction = (error, { request }) => {
  if (request.signal.aborted) {
    return;
  }

  console.error(error);
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const userAgent = request.headers.get('user-agent');

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError() {
        responseStatusCode = 500;
      },
    },
  );

  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Cache-Control', 'no-store');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
