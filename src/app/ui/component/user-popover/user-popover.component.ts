import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { AuthApiService } from '#auth/api';
import { FrameService } from '#ui/service';

const imports = [AvatarModule, PopoverModule, ButtonModule];

@Component({
  selector: 'echo-user-popover',
  template: `
    <p-avatar
      size="normal"
      tabindex="0"
      shape="circle"
      [image]="user?.photoURL ?? ''"
      [icon]="user?.photoURL ? '' : PrimeIcons.USER"
      (click)="popover.toggle($event)" />

    <p-popover #popover class="min-w-12" appendTo="self">
      <div class="flex flex-col gap-3 items-center">
        <div class="text-sm color-secondary">{{ user?.email }}</div>

        @if (user?.photoURL ?? '') {
          <p-avatar size="xlarge" shape="circle" [image]="user?.photoURL ?? ''" (click)="popover.toggle($event)" />
        }
        <div>Hello {{ user?.displayName }}</div>
      </div>

      <div class="mt-4">
        <p-button
          class="wide"
          pTooltip="Logout"
          severity="secondary"
          tooltipPosition="bottom"
          label="Logout"
          [icon]="PrimeIcons.SIGN_OUT"
          (click)="logout()" />
      </div>
    </p-popover>
  `,
  imports,
})
export class UserPopoverComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #frameService = inject(FrameService);

  readonly user = inject(AuthApiService).user;
  readonly PrimeIcons = PrimeIcons;

  logout(): void {
    this.#frameService.logout$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
