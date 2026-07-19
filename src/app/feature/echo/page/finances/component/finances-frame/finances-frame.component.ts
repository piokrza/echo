import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { forkJoin, take } from 'rxjs';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Path } from '#core/enum';
import { EchoLink } from '#core/model';
import { CategoriesService, TransactionsService } from '#finances/service';

const imports = [RouterOutlet, RouterLink, MatButtonToggleModule];

@Component({
  selector: 'echo-finances-frame',
  template: `
    <div class="flex gap-4 flex-wrap mb-8">
      <mat-button-toggle-group name="fontStyle" aria-label="Font Style">
        @for (link of links; track $index) {
          <mat-button-toggle [relativeTo]="activatedRoute" [routerLink]="[link.routerLink]" [value]="link.routerLink">
            {{ link.label }}
          </mat-button-toggle>
        }
      </mat-button-toggle-group>
    </div>

    <section>
      <router-outlet />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class FinancesFrameComponent implements OnInit {
  readonly #categoriesService = inject(CategoriesService);
  readonly #transactionsService = inject(TransactionsService);

  readonly activatedRoute = inject(ActivatedRoute);
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
