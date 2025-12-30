import { PrimeIcons } from 'primeng/api';

import { TransactionType } from '#finances/model';

export interface EchoTransactionCategory {
  id: string;
  uid: string;
  name: string;
  type: TransactionType;
  icon: PrimeIcons | null;
}
