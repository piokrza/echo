import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';

import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { FrameService } from '#ui/service';

const imports = [AvatarModule, PopoverModule, ButtonModule];

@Component({
  selector: 'echo-user-popover',
  template: `
    <p-avatar
      size="normal"
      tabindex="0"
      shape="circle"
      class="cursor-pointer"
      [image]="user?.photoURL ?? ''"
      [icon]="user?.photoURL ? '' : PrimeIcons.USER"
      (click)="popover.toggle($event)" />

    <p-popover #popover class="min-w-12">
      <div class="flex flex-col gap-3 items-center">
        <div class="text-sm color-secondary">{{ user?.email }}</div>

        @if (user) {
          <p-avatar size="xlarge" shape="circle" [image]="user.photoURL ?? ''" (click)="popover.toggle($event)" />
          <div>Hello {{ user.displayName ?? 'user' }}</div>
        }
      </div>

      <div class="mt-4">
        <p-button
          class="wide"
          label="Logout"
          pTooltip="Logout"
          severity="secondary"
          tooltipPosition="bottom"
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

  readonly user = inject(Auth).currentUser;
  readonly PrimeIcons = PrimeIcons;

  logout(): void {
    this.#frameService.logout$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
