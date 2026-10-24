import { lazy, Suspense, useDeferredValue, useMemo, useState } from 'react';
import { Icon } from '../../../shared/icons/Icon';
import { activeDeposits as initialActiveDeposits, closedDeposits as initialClosedDeposits, propertyImageByCity } from '../data/deposits';
import {
  formatDateLabel,
  INITIAL_VISIBLE_DEPOSITS,
  LOAD_DELAY_MS,
  matchesDepositFilter,
  matchesDepositQuery,
  type NewDepositInput,
} from '../lib/depositUtils';
import type { Deposit, DepositFilter, DepositGroup } from '../types/deposit';
import { DepositSection } from './DepositSection';
import { DepositsToolbar } from './DepositsToolbar';

const AddDepositDialog = lazy(() =>
  import('./AddDepositDialog').then((module) => ({ default: module.AddDepositDialog })),
);

const DepositDetailsDialog = lazy(() =>
  import('./DepositDetailsDialog').then((module) => ({ default: module.DepositDetailsDialog })),
);

export function DepositsPage() {
  const [activeDeposits, setActiveDeposits] = useState<Deposit[]>([...initialActiveDeposits]);
  const [closedDeposits] = useState<Deposit[]>([...initialClosedDeposits]);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [filter, setFilter] = useState<DepositFilter>('all');
  const [visible, setVisible] = useState<Record<DepositGroup, number>>({
    active: INITIAL_VISIBLE_DEPOSITS,
    closed: INITIAL_VISIBLE_DEPOSITS,
  });
  const [loadingGroup, setLoadingGroup] = useState<DepositGroup | null>(null);
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const filteredActive = useMemo(
    () => activeDeposits.filter((deposit) => matchesDepositFilter(deposit, filter) && matchesDepositQuery(deposit, deferredQuery)),
    [activeDeposits, deferredQuery, filter],
  );

  const filteredClosed = useMemo(
    () => closedDeposits.filter((deposit) => matchesDepositFilter(deposit, filter) && matchesDepositQuery(deposit, deferredQuery)),
    [closedDeposits, deferredQuery, filter],
  );

  const visibleActive = filteredActive.slice(0, visible.active);
  const visibleClosed = filteredClosed.slice(0, visible.closed);

  function resetVisibleCounts() {
    setVisible({ active: INITIAL_VISIBLE_DEPOSITS, closed: INITIAL_VISIBLE_DEPOSITS });
  }

  function updateQuery(value: string) {
    setQuery(value);
    resetVisibleCounts();
  }

  function updateFilter(value: DepositFilter) {
    setFilter(value);
    resetVisibleCounts();
  }

  async function showAll(group: DepositGroup) {
    const source = group === 'active' ? filteredActive : filteredClosed;
    setLoadingGroup(group);
    setAnnouncement(`Loading ${group} deposits.`);
    await new Promise((resolve) => window.setTimeout(resolve, LOAD_DELAY_MS));
    setVisible((current) => ({ ...current, [group]: source.length }));
    setLoadingGroup(null);
    setAnnouncement(`All ${source.length} ${group} deposits are now visible.`);
  }

  function showLess(group: DepositGroup) {
    setVisible((current) => ({ ...current, [group]: INITIAL_VISIBLE_DEPOSITS }));
    setAnnouncement(`${group === 'active' ? 'Active' : 'Closed'} deposits collapsed.`);
  }

  function addDeposit(input: NewDepositInput) {
    const image: string = propertyImageByCity[input.city] ?? propertyImageByCity.Sacramento ?? '';
    const newDeposit: Deposit = {
      id: `active-${Date.now()}`,
      group: 'active',
      property: {
        name: input.propertyName,
        location: input.city,
        country: input.country,
        region: input.region,
        image,
        imageAlt: `Illustrated exterior representing the ${input.city} rental property`,
      },
      moveInDate: formatDateLabel(input.moveInDate),
      rent: input.rent,
      deposit: input.deposit,
      depositNote: input.depositNote,
      status: 'Awaiting Bank Processing',
      statusTone: 'warning',
      leaseTerm: '12 months',
      paymentMethod: input.region === 'Europe' ? 'SEPA transfer' : 'ACH bank transfer',
      lastActivity: 'Deposit created just now',
    };

    setActiveDeposits((current) => [newDeposit, ...current]);
    setAnnouncement(`${input.propertyName} was added to active deposits.`);
    return newDeposit;
  }

  return (
    <article className="deposits-page" id="deposits" aria-labelledby="page-title">
      <header className="deposits-page__header">
        <div className="deposits-page__title">
          <p className="eyebrow">Property finance</p>
          <h1 id="page-title" className="sr-only">Deposits dashboard</h1>
        </div>
        <button className="add-deposit-button" type="button" aria-label="Add a new deposit" onClick={() => setAddDialogOpen(true)}>
          <Icon name="plus" size={27} />
        </button>
      </header>

      <DepositsToolbar
        query={query}
        filter={filter}
        onQueryChange={updateQuery}
        onFilterChange={updateFilter}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

      <div className="deposits-page__sections">
        <DepositSection
          id="active-deposits"
          title="Active Deposits"
          total={activeDeposits.length}
          group="active"
          deposits={visibleActive}
          actionLabel="All Active Deposits"
          isLoading={loadingGroup === 'active'}
          hasMore={visible.active < filteredActive.length}
          isExpanded={visible.active >= filteredActive.length && filteredActive.length > INITIAL_VISIBLE_DEPOSITS}
          onShowAll={showAll}
          onShowLess={showLess}
          onSelectDeposit={setSelectedDeposit}
        />
        <DepositSection
          id="closed-deposits"
          title="Closed Deposits"
          total={closedDeposits.length}
          group="closed"
          deposits={visibleClosed}
          actionLabel="All Closed Deposits"
          isLoading={loadingGroup === 'closed'}
          hasMore={visible.closed < filteredClosed.length}
          isExpanded={visible.closed >= filteredClosed.length && filteredClosed.length > INITIAL_VISIBLE_DEPOSITS}
          onShowAll={showAll}
          onShowLess={showLess}
          onSelectDeposit={setSelectedDeposit}
        />
      </div>

      {selectedDeposit ? (
        <Suspense fallback={null}>
          <DepositDetailsDialog deposit={selectedDeposit} onClose={() => setSelectedDeposit(null)} />
        </Suspense>
      ) : null}

      {isAddDialogOpen ? (
        <Suspense fallback={null}>
          <AddDepositDialog
            open
            onClose={() => setAddDialogOpen(false)}
            onCreate={(input) => {
              const createdDeposit = addDeposit(input);
              setAddDialogOpen(false);
              setSelectedDeposit(createdDeposit);
            }}
          />
        </Suspense>
      ) : null}
    </article>
  );
}
