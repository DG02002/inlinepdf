import type { Route } from './+types/terms';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Terms of Service | InlinePDF' },
    {
      name: 'description',
      content: 'Terms of Service for InlinePDF local-first tools.',
    },
  ];
};

export default function TermsRoute() {
  return (
    <article className="w-full py-8 sm:py-10 prose prose-slate dark:prose-invert">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Terms of Service
      </h1>

      <p className="lead text-lg mb-8">
        InlinePDF provides local-first PDF tools that run on device. Using the
        tools means accepting these Terms of Service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Service Description</h2>
      <p>
        InlinePDF includes tools for modifying PDF and image files. Because
        processing happens on device and not on a server, responsibility for
        selected files remains with the person using the app.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Open Source License</h2>
      <p>
        The source code for InlinePDF is available under an open-source
        license. Use of the source code is subject to the terms in the project
        license file.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Disclaimer of Warranties
      </h2>
      <p>
        InlinePDF is provided "as is" and "as available" without warranties of
        any kind. No guarantee is made that the tools will meet specific
        requirements, operate without interruption, or remain free of errors.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Limitation of Liability
      </h2>
      <p>
        Because processing happens on device, InlinePDF does not store backups
        or copies of file data. InlinePDF is not liable for data loss, file
        corruption, or other damages arising from use of the tools. Keep
        backups of important files before processing.
      </p>
    </article>
  );
}
