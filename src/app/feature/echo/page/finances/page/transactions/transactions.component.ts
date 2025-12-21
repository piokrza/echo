import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';

import { ButtonModule } from 'primeng/button';

import { AuthApiService } from '#auth/api';
import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';

const imports = [ButtonModule];

@Component({
  selector: 'echo-transactions',
  template: ` <button pButton (click)="addTransaction()">Add transaction</button> `,
  imports,
})
export class TransactionsComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #transactionService = inject(TransactionsService);

  readonly userId = inject(AuthApiService).user?.uid ?? '';

  addTransaction(): void {
    const transaction: EchoTransaction = {
      amount: 2424,
      createdAt: Timestamp.now(),
      type: 'expenses',
      uid: this.userId,
    };

    this.#transactionService.addTransaction$(transaction).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
