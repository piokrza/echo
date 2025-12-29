import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

import { Path } from '#core/enum';
import { EchoLink } from '#core/model';

const imports = [RouterOutlet, RouterLink, ButtonModule, ButtonGroupModule, RouterLinkActive];

@Component({
  selector: 'echo-finances-frame',
  template: `
    <div class="flex gap-4 flex-wrap mb-8">
      <p-button-group>
        @for (link of links; track $index) {
          <a
            pButton
            severity="secondary"
            routerLinkActive="link-active"
            [outlined]="true"
            [relativeTo]="activatedRoute"
            [routerLink]="[link.routerLink]">
            {{ link.label }}
          </a>
        }
      </p-button-group>
    </div>

    <section>
      <router-outlet />
    </section>
  `,
  imports,
})
export class FinancesFrameComponent {
  readonly activatedRoute = inject(ActivatedRoute);

  readonly Path = Path;
  readonly links: EchoLink[] = [
    { label: 'Overview', routerLink: Path.OVERVIEW },
    { label: 'Transactions', routerLink: Path.TRANSACTIONS },
    { label: 'Categories', routerLink: Path.CATEGORIES },
  ];
}
