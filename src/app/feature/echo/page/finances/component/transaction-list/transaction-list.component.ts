import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TransactionMobileTileComponent } from '#finances/component/transaction-mobile-tile';
import { EchoTransaction } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';
import { BreakpointService } from '#ui/service';

const imports = [ButtonModule, TableModule, TagModule, TimestampToDatePipe, DatePipe, CurrencyPipe, TransactionMobileTileComponent];

@Component({
  selector: 'echo-transaction-list',
  template: `
    @if (isOverSmBreakpoint()) {
      <p-table [value]="transactions()">
        <ng-template #header>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Transaction date</th>
            <th>Category</th>
            <th></th>
          </tr>
        </ng-template>

        <ng-template #body let-tx>
          <tr>
            <td>{{ tx.name }}</td>
            <td>
              @let isIncome = tx.type === 'income';
              <p-tag
                [severity]="isIncome ? 'success' : 'danger'"
                [value]="(tx.amount | currency) ?? ''"
                [icon]="isIncome ? PrimeIcons.ARROW_UP : PrimeIcons.ARROW_DOWN" />
            </td>
            <td>{{ tx.txDate | timestampToDate | date }}</td>
            <td>{{ tx.categoryId }}</td>
            <td>
              <p-button severity="secondary" [text]="true" [icon]="PrimeIcons.CHEVRON_CIRCLE_RIGHT" (onClick)="goToDetails(tx.id)" />
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

  readonly PrimeIcons = PrimeIcons;

  goToDetails(txId: string): void {
    this.#router.navigate([txId], { relativeTo: this.#activatedRoute });
  }
}
