import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#auth/page/auth-view')).AuthViewComponent,
  },
];
