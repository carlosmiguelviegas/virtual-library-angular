import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const token = localStorage.getItem('token');

    if (token) {
      const changedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(changedRequest);
    }

    return next(req);

}
