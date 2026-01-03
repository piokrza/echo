import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';

import { Path } from '#core/enum';
import { CashFlowCategoryChartComponent } from '#finances/component/cash-flow-category-chart';
import { EchoTransaction } from '#finances/model';
import { TransactionsStore } from '#finances/state';

const imports = [CardModule, ChartModule, CurrencyPipe, CashFlowCategoryChartComponent, SkeletonModule];

@Component({
  selector: 'echo-overview',
  template: `
    <section class="grid gap-3">
      <div class="flex gap-4 flex-wrap">
        <div class="grid gap-4 md:grid-cols-3 flex-grow-1">
          @let finantialSummary = transactionsStore.finantialSummary();
          @let isLoading = transactionsStore.isLoading();
          <p-card>
            <h2 class="text-lg">Income</h2>
            <div class="mt-2">
              @if (!isLoading) {
                <div class="color-success">{{ finantialSummary.income | currency }}</div>
              } @else {
                <p-skeleton />
              }
            </div>
          </p-card>

          <p-card>
            <h2 class="text-lg">Expense</h2>
            <div class="mt-2">
              @if (!isLoading) {
                <div class="color-warn">{{ finantialSummary.expenses | currency }}</div>
              } @else {
                <p-skeleton />
              }
            </div>
          </p-card>

          <p-card>
            <h2 class="text-lg">Balance</h2>
            <div class="mt-2">
              @if (!isLoading) {
                <div [class]="finantialSummary.expenses > finantialSummary.income ? 'color-danger' : 'color-success'">
                  {{ finantialSummary.balance | currency }}
                </div>
              } @else {
                <p-skeleton />
              }
            </div>
          </p-card>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <echo-cash-flow-category-chart transactionType="income" />
        <echo-cash-flow-category-chart transactionType="expense" />
      </div>
    </section>
  `,
  imports,
})
export class FinancesOverviewComponent {
  readonly transactionsStore = inject(TransactionsStore);

  readonly Path = Path;
  readonly transactionMock: EchoTransaction[] = [];
}
