import {
  ArrangeIcon,
  CodeIcon,
  CropIcon,
  File01Icon,
  GitMergeIcon,
  ImageDownloadIcon,
  ImageUploadIcon,
  InformationCircleIcon,
  OpenSourceIcon,
  SecurityLockIcon,
  SplitIcon,
  WorkflowCircle01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from 'react-router';

import { Shell } from '~/components/layout/shell';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button-variants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { toolsRegistry } from '~/features/tools/registry';

const heroLogoByTheme = {
  light: '/icons/hero-logo-dark-1024.png',
  dark: '/icons/hero-logo-light-1024.png',
} as const;

export function meta() {
  return [
    { title: 'InlinePDF | Local-First PDF Tools' },
    {
      name: 'description',
      content:
        'InlinePDF delivers a cleaner local-first PDF workflow with private in-browser processing and open-source transparency.',
    },
  ];
}

const toolLabelById: Record<string, string> = {
  'crop-pdf-new': 'Crop',
  'image-to-pdf': 'Image to PDF',
  'merge-pdf': 'Merge',
  'organize-pdf': 'Organize',
  'pdf-info': 'PDF Info',
  'pdf-to-images': 'PDF to Images',
  'split-pdf': 'Split',
};

const toolShortDescriptionById: Record<string, string> = {
  'crop-pdf-new': 'Crop pages with precision.',
  'image-to-pdf': 'Convert images into one PDF.',
  'merge-pdf': 'Join multiple PDFs fast.',
  'organize-pdf': 'Reorder, rotate, and clean pages.',
  'pdf-info': 'Inspect metadata and fonts.',
  'pdf-to-images': 'Export pages as images.',
  'split-pdf': 'Extract specific page ranges.',
};

const toolIconById: Partial<Record<string, typeof File01Icon>> = {
  'crop-pdf-new': CropIcon,
  'image-to-pdf': ImageUploadIcon,
  'merge-pdf': GitMergeIcon,
  'organize-pdf': ArrangeIcon,
  'pdf-info': InformationCircleIcon,
  'pdf-to-images': ImageDownloadIcon,
  'split-pdf': SplitIcon,
} as const;

export default function HomeRoute() {
  const readyTools = toolsRegistry.filter((tool) => tool.status === 'ready');

  return (
    <Shell>
      <section className="space-y-10 md:space-y-14">
        <section className="bg-linear-to-b from-muted/35 to-background px-6 py-8 sm:px-12 sm:py-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <img
              src={heroLogoByTheme.light}
              width={160}
              height={160}
              alt="InlinePDF logo"
              className="size-[10rem] rounded-[1.4rem] dark:hidden"
            />
            <img
              src={heroLogoByTheme.dark}
              width={160}
              height={160}
              alt="InlinePDF logo"
              className="hidden size-[10rem] rounded-[1.4rem] dark:block"
            />
            <h1 className="scroll-m-20 text-5xl font-medium tracking-tight text-balance sm:text-6xl">
              InlinePDF
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A local-first PDF toolkit focused on cleaner UX, faster workflows,
              and upcoming features like crop pipelines while keeping every file
              on your device.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline">Local-First</Badge>
              <Badge variant="outline">No Uploads</Badge>
              <Badge variant="outline">Open Source</Badge>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Implemented Tools
              </h2>
            </div>
            <Link
              to="/tools"
              prefetch="intent"
              className={buttonVariants({ variant: 'outline' })}
            >
              View full catalog
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {readyTools.map((tool) => {
              const icon = toolIconById[tool.id] ?? File01Icon;
              const label = toolLabelById[tool.id] ?? tool.title;
              const shortDescription =
                toolShortDescriptionById[tool.id] ??
                'Local browser processing.';

              return (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    prefetch="intent"
                    className="block h-full"
                  >
                    <Card className="h-full border-border/80 bg-card/95 transition-all hover:-translate-y-0.5 hover:ring-foreground/20">
                      <CardHeader className="items-center justify-items-center text-center">
                        <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-background">
                          <HugeiconsIcon
                            icon={icon}
                            size={22}
                            strokeWidth={1.8}
                          />
                        </div>
                        <CardTitle>{label}</CardTitle>
                        <CardDescription>{shortDescription}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <Card className="border-border/80 bg-card/95">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-background">
                <HugeiconsIcon
                  icon={SecurityLockIcon}
                  size={22}
                  strokeWidth={1.8}
                />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Privacy You Can Verify
              </CardTitle>
              <CardDescription className="max-w-3xl text-base leading-7 text-muted-foreground">
                InlinePDF processes files locally in your browser, but you
                should never trust privacy claims blindly. This codebase is open
                for audit, so anyone can verify how file handling works before
                relying on it.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              <Card size="sm" className="border-border/70 bg-background/60">
                <CardContent className="py-1 text-sm">
                  No file uploads by design.
                </CardContent>
              </Card>
              <Card size="sm" className="border-border/70 bg-background/60">
                <CardContent className="py-1 text-sm">
                  No accounts, no trackers, no cloud queue.
                </CardContent>
              </Card>
              <Card size="sm" className="border-border/70 bg-background/60">
                <CardContent className="py-1 text-sm">
                  Transparent source available for review.
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-border/80 bg-card/95">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-background">
                <HugeiconsIcon
                  icon={OpenSourceIcon}
                  size={22}
                  strokeWidth={1.8}
                />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Built in the Open
              </CardTitle>
              <CardDescription className="max-w-3xl text-base leading-7 text-muted-foreground">
                This project is evolving with a strong UX focus, practical
                local-only features, and deliberate additions like crop pipeline
                workflows. The roadmap is transparent and easy to inspect, fork,
                and improve.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="outline" className="h-8 gap-2 px-3">
                <HugeiconsIcon icon={CodeIcon} size={16} strokeWidth={1.8} />
                Open codebase
              </Badge>
              <Badge variant="outline" className="h-8 gap-2 px-3">
                <HugeiconsIcon
                  icon={WorkflowCircle01Icon}
                  size={16}
                  strokeWidth={1.8}
                />
                UX-first roadmap
              </Badge>
            </CardContent>
          </Card>
        </section>
      </section>
    </Shell>
  );
}
