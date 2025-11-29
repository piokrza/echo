import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const DashboardRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.DASHBOARD,
  },
  {
    path: Path.DASHBOARD,
    title: 'Dashboard',
    loadComponent: async () => (await import('#dashboard/page/dashboard-view')).DashboardViewComponent,
  },
  {
    path: Path.SETTINGS,
    title: 'Settings',
    loadComponent: async () => (await import('#dashboard/page/settings')).SettingsComponent,
  },
];
