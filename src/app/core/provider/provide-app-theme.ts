import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import Aura from '@primeuix/themes/aura';

import { providePrimeNG } from 'primeng/config';

import { Key } from '#core/enum';
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
            order: 'tailwind, base, primeng',
          },
        },
      },
    }),
    provideEnvironmentInitializer(() => {
      inject(ThemeService).initThemeMode();
    }),
  ]);
};
