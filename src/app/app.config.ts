import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAppTheme, provideEchoCustomIcons } from '#core/provider';
import { provideEchoFirebaseConfig } from '#firebase/provider';

import { routes } from '.';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppTheme(),
    provideRouter(routes),
    provideEchoCustomIcons(),
    provideEchoFirebaseConfig(),
    provideBrowserGlobalErrorListeners(),
  ],
};
