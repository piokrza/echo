import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Path } from '#core/enum';
import { Link } from '#ui/model';
import { ThemeService } from '#ui/service';

const imports = [MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule];

@Component({
  selector: 'echo-theme-buttons',
  template: `
    <div class="flex gap-4">
      <button matIconButton matTooltip="Toggle light/dark mode" (click)="toggleThemeMode()">
        <mat-icon>{{ isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
      </button>

      <button matIconButton matTooltip="Select theme" [matMenuTriggerFor]="menu">
        <mat-icon>format_color_fill</mat-icon>
      </button>
    </div>

    <mat-menu #menu="matMenu">
      @for (theme of themes; track theme.value) {
        <button mat-menu-item (click)="setTheme(theme.value)">
          <mat-icon>{{ 'radio_button_' + (selectedTheme() === theme.value ? '' : 'un') + 'checked' }}</mat-icon>
          <span>{{ theme.viewValue }}</span>
        </button>
      }
    </mat-menu>
  `,
  imports,
})
export class ThemeButtonsComponent {
  readonly #themeService = inject(ThemeService);

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
