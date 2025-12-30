import { Component, input } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { EchoTransactionCategory } from '#finances/model';

const imports = [CardModule, ButtonModule];

@Component({
  selector: 'echo-transaction-category-list',
  template: `
    <p-card>
      <h2 class="text-lg">{{ heading() }}</h2>

      <div class="grid gap-2 mt-4">
        @for (category of categories(); track category.id) {
          <div class="flex justify-between items-center gap-3">
            <div class="flex items-center gap-2">
              <i [class]="category.icon"></i>
              <span class="color-secondary">
                {{ category.name }}
              </span>
            </div>
            <div class="flex gap-3">
              <p-button severity="secondary" size="small" [icon]="PrimeIcons.FILE_EDIT" />
              <p-button severity="danger" size="small" [icon]="PrimeIcons.DELETE_LEFT" />
            </div>
          </div>
        }
      </div>
    </p-card>
  `,
  imports,
})
export class TransactionCategoryListComponent {
  readonly heading = input.required<string>();
  readonly categories = input.required<EchoTransactionCategory[]>();

  readonly PrimeIcons = PrimeIcons;
}
