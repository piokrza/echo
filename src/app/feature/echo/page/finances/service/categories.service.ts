import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CategoryApiService } from '#finances/api';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesStore } from '#finances/state';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  readonly #categoriesStore = inject(CategoriesStore);
  readonly #categoryApiService = inject(CategoryApiService);

  getCategories$(): Observable<EchoTransactionCategory[]> {
    this.#categoriesStore.updateIsLoading(true);

    return this.#categoryApiService.getCategories$().pipe(
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
    return this.#categoryApiService.addCategory$(category);
  }

  updateCategory$(category: Partial<EchoTransactionCategory>): Observable<void> {
    return this.#categoryApiService.updateCategory$(category);
  }
}
