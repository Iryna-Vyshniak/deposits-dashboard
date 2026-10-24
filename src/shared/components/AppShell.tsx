import { useState, type PropsWithChildren } from 'react';
import { useTheme } from '../hooks/useTheme';
import { AppHeader } from './AppHeader';
import { MobileNavigation } from './MobileNavigation';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: PropsWithChildren) {
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />
      <div className="app-shell__workspace">
        <AppHeader onOpenNavigation={() => setNavigationOpen(true)} />
        <main id="main-content" className="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
      <MobileNavigation
        open={isNavigationOpen}
        theme={theme}
        onClose={() => setNavigationOpen(false)}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
