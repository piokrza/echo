import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthForm, AuthFormType, AuthViewState } from '#auth/model';
import { AuthViewService } from '#auth/service';

const imports = [MatCardModule, MatButtonModule, AuthFormComponent, MatIconModule, MatTooltipModule, RouterLink];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4 bg-primary">
      <div class="w-full grid place-items-center max-w-lg">
        <div class="w-full mb-2">
          <button matIconButton="tonal" matTooltip="Back" matTooltipPosition="right" [routerLink]="['']">
            <mat-icon>arrow_back</mat-icon>
          </button>
        </div>

        <mat-card appearance="outlined" class="w-full p-4">
          <mat-card-header>
            <mat-card-title>Hey! Welcome back</mat-card-title>
          </mat-card-header>

          <button matButton="outlined" class="mt-8" [disabled]="state().isPerformingGoogleAuth" (click)="loginWithGoogle()">
            <mat-icon svgIcon="google" />
            Login with Google
          </button>

          <span class="text-center my-4">or</span>

          <echo-auth-form
            [formType]="state().formType"
            [isPerforming]="state().isPerformingEmailAndPasswordAuth"
            (toggleFormType)="setFormType($event)"
            (formSubmit)="loginWithEmailAndPassword($event)" />
        </mat-card>
      </div>
    </section>
  `,
  imports,
})
export class AuthViewComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authViewService = inject(AuthViewService);

  readonly state: Signal<AuthViewState> = this.#authViewService.state;

  loginWithGoogle(): void {
    this.#authViewService.loginWithGoogle$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  loginWithEmailAndPassword(authForm: AuthForm): void {
    this.#authViewService.loginWithEmailAndPassword$(authForm).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  setFormType(type: AuthFormType): void {
    this.#authViewService.updateFormType(type);
  }
}
