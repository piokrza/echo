import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { provideAppTheme } from '#core/provider';
import { provideEchoFirebaseConfig } from '#firebase/provider';

import { routes } from '.';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppTheme(),
    ConfirmationService,
    provideEchoFirebaseConfig(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
  ],
};
