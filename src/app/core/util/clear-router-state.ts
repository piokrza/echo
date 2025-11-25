import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function clearRouterState() {
  return () => {
    const router = inject(Router);
    let state = router.getCurrentNavigation()?.extras.state;
    if (state) state = undefined;
  };
}
