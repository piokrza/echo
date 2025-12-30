import { Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';

import { TransactionCategoryFormComponent } from '#finances/component/transaction-category-form';
import { TransactionCategoryListComponent } from '#finances/component/transaction-category-list';
import { EchoTransactionCategory } from '#finances/model';

const imports = [CardModule, TransactionCategoryListComponent];

@Component({
  selector: 'echo-categories',
  template: `
    <div class="grid gap-4 md:grid-cols-2">
      <echo-transaction-category-list
        heading="Incomes"
        [categories]="mockCategories"
        (addCategory)="addCategory()"
        (editCategory)="editCategory($event)"
        (deleteCategory)="deleteCategory($event)" />

      <echo-transaction-category-list
        heading="Expenses"
        [categories]="mockCategories"
        (addCategory)="addCategory()"
        (editCategory)="editCategory($event)"
        (deleteCategory)="deleteCategory($event)" />
    </div>
  `,
  imports,
})
export class CategoriesComponent {
  constructor() {
    this.#dialogService.open(TransactionCategoryFormComponent, {
      header: 'Add category',
      closable: true,
      closeOnEscape: true,
    });
  }

  readonly #dialogService = inject(DialogService);

  readonly mockCategories: EchoTransactionCategory[] = [
    {
      icon: PrimeIcons.ADDRESS_BOOK,
      id: '241412',
      name: 'Zakupy',
      type: 'expense',
      uid: '',
    },
    {
      icon: PrimeIcons.ALIGN_JUSTIFY,
      id: '241412',
      name: 'Kurs',
      type: 'expense',
      uid: '',
    },
    {
      icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
      id: '241412',
      name: 'Wynagrodzenie',
      type: 'income',
      uid: '',
    },
    {
      uid: '',
      icon: PrimeIcons.CODE,
      id: '241412',
      name: 'Koncert',
      type: 'income',
    },
  ];

  addCategory(): void {
    this.#dialogService.open(TransactionCategoryFormComponent, {
      header: 'Add category',
      closable: true,
      closeOnEscape: true,
    });
  }

  editCategory(category: EchoTransactionCategory): void {
    // eslint-disable-next-line no-console
    console.log(category);
  }

  deleteCategory(id: string): void {
    // eslint-disable-next-line no-console
    console.log(id);
  }
}
