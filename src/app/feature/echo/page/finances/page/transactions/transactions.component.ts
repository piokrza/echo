import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';

import { TransactionFormComponent } from '#finances/component/transaction-form';
import { EchoTransaction } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';

const imports = [ButtonModule, TableModule, DatePipe, TimestampToDatePipe, DynamicDialogModule];

@Component({
  selector: 'echo-transactions',
  template: `
    <button pButton class="mb-4" (click)="addTransaction()">Add transaction</button>

    <p-table [value]="transactions">
      <ng-template #header>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Creation date</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.description }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.createdAt | timestampToDate | date }}</td>
          <td>
            <div class="flex gap-3">
              <p-button [icon]="PrimeIcons.PLUS" [text]="true" />
              <p-button [icon]="PrimeIcons.ERASER" [text]="true" />
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  imports,
})
export class TransactionsComponent {
  readonly #dialogService = inject(DialogService);

  readonly userId = inject(Auth).currentUser?.uid ?? '';
  readonly PrimeIcons = PrimeIcons;
  readonly transactions: EchoTransaction[] = [
    {
      amount: 4200,
      createdAt: Timestamp.now(),
      type: 'expenses',
      uid: this.userId ?? '',
      description: 'pizdziocha zwachania description',
      lastUpdate: Timestamp.now(),
    },
    {
      amount: 124200,
      createdAt: Timestamp.now(),
      type: 'income',
      uid: this.userId ?? '',
      description: 'opis tego remaining income',
      lastUpdate: Timestamp.now(),
    },
  ];

  addTransaction(): void {
    this.#dialogService.open(TransactionFormComponent, {
      header: 'Add transaction',
      closable: true,
      styleClass: 'md',
    });
  }
}
