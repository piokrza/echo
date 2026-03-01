import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';

import { TransactionCategoryFormComponent } from '#finances/component/transaction-category-form';
import { TransactionCategoryListComponent } from '#finances/component/transaction-category-list';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesService } from '#finances/service';
import { CategoriesStore } from '#finances/state';
import { SpinnerComponent } from '#ui/component/spinner';

const imports = [CardModule, ButtonModule, TransactionCategoryListComponent, SpinnerComponent, TabsModule, CardModule];

@Component({
  selector: 'echo-categories',
  template: `
    <div class="mb-4">
      <p-button label="Add category" (onClick)="addCategory()" />
    </div>
    @if (store.isLoading()) {
      <echo-spinner />
    } @else {
      <p-card class="w-fit">
        <p-tabs value="0" class="w-xl">
          <p-tablist>
            <p-tab value="0">Incomes</p-tab>
            <p-tab value="1">Expenses</p-tab>
          </p-tablist>

          <p-tabpanels>
            <p-tabpanel value="0">
              <echo-transaction-category-list
                [categories]="store.incomeCategories()"
                (editCategory)="editCategory($event)"
                (deleteCategory)="deleteCategory($event)" />
            </p-tabpanel>

            <p-tabpanel value="1">
              <echo-transaction-category-list
                [categories]="store.expenseCategories()"
                (editCategory)="editCategory($event)"
                (deleteCategory)="deleteCategory($event)" />
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </p-card>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  deleteCategory(id: string): void {
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
        this.#categoriesService
          .deleteCategory$(id)
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
      },
    });
  }
}
