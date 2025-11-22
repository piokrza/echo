import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthApiService } from '#auth/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #authApiService = inject(AuthApiService);

  login$(userName: string): Observable<string> {
    return this.#authApiService.login$(userName);
  }
}
