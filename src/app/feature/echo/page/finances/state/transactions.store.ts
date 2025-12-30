import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { EchoTransaction, TransactionsState, TransactionType } from '#finances/model';

const initialState: TransactionsState = {
  isLoading: false,
  transactions: null,
  selectedTxType: 'all',
};

export const TransactionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateTxType(type: TransactionType): void {
      patchState(store, (state) => ({ ...state, selectedTxType: type }));
    },
    updateIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
    updateTransactions(transactions: EchoTransaction[]): void {
      patchState(store, (state) => ({ ...state, transactions }));
    },
    addTransaction(transaction: EchoTransaction): void {
      const currentTransactions = store.transactions() ?? [];
      patchState(store, (state) => ({ ...state, transactions: [...currentTransactions, transaction] }));
    },
  })),
  withComputed(({ selectedTxType, transactions }) => ({
    filteredTransactions: computed<EchoTransaction[]>(() => {
      const get = (selectedType: TransactionType) => transactions()?.filter(({ type }) => type === selectedType) ?? [];

      switch (selectedTxType()) {
        case 'expense':
          return get('expense');
        case 'income':
          return get('income');
        default:
          return transactions() ?? [];
      }
    }),
  }))
);
