import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { EchoTransaction } from '#finances/model';
import { TransactionsService } from '#finances/service';

const imports = [
  ButtonModule,
  SelectModule,
  MessageModule,
  TextareaModule,
  InputTextModule,
  FloatLabelModule,
  InputNumberModule,
  RadioButtonModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'echo-transaction-form',
  templateUrl: './transaction-form.component.html',
  imports,
})
export class TransactionFormComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #messageService = inject(MessageService);
  readonly #dynamicDialogRef = inject(DynamicDialogRef);
  readonly #transactionService = inject(TransactionsService);

  readonly form = new FormGroup({
    amount: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<EchoTransaction['type']>('income', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  });

  readonly userId = inject(Auth).currentUser?.uid ?? '';
  readonly transactionTypes: EchoTransaction['type'][] = ['income', 'expenses', 'remaining'];

  readonly isProcessing = signal(false);

  save(): void {
    if (this.form.invalid) return;

    const { amount, description, type } = this.form.controls;
    const transaction: EchoTransaction = {
      amount: amount.value,
      createdAt: Timestamp.now(),
      description: description.value,
      lastUpdate: Timestamp.now(),
      type: type.value,
      uid: this.userId,
    };

    this.isProcessing.set(true);
    this.#transactionService
      .addTransaction$(transaction)
      .pipe(
        tap({
          next: () => {
            this.#dynamicDialogRef.close();
          },
          error: () => {
            this.#messageService.add({
              life: 5000,
              detail: 'Something went wrong!',
              severity: 'error',
            });
          },
          finalize: () => {
            this.isProcessing.set(false);
          },
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
