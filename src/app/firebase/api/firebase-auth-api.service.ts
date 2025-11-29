import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthApiService {
  readonly #auth = inject(Auth);

  readonly user = this.#auth.currentUser;

  loginWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.#auth, email, password));
  }

  logout$(): Observable<void> {
    return from(this.#auth.signOut());
  }
}
