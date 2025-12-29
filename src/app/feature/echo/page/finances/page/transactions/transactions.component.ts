import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
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
    @let s = state();
    @if (s.isLoading) {
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
      <echo-transaction-list [transactions]="state().filteredTransactions" />
    }
  `,
  imports,
})
export class TransactionsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #transactionsService = inject(TransactionsService);

  readonly state = this.#transactionsService.state;

  // TODO: use signal store
  readonly filteredTransactions = computed(() => {
    switch (this.state().selectedTxType) {
      case 'expense':
        return this.state().transactions.filter(({ type }) => type === 'expense');
      case 'income':
        return this.state().transactions.filter(({ type }) => type === 'income');
      default:
        return this.state().transactions;
    }
  });

  readonly PrimeIcons = PrimeIcons;

  readonly selectedTransactionType: TransactionType = this.state().selectedTxType;
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
