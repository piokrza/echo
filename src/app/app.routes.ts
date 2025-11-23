import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#ui/frame')).FrameComponent,
    children: [
      {
        path: '',
        redirectTo: Path.HOME,
        pathMatch: 'full',
      },
      {
        path: Path.HOME,
        loadChildren: async () => (await import('#dashboard/route')).DashboardRoutes,
      },
    ],
  },
  {
    path: Path.AUTH,
    loadChildren: async () => (await import('#auth/route')).AuthRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
