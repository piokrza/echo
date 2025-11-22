import { Injectable } from '@angular/core';

import { AuthViewState } from '#auth/model';
import { Store } from '#core/store';

@Injectable({ providedIn: 'root' })
export class AuthViewStore extends Store<AuthViewState> {
  constructor() {
    super({
      isPerforming: false,
      formType: 'login',
    });
  }
}
