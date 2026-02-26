import { useEffect, useState } from 'react';

import { cn } from '~/lib/utils';
import {
  applyThemePreference,
  getThemePreference,
  setThemePreference,
  subscribeToSystemThemeChanges,
  themePreferences,
  type ThemePreference,
} from '~/lib/theme';

const themeOptionLabels: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
};

export function ThemePicker() {
  const [theme, setTheme] = useState<ThemePreference>(() =>
    getThemePreference(),
  );

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    return subscribeToSystemThemeChanges(() => {
      if (theme === 'auto') {
        applyThemePreference('auto');
      }
    });
  }, [theme]);

  function handleThemeSelect(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    setThemePreference(nextTheme);
  }

  return (
    <div className="inline-flex items-center rounded-4xl border border-input bg-background/50 p-0.5 supports-[backdrop-filter]:bg-background/40">
      {themePreferences.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          onClick={() => {
            handleThemeSelect(value);
          }}
          className={cn(
            'min-w-[2.8rem] rounded-3xl px-2 py-1 text-xs font-medium transition-colors',
            theme === value
              ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
          )}
        >
          {themeOptionLabels[value]}
        </button>
      ))}
    </div>
  );
}
