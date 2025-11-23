import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAppTheme, provideEchoCustomIcons } from '#core/provider';

import { routes } from '.';

export const appConfig: ApplicationConfig = {
  providers: [provideEchoCustomIcons(), provideAppTheme(), provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
