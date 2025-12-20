import { Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

const imports = [MatCardModule];

@Component({
  selector: 'echo-transaction-list',
  template: `
    <mat-card appearance="outlined" class="min-w-[200px] hover:bg-violet-600">
      <mat-card-header>
        <mat-card-title>{{ heading() }}</mat-card-title>
      </mat-card-header>

      <div class="p-4"></div>
    </mat-card>
  `,
  imports,
})
export class TransactionListComponent {
  readonly heading = input.required<string>();
}
