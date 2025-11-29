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

  loginWithEmailAndPassword$({ email, password }: AuthForm): Observable<UserCredential> {
    this.#authViewStore.update('isPerforming', true);

    return this.#authApiService.loginWithEmailAndPassword$(email, password).pipe(
      tap({
        next: () => {
          this.#router.navigate([Path.DASHBOARD]);
        },
      }),
      finalize(() => this.#authViewStore.update('isPerforming', false))
    );
  }

  updateFormType(type: AuthFormType): void {
    this.#authViewStore.update('formType', type);
  }
}
