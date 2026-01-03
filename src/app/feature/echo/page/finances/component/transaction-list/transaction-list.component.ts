import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { TransactionMobileTileComponent } from '#finances/component/transaction-mobile-tile';
import { EchoTransaction } from '#finances/model';
import { TxCategoryLabelPipe } from '#finances/pipe';
import { paginatorOptions } from '#ui/constant';
import { TimestampToDatePipe } from '#ui/pipe';
import { BreakpointService } from '#ui/service';

const imports = [
  DatePipe,
  TagModule,
  RouterLink,
  TableModule,
  ButtonModule,
  CurrencyPipe,
  TooltipModule,
  TitleCasePipe,
  TimestampToDatePipe,
  TxCategoryLabelPipe,
  TransactionMobileTileComponent,
];

@Component({
  selector: 'echo-transaction-list',
  template: `
    @if (!transactions().length) {
      <p class="text-center">No transactions yet</p>
    } @else {
      @if (isOverMdBreakpoint()) {
        <p-table
          [value]="transactions()"
          [rows]="paginatorOptions.minRows"
          [tableStyle]="{ 'table-layout': 'fixed' }"
          [rowsPerPageOptions]="paginatorOptions.rowsPerPage"
          [paginator]="transactions().length > paginatorOptions.minRows">
          <ng-template #header>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Transaction date</th>
              <th></th>
            </tr>
          </ng-template>

          <ng-template #body let-tx>
            <tr>
              <td>{{ tx.name }}</td>
              <td>
                @let isIncome = tx.type === 'income';
                <p-tag
                  [value]="(tx.amount | currency) ?? ''"
                  [severity]="isIncome ? 'success' : 'danger'"
                  [icon]="isIncome ? PrimeIcons.ARROW_UP : PrimeIcons.ARROW_DOWN" />
              </td>
              <td>{{ tx.type | titlecase }}</td>
              <td>{{ tx.categoryId | txCategoryLabel }}</td>
              <td [pTooltip]="(tx.txDate | timestampToDate | date) ?? ''" tooltipPosition="bottom">
                {{ tx.txDate | timestampToDate | date }}
              </td>
              <td>
                <a pButton class="w-full" severity="secondary" [text]="true" [routerLink]="[tx.id]">
                  <i [class]="PrimeIcons.CHEVRON_RIGHT"></i>
                </a>
              </td>
            </tr>
          </ng-template>
        </p-table>
      } @else {
        <div class="grid gap-3">
          @for (tx of transactions(); track tx.id) {
            <a [routerLink]="[tx.id]">
              <echo-transaction-mobile-tile [tx]="tx" />
            </a>
          }
        </div>
      }
    }
  `,
  imports,
})
export class TransactionListComponent {
  readonly transactions = input.required<EchoTransaction[]>();

  readonly PrimeIcons = PrimeIcons;
  readonly paginatorOptions = paginatorOptions;
  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');
}
