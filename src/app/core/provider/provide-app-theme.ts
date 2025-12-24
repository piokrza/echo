import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import Aura from '@primeuix/themes/aura';

import { providePrimeNG } from 'primeng/config';

import { Key } from '#core/constant';
import { ThemeService } from '#ui/service';

export const provideAppTheme = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.' + Key.DARK_MODE_SELECTOR,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideEnvironmentInitializer(() => {
      inject(ThemeService).initThemeMode();
    }),
  ]);
};
