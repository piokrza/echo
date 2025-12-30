import { Component } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { TransactionCategoryListComponent } from '#finances/component/transaction-category-list';
import { EchoTransactionCategory } from '#finances/model';

const imports = [CardModule, TransactionCategoryListComponent];

@Component({
  selector: 'echo-categories',
  template: `
    <div class="grid gap-4 md:grid-cols-2">
      <echo-transaction-category-list heading="Incomes" [categories]="mockCategories" />
      <echo-transaction-category-list heading="Expenses" [categories]="mockCategories" />
    </div>
  `,
  imports,
})
export class CategoriesComponent {
  readonly mockCategories: EchoTransactionCategory[] = [
    {
      icon: PrimeIcons.ADDRESS_BOOK,
      id: '241412',
      name: 'Zakupy',
      type: 'expense',
    },
    {
      icon: PrimeIcons.ALIGN_JUSTIFY,
      id: '241412',
      name: 'Kurs',
      type: 'expense',
    },
    {
      icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
      id: '241412',
      name: 'Wynagrodzenie',
      type: 'income',
    },
    {
      icon: PrimeIcons.CODE,
      id: '241412',
      name: 'Koncert',
      type: 'income',
    },
  ];
}
