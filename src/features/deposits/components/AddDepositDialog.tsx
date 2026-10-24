import { useEffect, useRef, type FormEvent } from 'react';
import { Icon } from '../../../shared/icons/Icon';

interface AddDepositDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (input: {
    propertyName: string;
    city: string;
    country: string;
    region: 'North America' | 'Europe';
    moveInDate: string;
    rent: number;
    deposit: number;
    depositNote: string;
  }) => void;
}

const locations = {
  Sacramento: { country: 'United States', region: 'North America' as const },
  'San Antonio': { country: 'United States', region: 'North America' as const },
  Seattle: { country: 'United States', region: 'North America' as const },
  Miami: { country: 'United States', region: 'North America' as const },
  London: { country: 'United Kingdom', region: 'Europe' as const },
  Amsterdam: { country: 'Netherlands', region: 'Europe' as const },
  Copenhagen: { country: 'Denmark', region: 'Europe' as const },
  Berlin: { country: 'Germany', region: 'Europe' as const },
  Lisbon: { country: 'Portugal', region: 'Europe' as const },
  Paris: { country: 'France', region: 'Europe' as const },
} satisfies Record<string, { country: string; region: 'North America' | 'Europe' }>;

export function AddDepositDialog({ open, onClose, onCreate }: AddDepositDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const city = String(formData.get('city')) as keyof typeof locations;
    const location = locations[city];
    const rent = Number(formData.get('rent'));
    const deposit = Number(formData.get('deposit'));

    if (!location || !Number.isFinite(rent) || !Number.isFinite(deposit) || rent <= 0 || deposit <= 0) return;

    onCreate({
      propertyName: String(formData.get('propertyName')).trim(),
      city,
      country: location.country,
      region: location.region,
      moveInDate: String(formData.get('moveInDate')),
      rent,
      deposit,
      depositNote: String(formData.get('depositNote')),
    });
    form.reset();
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="deposit-dialog add-deposit-dialog"
      aria-labelledby="add-deposit-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <form className="deposit-dialog__panel add-deposit-form" onSubmit={handleSubmit}>
        <header className="deposit-dialog__header">
          <div>
            <p className="eyebrow eyebrow--visible">New rental</p>
            <h2 id="add-deposit-title">Add deposit</h2>
            <p>Create a new active security deposit.</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close add deposit form" onClick={() => dialogRef.current?.close()}>
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className="form-grid">
          <label className="form-field form-field--wide">
            <span>Property</span>
            <input name="propertyName" type="text" placeholder="e.g. 24 Maple Lane" minLength={3} maxLength={60} required />
          </label>

          <label className="form-field">
            <span>City</span>
            <select name="city" defaultValue="Seattle" required>
              {Object.keys(locations).map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </label>

          <label className="form-field">
            <span>Move in date</span>
            <input name="moveInDate" type="date" min="2026-10-23" required />
          </label>

          <label className="form-field">
            <span>Monthly rent, USD</span>
            <input name="rent" type="number" inputMode="decimal" min="100" max="50000" step="50" placeholder="2800" required />
          </label>

          <label className="form-field">
            <span>Deposit, USD</span>
            <input name="deposit" type="number" inputMode="decimal" min="100" max="100000" step="50" placeholder="5600" required />
          </label>

          <label className="form-field form-field--wide">
            <span>Deposit type</span>
            <select name="depositNote" defaultValue="First & Security">
              <option>First & Security</option>
              <option>First & Last</option>
              <option>First, Last & Security</option>
              <option>Security deposit</option>
            </select>
          </label>
        </div>

        <footer className="form-actions">
          <button className="secondary-action" type="button" onClick={() => dialogRef.current?.close()}>Cancel</button>
          <button className="primary-action primary-action--form" type="submit">Create deposit</button>
        </footer>
      </form>
    </dialog>
  );
}
