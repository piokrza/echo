import type { TrackByFunction } from '@angular/core';

export const trackByValue = <T>(_index: number, value: T) => value;

export function getTrackByFn<T extends object>(key: keyof T): TrackByFunction<T> {
  return (index: number, item: T) => (item ? item[key] : key);
}

export const trackByIndex: TrackByFunction<unknown> = (index: number) => index;
