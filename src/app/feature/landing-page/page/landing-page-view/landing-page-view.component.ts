import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { Path } from '#core/enum';
import { ThemeButtonsComponent } from '#ui/component/theme-buttons';

const imports = [ToolbarModule, RouterLink, ButtonModule, ThemeButtonsComponent];

@Component({
  selector: 'echo-landing-page-view',
  template: `
    <section class="h-full flex flex-col bg-primary p-3">
      <p-toolbar>
        <ng-template #start />

        <ng-template #end>
          <div class="flex gap-3">
            <echo-theme-buttons />
            <a pButton severity="secondary" [outlined]="true" [icon]="PrimeIcons.SIGN_IN" [routerLink]="[Path.AUTH]">Login</a>
          </div>
        </ng-template>
      </p-toolbar>

      <div class="flex flex-1 flex-col justify-center items-center mt-10">
        <h1 class="text-4xl">Welcome back to ECHO</h1>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, officiis.</div>
      </div>
    </section>
  `,
  imports,
})
export class LandingPageViewComponent {
  readonly Path = Path;
  readonly PrimeIcons = PrimeIcons;
}
