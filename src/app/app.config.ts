import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEchoCustomIcons } from '#core/provider';

import { routes } from '.';

export const appConfig: ApplicationConfig = {
  providers: [provideEchoCustomIcons(), provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
