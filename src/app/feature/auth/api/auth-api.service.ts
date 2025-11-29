import { inject, Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { Path } from '#core/enum';
import { FirebaseAuthApiService } from '#firebase/api';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  readonly #router = inject(Router);
  readonly #firebaseAuthApiService = inject(FirebaseAuthApiService);

  loginWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return this.#firebaseAuthApiService.loginWithEmailAndPassword$(email, password).pipe(
      tap({
        next: () => {
          this.#router.navigate([Path.DASHBOARD]);
        },
      })
    );
  }

  logout$(): Observable<void> {
    return this.#firebaseAuthApiService.logout$().pipe(
      tap({
        next: () => {
          this.#router.navigate([Path.AUTH]);
        },
        error: () => {
          //TODO: handle logout error
        },
      })
    );
  }
}
