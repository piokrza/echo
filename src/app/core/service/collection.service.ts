import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, DocumentData, Firestore, setDoc, WithFieldValue } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { CollectionName } from '#core/model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  readonly #firestore = inject(Firestore);

  readonly #userId = inject(Auth).currentUser?.uid;

  addCollection$<T>(colName: CollectionName, data: WithFieldValue<DocumentData> & T): Observable<void> {
    if (!this.#userId) throw new Error('User id is missing');

    const docRef = doc(this.#firestore, colName, this.#userId);
    return from(setDoc(docRef, data));
  }
}
