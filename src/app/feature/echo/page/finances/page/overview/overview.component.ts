import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

import { Path } from '#core/enum';
import { OverviewBrickComponent } from '#finances/component/overview-brick';
import { EchoTransaction } from '#finances/model';

const imports = [OverviewBrickComponent];

@Component({
  selector: 'echo-overview',
  template: `
    <section>
      <div class="flex gap-4 flex-wrap">
        <div class="grid gap-4 xl:grid-cols-3 flex-grow-1">
          @for (transaction of transactionMock; track $index) {
            <echo-overview-brick
              [type]="'income'"
              [amount]="transaction.amount"
              [brickTitle]="transaction.type"
              [dateRange]="transaction.createdAt" />
          }
        </div>
      </div>
    </section>
  `,
  imports,
})
export class OverviewComponent {
  readonly Path = Path;

  readonly transactionMock: EchoTransaction[] = [
    {
      amount: 4222,
      createdAt: Timestamp.now(),
      type: 'income',
      uid: '',
      lastUpdate: Timestamp.now(),
      description: '',
      id: 'dwa',
    },
    {
      amount: 622,
      createdAt: Timestamp.now(),
      type: 'expense',
      uid: '',
      lastUpdate: Timestamp.now(),
      description: '',
      id: 'dwa42',
    },
    {
      amount: 1622,
      createdAt: Timestamp.now(),
      type: 'expense',
      uid: '',
      lastUpdate: Timestamp.now(),
      description: '',
      id: 'dwa442141242',
    },
  ];
}
