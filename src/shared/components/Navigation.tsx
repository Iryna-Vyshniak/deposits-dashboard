import { Icon, type IconName } from '../icons/Icon';

const navigationItems: ReadonlyArray<{ label: string; href: string; icon: IconName; current?: boolean }> = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'Deposits', href: '#deposits', icon: 'file', current: true },
  { label: 'Offers', href: '#offers', icon: 'gift' },
  { label: 'Payments', href: '#payments', icon: 'bank' },
  { label: 'Settings', href: '#settings', icon: 'settings' },
];

interface NavigationProps {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Primary navigation">
      <ul className="sidebar-nav" role="list">
        {navigationItems.map((item) => (
          <li key={item.label}>
            <a
              className={item.current ? 'sidebar-nav__link sidebar-nav__link--active' : 'sidebar-nav__link'}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              onClick={onNavigate}
            >
              <Icon name={item.icon} size={15} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
