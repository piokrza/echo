import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { CategoriesState, EchoTransactionCategory } from '#finances/model';

const initialState: CategoriesState = {
  categories: null,
  isLoading: false,
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },

    addCategory(category: EchoTransactionCategory): void {
      const updatedCategories = [...(store.categories() ?? []), category];
      patchState(store, (state) => ({ ...state, categories: updatedCategories }));
    },

    updateCategories(categories: EchoTransactionCategory[]): void {
      patchState(store, (state) => ({ ...state, categories }));
    },

    updateCategory(category: Partial<EchoTransactionCategory>): void {
      const updatedCategories = store.categories()?.map((c) => {
        if (c.id === category.id) return { ...c, ...category };
        return c;
      });

      patchState(store, (state) => ({ ...state, categories: updatedCategories }));
    },

    deleteCategory(categoryId: string): void {
      const updatedCategories = store.categories()?.filter(({ id }) => categoryId === id);
      patchState(store, (state) => ({ ...state, categories: updatedCategories }));
    },
  })),
  withComputed((store) => ({
    incomeCategories: computed(() => (store.categories() ?? []).filter(({ type }) => type === 'income')),
    expenseCategories: computed(() => (store.categories() ?? []).filter(({ type }) => type === 'expense')),
  }))
);
