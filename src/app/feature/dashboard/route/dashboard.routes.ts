import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#dashboard/page/dashboard-view')).DashboardViewComponent,
  },
];
