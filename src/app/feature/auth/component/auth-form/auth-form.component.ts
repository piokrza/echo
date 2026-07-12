import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, output } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';

import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { AuthForm, AuthFormType } from '#auth/model';
import { AuthFormService } from '#auth/service';

const imports = [MatButton, FormField, MatInputModule, MatProgressSpinner, MatFormFieldModule];

@Component({
  selector: 'echo-auth-form',
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class AuthFormComponent implements OnDestroy {
  readonly #authFormService = inject(AuthFormService);

  readonly isPerforming = input.required<boolean>();
  readonly formType = input.required<AuthFormType>();

  readonly formSubmit = output<AuthForm>();
  readonly toggleFormType = output<AuthFormType>();

  readonly authForm = this.#authFormService.form;

  submit(e: Event): void {
    e.preventDefault();
    if (this.authForm().invalid()) return;

    submit(this.authForm, async (form) => {
      this.formSubmit.emit(form().value());
    });
  }

  ngOnDestroy(): void {
    this.#authFormService.resetForm();
  }
}
