import type { Theme } from '../hooks/useTheme';
import { Navigation } from './Navigation';
import { ProfileCard } from './ProfileCard';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Account sidebar">
      <ProfileCard />
      <Navigation />
      <div className="sidebar__footer">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </aside>
  );
}
