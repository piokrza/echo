import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

export const provideEchoCustomIcons = (): EnvironmentProviders => {
  return provideAppInitializer(() => {
    const domSanitizer = inject(DomSanitizer);
    const matIconRegistry = inject(MatIconRegistry);

    const icons = ['google'];
    icons.forEach((name) => {
      matIconRegistry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl(`asset/icon/${name}.svg`));
    });
  });
};
