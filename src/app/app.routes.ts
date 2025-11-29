import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    title: 'Echo',
    data: { authGuardPipe: () => redirectLoggedInTo([Path.ECHO]) },
    loadComponent: async () => (await import('#landing-page/page/landing-page-view')).LandingPageViewComponent,
  },
  {
    path: Path.AUTH,
    canActivate: [AuthGuard],
    title: 'Auth',
    data: { authGuardPipe: () => redirectLoggedInTo([Path.ECHO]) },
    loadChildren: async () => (await import('#auth/route')).AuthRoutes,
  },
  {
    path: Path.ECHO,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([Path.AUTH]) }, //TODO: redirect to langing page
    loadComponent: async () => (await import('#ui/frame')).FrameComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('#echo/route')).EchoRoutes,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
