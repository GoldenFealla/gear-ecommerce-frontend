import type { HttpInterceptorFn } from '@angular/common/http';

export const credentialInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('https://dummyjson.com')) {
        return next(req);
    }

    const newReq = req.clone({
        withCredentials: true,
    });

    return next(newReq);
};
