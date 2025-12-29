import { Timestamp } from '@angular/fire/firestore';

import { PrimeIcons } from 'primeng/api';

import { TransactionType } from '#finances/model';

export interface EchoTransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
  icon: PrimeIcons;
  createDate: Timestamp;
}
