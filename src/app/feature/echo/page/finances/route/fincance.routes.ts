import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const FinanceRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#finances/component/finances-frame')).FinancesFrameComponent,
    children: [
      {
        path: '',
        redirectTo: Path.OVERVIEW,
        pathMatch: 'full',
      },
      {
        path: Path.OVERVIEW,
        loadComponent: async () => (await import('#finances/page/overview')).OverviewComponent,
      },
      {
        path: Path.TRANSACTIONS,
        loadComponent: async () => (await import('#finances/page/transactions')).TransactionsComponent,
      },
      {
        path: Path.CATEGORIES,
        loadComponent: async () => (await import('#finances/page/categories')).CategoriesComponent,
      },
    ],
  },
];
