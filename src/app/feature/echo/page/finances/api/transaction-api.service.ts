import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CollectionService } from '#core/service';
import { EchoTransaction } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class TransactonApiService {
  readonly #collectionService = inject(CollectionService);

  addTransaction$(transaction: EchoTransaction): Observable<void> {
    return this.#collectionService.addCollection$('transactions', transaction);
  }
}
