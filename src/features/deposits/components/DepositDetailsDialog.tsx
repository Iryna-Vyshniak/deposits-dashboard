import { useEffect, useRef } from 'react';
import { formatCurrency } from '../../../shared/lib/formatCurrency';
import { Icon } from '../../../shared/icons/Icon';
import type { Deposit } from '../types/deposit';
import { DepositStatus } from './DepositStatus';

interface DepositDetailsDialogProps {
  deposit: Deposit | null;
  onClose: () => void;
}

export function DepositDetailsDialog({ deposit, onClose }: DepositDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (deposit && !dialog.open) dialog.showModal();
    if (!deposit && dialog.open) dialog.close();
  }, [deposit]);

  return (
    <dialog
      ref={dialogRef}
      className="deposit-dialog"
      aria-labelledby="deposit-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {deposit ? (
        <article className="deposit-dialog__panel">
          <header className="deposit-dialog__header">
            <div className="deposit-dialog__identity">
              <img src={deposit.property.image} alt={deposit.property.imageAlt} width={76} height={76} />
              <div>
                <p className="eyebrow eyebrow--visible">{deposit.property.region}</p>
                <h2 id="deposit-dialog-title">{deposit.property.name}</h2>
                <p>{deposit.property.location}, {deposit.property.country}</p>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Close deposit details" onClick={() => dialogRef.current?.close()}>
              <Icon name="close" size={20} />
            </button>
          </header>

          <div className="deposit-dialog__status">
            <DepositStatus label={deposit.status} tone={deposit.statusTone} />
          </div>

          <dl className="deposit-dialog__grid">
            <div><dt>Move in date</dt><dd>{deposit.moveInDate}</dd></div>
            <div><dt>Lease term</dt><dd>{deposit.leaseTerm}</dd></div>
            <div><dt>Monthly rent</dt><dd>{formatCurrency(deposit.rent)}</dd></div>
            <div><dt>Deposit</dt><dd>{formatCurrency(deposit.deposit)}</dd></div>
            <div><dt>Deposit type</dt><dd>{deposit.depositNote}</dd></div>
            <div><dt>Payment method</dt><dd>{deposit.paymentMethod}</dd></div>
          </dl>

          <footer className="deposit-dialog__activity">
            <span>Latest activity</span>
            <strong>{deposit.lastActivity}</strong>
          </footer>
        </article>
      ) : null}
    </dialog>
  );
}
