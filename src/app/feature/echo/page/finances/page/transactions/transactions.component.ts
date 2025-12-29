import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { TransactionFormComponent } from '#finances/component/transaction-form';
import { TransactionListComponent } from '#finances/component/transaction-list';
import { TransactionsService } from '#finances/service';

const imports = [ButtonModule, TableModule, DynamicDialogModule, TooltipModule, TransactionListComponent, ProgressSpinnerModule];

@Component({
  selector: 'echo-transactions',
  template: `
    @let s = state();
    @if (s.isLoading) {
      <div class="flex justify-center">
        <p-progress-spinner ariaLabel="loading" />
      </div>
    } @else {
      <button pButton class="mb-4" (click)="addTransaction()">Add transaction</button>
      <echo-transaction-list [transactions]="s.transactions" />
    }
  `,
  imports,
})
export class TransactionsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #transactionsService = inject(TransactionsService);

  readonly state = this.#transactionsService.state;

  readonly PrimeIcons = PrimeIcons;

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
}
