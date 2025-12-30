import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { finalize, Observable, tap } from 'rxjs';

import { TransactonApiService } from '#finances/api';
import { EchoTransaction, TransactionType } from '#finances/model';
import { TransactionsStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  readonly #auth = inject(Auth);
  readonly #transactionsStore = inject(TransactionsStore);
  readonly #transactionsApiService = inject(TransactonApiService);

  addTransaction$(transaction: Partial<EchoTransaction>): Observable<string> {
    return this.#transactionsApiService.addTransaction$({ ...transaction, uid: this.#auth.currentUser?.uid });
  }

  getTransactions$(): Observable<EchoTransaction[]> {
    this.#transactionsStore.updateIsLoading(true);
    return this.#transactionsApiService.getTransactions$().pipe(
      tap((transactions) => {
        this.#transactionsStore.updateTransactions(transactions);
      }),
      finalize(() => this.#transactionsStore.updateIsLoading(false))
    );
  }

  setSelectedTxType(type: TransactionType): void {
    this.#transactionsStore.updateTxType(type);
  }
}
