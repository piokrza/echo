import { Injectable } from '@angular/core';

import { Store } from '#core/store';
import { EchoTransaction, TransactionType } from '#finances/model';

export interface TransactionsState {
  isLoading: boolean;
  transactions: EchoTransaction[];
  filteredTransactions: EchoTransaction[];
  selectedTxType: TransactionType;
}

@Injectable({ providedIn: 'root' })
export class TransactionsStore extends Store<TransactionsState> {
  constructor() {
    super({
      isLoading: false,
      transactions: [],
      selectedTxType: 'all',
      filteredTransactions: [],
    });
  }
}
