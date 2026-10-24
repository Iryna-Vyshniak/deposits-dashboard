import { useEffect, useRef } from 'react';
import type { Theme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Navigation } from './Navigation';
import { ProfileCard } from './ProfileCard';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavigationProps {
  open: boolean;
  theme: Theme;
  onClose: () => void;
  onToggleTheme: () => void;
}

export function MobileNavigation({ open, theme, onClose, onToggleTheme }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="mobile-nav-dialog"
      aria-label="Navigation menu"
      onClose={onClose}
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="mobile-nav-dialog__panel">
        <header className="mobile-nav-dialog__header">
          <ProfileCard />
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close navigation menu">
            <Icon name="close" size={22} />
          </button>
        </header>
        <Navigation onNavigate={onClose} />
        <div className="mobile-nav-dialog__footer">
          <span>Appearance</span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </dialog>
  );
}
