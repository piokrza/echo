import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

import { EchoCollection } from '#core/enum';
import { EchoTransaction } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class TransactonApiService {
  readonly #firestore = inject(Firestore);

  readonly #transactionsCollection = collection(this.#firestore, EchoCollection.TRANSACTIONS);

  getTransactions$(uid: string): Observable<EchoTransaction[]> {
    const queryDocs = query(this.#transactionsCollection, where('uid', '==', uid));

    // TODO: workaround for firestore err:
    // FirebaseError: Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?
    // return collectionData(queryDocs, { idField: 'id' }) as Observable<EchoTransaction[]>;
    return from(getDocs(queryDocs)).pipe(
      map((snap) => {
        return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      })
    ) as Observable<EchoTransaction[]>;
  }

  addTransaction$(transaction: EchoTransaction): Observable<string> {
    return from(addDoc(this.#transactionsCollection, transaction).then((res) => res.id));
  }

  deleteTransaction$(txId: string): Observable<void> {
    const docRef = doc(this.#firestore, EchoCollection.TRANSACTIONS, txId);
    return from(deleteDoc(docRef));
  }
}
