import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';

const imports = [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, ThemeButtonsComponent];

@Component({
  selector: 'echo-landing-page-view',
  template: `
    <section class="h-full flex flex-col bg-primary">
      <mat-toolbar>
        <div class="w-full flex justify-between">
          <div></div>
          <div class="flex gap-3">
            <echo-theme-buttons />
            <button matButton="outlined" [routerLink]="[Path.AUTH]">
              Login
              <mat-icon>login</mat-icon>
            </button>
          </div>
        </div>
      </mat-toolbar>

      <div class="flex flex-1 flex-col justify-center items-center">
        <h1 class="text-4xl">Welcome back to ECHO</h1>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, officiis.</div>
      </div>
    </section>
  `,
  imports,
})
export class LandingPageViewComponent {
  readonly Path = Path;
}
