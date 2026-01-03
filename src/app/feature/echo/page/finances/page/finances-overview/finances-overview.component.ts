import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';

import { Path } from '#core/enum';
import { ExpenseCategoryChartComponent } from '#finances/component/expense-category-chart';
import { EchoTransaction } from '#finances/model';
import { TransactionsStore } from '#finances/state';

const imports = [CardModule, ChartModule, CurrencyPipe, ExpenseCategoryChartComponent, SkeletonModule];

@Component({
  selector: 'echo-overview',
  template: `
    <section>
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
                <div>{{ finantialSummary.balance | currency }}</div>
              } @else {
                <p-skeleton />
              }
            </div>
          </p-card>
        </div>
      </div>

      <div class="w-8 mt-6">
        <echo-expense-category-chart />
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
