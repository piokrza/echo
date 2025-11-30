import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthApiService } from '#auth/api';

@Injectable({ providedIn: 'root' })
export class FrameService {
  readonly #router = inject(Router);
  readonly #authApiService = inject(AuthApiService);

  logout$(): Observable<void> {
    return this.#authApiService.logout$().pipe(
      tap(() => {
        this.#router.navigate(['']);
      })
    );
  }
}
