import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, output } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';

import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
// import { PasswordModule } from 'primeng/password'; //TODO: use after signalForm Regex error

import { AuthForm, AuthFormType } from '#auth/model';
import { AuthFormService } from '#auth/service';

const imports = [FormField, InputTextModule, FloatLabel, MessageModule, ButtonModule];

@Component({
  selector: 'echo-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
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
