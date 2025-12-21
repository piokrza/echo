import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import Aura from '@primeuix/themes/aura';

import { providePrimeNG } from 'primeng/config';

export const provideAppTheme = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ]);
};
