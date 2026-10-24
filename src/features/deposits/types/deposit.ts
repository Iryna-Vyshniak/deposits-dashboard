export type DepositStatusTone = 'warning' | 'success' | 'danger';
export type DepositGroup = 'active' | 'closed';

export interface Deposit {
  id: string;
  group: DepositGroup;
  property: {
    name: string;
    location: string;
    country: string;
    region: 'North America' | 'Europe';
    image: string;
    imageAlt: string;
  };
  moveInDate: string;
  rent: number;
  deposit: number;
  depositNote: string;
  status: string;
  statusTone: DepositStatusTone;
  leaseTerm: string;
  paymentMethod: string;
  lastActivity: string;
}

export type DepositFilter = 'all' | 'processing' | 'processed' | 'attention';
