import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { Path } from '#core/enum';
import { ExpenseCategoryChartComponent } from '#finances/component/expense-category-chart';
import { EchoTransaction } from '#finances/model';
import { TransactionsStore } from '#finances/state';

const imports = [CardModule, ChartModule, CurrencyPipe, ExpenseCategoryChartComponent];

@Component({
  selector: 'echo-overview',
  template: `
    <section>
      <div class="flex gap-4 flex-wrap">
        <div class="grid gap-4 md:grid-cols-3 flex-grow-1">
          <p-card>
            <h2 class="text-lg">Income</h2>
            <div>{{ '242424' | currency }}</div>
          </p-card>

          <p-card>
            <h2 class="text-lg">Expense</h2>
            <div>{{ '242424' | currency }}</div>
          </p-card>

          <p-card>
            <h2 class="text-lg">Balance</h2>
            <div>{{ '242424' | currency }}</div>
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
export class OverviewComponent {
  readonly transactionsStore = inject(TransactionsStore);

  readonly Path = Path;
  readonly transactionMock: EchoTransaction[] = [];
}
