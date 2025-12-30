import { inject, Pipe, PipeTransform } from '@angular/core';

import { CategoriesStore } from '#finances/state';

@Pipe({ name: 'txCategoryLabel' })
export class TxCategoryLabelPipe implements PipeTransform {
  readonly #categoryStore = inject(CategoriesStore);

  transform(categoryId: string | null): string {
    if (categoryId === null) return 'Uncategorized';

    const categoryName = this.#categoryStore.categories()?.find(({ id }) => id === categoryId)?.name;
    return categoryName ?? 'Not found';
  }
}
