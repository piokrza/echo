import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';
import { Link } from '#ui/model';
import { BreakpointService, FrameService } from '#ui/service';

const imports = [
  RouterLink,
  AvatarModule,
  RouterOutlet,
  ButtonModule,
  DrawerModule,
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

  drawerVisible = false;
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
      header: 'Are you sure?',
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

  closeDrawer(): void {
    if (this.drawerVisible) this.drawerVisible = false;
  }
}
