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
    updateTransaction(tx: Partial<EchoTransaction>): void {
      patchState(store, (state) => {
        const updatedTx = { ...store.tx(), ...tx } as EchoTransaction;
        return { ...state, tx: updatedTx };
      });
    },
    updateIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  }))
);
