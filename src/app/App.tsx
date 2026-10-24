import { AppShell } from '../shared/components/AppShell';
import { DepositsPage } from '../features/deposits/components/DepositsPage';

export function App() {
  return (
    <AppShell>
      <DepositsPage />
    </AppShell>
  );
}
