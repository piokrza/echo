import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, tap, throwError } from 'rxjs';

import { CategoryApiService } from '#finances/api';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  readonly #auth = inject(Auth);
  readonly #categoriesStore = inject(CategoriesStore);
  readonly #categoryApiService = inject(CategoryApiService);

  getCategories$(): Observable<EchoTransactionCategory[]> {
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

    return this.#categoryApiService.addCategory$({ ...category, uid: userId });
  }

  updateCategory$(category: Partial<EchoTransactionCategory>): Observable<void> {
    return this.#categoryApiService.updateCategory$(category);
  }

  deleteCategory$(id: string): Observable<void> {
    return this.#categoryApiService.deleteCategory$(id);
  }
}
