import { Timestamp } from '@angular/fire/firestore';

import { TransactionType } from '#finances/model';

export interface EchoTransaction {
  uid: string;
  amount: number;
  createdAt: Timestamp;
  type: TransactionType;
  lastUpdate: Timestamp;
  description: string;
  // location: unknown; TODO: add optional location
}
