import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { OptionWithLabel } from '#core/model';
import { TransactionFormComponent } from '#finances/component/transaction-form';
import { TransactionListComponent } from '#finances/component/transaction-list';
import { TransactionType } from '#finances/model';
import { TransactionsService } from '#finances/service';
import { TransactionsStore } from '#finances/state';

const imports = [
  TableModule,
  FormsModule,
  SelectModule,
  ButtonModule,
  TooltipModule,
  DynamicDialogModule,
  ProgressSpinnerModule,
  TransactionListComponent,
];

@Component({
  selector: 'echo-transactions',
  template: `
    @if (store.isLoading()) {
      <div class="flex justify-center">
        <p-progress-spinner ariaLabel="loading" />
      </div>
    } @else {
      <div class="mb-4 flex justify-between flex-wrap">
        <button pButton (click)="addTransaction()">Add transaction</button>
        <p-select
          class="w-full max-w-[200px]"
          optionLabel="label"
          optionValue="value"
          [options]="transactionTypes"
          [(ngModel)]="selectedTransactionType"
          (onChange)="txTypeChange($event)" />
      </div>

      <echo-transaction-list [transactions]="store.filteredTransactions()" />
    }
  `,
  imports,
})
export class TransactionsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #transactionsService = inject(TransactionsService);

  readonly store = inject(TransactionsStore);

  readonly PrimeIcons = PrimeIcons;

  readonly selectedTransactionType: TransactionType = this.store.selectedTxType();
  readonly transactionTypes: OptionWithLabel<TransactionType>[] = [
    { value: 'all', label: 'All' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  ngOnInit(): void {
    this.#transactionsService.getTransactions$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  addTransaction(): void {
    this.#dialogService.open(TransactionFormComponent, {
      closable: true,
      closeOnEscape: true,
      header: 'Add transaction',
    });
  }

  txTypeChange(event: SelectChangeEvent) {
    this.#transactionsService.setSelectedTxType(event.value);
  }
}
