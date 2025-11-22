import { Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthFormType } from '#auth/model';

const imports = [MatCardModule, MatButtonModule, AuthFormComponent, MatIconModule];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4">
      <mat-card appearance="outlined" class="w-full px-4 max-w-lg">
        <mat-card-header class="flex justify-center">
          <mat-card-title> {{ formType() === 'login' ? 'Login' : 'Create account' }}</mat-card-title>
        </mat-card-header>

        <div class="pb-4 w-full grid items-center">
          <echo-auth-form class="mt-5" [formType]="formType()" />

          <span class="text-center my-4">or</span>

          <button matButton="outlined" class="mx-auto">
            <mat-icon svgIcon="google" />
            Login with Google
          </button>
        </div>
      </mat-card>
    </section>
  `,
  imports,
})
export class AuthDashboardComponent {
  readonly formType = signal<AuthFormType>('login');
}
