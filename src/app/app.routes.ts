import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

import { Path } from '#core/enum';

// TODO: handle page titles

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([Path.AUTH]) },
    loadComponent: async () => (await import('#ui/frame')).FrameComponent,
    children: [
      {
        path: '',
        redirectTo: Path.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: Path.DASHBOARD,
        loadChildren: async () => (await import('#dashboard/route')).DashboardRoutes,
      },
    ],
  },
  {
    path: Path.AUTH,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo([Path.DASHBOARD]) },
    loadChildren: async () => (await import('#auth/route')).AuthRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
