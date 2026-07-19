import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { MatCardModule } from '@angular/material/card';

import { Path } from '#core/enum';
import { CashFlowCategoryChartComponent } from '#finances/component/cash-flow-category-chart';
import { TransactionsStore } from '#finances/state';

const imports = [MatCardModule, ChartModule, CurrencyPipe, CashFlowCategoryChartComponent];

@Component({
  selector: 'echo-overview',
  template: `
    <section class="grid gap-3">
      <div class="flex gap-4 flex-wrap">
        <div class="grid gap-4 md:grid-cols-3 flex-grow-1">
          @let finantialSummary = transactionsStore.finantialSummary();

          <mat-card>
            <mat-card-header>
              <mat-card-title>Income</mat-card-title>
            </mat-card-header>

            <mat-card-content>
              <div class="color-success">{{ finantialSummary.income | currency }}</div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>Expense</mat-card-title>
            </mat-card-header>

            <mat-card-content>
              <p>{{ finantialSummary.expenses | currency }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>Balance</mat-card-title>
            </mat-card-header>

            <mat-card-content>
              <div [class]="finantialSummary.expenses > finantialSummary.income ? 'color-danger' : 'color-success'">
                {{ finantialSummary.balance | currency }}
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <echo-cash-flow-category-chart transactionType="income" />
        <echo-cash-flow-category-chart transactionType="expense" />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class FinancesOverviewComponent {
  readonly transactionsStore = inject(TransactionsStore);

  readonly Path = Path;
}
