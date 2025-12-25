import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowSelectEvent } from 'primeng/table';

import { TransactionMobileTileComponent } from '#finances/component/transaction-mobile-tile';
import { EchoTransaction } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';
import { BreakpointService } from '#ui/service';

const imports = [ButtonModule, TableModule, TimestampToDatePipe, DatePipe, TransactionMobileTileComponent];

@Component({
  selector: 'echo-transaction-list',
  template: `
    @if (isOverSmBreakpoint()) {
      <p-table selectionMode="single" [value]="transactions()" (onRowSelect)="rowClick($event)">
        <ng-template #header>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Transaction date</th>
            <th>Create date</th>
            <th></th>
          </tr>
        </ng-template>
        <ng-template #body let-tx>
          <tr [pSelectableRow]="tx.id">
            <td>{{ tx.description }}</td>
            <td>{{ tx.amount }}</td>
            <td>{{ tx.type }}</td>
            <td>{{ tx.txDate | timestampToDate | date }}</td>
            <td>{{ tx.createdAt | timestampToDate | date }}</td>
            <td>
              <div class="flex items-center justify-center">
                <i [class]="PrimeIcons.CHEVRON_CIRCLE_RIGHT"></i>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    } @else {
      <div class="grid gap-3">
        @for (tx of transactions(); track tx.createdAt) {
          <echo-transaction-mobile-tile [tx]="tx" (itemClick)="goToDetails($event)" />
        }
      </div>
    }
  `,
  imports,
})
export class TransactionListComponent {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly transactions = input.required<EchoTransaction[]>();

  readonly deleteTx = output<string>();
  readonly editTx = output<EchoTransaction>();

  readonly isOverSmBreakpoint = inject(BreakpointService).observe('sm');

  selectedTx!: EchoTransaction;
  readonly PrimeIcons = PrimeIcons;

  rowClick(event: TableRowSelectEvent<EchoTransaction>): void {
    const txId = (event.data as EchoTransaction).id;
    this.goToDetails(txId);
  }

  goToDetails(txId: string): void {
    this.#router.navigate([txId], { relativeTo: this.#activatedRoute });
  }
}
