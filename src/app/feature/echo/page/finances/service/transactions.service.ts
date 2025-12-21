import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactonApiService } from '#finances/api';
import { EchoTransaction } from '#finances/model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  readonly #transactionsApiService = inject(TransactonApiService);

  addTransaction$(transaction: EchoTransaction): Observable<void> {
    return this.#transactionsApiService.addTransaction$(transaction);
  }
}
