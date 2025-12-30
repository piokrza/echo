import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { TransactonApiService } from '#finances/api';
import { EchoTransaction } from '#finances/model';
import { TransactionDetailsStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class TransactionDetailsService {
  readonly #transactionsApiService = inject(TransactonApiService);
  readonly #transactionDetailsStore = inject(TransactionDetailsStore);

  updateTransaction$(transaction: Partial<EchoTransaction>): Observable<void> {
    return this.#transactionsApiService.updateTransaction$(transaction);
  }

  getTransactionById$(txId: string): Observable<EchoTransaction | null> {
    this.#transactionDetailsStore.updateIsLoading(true);

    return this.#transactionsApiService.getTransactionById$(txId).pipe(
      tap({
        next: (tx) => {
          this.#transactionDetailsStore.updateTransaction(tx);
        },
        finalize: () => {
          this.#transactionDetailsStore.updateIsLoading(false);
        },
      })
    );
  }

  deleteTransaction$(txId: string): Observable<void> {
    return this.#transactionsApiService.deleteTransaction$(txId);
  }
}
