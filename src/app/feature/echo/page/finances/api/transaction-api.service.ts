import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { EMPTY, from, map, Observable, throwError } from 'rxjs';

import { EchoCollection } from '#core/enum';
import { EchoTransaction } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class TransactonApiService {
  readonly #auth = inject(Auth);
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

  getTransactionById$(txId: string): Observable<EchoTransaction> {
    const userId = this.#auth.currentUser?.uid;
    if (!userId) {
      return throwError(() => 'User id is missing');
    }

    const q = query(this.#transactionsCollection, where('uid', '==', userId), where('id', '==', txId));

    return from(getDocs(q)).pipe(
      map((snap) => {
        const doc = snap.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        } as EchoTransaction;
      })
    );
  }

  addTransaction$(transaction: Partial<EchoTransaction>): Observable<string> {
    return from(
      addDoc(this.#transactionsCollection, transaction).then((docRef) => {
        const docId = docRef.id;
        updateDoc(docRef, { id: docId });
        return docId;
      })
    );
  }

  updateTransaction$(transaction: Partial<EchoTransaction>): Observable<void> {
    if (!transaction.id) return EMPTY;
    const docRef = doc(this.#firestore, EchoCollection.TRANSACTIONS, transaction.id);

    return from(updateDoc(docRef, transaction));
  }

  deleteTransaction$(txId: string): Observable<void> {
    const docRef = doc(this.#firestore, EchoCollection.TRANSACTIONS, txId);
    return from(deleteDoc(docRef));
  }
}
