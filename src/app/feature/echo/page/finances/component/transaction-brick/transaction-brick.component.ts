import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

import { MatCardModule } from '@angular/material/card';

import { TransactionType } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';

const imports = [MatCardModule, TitleCasePipe, TimestampToDatePipe, DatePipe];

@Component({
  selector: 'echo-transaction-brick',
  template: `
    <mat-card appearance="outlined" class="min-w-[200px]">
      <mat-card-header>
        <mat-card-title>{{ brickTitle() | titlecase }}</mat-card-title>
        <mat-card-subtitle>{{ dateRange() | timestamtToDate | date }}</mat-card-subtitle>
      </mat-card-header>

      <div class="p-4">
        @if (type() === 'expenses') {
          <span>-</span>
        }
        {{ amount() }}zł
      </div>
    </mat-card>
  `,
  imports,
})
export class TransactionBrickComponent {
  readonly brickTitle = input.required<string>();
  readonly dateRange = input.required<Timestamp>();
  readonly amount = input.required<number>();
  readonly type = input.required<TransactionType>();
}
