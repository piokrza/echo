import { Injectable } from '@angular/core';

import { Store } from '#core/store';
import { EchoTransaction } from '#finances/model';

export interface TransactionsState {
  isLoading: boolean;
  transactions: EchoTransaction[];
}

@Injectable({ providedIn: 'root' })
export class TransactionsStore extends Store<TransactionsState> {
  constructor() {
    super({
      isLoading: false,
      transactions: [],
    });
  }
}
