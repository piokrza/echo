import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';

import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { ClickOutsideDirective } from '#ui/directive';
import { FrameService } from '#ui/service';

const imports = [AvatarModule, PopoverModule, ButtonModule, ClickOutsideDirective];

@Component({
  selector: 'echo-user-popover',
  template: `
    <button
      pButton
      class="p-1 overflow-visible"
      severity="secondary"
      [text]="true"
      (click)="popover.toggle($event); focused.set(true)"
      (keyup.enter)="popover.toggle($event); focused.set(true)">
      <p-avatar
        size="normal"
        shape="circle"
        [image]="user?.photoURL ?? ''"
        [class]="focused() ? 'outlined' : ''"
        [icon]="user?.photoURL ? undefined : PrimeIcons.USER"
        (clickOutside)="focused.set(false)" />
    </button>

    <p-popover #popover>
      <div class="flex flex-col gap-3 items-center min-w-12">
        <div class="text-sm color-secondary">{{ user?.email }}</div>

        @if (user?.photoURL) {
          <p-avatar size="xlarge" shape="circle" [image]="user?.photoURL ?? ''" (click)="popover.toggle($event)" />
        }
        <div>Hello {{ user?.displayName ?? 'user' }}</div>
      </div>

      <div class="mt-4">
        <p-button
          class="wide"
          label="Logout"
          severity="danger"
          tooltipPosition="bottom"
          [text]="true"
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

  focused = signal(false);

  logout(): void {
    this.#frameService.logout$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
