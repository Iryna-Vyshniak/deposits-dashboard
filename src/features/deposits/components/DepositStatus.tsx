import type { DepositStatusTone } from '../types/deposit';

interface DepositStatusProps {
  label: string;
  tone: DepositStatusTone;
}

export function DepositStatus({ label, tone }: DepositStatusProps) {
  return (
    <div className="deposit-status">
      <span>{label}</span>
      <span className={`deposit-status__dot deposit-status__dot--${tone}`} aria-hidden="true" />
    </div>
  );
}
