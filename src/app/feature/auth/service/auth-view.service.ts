import { inject, Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { AuthForm, AuthFormType } from '#auth/model';
import { AuthViewStore } from '#auth/store';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class AuthViewService {
  readonly #router = inject(Router);
  readonly #authViewStore = inject(AuthViewStore);
  readonly #authApiService = inject(AuthApiService);

  readonly state = this.#authViewStore.state;

  loginWithGoogle$(): Observable<UserCredential> {
    this.#authViewStore.update('isPerformingGoogleAuth', true);

    return this.navigateOnSuccessTo(Path.DASHBOARD, this.#authApiService.loginWithGoogle$()).pipe(
      finalize(() => this.#authViewStore.update('isPerformingGoogleAuth', false))
    );
  }

  loginWithEmailAndPassword$({ email, password }: AuthForm): Observable<UserCredential> {
    this.#authViewStore.update('isPerformingEmailAndPasswordAuth', true);

    return this.navigateOnSuccessTo(Path.DASHBOARD, this.#authApiService.loginWithEmailAndPassword$(email, password)).pipe(
      finalize(() => this.#authViewStore.update('isPerformingEmailAndPasswordAuth', false))
    );
  }

  updateFormType(type: AuthFormType): void {
    this.#authViewStore.update('formType', type);
  }

  private navigateOnSuccessTo<T>(path: Path, obs: Observable<T>): Observable<T> {
    return obs.pipe(tap(() => this.#router.navigate([path])));
  }
}
