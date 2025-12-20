import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { Path } from '#core/enum';
import { EchoLink } from '#core/model';

const imports = [RouterOutlet, RouterLink, MatButtonModule];

@Component({
  selector: 'echo-finances-frame',
  template: `
    <div class="flex gap-4 flex-wrap">
      @for (link of links; track $index) {
        <a matButton="tonal" [routerLink]="[link.routerLink]" [relativeTo]="activatedRoute">{{ link.label }}</a>
      }
    </div>

    <div class="mt-4">
      <router-outlet />
    </div>
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
