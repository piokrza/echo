import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { MatButtonModule } from '@angular/material/button';

import { EchoTransactionCategory } from '#finances/model';

const imports = [MatButtonModule];

@Component({
  selector: 'echo-transaction-category-list',
  template: `
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
              <button matButton="text" (click)="editCategory.emit(category)">Edit</button>
              <button matButton="text" (click)="deleteCategory.emit(category.id)">Delete</button>
            </div>
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class TransactionCategoryListComponent {
  readonly categories = input.required<EchoTransactionCategory[]>();

  readonly deleteCategory = output<string>();
  readonly editCategory = output<EchoTransactionCategory>();

  readonly PrimeIcons = PrimeIcons;
}
