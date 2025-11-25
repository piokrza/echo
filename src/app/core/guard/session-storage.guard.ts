import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';

export function sessionStorageGuard(input: string | string[], redirectPath: string[]): CanMatchFn {
  return () => {
    const router = inject(Router);
    return of(isValid(input)).pipe(tap((matches: boolean) => !matches && void router.navigate(redirectPath)));
  };
}

function isValid(input: string | string[]): boolean {
  if (typeof input === 'string') {
    return !!sessionStorage.getItem(input);
  } else {
    return input.every((k) => !!sessionStorage.getItem(k));
  }
}
