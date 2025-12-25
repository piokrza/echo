import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

const imports = [ButtonModule, RouterLink];

@Component({
  selector: 'echo-transaction-details',
  template: `
    <p-button severity="secondary" [icon]="PrimeIcons.ARROW_LEFT" [text]="true" [routerLink]="['../']" />

    <h1>details works</h1>
  `,
  imports,
})
export class TransactionDetailsComponent {
  readonly PrimeIcons = PrimeIcons;
}
