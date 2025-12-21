import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { customError, Field, submit } from '@angular/forms/signals';

import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { AuthForm, AuthFormType } from '#auth/model';
import { AuthFormService } from '#auth/service';

const imports = [Field, InputTextModule, FloatLabel, MessageModule, PasswordModule, ButtonModule];

@Component({
  selector: 'echo-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
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
      try {
        this.formSubmit.emit(form().value());
        return null;
      } catch {
        return customError({ message: 'Something went wrong' });
      }
    });
  }

  ngOnDestroy(): void {
    this.#authFormService.resetForm();
  }
}
