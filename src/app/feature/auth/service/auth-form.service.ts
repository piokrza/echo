import { Injectable, signal } from '@angular/core';
import { email, form, minLength, required, schema } from '@angular/forms/signals';

import { AuthForm } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthFormService {
  readonly #formModel = signal<AuthForm>({
    email: '',
    password: '',
    username: '',
  });
  readonly #formSchema = schema<AuthForm>((path) => {
    required(path.email, { message: 'Email is required.' });
    required(path.password, { message: 'Password is required.' });
    required(path.username, { message: 'Username is required.' });

    email(path.email, { message: 'Enter valid email format' });

    minLength(path.password, 5, { message: 'Password must contain at least 5 characters' });
  });

  readonly form = form(this.#formModel, this.#formSchema);
}
