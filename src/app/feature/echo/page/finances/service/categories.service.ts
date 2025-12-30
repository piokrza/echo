import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { EMPTY, Observable, tap, throwError } from 'rxjs';

import { CategoryApiService } from '#finances/api';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  readonly #auth = inject(Auth);
  readonly #categoriesStore = inject(CategoriesStore);
  readonly #categoryApiService = inject(CategoryApiService);

  getCategories$(): Observable<EchoTransactionCategory[]> {
    if (this.#categoriesStore.categories() !== null) {
      return EMPTY;
    }

    return this.loadCategories$();
  }

  loadCategories$(): Observable<EchoTransactionCategory[]> {
    const userId = this.#auth.currentUser?.uid;
    if (!userId) {
      return throwError(() => 'User id is missing');
    }

    this.#categoriesStore.updateIsLoading(true);
    return this.#categoryApiService.getCategories$(userId).pipe(
      tap({
        next: (categories) => {
          this.#categoriesStore.updateCategories(categories);
        },
        finalize: () => {
          this.#categoriesStore.updateIsLoading(false);
        },
      })
    );
  }

  addCategory$(category: Partial<EchoTransactionCategory>): Observable<string> {
    const userId = this.#auth.currentUser?.uid;
    if (!userId) {
      throwError(() => 'User id is missing');
    }

    const payload: Partial<EchoTransactionCategory> = { ...category, uid: userId };
    return this.#categoryApiService.addCategory$(payload).pipe(
      tap((id) => {
        this.#categoriesStore.addCategory({ ...payload, id } as EchoTransactionCategory);
      })
    );
  }

  updateCategory$(category: Partial<EchoTransactionCategory>): Observable<void> {
    return this.#categoryApiService.updateCategory$(category).pipe(
      tap(() => {
        // TODO: store update category here
      })
    );
  }

  deleteCategory$(id: string): Observable<void> {
    return this.#categoryApiService.deleteCategory$(id).pipe(
      tap(() => {
        this.#categoriesStore.deleteCategory(id);
      })
    );
  }
}
