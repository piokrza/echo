import { inject, Injectable, Signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { finalize, Observable, tap, throwError } from 'rxjs';

import { TransactonApiService } from '#finances/api';
import { EchoTransaction, TransactionType } from '#finances/model';
import { TransactionsState, TransactionsStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  readonly #auth = inject(Auth);
  readonly #transactionsStore = inject(TransactionsStore);
  readonly #transactionsApiService = inject(TransactonApiService);

  readonly state: Signal<TransactionsState> = this.#transactionsStore.state;

  addTransaction$(transaction: Partial<EchoTransaction>): Observable<string> {
    return this.#transactionsApiService.addTransaction$({ ...transaction, uid: this.#auth.currentUser?.uid });
  }

  getTransactions$(): Observable<EchoTransaction[]> {
    const userId = this.#auth.currentUser?.uid;
    if (!userId) {
      return throwError(() => 'User id is missing');
    }

    this.#transactionsStore.update('isLoading', true);
    return this.#transactionsApiService.getTransactions$(userId).pipe(
      tap((transactions) => {
        this.#transactionsStore.update('transactions', transactions);
      }),
      finalize(() => this.#transactionsStore.update('isLoading', false))
    );
  }

  setSelectedTxType(type: TransactionType): void {
    this.#transactionsStore.update('selectedTxType', type);
  }
}
