import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

import { TransactonApiService } from '#finances/api';
import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';
import { TransactionDetailsStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class TransactionDetailsService {
  readonly #transactionsService = inject(TransactionsService);
  readonly #transactionsApiService = inject(TransactonApiService);
  readonly #transactionDetailsStore = inject(TransactionDetailsStore);

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

  updateTransaction$(transaction: Partial<EchoTransaction>): Observable<null> {
    return this.#transactionsApiService.updateTransaction$(transaction).pipe(
      tap(() => {
        this.#transactionDetailsStore.updateTransaction(transaction);
      }),
      switchMap(() => this.#transactionsService.loadTransactions$().pipe(map(() => null)))
    );
  }

  deleteTransaction$(txId: string): Observable<null> {
    return this.#transactionsApiService
      .deleteTransaction$(txId)
      .pipe(switchMap(() => this.#transactionsService.loadTransactions$().pipe(map(() => null))));
  }
}
