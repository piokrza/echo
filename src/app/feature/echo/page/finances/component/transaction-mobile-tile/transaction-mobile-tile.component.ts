import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

import { EchoTransaction } from '#finances/model';
import { TimestampToTextPipe } from '#ui/pipe';

const imports = [CardModule, ButtonModule, TimestampToTextPipe, TitleCasePipe, ChipModule];

@Component({
  selector: 'echo-transaction-mobile-tile',
  template: `
    <p-card>
      <div class="flex justify-between items-center gap-4 mb-2">
        <div class="flex items-center gap-3">
          <i [class]="txIcon() + ' ' + (isIncome() ? 'color-success' : 'color-danger')"></i>
          <p [class]="['text-2xl', isIncome() ? 'color-success' : 'color-danger']">{{ tx().name | titlecase }}</p>
        </div>
        <p-chip [icon]="isIncome() ? PrimeIcons.ARROW_UP : PrimeIcons.ARROW_DOWN" [label]="tx().amount + ' PLN'" />
      </div>

      <div class="flex items-center gap-2">
        <p-chip class="p-2" [label]="tx().type | titlecase" />
        <p>{{ tx().txDate | timestampToText }}</p>
      </div>

      <div class="grid gap-3 grid-cols-2 mt-4">
        <p-button class="wide" severity="info" [outlined]="true" [icon]="PrimeIcons.FILE_EDIT" (onClick)="editTx.emit(tx())" />
        <p-button class="wide" severity="danger" [outlined]="true" [icon]="PrimeIcons.ERASER" (onClick)="deleteTx.emit(tx().id)" />
      </div>
    </p-card>
  `,
  imports,
})
export class TransactionMobileTileComponent {
  readonly tx = input.required<EchoTransaction>();

  readonly deleteTx = output<string>();
  readonly editTx = output<EchoTransaction>();

  readonly PrimeIcons = PrimeIcons;

  readonly isIncome = computed(() => this.tx().type === 'income');
  readonly txIcon = computed(() => {
    // TODO: icon category based on category
    switch (this.tx().type) {
      case 'expense':
        return PrimeIcons.BITCOIN;
      default:
        return PrimeIcons.DOLLAR;
    }
  });
}
