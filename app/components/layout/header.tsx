import { Link } from 'react-router';

import { headerLogoByTheme } from '~/lib/theme';

import { ThemePicker } from './theme-picker';
import { containerClassName } from './container';

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div
        className={`${containerClassName} flex min-w-0 items-center justify-between gap-3 py-4`}
      >
        <Link to="/" className="inline-flex items-center gap-2 tracking-tight">
          <img
            src={headerLogoByTheme.light}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-md dark:hidden"
            aria-hidden="true"
          />
          <img
            src={headerLogoByTheme.dark}
            alt=""
            width={40}
            height={40}
            className="hidden size-10 rounded-md dark:block"
            aria-hidden="true"
          />
          <span className="text-xl font-medium">InlinePDF</span>
        </Link>
        <ThemePicker />
      </div>
    </header>
  );
}
