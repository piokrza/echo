import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const EchoRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.DASHBOARD,
  },
  {
    path: Path.DASHBOARD,
    title: 'Dashboard',
    loadComponent: async () => (await import('#echo/page/dashboard')).DashboardComponent,
  },
  {
    path: Path.FINANCES,
    title: 'Fincances',
    loadChildren: async () => (await import('#finances/route')).FinanceRoutes,
  },
];
