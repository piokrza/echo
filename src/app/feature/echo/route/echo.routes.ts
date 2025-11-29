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
    path: Path.SETTINGS,
    title: 'Settings',
    loadComponent: async () => (await import('#echo/page/settings')).SettingsComponent,
  },
];
