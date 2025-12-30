import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import { OptionWithLabel } from '#core/model';
import { EchoTransactionCategory, TransactionType } from '#finances/model';
import { CategoriesService } from '#finances/service';

const imports = [ReactiveFormsModule, InputTextModule, FloatLabelModule, SelectModule, ButtonModule, MessageModule];

@Component({
  selector: 'echo-transaction-category-form',
  template: `
    <form class="grid gap-3" [formGroup]="categoryForm">
      <div>
        <p-float-label>
          @let name = categoryForm.controls.name;
          <input pInputText type="text" placeholder="Category name" class="w-full" [formControl]="name" />
        </p-float-label>
        @if (name.touched && name.dirty) {
          @if (name.hasError('required')) {
            <p-message severity="error" size="small" variant="simple">Category name is required</p-message>
          }
        }
      </div>

      <div class="grid md:grid-cols-2 gap-3">
        <div>
          <p-float-label>
            @let type = categoryForm.controls.type;
            <p-select
              class="w-full"
              appendTo="body"
              optionValue="value"
              optionLabel="label"
              [formControl]="type"
              [options]="transactionTypes" />
          </p-float-label>
          @if (type.dirty) {
            @if (type.hasError('required')) {
              <p-message severity="error" size="small" variant="simple">Transaction type is required</p-message>
            }
          }
        </div>

        <p-float-label>
          @let icon = categoryForm.controls.icon;
          <p-select
            class="w-full"
            appendTo="body"
            placeholder="Pick icon"
            optionValue="value"
            optionLabel="label"
            [options]="primeIcons"
            [formControl]="icon">
            <ng-template #selectedItem let-selectedOption>
              @if (icon.value) {
                <div class="flex items-center gap-2">
                  <i [class]="icon.value"></i>
                  <div>{{ selectedOption.label }}</div>
                </div>
              }
            </ng-template>

            <ng-template let-icon #item>
              <div class="flex items-center gap-2">
                <i [class]="icon.value"></i>
                <div>{{ icon.label }}</div>
              </div>
            </ng-template>
          </p-select>
        </p-float-label>
      </div>

      <p-button label="Save" class="wide mt-3" [loading]="isProcessing()" (onClick)="save()" />
    </form>
  `,
  imports,
})
export class TransactionCategoryFormComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #messageService = inject(MessageService);
  readonly #dynamicDialogRef = inject(DynamicDialogRef);
  readonly #categoriesService = inject(CategoriesService);

  readonly category?: EchoTransactionCategory = inject(DynamicDialogConfig).data;

  readonly categoryForm = new FormGroup({
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    type: new FormControl<TransactionType>('income', { validators: [Validators.required] }),
    icon: new FormControl<PrimeIcons | null>(null),
  });

  readonly transactionTypes: OptionWithLabel<TransactionType>[] = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];
  readonly primeIcons: OptionWithLabel<TransactionType>[] = Object.entries(PrimeIcons).map(([label, value]) => ({
    label,
    value,
  }));
  readonly isProcessing = signal(false);

  ngOnInit(): void {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  save(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsDirty();
      return;
    }

    if (this.category) {
      this.performTxProcess(this.addCategory$());
      return;
    }

    this.performTxProcess(this.updateCategory$());
  }

  private addCategory$(): Observable<string> {
    return this.#categoriesService.addCategory$(this.payload);
  }

  private updateCategory$(): Observable<void> {
    return this.#categoriesService.updateCategory$(this.payload);
  }

  get payload(): Partial<EchoTransactionCategory> {
    const { icon, name, type } = this.categoryForm.controls;
    return {
      icon: icon.value,
      id: this.category?.id ?? '',
      name: name.value!,
      type: type.value!,
    };
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
