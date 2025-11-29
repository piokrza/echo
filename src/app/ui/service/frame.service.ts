import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class FrameService {
  readonly #router = inject(Router);
  readonly #authApiService = inject(AuthApiService);

  logout() {
    return this.#authApiService.logout().pipe(
      tap(() => {
        this.#router.navigate([Path.AUTH]);
      })
    );
  }
}
