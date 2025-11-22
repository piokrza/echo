/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  login$(username: string): Observable<string> {
    return of(username).pipe(tap(console.log));
  }
}
