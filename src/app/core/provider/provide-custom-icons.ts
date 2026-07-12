import { EnvironmentProviders, provideAppInitializer, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

export const provideCustomIcons = (): EnvironmentProviders => {
  return provideAppInitializer(() => {
    const sanitizer = inject(DomSanitizer);
    const iconRegistry = inject(MatIconRegistry);

    ['google', 'app-logo'].forEach((iconName: string) => {
      iconRegistry.addSvgIcon(iconName, sanitizer.bypassSecurityTrustResourceUrl(`asset/icon/${iconName}.svg`));
    });
  });
};
