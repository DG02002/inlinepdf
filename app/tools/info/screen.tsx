import { Skeleton } from '~/components/ui/skeleton';
import { SinglePdfToolWorkspace } from '~/shared/tool-ui/single-pdf-tool-workspace';
import { useSuccessToast } from '~/shared/tool-ui/use-success-toast';
import { usePdfInfoWorkspace } from '~/tools/info/use-pdf-info-workspace';

export function PdfInfoToolScreen() {
  const workspace = usePdfInfoWorkspace();

  useSuccessToast(workspace.successMessage);

  return (
    <SinglePdfToolWorkspace
      title="PDF Info"
      description="Review metadata, info dictionary fields, and font details."
      selectorAriaLabel="Select PDF file"
      selectedFileEntry={workspace.selectedFileEntry}
      isBusy={workspace.isLoading}
      onSelectFile={workspace.handleFileSelection}
      onClearSelection={workspace.handleClearSelection}
      helperText={workspace.isLoading ? 'Reading PDF details...' : undefined}
      outputPanel={
        workspace.isLoading ? (
          <div className="space-y-3">
            <p className="text-sm font-medium">Metadata</p>
            <div className="space-y-2">
              {Array.from({ length: 8 }, (_, rowIndex) => (
                <div
                  key={String(rowIndex)}
                  className="grid gap-2 rounded-md border border-border/60 bg-muted/20 p-3 sm:grid-cols-[12rem_1fr]"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : workspace.result ? (
          <div className="space-y-4">
            <p className="text-sm font-medium">Metadata</p>
            <div className="space-y-2">
              {workspace.metadataRows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-b border-border pb-2 last:border-b-0 sm:grid-cols-[12rem_1fr]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-medium wrap-break-word">{value}</p>
                </div>
              ))}
              {workspace.additionalInfoEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="grid gap-1 border-b border-border pb-2 last:border-b-0 sm:grid-cols-[12rem_1fr]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {`Info: ${key}`}
                  </p>
                  <p className="text-sm font-medium wrap-break-word">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Raw XMP metadata</p>
              {workspace.rawXmpMetadata ? (
                <pre className="overflow-x-auto rounded-md border border-border p-3 text-xs">
                  <code>{workspace.rawXmpMetadata}</code>
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No XMP metadata present.
                </p>
              )}
            </div>
          </div>
        ) : null
      }
      errorMessage={workspace.errorMessage}
    />
  );
}
