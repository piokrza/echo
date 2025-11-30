import { inject, Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, setDoc, WithFieldValue } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { Collection } from '#core/model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  readonly #firestore = inject(Firestore);

  readonly #userId = inject(AuthApiService).user?.uid;

  addCol$<T>(colName: Collection, data: WithFieldValue<DocumentData> & T): Observable<void> {
    if (!this.#userId) throw new Error('User id is missing');

    const docRef = doc(this.#firestore, colName, this.#userId);
    return from(setDoc(docRef, data));
  }
}
