import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { TransactionFormComponent } from '#finances/component/transaction-form';
import { TransactionListComponent } from '#finances/component/transaction-list';
import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';

const imports = [ButtonModule, TableModule, DynamicDialogModule, TooltipModule, TransactionListComponent];

@Component({
  selector: 'echo-transactions',
  template: `
    @let s = state();
    @if (s.isLoading) {
      <h1>LOADING...</h1>
    } @else {
      <button pButton class="mb-4" (click)="openTransactionDialog()">Add transaction</button>
      <echo-transaction-list
        [transactions]="s.transactions"
        (editTx)="openTransactionDialog($event)"
        (deleteTx)="deleteTransaction($event)" />
    }
  `,
  imports,
})
export class TransactionsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #transactionsService = inject(TransactionsService);
  readonly #confirmationService = inject(ConfirmationService);

  readonly state = this.#transactionsService.state;

  readonly PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    this.#transactionsService.getTransactions$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  openTransactionDialog(tx?: EchoTransaction): void {
    this.#dialogService.open(TransactionFormComponent, {
      data: tx,
      closable: true,
      styleClass: 'md',
      closeOnEscape: true,
      header: `${tx ? 'Edit' : 'Add'} transaction`,
    });
  }

  deleteTransaction(txId: string): void {
    this.#confirmationService.confirm({
      header: 'Do you want to delete this transaction?',
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
        this.#transactionsService.deleteTransaction$(txId);
      },
    });
  }
}
