import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';
import { SpinnerComponent } from '#ui/component/spinner';

const imports = [TagModule, RouterLink, CardModule, CurrencyPipe, ButtonModule, TitleCasePipe, DividerModule, SpinnerComponent];

@Component({
  selector: 'echo-transaction-details',
  templateUrl: './transaction-details.component.html',
  imports,
})
export class TransactionDetailsComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #transactionsService = inject(TransactionsService);

  readonly PrimeIcons = PrimeIcons;

  readonly isLoading = signal<boolean>(false);
  readonly tx = signal<EchoTransaction | null>(null);

  ngOnInit(): void {
    const txId = this.#activatedRoute.snapshot.paramMap.get('id');

    if (!txId) {
      this.#router.navigate(['../']);
      return;
    }

    this.isLoading.set(true);
    this.#transactionsService
      .getTransactionById$(txId)
      .pipe(
        tap((tx) => {
          if (!tx) {
            this.#router.navigate(['../']);
            return;
          }

          this.tx.set(tx);
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
