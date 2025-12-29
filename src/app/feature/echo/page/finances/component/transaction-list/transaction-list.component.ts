import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
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
    @if (!transactions().length) {
      <p class="text-center">No transactions yet</p>
    } @else {
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
              <td>{{ tx.categoryId ?? 'Uncategorized' }}</td>
              <td>
                <p-button severity="secondary" [text]="true" [icon]="PrimeIcons.CHEVRON_RIGHT" (onClick)="goToDetails(tx.id)" />
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
    }
  `,
  imports,
})
export class TransactionListComponent {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly transactions = input.required<EchoTransaction[]>();

  readonly PrimeIcons = PrimeIcons;
  readonly isOverSmBreakpoint = inject(BreakpointService).observe('sm');

  goToDetails(txId: string): void {
    // TODO: use routerlink
    this.#router.navigate([txId], { relativeTo: this.#activatedRoute });
  }
}
