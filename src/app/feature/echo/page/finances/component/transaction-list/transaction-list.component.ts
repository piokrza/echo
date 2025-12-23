import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { EchoTransaction } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';
import { BreakpointService } from '#ui/service';

const imports = [ButtonModule, TableModule, TimestampToDatePipe, DatePipe, CardModule, TitleCasePipe];

@Component({
  selector: 'echo-transaction-list',
  template: `
    @if (isOverSmBreakpoint()) {
      <p-table [value]="transactions()">
        <ng-template #header>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Creation date</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template #body let-tx>
          <tr>
            <td>{{ tx.description }}</td>
            <td>{{ tx.amount }}</td>
            <td>{{ tx.type }}</td>
            <td>{{ tx.createdAt | timestampToDate | date }}</td>
            <td>
              <div class="flex gap-3">
                <p-button
                  pTooltip="Edit"
                  severity="info"
                  tooltipPosition="bottom"
                  [icon]="PrimeIcons.FILE_EDIT"
                  [text]="true"
                  (onClick)="editTx.emit(tx)" />
                <p-button
                  pTooltip="Delete"
                  severity="danger"
                  tooltipPosition="bottom"
                  [icon]="PrimeIcons.ERASER"
                  [text]="true"
                  (onClick)="deleteTx.emit(tx.id)" />
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    } @else {
      <div class="grid gap-3">
        @for (tx of transactions(); track tx.createdAt) {
          <p-card>
            <p [class]="['text-lg', tx.type === 'income' ? 'color-success' : 'color-danger']">{{ tx.type | titlecase }}</p>
            <p>Amount: {{ tx.amount }}zł</p>
            <p>Create date: {{ tx.createdAt | timestampToDate | date }}</p>
            @if (tx.description) {
              <p>{{ tx.description }}</p>
            }

            <div class="grid gap-3 grid-cols-2 mt-4">
              <p-button class="wide" severity="info" [outlined]="true" [icon]="PrimeIcons.FILE_EDIT" (onClick)="editTx.emit(tx)" />
              <p-button class="wide" severity="danger" [outlined]="true" [icon]="PrimeIcons.ERASER" (onClick)="deleteTx.emit(tx.id)" />
            </div>
          </p-card>
        }
      </div>
    }
  `,
  imports,
})
export class TransactionListComponent {
  readonly transactions = input.required<EchoTransaction[]>();

  readonly deleteTx = output<string>();
  readonly editTx = output<EchoTransaction>();

  readonly isOverSmBreakpoint = inject(BreakpointService).observe('sm');

  readonly PrimeIcons = PrimeIcons;
}
