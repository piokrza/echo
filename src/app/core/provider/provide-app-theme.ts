import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';

import { ThemeService } from '#ui/service';

export const provideAppTheme = (): EnvironmentProviders => {
  return provideEnvironmentInitializer(() => {
    inject(ThemeService);
  });
};
