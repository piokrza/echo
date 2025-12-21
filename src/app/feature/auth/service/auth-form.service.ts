import { Injectable, signal } from '@angular/core';
import { email, form, minLength, required, schema } from '@angular/forms/signals';

import { AuthForm } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthFormService {
  readonly #initialFormValue: AuthForm = {
    email: '',
    password: '',
    username: '',
  };

  readonly #formModel = signal<AuthForm>(this.#initialFormValue);
  readonly #formSchema = schema<AuthForm>((path) => {
    required(path.email, { message: 'Email is required.' });
    required(path.password, { message: 'Password is required.' });
    // TODO: add required validator based on form type (register/login)
    // required(path.username, { message: 'Username is required.' });
    email(path.email, { message: 'Enter valid email format' });
    minLength(path.password, 5, { message: 'Password must contain at least 5 characters' });
  });

  readonly form = form(this.#formModel, this.#formSchema);

  resetForm(): void {
    this.form().setControlValue(this.#initialFormValue);
    this.form().reset();
  }
}
