import { Link } from 'react-router';

import { ThemePicker } from './theme-picker';
import { containerClassName } from './container';

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-border/80 bg-card/92 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/78 supports-[backdrop-filter]:backdrop-saturate-150">
      <div
        className={`${containerClassName} flex min-w-0 items-center justify-between gap-3 py-4`}
      >
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          InlinePDF
        </Link>
        <ThemePicker />
      </div>
    </header>
  );
}
