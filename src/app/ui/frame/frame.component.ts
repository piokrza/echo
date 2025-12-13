import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';
import { Link } from '#ui/model';
import { BreakpointService, ConfirmDialogService, FrameService } from '#ui/service';

const imports = [
  RouterLink,
  RouterOutlet,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  RouterLinkActive,
  MatToolbarModule,
  MatTooltipModule,
  ThemeButtonsComponent,
];

@Component({
  selector: 'echo-frame',
  templateUrl: './frame.component.html',
  imports,
})
export class FrameComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #frameService = inject(FrameService);
  readonly #confirmDialog = inject(ConfirmDialogService);

  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');

  readonly Path = Path;
  readonly links: Link[] = [
    { label: 'Dashboard', routerLink: Path.DASHBOARD },
    { label: 'Settings', routerLink: Path.SETTINGS },
  ];

  logout(): void {
    this.#confirmDialog
      .open$({ title: 'Do you really want to sign out?' })
      .pipe(
        filter(Boolean),
        switchMap(() => this.#frameService.logout$()),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
