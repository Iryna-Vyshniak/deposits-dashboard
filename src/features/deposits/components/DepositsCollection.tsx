import { formatCurrency } from '../../../shared/lib/formatCurrency';
import { Icon } from '../../../shared/icons/Icon';
import type { Deposit } from '../types/deposit';
import { DepositStatus } from './DepositStatus';

interface DepositsCollectionProps {
  deposits: readonly Deposit[];
  label: string;
  onSelectDeposit: (deposit: Deposit) => void;
}

function PropertyIdentity({ deposit, onSelectDeposit }: { deposit: Deposit; onSelectDeposit: (deposit: Deposit) => void }) {
  return (
    <div className="property-cell">
      <img
        className="property-cell__image"
        src={deposit.property.image}
        alt={deposit.property.imageAlt}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
      />
      <div className="property-cell__copy">
        <button className="property-cell__name" type="button" onClick={() => onSelectDeposit(deposit)}>
          {deposit.property.name}
        </button>
        <p className="property-cell__location">{deposit.property.location}</p>
      </div>
    </div>
  );
}

export function DepositsCollection({ deposits, label, onSelectDeposit }: DepositsCollectionProps) {
  if (deposits.length === 0) {
    return (
      <div className="empty-state" role="status">
        <Icon name="search" size={24} />
        <p>No deposits match the current search and filter.</p>
      </div>
    );
  }

  return (
    <>
      <div className="deposit-table-wrap">
        <table className="deposit-table">
          <caption className="sr-only">{label}</caption>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Move in date</th>
              <th scope="col">Rent</th>
              <th scope="col">Deposit</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.id}>
                <td>
                  <PropertyIdentity deposit={deposit} onSelectDeposit={onSelectDeposit} />
                </td>
                <td>{deposit.moveInDate}</td>
                <td>{formatCurrency(deposit.rent)}</td>
                <td>
                  <span className="deposit-amount">{formatCurrency(deposit.deposit)}</span>
                  <span className="deposit-note">{deposit.depositNote}</span>
                </td>
                <td>
                  <DepositStatus label={deposit.status} tone={deposit.statusTone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="deposit-cards" aria-label={label}>
        {deposits.map((deposit) => (
          <li key={`${deposit.id}-card`} className="deposit-card">
            <article aria-labelledby={`${deposit.id}-title`}>
              <header className="deposit-card__header">
                <div className="property-cell">
                  <img
                    className="property-cell__image"
                    src={deposit.property.image}
                    alt={deposit.property.imageAlt}
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="property-cell__copy">
                    <button
                      id={`${deposit.id}-title`}
                      className="property-cell__name"
                      type="button"
                      onClick={() => onSelectDeposit(deposit)}
                    >
                      {deposit.property.name}
                    </button>
                    <p className="property-cell__location">
                      {deposit.property.location} · {deposit.property.country}
                    </p>
                  </div>
                </div>
              </header>

              <dl className="deposit-card__details">
                <div className="deposit-card__detail">
                  <dt>Move in date</dt>
                  <dd>{deposit.moveInDate}</dd>
                </div>
                <div className="deposit-card__detail">
                  <dt>Rent</dt>
                  <dd>{formatCurrency(deposit.rent)}</dd>
                </div>
                <div className="deposit-card__detail">
                  <dt>Deposit</dt>
                  <dd>
                    <span className="deposit-amount">{formatCurrency(deposit.deposit)}</span>
                    <span className="deposit-note">{deposit.depositNote}</span>
                  </dd>
                </div>
                <div className="deposit-card__detail">
                  <dt>Status</dt>
                  <dd>
                    <DepositStatus label={deposit.status} tone={deposit.statusTone} />
                  </dd>
                </div>
              </dl>

              <button className="deposit-card__open" type="button" onClick={() => onSelectDeposit(deposit)}>
                View deposit <Icon name="arrow-right" size={16} />
              </button>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
