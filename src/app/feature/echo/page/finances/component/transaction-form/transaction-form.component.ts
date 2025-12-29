import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { MessageService, PrimeIcons } from 'primeng/api';
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
  readonly transactionTypes: OptionWithLabel<TransactionType>[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];
  // TODO: categories from userStore
  readonly categories: EchoTransactionCategory[] = [
    {
      name: 'Flat fees',
      id: '251512',
      icon: PrimeIcons.AMAZON,
      createDate: Timestamp.now(),
      type: 'expense',
    },
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

    this.isProcessing.set(true);

    if (this.tx) {
      this.updateTransaction();
      return;
    }

    this.addTransaction();
  }

  private get payload(): Partial<EchoTransaction> {
    const { name, amount, description, type, category, txDate } = this.txForm.controls;

    const formValue: Partial<EchoTransaction> = {
      name: name.value ?? '',
      amount: amount.value ?? 0,
      type: type.value,
      categoryId: category.value,
      description: description.value,
      createdAt: Timestamp.now(),
      lastUpdate: Timestamp.now(),
      txDate: Timestamp.fromDate(txDate.value ?? new Date()),
    };

    return { ...(this.tx ?? []), ...formValue };
  }

  private updateTransaction(): void {
    this.performTxProcess(this.#transactionService.updateTransaction$(this.payload));
  }

  private addTransaction(): void {
    this.performTxProcess(this.#transactionService.addTransaction$(this.payload));
  }

  private performTxProcess<T>(obs: Observable<T>): void {
    obs
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
          complete: () => {
            this.isProcessing.set(false);
          },
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
