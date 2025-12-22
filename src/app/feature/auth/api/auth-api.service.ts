import { inject, Injectable } from '@angular/core';
import {
  Auth,
  updateProfile,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';

import { AppUser, AuthForm } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  readonly #auth = inject(Auth);
  readonly #firestore = inject(Firestore);

  loginWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.#auth, email, password));
  }

  loginWithGoogle$(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.#auth, provider));
  }

  createUserWithEmailAndPassword$({ email, password, username }: AuthForm): Observable<void> {
    return from(createUserWithEmailAndPassword(this.#auth, email, password)).pipe(
      switchMap(({ user }: UserCredential) => from(updateProfile(user, { displayName: username })).pipe(map(() => user))),
      switchMap(({ uid }) => {
        const docRef = doc(this.#firestore, 'users', uid);
        return from(
          setDoc(docRef, {
            uid,
            email,
            username,
            createdAt: new Date(),
          } satisfies AppUser)
        );
      })
    );
  }

  logout$(): Observable<void> {
    return from(this.#auth.signOut());
  }
}
