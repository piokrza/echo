import { Component, input } from '@angular/core';

import { CardModule } from 'primeng/card';

const imports = [CardModule];

@Component({
  selector: 'echo-transaction-list',
  template: `
    <p-card appearance="outlined" class="min-w-[200px]" [header]="heading()">
      <div>
        <!--  -->
        Transactions here
      </div>
    </p-card>
  `,
  imports,
})
export class TransactionListComponent {
  readonly heading = input.required<string>();
}
