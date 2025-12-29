import { Injectable } from '@angular/core';

import { Store } from '#core/store';
import { TransactionDetailsState } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class TransactionDetailsStore extends Store<TransactionDetailsState> {
  constructor() {
    super({
      tx: null,
      isLoading: false,
    });
  }
}
