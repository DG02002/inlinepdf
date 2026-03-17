import { data, href, Link } from 'react-router';

import type { Route } from './+types/catchall';
import { buttonVariants } from '~/components/ui/button-variants';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Page Not Found | InlinePDF' },
    {
      name: 'description',
      content: 'The page you requested does not exist.',
    },
  ];
};

export function loader() {
  return data(null, { status: 404 });
}

export default function CatchallRoute() {
  return (
    <section className="w-full space-y-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Page not found
      </h1>
      <p className="leading-7 text-muted-foreground">
        The page does not exist. Go home or open a tool.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to={href('/')}
          prefetch="intent"
          className={buttonVariants({ size: 'lg' })}
        >
          Go Home
        </Link>
        <Link
          to={href('/merge')}
          prefetch="intent"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Open Merge PDF
        </Link>
      </div>
    </section>
  );
}
