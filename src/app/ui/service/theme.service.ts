import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { Key } from '#core/enum';
import { AppTheme } from '#ui/model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {
    this.setTheme(this.selectedTheme());
    this.setColorScheme();
  }

  readonly #document = inject(DOCUMENT);

  readonly #isDarkMode = signal(JSON.parse(localStorage.getItem(Key.IS_DARK_MODE) ?? 'false') as boolean);
  readonly isDarkMode = this.#isDarkMode.asReadonly();

  readonly #selectedTheme = signal(localStorage.getItem(Key.THEME) ?? 'theme-red');
  readonly selectedTheme = this.#selectedTheme.asReadonly();

  readonly themes: AppTheme[] = [
    { value: 'theme-blue', viewValue: '🔵' },
    { value: 'theme-red', viewValue: '🔴' },
    { value: 'theme-green', viewValue: '🟢' },
  ];

  toggleIsDarkMode(): void {
    this.#isDarkMode.set(!this.#isDarkMode());

    this.setColorScheme(this.#isDarkMode());
    localStorage.setItem(Key.IS_DARK_MODE, JSON.stringify(this.#isDarkMode()));
  }

  setTheme(themeName: string): void {
    localStorage.setItem(Key.THEME, themeName);
    this.#selectedTheme.set(themeName);

    ['theme-blue', 'theme-green', 'theme-red'].forEach((t) => this.#document.body.classList.remove(t));
    this.#document.body.classList.add(themeName);
  }

  private setColorScheme(isDarkMode?: boolean): void {
    if (isDarkMode === undefined) isDarkMode = this.#isDarkMode();
    this.#document.body.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }
}
