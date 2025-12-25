import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { httpCacheInterceptor } from '#core/interceptor';
import { primeNgProviders, provideAppTheme } from '#core/provider';
import { provideEchoFirebaseConfig } from '#firebase/provider';

import { routes } from '.';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppTheme(),
    primeNgProviders(),
    provideEchoFirebaseConfig(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([httpCacheInterceptor])),
  ],
};
