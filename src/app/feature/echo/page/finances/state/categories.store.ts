import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { EchoTransactionCategory } from '#finances/model';

interface CategoriesState {
  isLoading: boolean;
  categories: EchoTransactionCategory[];
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
    updateCategories(categories: EchoTransactionCategory[]): void {
      patchState(store, (state) => ({ ...state, categories }));
    },
  }))
);
