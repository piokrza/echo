import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Path } from '#core/enum';
import { Link } from '#ui/model';
import { BreakpointService, ConfirmDialogService, ThemeService } from '#ui/service';

const imports = [
  RouterLink,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  RouterLinkActive,
  MatToolbarModule,
  MatTooltipModule,
];

@Component({
  selector: 'echo-frame',
  templateUrl: './frame.component.html',
  imports,
})
export class FrameComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #themeService = inject(ThemeService);
  readonly #confirmDialog = inject(ConfirmDialogService);

  readonly isDarkMode = this.#themeService.isDarkMode;
  readonly selectedTheme = this.#themeService.selectedTheme;
  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');

  readonly Path = Path;
  readonly themes = this.#themeService.themes;
  readonly links: Link[] = [{ label: 'Dashboard', routerLink: Path.DASHBOARD }];

  setTheme(value: string): void {
    this.#themeService.setTheme(value);
  }

  toggleThemeMode(): void {
    this.#themeService.toggleIsDarkMode();
  }

  logout(): void {
    this.#confirmDialog
      .open$({ title: 'Do you really want to sign out?' })
      .pipe(
        filter(Boolean),
        switchMap(() => of({})), //TODO: implement logout
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
