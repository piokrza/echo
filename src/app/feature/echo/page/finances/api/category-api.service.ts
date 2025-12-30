import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { EMPTY, from, map, Observable } from 'rxjs';

import { EchoCollection } from '#core/enum';
import { EchoTransactionCategory } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
  readonly #firestore = inject(Firestore);

  readonly #transactionCategoriesCollection = collection(this.#firestore, EchoCollection.TRANSACTION_CATEGORIES);

  getCategories$(uid: string): Observable<EchoTransactionCategory[]> {
    const queryDocs = query(this.#transactionCategoriesCollection, where('uid', '==', uid));

    // TODO: workaround for firestore err:
    // FirebaseError: Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?
    // return collectionData(queryDocs, { idField: 'id' }) as Observable<EchoTransactionCategory[]>;
    return from(getDocs(queryDocs)).pipe(
      map((snap) => {
        return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      })
    ) as Observable<EchoTransactionCategory[]>;
  }

  addCategory$(category: Partial<EchoTransactionCategory>): Observable<string> {
    return from(
      addDoc(this.#transactionCategoriesCollection, category).then((docRef) => {
        const docId = docRef.id;
        updateDoc(docRef, { id: docId });
        return docId;
      })
    );
  }

  updateCategory$(category: Partial<EchoTransactionCategory>): Observable<void> {
    if (!category.id) return EMPTY;
    const docRef = doc(this.#firestore, EchoCollection.TRANSACTION_CATEGORIES, category.id);

    return from(updateDoc(docRef, category));
  }

  deleteCategory$(categoryId: string): Observable<void> {
    const docRef = doc(this.#firestore, EchoCollection.TRANSACTION_CATEGORIES, categoryId);
    return from(deleteDoc(docRef));
  }
}
