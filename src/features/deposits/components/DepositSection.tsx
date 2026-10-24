import type { Deposit, DepositGroup } from '../types/deposit';
import { DepositsCollection } from './DepositsCollection';

interface DepositSectionProps {
  id: string;
  title: string;
  total: number;
  deposits: readonly Deposit[];
  group: DepositGroup;
  actionLabel: string;
  isLoading: boolean;
  hasMore: boolean;
  isExpanded: boolean;
  onShowAll: (group: DepositGroup) => void;
  onShowLess: (group: DepositGroup) => void;
  onSelectDeposit: (deposit: Deposit) => void;
}

export function DepositSection({
  id,
  title,
  total,
  deposits,
  group,
  actionLabel,
  isLoading,
  hasMore,
  isExpanded,
  onShowAll,
  onShowLess,
  onSelectDeposit,
}: DepositSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section className="deposit-section" aria-labelledby={headingId}>
      <header className="deposit-section__heading">
        <h2 id={headingId}>{title}</h2>
        <span className="count-badge" aria-label={`${total} total`}>
          {total}
        </span>
      </header>

      <DepositsCollection deposits={deposits} label={`${title} list`} onSelectDeposit={onSelectDeposit} />

      {(hasMore || isExpanded) && deposits.length > 0 ? (
        <div className="deposit-section__footer">
          <button
            className="primary-action"
            type="button"
            disabled={isLoading}
            aria-busy={isLoading}
            onClick={() => (isExpanded ? onShowLess(group) : onShowAll(group))}
          >
            {isLoading ? <span className="button-spinner" aria-hidden="true" /> : null}
            {isLoading ? 'Loading deposits…' : isExpanded ? 'Show fewer' : actionLabel}
          </button>
        </div>
      ) : null}
    </section>
  );
}
