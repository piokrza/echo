import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';
import { UserPopoverComponent } from '#ui/component/user-popover';
import { Link } from '#ui/model';
import { BreakpointService, FrameService } from '#ui/service';

const imports = [
  RouterLink,
  RouterOutlet,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  RouterLinkActive,
  UserPopoverComponent,
  ThemeButtonsComponent,
];

@Component({
  selector: 'echo-frame',
  templateUrl: './frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class FrameComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #frameService = inject(FrameService);

  readonly user = inject(Auth).currentUser;
  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');

  drawerVisible = false;
  readonly Path = Path;
  readonly links: Link[] = [
    { label: 'Dashboard', routerLink: Path.DASHBOARD },
    { label: 'Finances', routerLink: Path.FINANCES },
    { label: 'Settings', routerLink: Path.SETTINGS },
  ];

  logout(): void {
    // TODO: add confirm dialog
    this.#frameService.logout$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  closeDrawer(): void {
    if (this.drawerVisible) this.drawerVisible = false;
  }
}
