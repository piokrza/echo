import { Timestamp } from '@angular/fire/firestore';

import { TransactionType } from '#finances/model';

export interface EchoTransaction {
  uid: string;
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  txDate: Timestamp;
  createdAt: Timestamp;
  lastUpdate: Timestamp;
  categoryId: string | null;
  description: string | null;
}
