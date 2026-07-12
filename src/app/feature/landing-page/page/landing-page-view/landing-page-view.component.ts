import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';

const imports = [RouterLink, ThemeButtonsComponent, MatToolbarModule, MatButton, MatIcon];

@Component({
  selector: 'echo-landing-page-view',
  template: `
    <section class="h-full flex flex-col bg-primary p-3">
      <mat-toolbar class="w-full flex justify-end border rounded-sm">
        <div class="flex gap-3">
          <echo-theme-buttons />
          <a matButton [routerLink]="[Path.AUTH]">
            <mat-icon fontIcon="login" />
            Login
          </a>
        </div>
      </mat-toolbar>

      <div class="flex flex-1 flex-col justify-center items-center mt-10">
        <h1 class="text-4xl">Welcome back to ECHO</h1>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, officiis.</div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class LandingPageViewComponent {
  readonly Path = Path;
}
