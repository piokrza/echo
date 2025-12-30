import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';

import { TransactionFormComponent } from '#finances/component/transaction-form';
import { TransactionDetailsService } from '#finances/service';
import { TransactionDetailsStore } from '#finances/state';
import { SpinnerComponent } from '#ui/component/spinner';
import { TimestampToDatePipe } from '#ui/pipe';

const imports = [
  DatePipe,
  TagModule,
  RouterLink,
  CardModule,
  CurrencyPipe,
  ButtonModule,
  TitleCasePipe,
  DividerModule,
  SpinnerComponent,
  TimestampToDatePipe,
];

@Component({
  selector: 'echo-transaction-details',
  templateUrl: './transaction-details.component.html',
  imports,
})
export class TransactionDetailsComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogService = inject(DialogService);
  readonly #messageService = inject(MessageService);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #confirmationService = inject(ConfirmationService);
  readonly #transactionDetailsService = inject(TransactionDetailsService);

  readonly store = inject(TransactionDetailsStore);

  readonly PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    this.loadTransaction();
  }

  editTransaction(): void {
    this.#dialogService.open(TransactionFormComponent, {
      data: this.store.tx(),
      closable: true,
      closeOnEscape: true,
      header: 'Edit transaction',
    });
  }

  deleteTransaction(txId: string): void {
    this.#confirmationService.confirm({
      header: 'Do you want to delete this transaction?',
      closable: false,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.handleDeleteTransaction(txId);
      },
    });
  }

  private loadTransaction(): void {
    const txId = this.#activatedRoute.snapshot.paramMap.get('id');

    if (!txId) {
      this.#router.navigate(['../']);
      return;
    }

    this.#transactionDetailsService
      .getTransactionById$(txId)
      .pipe(
        tap((tx) => {
          if (!tx) {
            this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
            return;
          }
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  private handleDeleteTransaction(txId: string): void {
    this.#transactionDetailsService
      .deleteTransaction$(txId)
      .pipe(
        tap({
          next: () => {
            this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
          },
          error: () => {
            this.#messageService.add({
              summary: 'Error!',
              detail: 'Something went wrong',
              severity: 'error',
            });
          },
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
