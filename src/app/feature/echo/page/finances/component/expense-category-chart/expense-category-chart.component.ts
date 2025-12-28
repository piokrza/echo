import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { ChartModule } from 'primeng/chart';

const imports = [ChartModule];

@Component({
  selector: 'echo-expense-category-chart',
  template: `<p-chart type="pie" [data]="data()" [options]="options()" class="w-full md:w-[15rem]" />`,
  imports,
})
export class ExpenseCategoryChartComponent implements OnInit {
  readonly #platformId = inject(PLATFORM_ID);

  readonly data = signal<object>({});
  readonly options = signal<object>({});

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    if (isPlatformBrowser(this.#platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data.set({
        labels: ['Daily', 'Flat fees'],
        datasets: [
          {
            data: [540, 325],
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400')],
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
