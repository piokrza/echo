import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  readonly #auth = inject(Auth);

  readonly user = this.#auth.currentUser;

  loginWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.#auth, email, password));
  }

  loginWithGoogle$(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.#auth, provider));
  }

  logout$(): Observable<void> {
    return from(this.#auth.signOut());
  }
}
