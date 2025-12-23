import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { OptionWithLabel } from '#core/model';
import { EchoTransaction, TransactionType } from '#finances/model';
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
export class TransactionFormComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #messageService = inject(MessageService);
  readonly #dynamicDialogRef = inject(DynamicDialogRef);
  readonly #transactionService = inject(TransactionsService);

  readonly tx?: EchoTransaction = inject(DynamicDialogConfig).data;

  readonly txForm = new FormGroup({
    amount: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<TransactionType>('income', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  });

  readonly isProcessing = signal(false);
  readonly userId = inject(Auth).currentUser?.uid ?? '';
  readonly transactionTypes: OptionWithLabel<TransactionType>[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  ngOnInit(): void {
    if (this.tx) this.txForm.patchValue(this.tx);
  }

  save(): void {
    if (this.txForm.invalid) {
      this.txForm.markAllAsDirty();
      return;
    }

    const { amount, description, type } = this.txForm.controls;
    const transaction: EchoTransaction = {
      amount: amount.value ?? 0,
      createdAt: Timestamp.now(),
      description: description.value,
      lastUpdate: Timestamp.now(),
      type: type.value,
      uid: this.userId,
      id: this.tx?.id ?? '2414', //TODO: use id generator
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
