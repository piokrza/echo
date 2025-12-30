import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { forkJoin, take } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

import { Path } from '#core/enum';
import { EchoLink } from '#core/model';
import { CategoriesService, TransactionsService } from '#finances/service';

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
export class FinancesFrameComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly #categoriesService = inject(CategoriesService);
  readonly #transactionsService = inject(TransactionsService);

  readonly Path = Path;
  readonly links: EchoLink[] = [
    { label: 'Overview', routerLink: Path.OVERVIEW },
    { label: 'Transactions', routerLink: Path.TRANSACTIONS },
    { label: 'Categories', routerLink: Path.CATEGORIES },
  ];

  ngOnInit(): void {
    this.loadFinancesData();
  }

  private loadFinancesData(): void {
    const financeDataRequests = [this.#categoriesService.getCategories$(), this.#transactionsService.getTransactions$()];
    forkJoin(financeDataRequests).pipe(take(1)).subscribe();
  }
}
