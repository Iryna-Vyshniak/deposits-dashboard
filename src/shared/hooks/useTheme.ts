import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const storageKey = 'deposits-dashboard-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  } catch {
    // Storage can be unavailable in hardened/private browsing contexts.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The visual theme still works when persistent storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme } as const;
}
