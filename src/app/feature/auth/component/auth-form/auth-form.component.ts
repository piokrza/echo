import { Component, inject, output } from '@angular/core';
import { customError, Field, submit } from '@angular/forms/signals';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthForm } from '#auth/model';
import { AuthFormService } from '#auth/service';

const imports = [MatFormFieldModule, MatInputModule, MatButtonModule, Field];

@Component({
  selector: 'echo-auth-form',
  template: `
    <form class="grid">
      <mat-form-field appearance="outline">
        <input matInput type="text" placeholder="username" [field]="authForm.email" />

        @if (authForm.email().touched() && authForm.email().dirty()) {
          @for (err of authForm.email().errors(); track err.kind) {
            <mat-error>{{ err.message }}</mat-error>
          }
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <input matInput type="password" placeholder="password" [field]="authForm.password" />

        @if (authForm.password().touched() && authForm.password().dirty()) {
          @for (err of authForm.password().errors(); track err.kind) {
            <mat-error>{{ err.message }}</mat-error>
          }
        }
      </mat-form-field>

      <button matButton="tonal" type="submit" [disabled]="authForm().invalid()" (click)="login($event)">Login</button>
    </form>
  `,
  imports,
})
export class AuthFormComponent {
  readonly formSubmit = output<AuthForm>();

  readonly authForm = inject(AuthFormService).form;

  login(e: Event): void {
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
}
