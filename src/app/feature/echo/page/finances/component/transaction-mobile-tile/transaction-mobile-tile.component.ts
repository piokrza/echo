import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { EchoTransaction } from '#finances/model';
import { TimestampToTextPipe } from '#ui/pipe';

const imports = [CardModule, ButtonModule, TimestampToTextPipe, TitleCasePipe, TagModule, CurrencyPipe];

@Component({
  selector: 'echo-transaction-mobile-tile',
  template: `
    <p-card tabindex="0" (click)="itemClick.emit(tx().id)" (keyup.space)="itemClick.emit(tx().id)">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex justify-between items-center gap-4 mb-2">
            <div class="flex items-center gap-3">
              <i [class]="txIcon() + ' ' + (isIncome() ? 'color-success' : 'color-danger')"></i>
              <p class="text-xl">{{ tx().name | titlecase }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <p-tag
              [severity]="isIncome() ? 'success' : 'danger'"
              [value]="(tx().amount | currency: 'USD') ?? ''"
              [icon]="isIncome() ? PrimeIcons.ARROW_UP : PrimeIcons.ARROW_DOWN" />
            <p>{{ tx().txDate | timestampToText }}</p>
          </div>
        </div>

        <i [class]="PrimeIcons.CHEVRON_RIGHT"></i>
      </div>
    </p-card>
  `,
  imports,
})
export class TransactionMobileTileComponent {
  readonly tx = input.required<EchoTransaction>();

  readonly itemClick = output<string>();

  readonly PrimeIcons = PrimeIcons;
  readonly isIncome = computed(() => this.tx().type === 'income');
  readonly txIcon = computed(() => {
    // TODO: icon based on category
    switch (this.tx().type) {
      case 'expense':
        return PrimeIcons.BITCOIN;
      default:
        return PrimeIcons.DOLLAR;
    }
  });
}
