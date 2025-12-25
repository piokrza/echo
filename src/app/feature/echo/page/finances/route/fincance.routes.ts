import { Routes } from '@angular/router';

import { Path } from '#core/enum';
import { setPath } from '#core/util';

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
        path: setPath(Path.TRANSACTIONS, Path.PARAM_ID),
        loadComponent: async () => (await import('#finances/page/transaction-details')).TransactionDetailsComponent,
      },
      {
        path: Path.CATEGORIES,
        loadComponent: async () => (await import('#finances/page/categories')).CategoriesComponent,
      },
    ],
  },
];
