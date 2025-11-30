import { Component, inject, input, output } from '@angular/core';
import { customError, Field, submit } from '@angular/forms/signals';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthForm, AuthFormType } from '#auth/model';
import { AuthFormService } from '#auth/service';

const imports = [MatFormFieldModule, MatInputModule, MatButtonModule, Field];

@Component({
  selector: 'echo-auth-form',
  templateUrl: './auth-form.component.html',
  imports,
})
export class AuthFormComponent {
  readonly isPerforming = input.required<boolean>();
  readonly formType = input.required<AuthFormType>();

  readonly formSubmit = output<AuthForm>();
  readonly toggleFormType = output<AuthFormType>();

  readonly authForm = inject(AuthFormService).form;

  submit(e: Event): void {
    e.preventDefault();
    if (this.authForm().invalid()) return;

    submit(this.authForm, async (form) => {
      try {
        this.formSubmit.emit(form().value());
        this.authForm().reset();
        return null;
      } catch {
        return customError({ message: 'Something went wrong' });
      }
    });
  }
}
