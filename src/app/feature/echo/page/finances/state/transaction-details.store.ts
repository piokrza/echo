import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { EchoTransaction, TransactionDetailsState } from '#finances/model';

const initialState: TransactionDetailsState = {
  tx: null,
  isLoading: false,
};

export const TransactionDetailsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateTransaction(tx: EchoTransaction): void {
      patchState(store, (state) => ({ ...state, tx }));
    },
    updateIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  }))
);
