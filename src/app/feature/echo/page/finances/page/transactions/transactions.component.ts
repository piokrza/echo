import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { AuthApiService } from '#auth/api';
import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';
import { TimestampToDatePipe } from '#ui/pipe';

const imports = [ButtonModule, TableModule, DatePipe, TimestampToDatePipe];

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
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.description }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.createdAt | timestampToDate | date }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  imports,
})
export class TransactionsComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #transactionService = inject(TransactionsService);

  readonly userId = inject(AuthApiService).user?.uid ?? '';
  readonly transactions: EchoTransaction[] = [
    {
      amount: 4200,
      createdAt: Timestamp.now(),
      type: 'expenses',
      uid: this.userId ?? '',
      description: 'pizdziocha zwachania description',
    },
    {
      amount: 124200,
      createdAt: Timestamp.now(),
      type: 'income',
      uid: this.userId ?? '',
      description: 'opis tego remaining income',
    },
  ];

  addTransaction(): void {
    const transaction: EchoTransaction = {
      amount: 2424,
      createdAt: Timestamp.now(),
      type: 'expenses',
      uid: this.userId,
    };

    this.#transactionService.addTransaction$(transaction).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
