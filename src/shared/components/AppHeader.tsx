import { useState } from 'react';
import { Icon } from '../icons/Icon';
import { ProfileCard } from './ProfileCard';

interface AppHeaderProps {
  onOpenNavigation: () => void;
}

const notifications = [
  { id: 'n1', title: 'Bank processing started', meta: '771 Lost Round · 8 min ago' },
  { id: 'n2', title: 'Deposit payment processed', meta: '1491 Jagged Arbor · 2 hr ago' },
  { id: 'n3', title: 'Lease needs your attention', meta: '14 Canal House · yesterday' },
];

export function AppHeader({ onOpenNavigation }: AppHeaderProps) {
  const [isInboxOpen, setInboxOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  return (
    <header className="topbar">
      <button className="topbar__menu icon-button" type="button" onClick={onOpenNavigation} aria-label="Open navigation menu">
        <Icon name="menu" size={22} />
      </button>

      <div className="topbar__actions">
        <div className="inbox-menu">
          <button
            className="icon-button icon-button--subtle inbox-menu__trigger"
            type="button"
            aria-label={`Open messages${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={isInboxOpen}
            aria-controls="inbox-panel"
            onClick={() => setInboxOpen((current) => !current)}
          >
            <Icon name="mail" size={21} />
            {unreadCount > 0 ? <span className="notification-dot" aria-hidden="true" /> : null}
          </button>

          {isInboxOpen ? (
            <section className="inbox-panel" id="inbox-panel" aria-label="Recent notifications">
              <header className="inbox-panel__header">
                <h2>Updates</h2>
                <button type="button" onClick={() => setUnreadCount(0)} disabled={unreadCount === 0}>
                  Mark all read
                </button>
              </header>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={notification.id} className={index < unreadCount ? 'inbox-panel__item inbox-panel__item--unread' : 'inbox-panel__item'}>
                    <strong>{notification.title}</strong>
                    <span>{notification.meta}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <a href="#profile" aria-label="Open Scott Grant profile">
          <ProfileCard compact />
        </a>
      </div>
    </header>
  );
}
