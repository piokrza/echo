import { Injectable } from '@angular/core';

import { AuthViewState } from '#auth/model';
import { EchoStore } from '#core/store';

@Injectable({ providedIn: 'root' })
export class AuthViewStore extends EchoStore<AuthViewState> {
  constructor() {
    super({
      formType: 'login',
      isPerformingGoogleAuth: false,
      isPerformingEmailAndPasswordAuth: false,
    });
  }
}
