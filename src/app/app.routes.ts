import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: Path.AUTH,
    loadChildren: async () => (await import('#auth/route')).AuthRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
