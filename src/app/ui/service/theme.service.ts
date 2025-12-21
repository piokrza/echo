import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { Key } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #isDarkMode = signal(JSON.parse(localStorage.getItem(Key.IS_DARK_MODE) ?? 'false') as boolean);
  readonly isDarkMode = this.#isDarkMode.asReadonly();

  readonly #html: HTMLHtmlElement | null = inject(DOCUMENT).querySelector('html');

  toggleIsDarkMode(): void {
    if (this.#html) {
      this.#html.classList.toggle(Key.DARK_MODE_SELECTOR);
      this.#isDarkMode.update((value) => !value);
      localStorage.setItem(Key.IS_DARK_MODE, JSON.stringify(this.#isDarkMode()));
    }
  }

  initThemeMode(): void {
    if (this.#isDarkMode() && !this.#html?.classList.contains(Key.DARK_MODE_SELECTOR)) {
      this.#html?.classList.add(Key.DARK_MODE_SELECTOR);
    }
  }
}
