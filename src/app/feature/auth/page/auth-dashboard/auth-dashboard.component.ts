import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthForm } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [MatCardModule, MatButtonModule, AuthFormComponent, MatIconModule];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4">
      <mat-card appearance="outlined" class="w-full px-4 max-w-lg">
        <mat-card-header class="flex justify-center">
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>

        <div class="pb-4 w-full grid items-center">
          <echo-auth-form class="mt-5" (formSubmit)="loginWithEmailAndPassword($event)" />

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
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  loginWithEmailAndPassword(authForm: AuthForm): void {
    this.#authService.login$(authForm.email).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
