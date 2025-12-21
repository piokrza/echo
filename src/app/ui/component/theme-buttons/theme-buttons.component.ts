import { Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { Path } from '#core/enum';
import { Link } from '#ui/model';
import { ThemeService } from '#ui/service';

const imports = [ButtonModule];

@Component({
  selector: 'echo-theme-buttons',
  template: `
    <div class="flex gap-4">
      <p-button severity="secondary" [text]="true" [icon]="isDarkMode() ? PrimeIcons.SUN : PrimeIcons.MOON" (click)="toggleThemeMode()" />
    </div>
  `,
  imports,
})
export class ThemeButtonsComponent {
  readonly #themeService = inject(ThemeService);

  readonly PrimeIcons = PrimeIcons;
  readonly themes = this.#themeService.themes;
  readonly links: Link[] = [
    { label: 'Dashboard', routerLink: Path.DASHBOARD },
    { label: 'Settings', routerLink: Path.SETTINGS },
  ];

  readonly isDarkMode = this.#themeService.isDarkMode;
  readonly selectedTheme = this.#themeService.selectedTheme;

  setTheme(value: string): void {
    this.#themeService.setTheme(value);
  }

  toggleThemeMode(): void {
    this.#themeService.toggleIsDarkMode();
  }
}
