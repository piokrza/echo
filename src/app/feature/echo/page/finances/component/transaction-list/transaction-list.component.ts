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
      <p-table selectionMode="single" [value]="transactions()" (onRowSelect)="goToTxDetails($event)">
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

              <!-- <div class="flex gap-3">
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
              </div> -->
            </td>
          </tr>
        </ng-template>
      </p-table>
    } @else {
      <div class="grid gap-3">
        @for (tx of transactions(); track tx.createdAt) {
          <echo-transaction-mobile-tile [tx]="tx" (deleteTx)="deleteTx.emit($event)" (editTx)="editTx.emit($event)" />
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

  goToTxDetails(event: TableRowSelectEvent<EchoTransaction>) {
    const txId = event.data;
    this.#router.navigate([txId], { relativeTo: this.#activatedRoute });
  }
}
