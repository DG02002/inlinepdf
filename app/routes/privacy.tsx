import type { Route } from './+types/privacy';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Privacy | InlinePDF' },
    {
      name: 'description',
      content: 'Privacy information for InlinePDF local-first tools.',
    },
  ];
};

export default function PrivacyRoute() {
  return (
    <article className="w-full py-8 sm:py-10 prose prose-slate dark:prose-invert">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>

      <p className="lead text-lg mb-8">
        InlinePDF processes files on device. The app does not send files to a
        server, collect account data, or rely on cloud processing.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">What data is used</h2>
      <p>
        InlinePDF uses only the PDF and image files selected in the app. The
        app does not access other files on the device. No account information,
        device identifiers, or usage analytics are collected.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">How the data is used</h2>
      <p>
        Selected files are used only for requested PDF operations, such as
        merging, cropping, organizing, or exporting images. Those operations
        create new local output files.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        How privacy is protected
      </h2>
      <p>
        All processing happens on device. Files are never sent to a server,
        synced, or shared with third parties. When the app closes or the page
        refreshes, loaded file data is cleared from page memory.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        User choice and control
      </h2>
      <p>
        File selection and processing stay under user control. Processing
        starts only after an explicit action. The app can be closed at any time
        to stop using the tools.
      </p>
    </article>
  );
}
