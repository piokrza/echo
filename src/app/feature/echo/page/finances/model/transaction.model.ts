import { Timestamp } from '@angular/fire/firestore';

import { TransactionType } from '#finances/model';

export interface EchoTransaction {
  uid: string;
  type: TransactionType;
  amount: number;
  createdAt: Timestamp;
  lastUpdate?: Timestamp;
  description?: string;
  location?: unknown;
}
