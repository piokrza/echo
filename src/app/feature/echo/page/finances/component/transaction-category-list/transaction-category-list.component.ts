import { Component, input, output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { EchoTransactionCategory } from '#finances/model';

const imports = [CardModule, ButtonModule, DividerModule];

@Component({
  selector: 'echo-transaction-category-list',
  template: `
    <p-card>
      <h2 class="text-lg">{{ heading() }}</h2>

      <p-divider />

      <div class="grid gap-2 mt-4">
        @if (!categories().length) {
          <p>No categories</p>
        } @else {
          @for (category of categories(); track $index) {
            <div class="flex justify-between items-center gap-3">
              <div class="flex items-center gap-2">
                @if (category.icon) {
                  <i [class]="category.icon"></i>
                }
                <span class="color-secondary">
                  {{ category.name }}
                </span>
              </div>
              <div class="flex gap-1">
                <p-button
                  severity="secondary"
                  size="small"
                  [text]="true"
                  [icon]="PrimeIcons.FILE_EDIT"
                  (onClick)="editCategory.emit(category)" />
                <p-button
                  size="small"
                  severity="danger"
                  [text]="true"
                  [icon]="PrimeIcons.DELETE_LEFT"
                  (onClick)="deleteCategory.emit(category.id)" />
              </div>
            </div>
          }
        }
      </div>
    </p-card>
  `,
  imports,
})
export class TransactionCategoryListComponent {
  readonly heading = input.required<string>();
  readonly categories = input.required<EchoTransactionCategory[]>();

  readonly deleteCategory = output<string>();
  readonly editCategory = output<EchoTransactionCategory>();

  readonly PrimeIcons = PrimeIcons;
}
