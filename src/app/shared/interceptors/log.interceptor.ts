import type { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

const mc = {
  GET: 'chartreuse',
  POST: 'orange',
};

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  const method = req.method as keyof typeof mc;
  const url = req.url;

  console.log(
    `%c${method} %c${url}`,
    `color: ${mc[method]}; font-weight: bold`,
    'color: blue'
  );

  const start = performance.now();

  return next(req).pipe(
    tap({
      next: () => {
        const delta = performance.now() - start;
        console.log(
          `%c${method} %c${url} %c${delta.toFixed(0)}ms`,
          `color: ${mc[method]}; font-weight: bold`,
          'color: blue',
          `color: ${
            delta < 200 ? 'chartreuse' : delta < 500 ? 'orange' : 'crimson'
          }`
        );
      },
    })
  );
};
