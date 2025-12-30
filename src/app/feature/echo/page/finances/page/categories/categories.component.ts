import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';

import { TransactionCategoryFormComponent } from '#finances/component/transaction-category-form';
import { TransactionCategoryListComponent } from '#finances/component/transaction-category-list';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesService } from '#finances/service';
import { CategoriesStore } from '#finances/state';

const imports = [CardModule, TransactionCategoryListComponent];

@Component({
  selector: 'echo-categories',
  template: `
    <div class="grid gap-4 md:grid-cols-2">
      <echo-transaction-category-list
        heading="Incomes"
        [categories]="store.incomeCategories()"
        (addCategory)="addCategory()"
        (editCategory)="editCategory($event)"
        (deleteCategory)="deleteCategory($event)" />

      <echo-transaction-category-list
        heading="Expenses"
        [categories]="store.expenseCategories()"
        (addCategory)="addCategory()"
        (editCategory)="editCategory($event)"
        (deleteCategory)="deleteCategory($event)" />
    </div>
  `,
  imports,
})
export class CategoriesComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #messageService = inject(MessageService);
  readonly #categoriesService = inject(CategoriesService);
  readonly #confirmationService = inject(ConfirmationService);

  readonly store = inject(CategoriesStore);

  ngOnInit(): void {
    this.#categoriesService.getCategories$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  addCategory(): void {
    this.#dialogService.open(TransactionCategoryFormComponent, {
      header: 'Add category',
      closable: true,
      closeOnEscape: true,
    });
  }

  editCategory(category: EchoTransactionCategory): void {
    this.#dialogService.open(TransactionCategoryFormComponent, {
      header: 'Edit category',
      closable: true,
      closeOnEscape: true,
      data: category,
    });
  }

  deleteCategory(categoryId: string): void {
    this.#confirmationService.confirm({
      header: 'Do you want to delete this category?',
      closable: false,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.handleDeleteCategory(categoryId);
      },
    });
  }

  private handleDeleteCategory(categoryId: string) {
    this.#categoriesService
      .deleteCategory$(categoryId)
      .pipe(
        tap({
          error: () => {
            this.#messageService.add({
              summary: 'Error!',
              detail: 'Something went wrong',
              severity: 'error',
            });
          },
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
