import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { OptionWithLabel } from '#core/model';
import { EchoTransaction, EchoTransactionCategory, TransactionType } from '#finances/model';
import { TransactionsService } from '#finances/service';

const imports = [
  ButtonModule,
  SelectModule,
  MessageModule,
  TextareaModule,
  InputTextModule,
  DatePickerModule,
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
    category: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    txDate: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
    type: new FormControl<TransactionType>('income', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly isProcessing = signal(false);
  readonly userId = inject(Auth).currentUser?.uid ?? '';
  readonly transactionTypes: OptionWithLabel<TransactionType>[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];
  readonly categories: EchoTransactionCategory[] = [
    { name: 'Piesek', id: '251512' },
    { name: 'Kotek', id: '6515222212' },
  ];

  ngOnInit(): void {
    if (this.tx) {
      const txDate: Date = this.tx.txDate.toDate();
      this.txForm.patchValue({ ...this.tx, txDate });
    }
  }

  save(): void {
    if (this.txForm.invalid) {
      this.txForm.markAllAsDirty();
      return;
    }

    const { name, amount, description, type, category, txDate } = this.txForm.controls;
    const transaction: EchoTransaction = {
      id: this.tx?.id ?? '2414', //TODO: use id generator
      uid: this.userId,
      name: name.value!,
      amount: amount.value ?? 0,
      type: type.value,
      categoryId: category.value,
      description: description.value,
      createdAt: Timestamp.now(),
      lastUpdate: Timestamp.now(),
      txDate: Timestamp.fromDate(txDate.value!),
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
