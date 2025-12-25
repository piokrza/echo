import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, of, tap } from 'rxjs';

const cacheDataMap = new Map<string, HttpResponse<unknown>>();

export const httpCacheInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.responseType !== 'json') return next(req);

  const data = cacheDataMap.get(req.url);
  if (data) return of(data);

  return next(req).pipe(
    filter((e): e is HttpResponse<unknown> => e instanceof HttpResponse),
    tap((httpEvent) => cacheDataMap.set(req.url, httpEvent))
  );
};
