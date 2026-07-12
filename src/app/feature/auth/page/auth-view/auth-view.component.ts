import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthForm, AuthFormType, AuthViewState } from '#auth/model';
import { AuthViewService } from '#auth/service';

const imports = [MatButton, MatIcon, MatCardModule, AuthFormComponent, RouterLink];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4 bg-primary">
      <mat-card appearance="outlined" class="w-full max-w-lg">
        <mat-card-header>
          <mat-card-title>Hey! Welcome back</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="grid mt-8">
            <button matButton="outlined" [disabled]="state().isPerformingGoogleAuth" (click)="loginWithGoogle()">
              <mat-icon aria-hidden="false" aria-label="Google logo" svgIcon="google" />
              Login with Google
            </button>

            <span class="text-center my-4">or</span>
          </div>

          <echo-auth-form
            [formType]="state().formType"
            [isPerforming]="state().isPerformingEmailAndPasswordAuth"
            (toggleFormType)="setFormType($event)"
            (formSubmit)="authenticateWithEmailAndPassword($event)" />
        </mat-card-content>

        <mat-card-actions>
          <button matButton="text" link class="w-fit mt-6" [routerLink]="['']">
            <mat-icon aria-hidden="false" aria-label="Google logo" fontIcon="arrow_left_alt" />
            Back to Echo
          </button>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class AuthViewComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authViewService = inject(AuthViewService);

  readonly state: Signal<AuthViewState> = this.#authViewService.state;

  loginWithGoogle(): void {
    this.#authViewService.loginWithGoogle$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  authenticateWithEmailAndPassword(authForm: AuthForm): void {
    if (this.state().formType === 'login') {
      this.#authViewService.loginWithEmailAndPassword$(authForm).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
      return;
    }
    this.#authViewService.createUserWithEmailAndPassword$(authForm).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  setFormType(type: AuthFormType): void {
    this.#authViewService.updateFormType(type);
  }
}
