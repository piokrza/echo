import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

import { Path } from '#core/enum';
import { TransactionBrickComponent } from '#finances/component/transaction-brick';
import { TransactionListComponent } from '#finances/component/transaction-list';
import { EchoTransaction } from '#finances/model';

const imports = [TransactionBrickComponent, TransactionListComponent];

@Component({
  selector: 'echo-overview',
  template: `
    <section>
      <div class="flex gap-4 flex-wrap">
        <div class="grid gap-4 xl:grid-cols-3 flex-grow-1">
          @for (transaction of transactionMock; track $index) {
            <echo-transaction-brick
              [amount]="transaction.amount"
              [brickTitle]="transaction.type"
              [dateRange]="transaction.createdAt"
              [type]="'remaining'" />
          }
        </div>

        <echo-transaction-list heading="Last Transactions" />
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
    },
    {
      amount: 622,
      createdAt: Timestamp.now(),
      type: 'expenses',
      uid: '',
    },
    {
      amount: 1622,
      createdAt: Timestamp.now(),
      type: 'remaining',
      uid: '',
    },
  ];
}
