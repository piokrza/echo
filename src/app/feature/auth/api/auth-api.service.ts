import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthForm } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  loginWithEmailAndPassword$(credentials: AuthForm): Observable<AuthForm> {
    return of(credentials);
  }
}
