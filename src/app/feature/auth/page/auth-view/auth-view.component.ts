import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthForm, AuthFormType, AuthViewState } from '#auth/model';
import { AuthViewService } from '#auth/service';

const imports = [MatCardModule, MatButtonModule, AuthFormComponent, MatIconModule];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4">
      <mat-card appearance="outlined" class="w-full p-4 max-w-lg">
        <mat-card-header>
          <mat-card-title>Hey! Welcome back</mat-card-title>
        </mat-card-header>

        <button matButton="outlined" class="mt-8">
          <mat-icon svgIcon="google" />
          Login with Google
        </button>

        <span class="text-center my-4">or</span>

        <echo-auth-form
          [formType]="state().formType"
          [isPerforming]="state().isPerforming"
          (toggleFormType)="setFormType($event)"
          (formSubmit)="loginWithEmailAndPassword($event)" />
      </mat-card>
    </section>
  `,
  imports,
})
export class AuthViewComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authViewService = inject(AuthViewService);

  readonly state: Signal<AuthViewState> = this.#authViewService.state;

  loginWithEmailAndPassword(authForm: AuthForm): void {
    this.#authViewService.loginWithEmailAndPassword$(authForm).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  setFormType(type: AuthFormType): void {
    this.#authViewService.updateFormType(type);
  }
}
