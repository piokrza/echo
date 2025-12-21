import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';
import { Link } from '#ui/model';
import { BreakpointService, FrameService } from '#ui/service';

const imports = [
  MatSidenavModule,
  MatListModule,

  RouterLink,
  RouterOutlet,
  ButtonModule,
  RouterLinkActive,
  ToolbarModule,
  ConfirmDialog,
  TooltipModule,
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
  readonly #confirmationService = inject(ConfirmationService);

  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');

  readonly Path = Path;
  readonly PrimeIcons = PrimeIcons;
  readonly links: Link[] = [
    { label: 'Dashboard', routerLink: Path.DASHBOARD },
    { label: 'Finances', routerLink: Path.FINANCES },
    { label: 'Settings', routerLink: Path.SETTINGS },
  ];

  logout(event: Event): void {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      position: 'topright',
      header: 'Do you really want to sign out?',
      closable: false,
      closeOnEscape: false,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Logout',
      },
      accept: () => {
        this.#frameService.logout$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
      },
    });
  }
}
