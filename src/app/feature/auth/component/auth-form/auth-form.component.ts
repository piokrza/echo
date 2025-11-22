import { Component, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthFormType } from '#auth/model';

const imports = [MatFormFieldModule, MatInputModule, MatButtonModule];

@Component({
  selector: 'echo-auth-form',
  template: `
    <form class="grid">
      <mat-form-field class="example-form-field">
        <mat-label>Username</mat-label>
        <input matInput type="text" />
      </mat-form-field>

      <mat-form-field class="example-form-field">
        <mat-label>Name</mat-label>
        <input matInput type="text" />
      </mat-form-field>

      <mat-form-field class="example-form-field">
        <mat-label>Email</mat-label>
        <input matInput type="text" />
      </mat-form-field>

      <button matButton="tonal">{{ formType() === 'login' ? 'Login' : 'Create account' }}</button>
    </form>
  `,
  imports,
})
export class AuthFormComponent {
  readonly formType = input.required<AuthFormType>();
}
