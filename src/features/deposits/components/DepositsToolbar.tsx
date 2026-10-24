import { Icon } from '../../../shared/icons/Icon';
import type { DepositFilter } from '../types/deposit';

interface DepositsToolbarProps {
  query: string;
  filter: DepositFilter;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: DepositFilter) => void;
}

export function DepositsToolbar({ query, filter, onQueryChange, onFilterChange }: DepositsToolbarProps) {
  return (
    <form className="deposits-toolbar" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="search-field">
        <span className="sr-only">Search deposits</span>
        <Icon name="search" size={17} />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search property, city or status"
          autoComplete="off"
        />
      </label>

      <label className="filter-field">
        <span className="filter-field__label">Status</span>
        <select value={filter} onChange={(event) => onFilterChange(event.target.value as DepositFilter)}>
          <option value="all">All statuses</option>
          <option value="processing">Needs processing</option>
          <option value="processed">Processed</option>
          <option value="attention">Needs attention</option>
        </select>
      </label>
    </form>
  );
}
