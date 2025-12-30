import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { finalize, Observable, tap, throwError } from 'rxjs';

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
    const userId = this.#auth.currentUser?.uid;
    if (!userId) {
      return throwError(() => 'User id is missing');
    }

    this.#transactionsStore.updateIsLoading(true);
    return this.#transactionsApiService.getTransactions$(userId).pipe(
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
