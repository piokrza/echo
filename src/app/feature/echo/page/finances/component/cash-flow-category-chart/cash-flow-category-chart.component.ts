import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DOCUMENT, effect, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { MatCardModule } from '@angular/material/card';

import { TransactionType } from '#finances/model';
import { CategoriesStore, TransactionsStore } from '#finances/state';

const imports = [ChartModule, MatCardModule];

@Component({
  selector: 'echo-cash-flow-category-chart',
  template: `
    <mat-card class="min-w-[300px]">
      <div class="grid place-items-center">
        <mat-card-header>
          <div class="text-2xl mb-4">{{ transactionType() === 'income' ? 'Incomes' : 'Expenses' }}</div>
        </mat-card-header>

        <mat-card-content>
          <p-chart type="pie" [data]="data()" [options]="options()" class="w-full md:w-[15rem]" />
        </mat-card-content>
      </div>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class CashFlowCategoryChartComponent {
  constructor() {
    effect(() => {
      if (this.categoriesStore.isLoading() && !this.transactionsStore.isLoading()) return;
      this.initChart();
    });
  }

  readonly #document = inject(DOCUMENT);
  readonly #platformId = inject(PLATFORM_ID);

  readonly transactionType = input.required<TransactionType>();

  readonly categoriesStore = inject(CategoriesStore);
  readonly transactionsStore = inject(TransactionsStore);

  readonly data = signal<object>({});
  readonly options = signal<object>({});

  readonly #colorPalette = [
    '--p-red-500',
    '--p-blue-500',
    '--p-green-500',
    '--p-orange-500',
    '--p-purple-500',
    '--p-teal-500',
    '--p-pink-500',
    '--p-yellow-500',
    '--p-cyan-500',
  ];

  readonly computedCashFlow = computed(() => {
    const sumsByCategory = new Map<string, number>();

    const UNCATEGORIZED = 'uncategorized';

    (this.transactionsStore.transactions() ?? [])
      .filter((tx) => tx.type === this.transactionType())
      .forEach((tx) => {
        const key = tx.categoryId ?? UNCATEGORIZED;

        const current = sumsByCategory.get(key) ?? 0;
        sumsByCategory.set(key, current + tx.amount);
      });

    const categorized = (this.categoriesStore.categories() ?? [])
      .filter((category) => sumsByCategory.has(category.id))
      .map((category) => ({
        categoryName: category.name,
        totalAmount: sumsByCategory.get(category.id)!,
      }));

    const uncategorized = sumsByCategory.has(UNCATEGORIZED)
      ? [{ categoryName: 'Uncategorized', totalAmount: sumsByCategory.get(UNCATEGORIZED) }]
      : [];

    return [...categorized, ...uncategorized];
  });

  initChart(): void {
    if (isPlatformBrowser(this.#platformId)) {
      const documentStyle = getComputedStyle(this.#document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-button-outlined-secondary-color');

      this.data.set({
        labels: this.computedCashFlow().map((d) => d.categoryName),
        datasets: [
          {
            data: this.computedCashFlow().map((d) => d.totalAmount),
            backgroundColor: this.computedCashFlow().map((_, index) =>
              documentStyle.getPropertyValue(this.#colorPalette[index % this.#colorPalette.length])
            ),
            hoverBackgroundColor: this.computedCashFlow().map((_, index) =>
              documentStyle.getPropertyValue(this.#colorPalette[index % this.#colorPalette.length].replace('500', '400'))
            ),
          },
        ],
      });

      this.options.set({
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      });
    }
  }
}
