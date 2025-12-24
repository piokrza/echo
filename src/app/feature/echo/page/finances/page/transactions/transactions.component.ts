import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

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
    <button pButton class="mb-4" (click)="openTransactionDialog()">Add transaction</button>
    <echo-transaction-list [transactions]="transactions" (editTx)="openTransactionDialog($event)" (deleteTx)="deleteTransaction($event)" />
  `,
  imports,
})
export class TransactionsComponent {
  readonly #dialogService = inject(DialogService);
  readonly #transactionsService = inject(TransactionsService);
  readonly #confirmationService = inject(ConfirmationService);

  readonly #userId = inject(Auth).currentUser?.uid ?? '';
  readonly PrimeIcons = PrimeIcons;
  readonly transactions: EchoTransaction[] = [
    {
      name: 'Zakupy',
      amount: 4200,
      createdAt: Timestamp.now(),
      type: 'expense',
      uid: this.#userId ?? '',
      description: 'pizdziocha zwachania description',
      lastUpdate: Timestamp.now(),
      id: '24141241',
      categoryId: '42',
      txDate: Timestamp.now(),
    },
    {
      name: 'piwo',
      amount: 124200,
      createdAt: Timestamp.now(),
      type: 'income',
      uid: this.#userId ?? '',
      description: 'opis tego remaining income',
      lastUpdate: Timestamp.now(),
      id: '241412412455151',
      categoryId: '55',
      txDate: Timestamp.now(),
    },
  ];

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
