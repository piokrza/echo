import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { AuthForm, AuthFormType } from '#auth/model';
import { AuthViewStore } from '#auth/store';

@Injectable({ providedIn: 'root' })
export class AuthViewService {
  readonly #router = inject(Router);
  readonly #authViewStore = inject(AuthViewStore);
  readonly #authApiService = inject(AuthApiService);

  readonly state = this.#authViewStore.state;

  loginWithEmailAndPassword$(credentials: AuthForm): Observable<AuthForm> {
    this.#authViewStore.update('isPerforming', true);

    return this.#authApiService.loginWithEmailAndPassword$(credentials).pipe(
      tap({
        next: () => {
          this.#router.navigate([]);
        },
      }),
      finalize(() => this.#authViewStore.update('isPerforming', false))
    );
  }

  updateFormType(type: AuthFormType): void {
    this.#authViewStore.update('formType', type);
  }
}
