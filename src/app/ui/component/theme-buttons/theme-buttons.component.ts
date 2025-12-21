import { Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { ThemeService } from '#ui/service';

const imports = [ButtonModule];

@Component({
  selector: 'echo-theme-buttons',
  template: `
    <div class="flex gap-4">
      <p-button severity="secondary" [text]="true" [icon]="isDarkMode() ? PrimeIcons.MOON : PrimeIcons.SUN" (click)="toggleIsDarkMode()" />
    </div>
  `,
  imports,
})
export class ThemeButtonsComponent {
  readonly #themeService = inject(ThemeService);

  readonly isDarkMode = this.#themeService.isDarkMode;
  readonly PrimeIcons = PrimeIcons;

  toggleIsDarkMode(): void {
    this.#themeService.toggleIsDarkMode();
  }
}
