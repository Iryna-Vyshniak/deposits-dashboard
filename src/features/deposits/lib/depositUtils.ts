import type { Deposit, DepositFilter } from '../types/deposit';

export const INITIAL_VISIBLE_DEPOSITS = 2;
export const LOAD_DELAY_MS = 550;

export interface NewDepositInput {
  propertyName: string;
  city: string;
  country: string;
  region: 'North America' | 'Europe';
  moveInDate: string;
  rent: number;
  deposit: number;
  depositNote: string;
}

export function matchesDepositFilter(deposit: Deposit, filter: DepositFilter) {
  if (filter === 'all') return true;
  if (filter === 'processing') return deposit.statusTone === 'warning';
  if (filter === 'attention') return deposit.statusTone === 'danger';
  return deposit.statusTone === 'success';
}

export function matchesDepositQuery(deposit: Deposit, query: string) {
  if (!query.trim()) return true;

  const haystack = [
    deposit.property.name,
    deposit.property.location,
    deposit.property.country,
    deposit.property.region,
    deposit.status,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase().trim());
}

export function formatDateLabel(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
