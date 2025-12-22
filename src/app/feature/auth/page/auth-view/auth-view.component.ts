import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthForm, AuthFormType, AuthViewState } from '#auth/model';
import { AuthViewService } from '#auth/service';

const imports = [ButtonModule, AuthFormComponent, CardModule, RouterLink];

@Component({
  selector: 'echo-auth-dashboard',
  template: `
    <section class="grid place-items-center h-full echo-gradient px-4 bg-primary">
      <div class="w-full grid place-items-center max-w-lg">
        <p-card class="w-full">
          <div class="grid">
            <h2 class="text-2xl mb-8">Hey! Welcome back</h2>

            <p-button
              class="wide"
              label=" Login with Google"
              [icon]="PrimeIcons.GOOGLE"
              [loading]="state().isPerformingGoogleAuth"
              (click)="loginWithGoogle()" />
            <span class="text-center my-4">or</span>

            <echo-auth-form
              [formType]="state().formType"
              [isPerforming]="state().isPerformingEmailAndPasswordAuth"
              (toggleFormType)="setFormType($event)"
              (formSubmit)="authenticateWithEmailAndPassword($event)" />

            <a pButton class="w-fit" [text]="true" [routerLink]="['']">Back</a>
          </div>
        </p-card>
      </div>
    </section>
  `,
  imports,
})
export class AuthViewComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authViewService = inject(AuthViewService);

  readonly state: Signal<AuthViewState> = this.#authViewService.state;

  readonly PrimeIcons = PrimeIcons;

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
