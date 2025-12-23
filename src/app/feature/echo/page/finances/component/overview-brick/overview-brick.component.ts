import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

import { CardModule } from 'primeng/card';

import { TransactionType } from '#finances/model';
import { TimestampToDatePipe } from '#ui/pipe';

const imports = [CardModule, TitleCasePipe, TimestampToDatePipe, DatePipe];

@Component({
  selector: 'echo-overview-brick',
  template: `
    <p-card appearance="outlined" class="min-w-[200px]" [header]="brickTitle() | titlecase">
      <p>{{ dateRange() | timestampToDate | date }}</p>

      <div>
        @if (type() === 'expense') {
          <span>-</span>
        }
        {{ amount() }}zł
      </div>
    </p-card>
  `,
  imports,
})
export class OverviewBrickComponent {
  readonly brickTitle = input.required<string>();
  readonly dateRange = input.required<Timestamp>();
  readonly amount = input.required<number>();
  readonly type = input.required<TransactionType>();
}
