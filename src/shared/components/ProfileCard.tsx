interface ProfileCardProps {
  compact?: boolean;
}

const userAvatar = '/assets/scott-grant.png';

export function ProfileCard({ compact = false }: ProfileCardProps) {
  return (
    <div className={compact ? 'profile-card profile-card--compact' : 'profile-card'}>
      <img
        className={compact ? 'profile-card__avatar profile-card__avatar--small' : 'profile-card__avatar'}
        src={userAvatar}
        alt="Scott Grant"
        width={72}
        height={72}
        loading="eager"
        fetchPriority={compact ? 'auto' : 'high'}
        decoding={compact ? 'async' : 'sync'}
      />
      {!compact && <p className="profile-card__name">Scott Grant</p>}
    </div>
  );
}
