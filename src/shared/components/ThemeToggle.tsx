import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={onToggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="sr-only">{isDark ? 'Dark theme enabled' : 'Light theme enabled'}</span>
    </button>
  );
}
